"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.updateBlogPost = exports.getBlogPostById = exports.getLastBlogPost = exports.getAllBlogPosts = exports.createBlogPost = void 0;
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3_1 = require("../s3");
const randombytes_1 = __importDefault(require("randombytes"));
const createBlogPost = async (req, res) => {
    if (!req.body?.mainTitle
        || !req.body?.introDescription
        || !req.body?.author
        || !req.body?.category
        || !req.body?.readTime
        || !req.body?.status
        || !req.body?.paragraphs) {
        return res.status(400).json({ 'meesage': 'fields required' });
    }
    try {
        const { mainTitle, introDescription, author, category, readTime, status, paragraphs, } = req.body;
        const paragraphsJson = JSON.parse(paragraphs);
        const rawBytes = await (0, randombytes_1.default)(16);
        const blogId = rawBytes.toString('hex');
        if (Array.isArray(req.files)) {
            for (let i = 0; i < req.files.length; i++) {
                const rawBytes = await (0, randombytes_1.default)(16);
                const imageName = rawBytes.toString('hex');
                const file = req.files[i];
                const params = {
                    Bucket: s3_1.bucketName,
                    Key: `blog/${blogId}/${imageName}`,
                    Body: file.buffer
                };
                const command = new client_s3_1.PutObjectCommand(params);
                await s3_1.s3ClientPersonal.send(command);
            }
        }
        const newBlogPost = new BlogPost_1.default({
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
        console.log('posted');
    }
    catch (error) {
        res.status(500).json({ error: "Could not create blog post" });
    }
};
exports.createBlogPost = createBlogPost;
const getAllBlogPosts = async (_req, res) => {
    try {
        const { page, perPage, category } = _req.query;
        const query = BlogPost_1.default.find();
        if (category) {
            query.where('category').equals(category);
        }
        const startIndex = (Number(page) - 1) * Number(perPage);
        const endIndex = Number(page) * Number(perPage);
        const resultsNextPrevious = {
            next: {
                page: 0,
                limit: 0
            },
            previous: {
                page: 0,
                limit: 0
            },
        };
        if (endIndex < await BlogPost_1.default.countDocuments().exec()) {
            resultsNextPrevious.next = {
                page: Number(page) + 1,
                limit: Number(perPage)
            };
        }
        if (startIndex > 0) {
            resultsNextPrevious.previous = {
                page: Number(page) - 1,
                limit: Number(perPage)
            };
        }
        const Paginatedresults = await query.sort({ date: -1 }).limit(Number(perPage)).skip(startIndex).exec();
        const blogsWithFirstImage = [];
        for (const post of Paginatedresults) {
            const { blogId } = post;
            const key = `blog/${blogId}/`;
            const getObjectParams = {
                Bucket: s3_1.bucketName,
                Key: key
            };
            const command = new client_s3_1.ListObjectsCommand(getObjectParams);
            const { Contents } = await s3_1.s3ClientPersonal.send(command);
            if (Contents.length > 0) {
                const matchingObjects = [];
                for (const obj of Contents) {
                    const parts = obj.Key.split('/');
                    if (parts[1] === blogId) {
                        matchingObjects.push(obj.Key);
                    }
                    const firstFound = matchingObjects[0];
                    const firstImageUrl = `https://susshi-images.s3.us-east-1.amazonaws.com/${firstFound}`;
                    post.awsUrl = firstImageUrl;
                }
            }
            blogsWithFirstImage.push(post);
        }
        res.status(200).json({ blogsWithFirstImage, resultsNextPrevious });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Could not fetch blog posts" });
    }
};
exports.getAllBlogPosts = getAllBlogPosts;
const getLastBlogPost = async (_req, res) => {
    try {
        const lastBlogPost = await BlogPost_1.default.findOne().sort({ date: -1 });
        if (lastBlogPost) {
            const key = `blog/${lastBlogPost.blogId}/`;
            const getObjectParams = {
                Bucket: s3_1.bucketName,
                Key: key
            };
            const command = new client_s3_1.ListObjectsCommand(getObjectParams);
            const { Contents } = await s3_1.s3ClientPersonal.send(command);
            if (Contents.length > 0) {
                const matchingObjects = [];
                for (const obj of Contents) {
                    const parts = obj.Key.split('/');
                    if (parts[1] === lastBlogPost.blogId) {
                        matchingObjects.push(obj);
                    }
                }
                const firstFound = matchingObjects[0].Key;
                const getObjectParams = {
                    Bucket: s3_1.bucketName,
                    Key: firstFound,
                };
                const getObjectCommand = new client_s3_1.GetObjectCommand(getObjectParams);
                const imageUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3_1.s3ClientPersonal, getObjectCommand, { expiresIn: 360000 });
                lastBlogPost.awsUrl = imageUrl;
            }
            res.status(200).json({ lastBlogPost });
        }
        else {
            res.status(404).json({ message: "No blog posts found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch the last blog post" });
    }
};
exports.getLastBlogPost = getLastBlogPost;
const getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost_1.default.findById(req.params.id);
        const matchingObjects = [];
        if (blogPost) {
            const key = `blog/${blogPost.blogId}`;
            const getObjectParams = {
                Bucket: s3_1.bucketName,
                Key: key
            };
            const command = new client_s3_1.ListObjectsCommand(getObjectParams);
            const { Contents } = await s3_1.s3ClientPersonal.send(command);
            if (Contents.length > 0) {
                for (const obj of Contents) {
                    const parts = obj.Key.split('/');
                    if (parts[1] === blogPost.blogId) {
                        matchingObjects.push(`https://susshi-images.s3.us-east-1.amazonaws.com/${obj.Key}`);
                        console.log('matchingObjects', matchingObjects);
                    }
                }
                let paragraphIndex = 1;
                for (const img of matchingObjects) {
                    console.log('img', img);
                    blogPost.paragraphs.map((item) => {
                        if (item.hasImage === true && item.url === '' && paragraphIndex < matchingObjects.length) {
                            item.url = matchingObjects[paragraphIndex];
                            paragraphIndex++;
                        }
                    });
                }
            }
            console.log('blogpost', blogPost);
            res.status(200).json({ blogPost, matchingObjects });
        }
        else if (matchingObjects.length === 0) {
            res.status(200).json({ blogPost });
        }
        else {
            res.status(404).json({ message: "No blog posts found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch blog post" });
    }
};
exports.getBlogPostById = getBlogPostById;
const updateBlogPost = async (req, res) => {
    try {
        const updatedBlogPost = await BlogPost_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlogPost) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        res.status(200).json(updatedBlogPost);
    }
    catch (error) {
        res.status(500).json({ error: "Could not update blog post" });
    }
};
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = async (req, res) => {
    try {
        const deletedBlogPost = await BlogPost_1.default.findByIdAndDelete(req.params.id);
        if (!deletedBlogPost) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Could not delete blog post" });
    }
};
exports.deleteBlogPost = deleteBlogPost;
//# sourceMappingURL=blogController.js.map