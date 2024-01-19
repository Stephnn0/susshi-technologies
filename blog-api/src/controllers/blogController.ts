import { Request, Response } from "express";
import BlogPost from "../models/BlogPost";
import dotenv from 'dotenv'

dotenv.config();

// aws import configuration
import { GetObjectCommand, PutObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { bucketName, s3ClientPersonal } from "../s3"
import randomBytes from "randombytes";


// Create a new blog post
export const createBlogPost = async (req: Request, res: Response) => {

    if(!req.body?.mainTitle 
        || !req.body?.introDescription
        || !req.body?.author 
        || !req.body?.category
        || !req.body?.readTime
        || !req.body?.status
        || !req.body?.paragraphs
         ) {
        return res.status(400).json({'meesage': 'fields required'})
    }
    try {
        const { 
          mainTitle, 
          introDescription,
          author,
          category,
          readTime,
          status,
          paragraphs,

        } = req.body;

        const paragraphsJson = JSON.parse(paragraphs); 

        const rawBytes = await randomBytes(16)
        const blogId = rawBytes.toString('hex')
        
        if (Array.isArray(req.files)) {
           for (let i = 0; i < req.files.length; i++) {
              const rawBytes = await randomBytes(16)
              const imageName = rawBytes.toString('hex')
              const file = req.files[i]

              const params = {
                Bucket: bucketName,
                Key: `blog/${blogId}/${imageName}`, 
                Body: file.buffer
              };

              const command = new PutObjectCommand(params)
              await s3ClientPersonal.send(command);
        } 
      } 
        const newBlogPost = new BlogPost({
           blogId: blogId,
           mainTitle, 
           introDescription,
           author,
           category,
           readTime,
           status,
           paragraphs: paragraphsJson,
         });

        await newBlogPost.save();
        res.status(201).json(newBlogPost);
        console.log('posted')
      } catch (error) {
        res.status(500).json({ error: "Could not create blog post" });
      }
};

interface PaginatedResults {
  next: {
    page: number;
    limit: number;
  } | null; 

  previous: {
    page: number;
    limit: number;
  } | null; 
}


// Get all blog posts
export const getAllBlogPosts = async (_req: Request, res: Response) => {
    
    try {
        const { page, perPage, category } = _req.query;
       //---------------------FILTER------------------------------------
        
       const query = BlogPost.find();

       if (category) {
        query.where('category').equals(category);
      }


       //----------------------PAGINATION----------------------------------
        const startIndex = (Number(page) - 1) * Number(perPage) //limit
        const endIndex = Number(page) * Number(perPage) //limit

        const resultsNextPrevious: PaginatedResults = {
          next: {
              page: 0,
              limit: 0
          },
          previous: {
              page: 0,
              limit: 0
          },
      }

      if (endIndex < await BlogPost.countDocuments().exec()) {
        resultsNextPrevious.next = {
        page: Number(page) + 1,
        limit: Number(perPage)
      } }
      
      
      if (startIndex > 0) {
        resultsNextPrevious.previous = {
         page: Number(page) - 1,
         limit: Number(perPage)
      } }
       
      // const Paginatedresults = await BlogPost.find().sort({ date: -1 }).limit(Number(perPage)).skip(startIndex).exec()
      const Paginatedresults = await query.sort({ date: -1 }).limit(Number(perPage)).skip(startIndex).exec()

      // TESTING
      // console.log('pagination results', Paginatedresults)
      // console.log('length', Paginatedresults.length)
      // console.log('previousNextResults', results)
      // const blogPosts = await BlogPost.find().sort({ date: -1 });
        //----------------------------AWS IMAGES-----------------------------------------------------------
        const blogsWithFirstImage = [];

        for (const post of Paginatedresults) {
          const { blogId } = post;
          const key = `blog/${blogId}/`;

          const getObjectParams = {
              Bucket: bucketName,
              Key: key
        }

        const command = new ListObjectsCommand(getObjectParams);
        const { Contents } = await s3ClientPersonal.send(command);

        if (Contents.length > 0) {

          const matchingObjects = []
          for (const obj of Contents) {
            const parts = obj.Key.split('/');
            if (parts[1] === blogId) {
              matchingObjects.push(obj.Key);
            }
            const firstFound = matchingObjects[0]
            
            const firstImageUrl = `https://production-susshi.s3.us-east-1.amazonaws.com/${firstFound}`;

            post.awsUrl = firstImageUrl
          }
        }
          blogsWithFirstImage.push(post);
        }
        res.status(200).json({blogsWithFirstImage, resultsNextPrevious});
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message ||"Could not fetch blog posts" });
      }
};




// Get only last posts from the blog list
export const getLastBlogPost = async (_req: Request, res: Response) => {
  try {
    const lastBlogPost = await BlogPost.findOne().sort({ date: -1 });
     
    if (lastBlogPost) {

    const key = `blog/${lastBlogPost.blogId}/`;

    const getObjectParams = {
      Bucket: bucketName,
      Key: key
     }

     const command = new ListObjectsCommand(getObjectParams);
     const { Contents } = await s3ClientPersonal.send(command);

     if (Contents.length > 0) {

      const matchingObjects = []
      for (const obj of Contents) {
        const parts = obj.Key.split('/');
        if (parts[1] === lastBlogPost.blogId) {
          matchingObjects.push(obj);
        } 
      }
      //TESTING
      // console.log('matchingObjects', matchingObjects )
      
      const firstFound = matchingObjects[0].Key

      const getObjectParams = {
        Bucket: bucketName,
        Key: firstFound,
      };

      const getObjectCommand = new GetObjectCommand(getObjectParams);
      const imageUrl = await getSignedUrl(s3ClientPersonal, getObjectCommand, { expiresIn: 360000 });

      lastBlogPost.awsUrl = imageUrl;
     }
     res.status(200).json({ lastBlogPost });

    } else {
      res.status(404).json({ message: "No blog posts found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the last blog post" });
  }
};







// Get a single blog post by ID
export const getBlogPostById = async (req: Request, res: Response) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);

    const matchingObjects: string[] = []

    if (blogPost) {
      const key = `blog/${blogPost.blogId}`;

      const getObjectParams = {
        Bucket: bucketName,
        Key: key
       }

       const command = new ListObjectsCommand(getObjectParams);
       const { Contents } = await s3ClientPersonal.send(command);


       if (Contents.length > 0) {
        for (const obj of Contents) {
          const parts = obj.Key.split('/');
          if (parts[1] === blogPost.blogId) {
            matchingObjects.push(`https://susshi-images.s3.us-east-1.amazonaws.com/${obj.Key}`);
            console.log('matchingObjects', matchingObjects)
          } 
        }
        
        let paragraphIndex = 1; 
        for( const img of matchingObjects){
           console.log('img',img)

           blogPost.paragraphs.map((item) => {
            if(item.hasImage === true && item.url === '' && paragraphIndex < matchingObjects.length){
              item.url = matchingObjects[paragraphIndex];
              paragraphIndex++;
            }

           })
        }
       }
       console.log('blogpost', blogPost)
       res.status(200).json({ blogPost, matchingObjects });

    } else if (matchingObjects.length === 0) {
      res.status(200).json({ blogPost });

    } else {
      res.status(404).json({ message: "No blog posts found" });
    }

  } catch (error) {
    res.status(500).json({ error: "Could not fetch blog post" });
  }

};

// Update a blog post by ID
export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ error: "Could not update blog post" });
  }

};

// Delete a blog post by ID
export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Could not delete blog post" });
  }

};



