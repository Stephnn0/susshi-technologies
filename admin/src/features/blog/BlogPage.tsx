import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "./blog-page.css"
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


interface Paragraphs {
  topic: string;
  description: string;
  hasImage: string
}


const BlogPage = () => {


  const [paragraphs, setParagraphs] = useState<Paragraphs[]>([
    { topic: '', description: '', hasImage: 'false' },
  ]);

  const addParagraph = () => {
    const newParagraph = {
      topic: '',
      description: '',
      hasImage: 'false'
    };
    setParagraphs([...paragraphs, newParagraph]);
  };

  const removeParagraph = (index: number) => {
    const updatedBenefits = [...paragraphs];
    updatedBenefits.splice(index, 1);
    setParagraphs(updatedBenefits);
  };

  const updateParagraph = (index: number, property: keyof Paragraphs, value: string) => {
    const updatedParagraph = [...paragraphs];
    updatedParagraph[index][property] = value;
    setParagraphs(updatedParagraph);
  };



  const [introDescription, setIntroDescription] = useState('');
  const [readTime, setReadTime] = useState('');
  const [status, setStatus] = useState('');
  const [mainTitle, setMaintitle] = useState('');
  const [cat, setCat] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false); 
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);




  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      const filesArray: File[] = Array.from(files);
      setSelectedFiles(filesArray);
    }
  };




  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setIsSending(true);
    const formData = new FormData();  
    formData.append("mainTitle", mainTitle);
    formData.append("paragraphs", JSON.stringify(paragraphs));
    formData.append("author", "Stephano Tapia");
    formData.append("status", status);
    formData.append("readTime", readTime);
    formData.append("category", cat);
    formData.append("introDescription", introDescription);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }
      try {
        //PRODUCTION
        await axios.post('https://biolab.lol/api/blog', formData, {
        //TESTING
        // await axios.post('http://localhost:3000/api/blog', formData, {
            headers: {
                 'Content-Type': 'multipart/form-data'
             },
          });
          console.log("BLOG POSTED!");
          setIsSending(false);

    } catch(err){
        console.log(err)
    } finally {
      setIsSending(false);
    }
  }






    return (
      <section className="section-blog-post">
        <h1>Create a Blog Post</h1>
        <form onSubmit={handleClick}>
        {
           isSending ? (
            <CircularProgress />
            ) : (
        <button >Publish</button>
            )}
          <br/>
          <br/>
            <div className="content">
             <input value={mainTitle} type='text' placeholder='mainTitle' onChange={e=> setMaintitle(e.target.value)} />
             <input value={introDescription} type='text' placeholder='introDescription' onChange={e=> setIntroDescription(e.target.value)} />
             <input value={readTime} type='text' placeholder='readTime' onChange={e=> setReadTime(e.target.value)} />

            </div>
          <br/>
          <div 
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     backgroundColor: "white",
                     color: "black",
                     borderRadius: "10px",
                     border: "1px solid gray"
                     }}>
                  <h1 style={{padding: "8px"}}>Paragraphs</h1>
                  <button 
                    style={{
                        margin: "5px",
                        paddingBottom: "5px", 
                        backgroundColor: "#198773",
                        color: "white"
                      }}
                    type="button" 
                    onClick={addParagraph}>
                <AddIcon/>
                 </button>
                </div>

                { paragraphs.map((paragraph, index) => (
                <div className="editor-descriptions-benefits" key={index}>






      <h4>Has Image?</h4>
                <div style={{display: "flex", justifyContent: "space-between", padding: "10px"}}>
                 <h1 style={{
                        border: "2px solid white", 
                        color: "white",
                        backgroundColor: "#198773",
                        padding: "8px 18px 0 18px",
                        borderRadius: "7px"
                        }}>{index + 1}</h1>
                <input 
                  style={{width: "100%", marginLeft: "10px", marginRight: "10px"}}
                  type='text'
                  placeholder='optional paragraph topic...'
                  value={paragraph.topic}
                  onChange={(e) => updateParagraph(index, 'topic', e.target.value)}
                  />
                <input 
                  style={{width: "100%", marginLeft: "10px", marginRight: "10px"}}
                  type='text'
                  placeholder='true or false'
                  value={paragraph.hasImage}
                  onChange={(e) => updateParagraph(index, 'hasImage', e.target.value)}
                  />
                <button type="button" onClick={() => removeParagraph(index)}>
                <DeleteIcon/>
                 </button>
                </div>

                <ReactQuill 
                  className='editor-services-benefits' 
                  theme="snow"
                  value={paragraph.description} 
                  onChange={(value) => updateParagraph(index, 'description', value)} // Use value directly
                  />
                </div> 
                
                 ))}
              {/* -------------------------------------- */}
               <div className="item">
                        <h1>Category</h1>
                        <input type="radio" name='cat' value="programming" id='programming' onChange={e=> setCat(e.target.value)} />
                        <label htmlFor='programming'>programming</label>
                        <input type="radio" name='cat' value="cyber-security" id='cyber-security' onChange={e=> setCat(e.target.value)}/>
                        <label htmlFor='cyber-security'>cyber-security</label>
                        <input type="radio" name='cat' value="machine-learning" id='machine-learning' onChange={e=> setCat(e.target.value)}/>
                        <label htmlFor='machine-learning'>machine-learning</label>
                        <input type="radio" name='cat' value="networks" id='networks' onChange={e=> setCat(e.target.value)}/>
                        <label htmlFor='networks'>networks</label>
                        <input type="radio" name='cat' value="cloud-computing" id='cloud-computing' onChange={e=> setCat(e.target.value)} />
                        <label htmlFor='cloud-computing'>cloud-computing</label>
                        <input type="radio" name='cat' value="biology" id='biology' onChange={e=> setCat(e.target.value)}/>
                        <label htmlFor='biology'>biology</label>
                        <input type="radio" name='cat' value="chemestry" id='chemestry' onChange={e=> setCat(e.target.value)}/>
                        <label htmlFor='chemestry'>chemestry</label>
                        <input type="radio" name='cat' value="theology" id='theology' onChange={e=> setCat(e.target.value)}/>
                        <label htmlFor='theology'>theology</label>
                 </div>  
                 <div className="item">
                        <h1>Status</h1>
                        <input type="radio" name='status' value="published" id='published' onChange={e=> setStatus(e.target.value)} />
                        <label htmlFor='published'>published</label>
                        <input type="radio" name='status' value="draft" id='draft' onChange={e=> setStatus(e.target.value)}/>
                        <label htmlFor='draft'>draft</label>
                        <input type="radio" name='status' value="archived" id='archived' onChange={e=> setStatus(e.target.value)}/>
                        <label htmlFor='archived'>archived</label>

                 </div>

             {/* -------------------------------------- */}
              <input
               id="multiplefile"
                type="file"
                name="images"
                onChange={handleFileChange}
                 multiple />
               <label 
                 htmlFor='multiplefile'>
                 upload multiple files
               </label>
          {/* -------------------------------------- */}
               <div>
               <h3>Selected Files:</h3>
               <ul>
              {selectedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
          {/* {selectedFiles.length} */}
        </ul>
      </div>
           </form>
      </section>
    )
  }
  
  export default BlogPage