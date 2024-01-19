import { useContext, useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import "./profile-screen.css"
import EditField from "../../../components/editfield/EditField";
import avatar from "../../../assets/avatar.png"
import axios from "axios";
import { AuthContext, TodoContextType } from "../../../context/AuthProvider";
import { User } from "../../../types/types";
import APIEndpoints from "../../../utilities/urls";
import { useIdFromToken } from "../../../hooks/GetIdFromToken";

import CircularProgress from '@mui/material/CircularProgress';



const ProfileScreen = () => {
  const [user, setUser]: [User, (service: User) => void] = 
  useState<User>({} as User)
  const [file, setFile] = useState<File | null>(null);
  const { accessToken } = useContext(AuthContext) as TodoContextType
  const id = useIdFromToken()
  const [isLoading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); //false



//update profile pic
  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData();
    formData.append("image", file!); 
    formData.append("userId", id as string); 
    try {
      await axios.put(`${APIEndpoints.auth}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:`Bearer ${accessToken.accessToken}`
        },
        withCredentials: true,        
         });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      setFile(null)

    } catch(Err){
      console.log(Err)
    } finally {
      setLoading(false);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      setFile(null)
    }
  }




//get user data
  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`${APIEndpoints.auth}/profile`, {
          params: {
            userId: id, 
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization:`Bearer ${accessToken.accessToken}`
  
          },
          withCredentials: true,  
        });
        setUser(response.data)

      } catch(err){
        console.log(err)
      }
    }
    fetchProfilePic()
  })



    return (
      <>
      <section className="profile-screen-main-sec">
        <div className="xxx">
        <h2 style={{padding: "20px"}}>My Profile:</h2>
        <hr/>
        </div>

        {showPopup && (

<h5 style={{color: "green", padding: "20px"}}>Profile image updated successfuly!</h5>
)} 

        <div className="profile-screen-main-sec-inside">
          <div>
            <h3>My Basic information</h3>
          </div>
         
 <div className="container-circle-img">
             <div className="profile-img-container">
              {
                file ? 
                <img src={URL.createObjectURL(file)} alt="Selected"/> 
                : <img src={avatar}/>
              }
            </div>

            <input style={{display: 'none', cursor: "pointer"}}
                   type='file'
                    id='file' 
                    name="image"
                    accept="image/*"
                     onChange={e => setFile(e.target.files![0])}  />
                   <label
                   htmlFor='file' 
                   className="label-img-change-prof"
                   style={{
                      cursor: "pointer",
                      border: "1px solid white",
                      padding: "10px",
                      borderRadius: "20px",
                      backgroundColor: "white",
                      color: "rgb(24, 114, 187)"
                      }}>Change profile image</label>
            {
                file && 
              <span
              className='hovverble-edit'
              style={{
                color: "rgb(24, 114, 187)",
                cursor: "pointer"
              }}
              onClick={handleClick}>
                {
                  isLoading ? <CircularProgress/> : <h5>submit</h5>

                }
                </span>

              }
           </div>
           <EditField main={"Email"} field={user.email} />
           <EditField main={"Password"} field={"********"} />
           <hr/>
           {/* <h3>Contact Information</h3> */}
           <EditField main={"Name"} field={user.firstName} />
           <EditField main={"Last Name"} field={user.lastName} />
           <EditField main={"Phone"} field={user.phoneNumber} />
        </div>


        <div className="above-container-prof">
          <div >
            <h5>Personal info and options to manage
           it. You can make some of this info, 
           like your contact details, visible to 
           others so they can reach you easily. 
           You can also see a summary of your profiles.</h5>

          </div>
          <div>

          </div>
        </div>

      </section>
      <Footer/>
      </>
    )
  }
  
  export default ProfileScreen


