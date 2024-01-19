import { Link, useLocation } from "react-router-dom"
import Footer from "../../../components/Footer/Footer"
import './blogpage.css'
import {  useEffect, useState } from "react"
import axios from "axios"
import { format } from 'date-fns'; 
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import avatar from "../../../assets/avatar.jpg"
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import APIEndpoints from "../../../utilities/urls"
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Post, DoubleResponse } from "../../../types/types"


import LoadingScreen from "../../../components/LoadingPage/LoadingPage"
import { useLoading } from "../../../context/LoadingScreenContext"


const defaultPosts:Post[] = [];


const BlogPage = () => {
  const { showLoading, hideLoading, isLoading } = useLoading();

    const [response, setResponse] = useState<DoubleResponse | null>(null)
    const [posts, setPosts]: [Post[], (posts: Post[]) => void] = useState(defaultPosts)
    const [isLoadingg, setIsLoading] = useState(false);
    const catLocation = useLocation()
    const [lastPost, setLastPost] = useState<Post | null>(null);
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [category, setCat] = useState('');
    
    
    //remove 
    console.log(posts, url )
    
    //nested card
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
    const handleClick1 = () => {
      setOpen1(!open1);
    };
    const handleClick2 = () => {
      setOpen2(!open2);
    };



    const [page, setPage] = useState<number>(1);
    
    //remove copy
    // const [perPage, setPerPage] = useState(10);
    const [perPage] = useState(10);


    //
    
    //pagination settings
    const currentPage = page;
    const nextPageCount = response?.resultsNextPrevious.next.limit
    const previousPageCount = response?.resultsNextPrevious.previous.limit
    const currentPageCount = response?.blogsWithFirstImage.length
    const totalItems = (nextPageCount! + previousPageCount! + currentPageCount!)
    const totalPages = Math.ceil(totalItems / perPage);

 


    const handlePageChange = (event: any, newPage: number | undefined) => {
      //remove
      console.log(event)

      setPage(newPage as number);
    };


    

    useEffect(() => {
        const fetchData = async () => {
          showLoading()
          setIsLoading(true);
            try {
                const res = await axios.get(`${APIEndpoints.blog}`,
                { headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                  },
                  params: {
                    page: page, // Current page
                    perPage: perPage, // Items per page
                    category: category
                  },
                })
                setPosts(res.data)
                setResponse(res.data)
            } catch (err){
                console.log(err)
            } finally {
                setIsLoading(false);
                hideLoading()
            }
        };
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });

    },[ page, perPage, catLocation, category]);




    useEffect(() => {
        const fetchLastBlogPost = async () => {
          showLoading()
          setIsLoading(true);
          try {
            const response = await axios.get(`${APIEndpoints.blog}/first`); 
            const data = response.data;
            setLastPost(data.lastBlogPost);
            setUrl(data.url)
          } catch (error) {
            console.error('Error fetching last blog post:', error);
          } finally {
            setIsLoading(false);
            hideLoading()
          }
        };
    
        fetchLastBlogPost();
      }, []); 



  return (
    <>
    {
      isLoading 
          ? 
          <LoadingScreen/> :

    <section>  
       <div className="blog-section-main">
        <div className='menu-1'>
        <div className='menu-main-1'>
          <h4>Publications</h4>
          <br/>
          <List
      sx={{ 
        width: '100%',
       maxWidth: 360,
        bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filters
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Tech " />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <input 
               className="custom-radio-input"
               type="radio" name='category' value="programming" id='programming' onChange={e=> setCat(e.target.value)} />
            <label 
              className="custom-radio-label"
              htmlFor='programming'>programming</label>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <input 
               className="custom-radio-input"
               type="radio" name='category' value="cyber-security" id='cyber-security' onChange={e=> setCat(e.target.value)} />
            <label
            className="custom-radio-label" 
            htmlFor='cyber-security'>cyber security</label>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <input
             className="custom-radio-input"
             type="radio" name='category' value="machine-learning" id='machine-learning' onChange={e=> setCat(e.target.value)} />
            <label
            className="custom-radio-label"
             htmlFor='machine-learning'>machine learning</label>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <input 
               className="custom-radio-input"
                type="radio" name='category' value="networks" id='networks' onChange={e=> setCat(e.target.value)} />
            <label 
            className="custom-radio-label"
            htmlFor='networks'>networks</label>
          </ListItemButton>
        </List>
      </Collapse>



      <ListItemButton onClick={handleClick1}>
        {/* <ListItemIcon>
          <InboxIcon />
        </ListItemIcon> */}
        <ListItemText primary="Popular " />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <input
              className="custom-radio-input"
               type="radio" name='category' value="blockchain" id='blockchain' onChange={e=> setCat(e.target.value)} />
            <label 
            className="custom-radio-label"
            htmlFor='blockchain'>blockchain</label>
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <input 
            className="custom-radio-input"
            type="radio" name='category' value="math" id='math' onChange={e=> setCat(e.target.value)} />
            <label
            className="custom-radio-label"
             htmlFor='math'>math</label>
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <input 
            className="custom-radio-input"
            type="radio" name='category' value="physics" id='physics' onChange={e=> setCat(e.target.value)} />
            <label 
            className="custom-radio-label"
            htmlFor='physics'>physics</label>
          </ListItemButton>
        </List>
      </Collapse>


      <ListItemButton onClick={handleClick2}>
        <ListItemText primary="Special " />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <input 
            className="custom-radio-input"
            type="radio" name='category' value="theology" id='theology' onChange={e=> setCat(e.target.value)} />
            <label
            className="custom-radio-label"
             htmlFor='theology'>theology</label>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <input 
            className="custom-radio-input"
            type="radio" name='category' value="life-science" id='life-science' onChange={e=> setCat(e.target.value)} />
            <label 
            className="custom-radio-label"
            htmlFor='life-science'>life science</label>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <input 
            className="custom-radio-input"
            type="radio" name='category' value="chemestry" id='chemestry' onChange={e=> setCat(e.target.value)} />
            <label 
            className="custom-radio-label"
            htmlFor='chemestry'>chemestry</label>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <input 
            className="custom-radio-input"
            type="radio" name='category' value="biology" id='biology' onChange={e=> setCat(e.target.value)} />
            <label
            className="custom-radio-label"
             htmlFor='biology'>biology</label>
          </ListItemButton>
        </List>
      </Collapse>

      
    </List>

          <br/>
          <br/>
           <hr/>
           <br/>
          <h4>Popular Topics</h4>
          <br/>
          <Chip
             label={"Programming"}
              className="custom-chip"
             />
          <Chip 
             label={"Cyber Security"} 
             className="custom-chip"
        />
          <Chip 
             label={"Machine Learning"} 
             className="custom-chip"
           />
          <Chip 
             label={"Blockchain"} 
             className="custom-chip"

           />
          <Chip 
             label={"Systems"} 
             className="custom-chip"

          />
        </div>
        </div> 
        <div className="posts-only">
          <div className="last-post-empty-container-blog">
          <img src={lastPost?.awsUrl} alt="" className="spok-only"/>
          </div>
          <Link className="link" to={`/posts/${lastPost?._id}`}>
          <h1>{lastPost?.mainTitle}</h1>
          </Link> 


          <h3>{lastPost?.introDescription}</h3>

          <div className="top-content-post">
          {  lastPost?.readTime === undefined ? (
            // <div style={{
            //   position: "relative",
            //   width: "100%", 
            //   height: "100vh", 
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center", 
            //    }}>
             <CircularProgress />
            // </div>
            ) : (
          <Chip label={`${lastPost?.readTime} mins`} /> )}
          </div>
        </div>
    </div>
        <hr/>

        {/* <div>
        <h5>.</h5>
        <hr/>
        </div> */}

    <div className="parent-blog-second-sections">
      <div className="blog-section-2">
        { isLoadingg ? (
                <LinearProgress />

        ) : (
          <>
            <div className="posts">
            { response?.blogsWithFirstImage.map((post: Post) => (
            // {posts.map((post: Post) =>(
               <>
             <div className="post" key={post._id}>
                  <div className="content-1">
                    <div style={{display: "flex"}}>
                    <Avatar alt="Remy Sharp" src={avatar} style={{height: "34px", width: "34px"}} />
                    <h3>{post.author}</h3>
                    </div>


                    <Link className="link" to={`/posts/${post._id}`}>
                       <h1 className='hover-underline-animation-1'>{post.mainTitle}</h1>
                     </Link>
                       
                        <div style={{display: "flex"}}>
                        <h3>{post.introDescription}</h3>
                        </div>

                       <div className="top-content-post">
                         <Chip 
                          className="chips-mobile"
                          label={post.category} 
                          style={{
                             backgroundColor: "rgb(103, 226, 166)",

                             }}/>
                          <Chip 
                            className="chips-mobile"
                            label={`${post.readTime} mins`} />
                          <Chip 
                             className="chips-mobile"
                             label={format(new Date(post.date), 'dd MMM yyyy')} />
                        </div>
                  </div>
                    <div className="img-1">
                      <img src={post.awsUrl} alt="" className="spok"/>
                    </div>
              </div>
                <hr/>
                </>      
          ))}
        </div>
        <br/>
        
        <Stack spacing={2}>
      <Pagination
         count={totalPages} 
         page={currentPage}
         onChange={handlePageChange}
         shape="rounded"
          />
       </Stack>     
       <br/>

        </>
        )}
         </div>

         <div className="blog-section-2-right">
          <br/>
          <h4>Discover more of what matters to you</h4>

          <div className="chips">
          <br/>
          <br/>
          <Chip 
             className="custom-chip"
             label={'Data Science'} style={{margin: "5px"}}/>
          <Chip
              className="custom-chip" 
              label={'Technology'} style={{margin: "5px"}}/>
          <Chip 
              className="custom-chip"
              label={'Productivity'} style={{margin: "5px"}}/>
          <Chip 
              className="custom-chip"
              label={'Quantum'} style={{margin: "5px"}}/>
          <Chip 
              className="custom-chip"
              label={'Hacking'} style={{margin: "5px"}}/>
          <Chip 
              className="custom-chip"
              label={'Physics'} style={{margin: "5px"}}/>
          </div>
          <br/>
          <hr/>
          <br/>
          <h4>Looking for something else?</h4>

          <div className="chips">
          <br/>
          <br/>
          <Chip 
              className="custom-chip"
              label={'Help'} style={{margin: "5px"}}/>
          <Chip 
              className="custom-chip"
              label={'About'} style={{margin: "5px"}}/>
          <Chip 
              className="custom-chip"
              label={'Home'} style={{margin: "5px"}}/>
          <Chip
              className="custom-chip"
              label={'Privacy'} style={{margin: "5px"}}/>
          <Chip 
              className="custom-chip"
              label={'Terms'} style={{margin: "5px"}}/>
          <Chip
             className="custom-chip" 
             label={'Writers'} style={{margin: "5px"}}/>
          </div>
     


        </div>
      
     </div>

        <Footer/>
                                           
    </section>
}
    </>
  )
}

export default BlogPage