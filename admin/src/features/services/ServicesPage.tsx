import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./services-page.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios ,{ AxiosError } from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';

interface Benefit {
  topic: string;
  description: string;
}

interface UseCase {
  topic: string;
  description: string;
}

const ServicesPage = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([
    { topic: '', description: '' },
  ]);
  const [useCases, setUseCases] = useState<UseCase[]>([
    { topic: '', description: '' },
  ]);
  const [file, setFile] = useState<File | null>(null);

  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [overviewtopic, setOverviewtopic] = useState('');
  const [overviewDescription, setOverviewDescription] = useState('');
  const [solutionsDesc, setSolutionsDesc] = useState('');
  const [productDesc, setProductDesc] = useState('');

  const [title2, setTitle2] = useState('');
  const [title3, setTitle3] = useState('');

  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [errMsg, setErrMsg] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false); 
  const [showPopup, setShowPopup] = useState(false);


useEffect(() => {
  setErrMsg('');
}, [category])

useEffect(() => {
   setBenefits([{ topic: '', description: '' }]);
   setUseCases([{ topic: '', description: '' }]);
   setCategory('')
   setTopic('');
   setDescription('');

   setOverviewtopic('');
   setOverviewDescription('');

   setSolutionsDesc('');
   setProductDesc('');

}, [showPopup])

  //--------------------------------

  const addBenefit = () => {
    const newBenefit = {
      topic: '',
      description: '',
    };
    setBenefits([...benefits, newBenefit]);
  };

  const addUseCase = () => {
    const newUseCase = {
      topic: '',
      description: '',
    };
    setUseCases([...useCases, newUseCase]);
  };

  //--------------------------------


  const removeBenefit = (index: number) => {
    const updatedBenefits = [...benefits];
    updatedBenefits.splice(index, 1);
    setBenefits(updatedBenefits);
  };

  const removeUseCases = (index: number) => {
    const updatedUseCases = [...useCases];
    updatedUseCases.splice(index, 1);
    setUseCases(updatedUseCases);
  };

  //--------------------------------

  const updateBenefit = (index: number, property: keyof Benefit, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index][property] = value;
    setBenefits(updatedBenefits);
  };

  const updateUseCases = (index: number, property: keyof UseCase, value: string) => {
    const updatedUseCases = [...useCases];
    updatedUseCases[index][property] = value;
    setUseCases(updatedUseCases);
  };





  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setIsSending(true);
    const formData = new FormData();
    formData.append("category", category);
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("useCases", JSON.stringify(useCases));
    formData.append("topic", topic);
    formData.append("description", description);
    formData.append("overviewtopic", overviewtopic);
    formData.append("overviewDescription", overviewDescription);

    formData.append("overview2", solutionsDesc);
    formData.append("overview3", productDesc);
    formData.append("title2", title2);
    formData.append("title3", title3);
    formData.append("image", file!); 


    try {
        //PRODUCTION
         await axios.post('https://biolab.lol/api/services', formData, {
        //TESTING
          // await axios.post('http://localhost:3002/api/services', formData, {
         headers: {
           'Content-Type': 'multipart/form-data',
           'Access-Control-Allow-Origin': '*'

         },
         
          });
         console.log("SERVICE POSTED!")
         setShowPopup(true);
         setIsSending(false);

         setCategory('')
         setTopic('')
         setDescription('')

         setTimeout(() => {
          setShowPopup(false);
        }, 3000);

    } catch(err){
      const axiosError = err as AxiosError;
      if (!axiosError.response) {
        setErrMsg('ERROR: No Server Response');
    } else if (axiosError.response?.status === 400) {
        setErrMsg('ERROR: Missing Arguments');
    } else if (axiosError.response?.status === 500) {
        setErrMsg('ERROR: Server Error');
    } else {
        setErrMsg('ERROR: Unknown Error');
    }
    errRef.current?.focus();
    setIsSending(false);
    }

  }



  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value); 
  };




    return (
      <section className="services-section">
      {showPopup && (
        <div className="popup">
          <p>Form submitted successfully!</p>
        </div>
      )}
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleClick}>
        <div className="top-section-services">
        <h1>Create a Service</h1>
        {
           isSending ? (
            <CircularProgress />
            ) : (
         <button type="submit"><PublishIcon/></button>

       ) }
        </div>
        <div className="editor-descriptions">
                <input 
                  type='text' 
                  placeholder='Topic...' 
                  value={topic} 
                  onChange={e=> setTopic(e.target.value)} 
                  required
                    />
                    <br/>
                    <br/>
                <textarea
                 onChange={handleDescriptionChange}
                 value={description} 
                 placeholder="Description..."
                 className="custom-square-editor"
                 />
                {/* <ReactQuill 
                className='editor-services'
                 theme="snow"
                  value={description} 
                  onChange={setDescription} /> */}
                </div>  
                <div 
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     backgroundColor: "white",
                     color: "black",
                     borderRadius: "10px",
                     border: "1px solid gray"
                     }}>
                  <h1>CATEGORY</h1>
                </div>

                <div className="service-category-container">
                        <input type="radio" name='category' value="automation" id='automation' onChange={e=> setCategory(e.target.value)}/>
                        <label htmlFor='automation'>automation</label>

                        <input type="radio" name='category' value="industry" id='industry' onChange={e=> setCategory(e.target.value)}/>
                        <label htmlFor='industry'>industry</label>

                        <input type="radio" name='category' value="security" id='security' onChange={e=> setCategory(e.target.value)}/>
                        <label htmlFor='security'>security</label>

                        <input type="radio" name='category' value="ai" id='ai' onChange={e=> setCategory(e.target.value)} />
                        <label htmlFor='ai'>ai</label>

                        <input type="radio" name='category' value="analytics" id='analytics' onChange={e=> setCategory(e.target.value)} />
                        <label htmlFor='analytics'>analytics</label>

                        <input type="radio" name='category' value="sustainability" id='sustainability' onChange={e=> setCategory(e.target.value)}/>
                        <label htmlFor='sustainability'>sustainability</label>
                        
                        <input type="radio" name='category' value="infrastructure" id='infrastructure' onChange={e=> setCategory(e.target.value)} />
                        <label htmlFor='infrastructure'>infrastructure</label>

                        <input type="radio" name='category' value="databases" id='databases' onChange={e=> setCategory(e.target.value)} />
                        <label htmlFor='databases'>databases</label>

                        <input type="radio" name='category' value="servers" id='servers' onChange={e=> setCategory(e.target.value)}/>
                        <label htmlFor='servers'>servers</label>

                        <input type="radio" name='category' value="devops" id='devops' onChange={e=> setCategory(e.target.value)}/>
                        <label htmlFor='devops'>devops</label>
                        
                        <input type="radio" name='category' value="quantum" id='quantum' onChange={e=> setCategory(e.target.value)}/>
                        <label htmlFor='quantum'>quantum</label>

                        <input type="radio" name='category' value="blockchain" id='blockchain' onChange={e=> setCategory(e.target.value)}/>
                        <label htmlFor='blockchain'>blockchain</label>
                    </div>  
                <br/>
                <div 
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     backgroundColor: "white",
                     color: "black",
                     borderRadius: "10px",
                     border: "1px solid gray"
                     }}>
                  <h1>OVERVIEW</h1>
                </div>
                <div className="editor-descriptions">
                <input type='text' placeholder='overview topic' value={overviewtopic} onChange={e=> setOverviewtopic(e.target.value)}   />
                <br/>
                <br/>
                <ReactQuill className='editor-services' theme="snow" value={overviewDescription} onChange={setOverviewDescription} />
                </div> 
{/* ----------------------------------BENEFITS----------------------------------------- */}
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
                  <h1 style={{padding: "8px"}}>Benefits</h1>
                  <button 
                    style={{
                        margin: "5px",
                        paddingBottom: "5px", 
                        backgroundColor: "#198773",
                        color: "white"
                      }}
                    type="button" 
                    onClick={addBenefit}>
                <AddIcon/>
                 </button>
                </div>
                 { benefits.map((benefit, index) => (
                <div className="editor-descriptions-benefits" key={index}>

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
                  placeholder='benefits topic'
                  value={benefit.topic}
                  onChange={(e) => updateBenefit(index, 'topic', e.target.value)}
                  />
                <button type="button" onClick={() => removeBenefit(index)}>
                <DeleteIcon/>
                 </button>
                </div>


                <ReactQuill 
                  className='editor-services-benefits' 
                  theme="snow"
                  value={benefit.description} 
                  onChange={(value) => updateBenefit(index, 'description', value)} // Use value directly
                  />
                </div> 
                
                 ))}
{/* --------------------------------------USE CASES------------------------------------------- */}
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
                  <h1 style={{padding: "8px"}}>USE CASES</h1>
                  <button 
                    style={{
                        margin: "5px",
                        paddingBottom: "5px", 
                        backgroundColor: "#198773",
                        color: "white"
                      }}
                    type="button" 
                    onClick={addUseCase}>
                <AddIcon/>
                 </button>
                </div>

                 { useCases.map((useCase, index) => (
                <div className="editor-descriptions-benefits" key={index}>
        
                <input 
                  type='text' 
                  placeholder='use cases topic'
                  value={useCase.topic}
                  onChange={(e) => updateUseCases(index, 'topic', e.target.value)}
                  />
               <button type="button" onClick={() => removeUseCases(index)}>
                 <DeleteIcon/>
                 </button>

                <ReactQuill 
                  className='editor-services-benefits' 
                  theme="snow"
                  value={useCase.description} 
                  onChange={(value) => updateUseCases(index, 'description', value)} // Use value directly
                  />
                </div> 
                ))}
                  <br/>
{/* ------------------------------------------------------------------------------------ */}
                 <div 
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     backgroundColor: "white",
                     color: "black",
                     borderRadius: "10px",
                     border: "1px solid gray"
                     }}>
                  <h1>OVERVIEW 2</h1>
                </div>
                <div className="editor-descriptions">
                <input type="text" value={title2} onChange={(e) => setTitle2(e.target.value)} placeholder="title"/>
                <br/>
                <ReactQuill className='editor-services' theme="snow"  value={solutionsDesc} onChange={setSolutionsDesc} />
                </div> 
                <div 
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     backgroundColor: "white",
                     color: "black",
                     borderRadius: "10px",
                     border: "1px solid gray"
                     }}>
                  <h1>OVERVIEW 3</h1>
                </div>
                <div className="editor-descriptions">
                  <input type="text" value={title3} onChange={e => setTitle3(e.target.value)} placeholder="title"/>
                  <br/>
                <ReactQuill className='editor-services' theme="snow" value={productDesc} onChange={setProductDesc}/>
                </div>  

                <div>
                  <input style={{display: 'none', cursor: "pointer"}}
                   type='file'
                    id='file' 
                    name="image"
                    accept="image/*"
                     onChange={e => setFile(e.target.files![0])}  />
                   <label
                   htmlFor='file' 
                   style={{
                      cursor: "pointer",
                      border: "1px solid white",
                      padding: "10px",
                      borderRadius: "20px",
                      backgroundColor: "white",
                      color: "black"
                      }}>Image</label>
            
                </div>
                <div>
                <br/>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                {file && <img src={URL.createObjectURL(file)} alt="Selected" style={{height: "400px", borderRadius: "20px"}} />}
                <br/>
                </div>

                </div>


        </form>
      </section>
    )
  }
  
  export default ServicesPage