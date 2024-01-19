import './singlepage.css'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../../components/Footer/Footer';
import Chip from '@mui/material/Chip';
import IosShareIcon from '@mui/icons-material/IosShare';
import CircularProgress from '@mui/material/CircularProgress';
import DOMPurify from 'dompurify';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import avatar from "../../../assets/db.png"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { format } from 'date-fns';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AppsIcon from '@mui/icons-material/Apps';
import { Post } from '../../../types/types';
import APIEndpoints from '../../../utilities/urls';

function renderHTML(html: string) {
    const sanitizedHTML = DOMPurify.sanitize(html);
    return { __html: sanitizedHTML };
  }



const SinglePage = () => {
    const [post, setPost]: [Post, (post: Post) => void] = 
    useState<Post>({} as Post)
    const location = useLocation()
    const postId = location.pathname.split("/")[2]
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [images, setImages] = useState<string[]>([]);
    
    //remove
    console.log(url)

    //TESTING
    // console.log('location:', location)
    // console.log('post id:',postId)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${APIEndpoints.blog}/${postId}`,
                { headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                  },
                })
                setPost(res.data.blogPost)
                setImages(res.data.matchingObjects)
                setUrl(res.data.url)
            } catch (err){
                console.log(err)
            }
        };
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[postId])
    

    
  return (
    <section>
    <div className="single-page">
      <div className='menu'>
           <div className='menu-main'>
           <div style={{display: "flex", color: "gray"}}>
           <HomeIcon style={{marginLeft: "13px", marginRight:"3px"}}/>
                <p>Home</p>
                </div>
                <Chip 
                label={"Blog"} 
                className="custom-chip"

                />
                <br/>
                <br/>
                <hr/>
                <br/>
                <div style={{display: "flex", color: "gray"}}>
                <CalendarMonthIcon style={{marginLeft: "13px", marginRight:"3px"}}/>
                <p>Date</p>
                </div>
           {post.date === undefined ? (
            <CircularProgress />
            ) : (   
                <Chip 
             label={format(new Date(post.date), 'dd MMM yyyy')}
             className="custom-chip"

           /> )}
                <br/>
                <br/>
                <hr/>
                <br/>
                <div style={{display: "flex", color: "gray"}}>
                <AccessTimeIcon style={{marginLeft: "13px", marginRight:"3px"}}/>
                <p>Read Time</p>
                </div>
           {post.author === undefined ? (
            <CircularProgress />
            ) : (        
                <Chip 
             label={`${post.readTime} mins`}
             className="custom-chip"
            /> )}

                <br/>
                <br/>
                <hr/>
                <br/>
                <div style={{display: "flex", color: "gray"}}>
                <AppsIcon style={{marginLeft: "13px", marginRight:"3px"}}/>
                <p>Topics</p>
                </div>
              {post.category === undefined ? (
            <CircularProgress />
            ) : (
                <Chip 
             label={post.category}
             className="custom-chip"

              />   )}


                <br/>
                <br/>
                <hr/>
                <br/>
         
                </div>
            </div>




            <div className='content'>
                <br/>
                <br/>
                <hr/>
                <br/>

                {  post.mainTitle === undefined ? (
                <CircularProgress />
                ) : (  
                <h1>{post.mainTitle}</h1> )}
                <br/>
                <h3>{post.introDescription}</h3>

                <hr/>
                <div className='extra-info-sec-blog-single'>
                <div className='extra-info-sec-blog-single-inner'>
                <Avatar alt="Remy Sharp" src={avatar} style={{height: "34px", width: "34px"}} />
                <h5>Published by :</h5>
                <h5 style={{color: "black"}}>{post.author}</h5>
                </div>
                <div>
                <PlayCircleIcon style={{padding: "5px"}}/>
                <IosShareIcon style={{padding: "5px"}}/>
                <MoreHorizIcon style={{padding: "5px"}}/>
                </div>
                </div>
                <hr/>


                 <div className='image-position-zero-div'>
                <img src={images[0]} alt='' />
                </div>
                <br/>
                <br/>
                <br/>
                {
                  post.paragraphs === undefined ? (
               <LinearProgress />
               ) : (
               <div>
               {post.paragraphs.map((paragraph) => {
               return (
                <div key={paragraph._id} className='dangerous-paragraphs-blog-main'>
                  <h2>{paragraph.topic}</h2>
                   <div 
                     className='dangerous-paragraphs-blog'
                      dangerouslySetInnerHTML={renderHTML(paragraph.description)}>
                   </div>
                   {
                    paragraph.url !== '' && (
                      <div className='image-position-zero-div'>
                      <img src={paragraph.url} alt=''/>
                      </div>
                    )
                   }

                </div>
             )})}

          
          </div> 
          )}
        </div>
    </div>
        <br/>
        <br/>
        <br/>
        <Footer/>
    </section>
  )
}

export default SinglePage