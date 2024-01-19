import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DOMPurify from 'dompurify';
import Footer from "../../../components/Footer/Footer";
import CircularProgress from '@mui/material/CircularProgress';
import "./single-service.css"
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WhyusComponent from "../../../components/whyus/whyus";
import APIEndpoints from "../../../utilities/urls";
import { Service } from "../../../types/types";


function renderHTML(html: string) {
    const sanitizedHTML = DOMPurify.sanitize(html);
    return { __html: sanitizedHTML };
  }


  
const SingleServicePage = () => {
  const [service, setService]: [Service, (service: Service) => void] = useState<Service>({} as Service)

  const location = useLocation()
  const category = location.pathname.split("/")[2]
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const { increaseCartQuantity } = useShoppingCart()
  




  useEffect(() => {
    const fetchServicesByCategory = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${APIEndpoints.services}/bycategory`, {
          params: {
            category: category, 
          },
        });
        setService(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchServicesByCategory();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(false)

  }, [category]); 


  
  
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const benefitsRef = useRef<HTMLDivElement | null>(null);
    const usecasesRef = useRef<HTMLDivElement | null>(null);
    const solutionsRef = useRef<HTMLDivElement | null>(null);
    const resourcesRef = useRef<HTMLDivElement | null>(null);


    const scrollToSection = () => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const scrollToBenefits = () => {
      if (benefitsRef.current) {
        benefitsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };


  return (
    <>
           {
           isLoading ? (
            <CircularProgress />
            ) : (
    <section>
      {
           service.imgUrl === '' ? (
            <CircularProgress />
            ) : (
      <div className="single-service-top-img">
      <img src={service.imgUrl}/>
      </div>
      )}
      
      <div className="single-service-top-container-main">
      <div className="single-service-top-container">
       <h1>{service.topic}</h1>
       <div
        className="single-service-top-container-danger"
        dangerouslySetInnerHTML={renderHTML(service.description)}>
       </div>
      </div>
      

      <div className="single-service-top-container-right">
      <button>Book a meeting</button>
        <div 
         onClick={() => increaseCartQuantity(service.serviceId)}
         className="single-service-top-container-right-icon">
          <AddShoppingCartIcon/>
        </div>
      </div>
      </div>

      <hr/>
      <div className="main-section-single-service-blog">

        <div className="main-section-single-service-blog-left">
          <div className="main-section-single-service-blog-left-inside">
          <div className="overview-section" onClick={scrollToSection}>
            <h4 id="scrollButton">Overview</h4>
          </div>
          <div className="overview-section" onClick={scrollToBenefits}>
          <h4>Benefits</h4>
          </div>
          <div className="overview-section">
          <h4>Usecases</h4>
          </div>
          <div className="overview-section">
          <h4>Solution</h4>
          </div>
          <div className="overview-section">
          <h4>Resources</h4>
          </div>
          <div className="overview-section">
          <h4>Why us?</h4>
          </div>
          </div>

        </div>

        <div className="main-section-single-service-blog-right">

          <div className="overview-service-parent-container" id="sectionToScroll" ref={sectionRef}>

            <h2>{service.overviewtopic}</h2>
            <div dangerouslySetInnerHTML={renderHTML(service.overviewDescription)}></div>
          </div>
          <hr/>
          <h2 className="extra-title-single-service">Benefits</h2>

      {
      service.benefits === undefined ? (
            <CircularProgress />
            ) : (
      <div className="benefits-service-parent-container" ref={benefitsRef}>
      {service.benefits.map((benefit) =>(
        <div key={benefit._id} className="benefits-service-parent-container-single">
          {/* <LoyaltyIcon/> */}
          <h3>{benefit.topic}</h3>
          <br/>
          <div dangerouslySetInnerHTML={renderHTML(benefit.description)}></div>
        </div>

            ))}
      </div> 
      )}


      <hr/>

      <h2 className="extra-title-single-service">Use cases</h2>

      {service.useCases === undefined ? (
            <CircularProgress />
            ) : (
      <div className="usecases-service-parent-container" ref={usecasesRef}>
      {service.useCases.map((usecase) =>(
        <div key={usecase._id} className="usecases-service-parent-container-single">
          {/* <ConstructionIcon/> */}
          <h3>{usecase.topic}</h3>
          <br/>
          <div dangerouslySetInnerHTML={renderHTML(usecase.description)}></div>
        </div>
            ))}
      </div>
            )}


      <hr/>

      <div className="solutions-service-parent-container" ref={solutionsRef}>
        <h2>{service.title2}</h2>
        <div dangerouslySetInnerHTML={renderHTML(service.overview2)}></div>
      </div>

      <hr/>

      <div className="resources-service-parent-container" ref={resourcesRef}>
      <h2>{service.title3}</h2>
      <div dangerouslySetInnerHTML={renderHTML(service.overview2)}></div>
      </div>

      <div className="resources-service-parent-container">
      <h2>Affordable Business IT Services Miami</h2>
      <WhyusComponent/>
      </div>
    </div>
  </div>

    </section> 
    )}
    <Footer/> 
    </>
  )



}

export default SingleServicePage