import { useContext, useEffect, useState } from "react";
import { AuthContext, TodoContextType } from "../../../context/AuthProvider";
import axios from "axios";
import "./dashboard.css"
import Footer from "../../../components/Footer/Footer";
import avatar from "../../../assets/avatar.png"
import { User } from "../../../types/types";
import APIEndpoints from "../../../utilities/urls";
import { useIdFromToken } from "../../../hooks/GetIdFromToken";

import orderlogo from "../../../assets/logos/order-logo.png"
import proflogo from "../../../assets/logos/prof-logo.png"
import bloglogo from "../../../assets/logos/blog-logo.png"
import servicelogo from "../../../assets/logos/service-logo.png"
import { Link } from "react-router-dom";


const DashboardPage = () => {
  const [user, setUser]: [User, (service: User) => void] = useState<User>({} as User)
  const id = useIdFromToken()
  const { accessToken } = useContext(AuthContext) as TodoContextType
console.log(user, 'userrrr')


  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`${APIEndpoints.auth}/profile`, {

          params: {
            userId: id, 
          },
          headers: {
            'Content-Type': 'application/json',
             Authorization:`Bearer ${accessToken.accessToken}`

          },
          withCredentials: true,
        },
        );
        setUser(response.data)

      } catch(err){
        console.log(err)
      }
    }
    fetchProfilePic()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [accessToken.accessToken, id])


  return (
    <>

     <section className="dashboard-main-div-parent">

     <div className="xxxx">
        <h2 style={{padding: "20px"}}>My Dashboard:</h2>
        <hr/>
        </div>


<div className="dashboard-main-div">
        <div className="dashboard-img-container">
          
          { user.profilePicAWSURL  ?           
<div 
style={{
  backgroundColor: "rgb(186, 179, 179)",
  margin: "12px",
  height: "98px",
  width: "100px",
  borderRadius: "50px",
  cursor: "pointer"
          }}>

<img src={user.profilePicAWSURL}  
  style={{
  width: "100%",
  height: "100%",
  borderRadius: "50px"
}}/>
</div>
:
<div 
style={{
  backgroundColor: "rgb(186, 179, 179)",
  margin: "12px",
  height: "98px",
  width: "100px",
  borderRadius: "50px",
  cursor: "pointer"
          }}>
<img src={avatar}  
  style={{
  width: "100%",
  height: "100%",
  borderRadius: "50px"
}}/>
</div>
    
     }


        </div>
        <div className="dashboard-container-name">
           <h2>Welcome, {user.firstName} {user.lastName}</h2>
           <span>Manage your info, privacy, and security to make Susshi work better for you. Learn more</span>
        </div>
        <div className="dashboard-containers-widget">
          <div className="shortcut-to-orders-div">
            <div>
              <h3>View your Orders</h3>
              <p>"Great news! You can now easily access and review your recent orders with just a click. </p>
                 <Link to="/orders">

                 <h5 className="clickable-btn-dash">View orders</h5>
                 </Link>
            </div>
            
            <img src={orderlogo} style={{
              height: "100px",
              width: "100px"
            }}/>

          </div>

          <div className="shorcut-to-edit-div">
          <div>
              <h3>Update my Profile</h3>
              <p>"Your profile, your way! We believe in keeping your information up-to-date and reflecting the real you.</p>
                 <Link to="/profile">
                 <h5 className="clickable-btn-dash">View profile</h5>
                 </Link>
            </div>
            <img src={proflogo} style={{
              height: "100px",
              width: "100px"
            }}/>

          </div>

        </div>
        <div className="third-dashboard-div">
          <div>
         
          <h3>Read our Blog</h3>
          <h5>Stay informed and inspired with our latest blog posts! We offer a treasure trove of articles, insights, and stories that you won't want to miss. Click here to dive into our blog and discover a world of knowledge, tips, and captivating content. </h5>
          <Link to="/blog">
          <h5 className="clickable-btn-dash">View blog</h5>
          </Link>
          </div>
          <img src={bloglogo} style={{
              height: "100px",
              width: "100px"
            }}/>

        </div>

        <div className="forth-dashboard-div">
          <div>
          <h3>Explore our top Services</h3>
          <h5>Unlock a world of possibilities with our top services! We've curated a selection of our finest offerings to cater to your needs. Click here to explore our top services and discover how we can make your life easier, more efficient, and enjoyable. From cutting-edge solutions to personalized experiences, we have something special in store just for you. Your journey begins when you explore our top services today!</h5>
          <Link to="/services">

          <h5 className="clickable-btn-dash">View services</h5>
          </Link>
          </div>
          <img src={servicelogo} style={{
              height: "100px",
              width: "100px"
            }}/>
        </div>

        <div className="fifth-dashboard-div">
          <h5>
          Have questions or need more information? We're here to help! Our dedicated team is ready to assist you with any inquiries you may have. Feel free to reach out to us for personalized assistance, detailed information, or any specific needs you may have.
            </h5>
        </div>

      </div>
    </section>

    <Footer/> 
          
    </>
  )
}

export default DashboardPage