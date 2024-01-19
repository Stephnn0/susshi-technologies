import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import "./contact-form.css"
import img1 from "../../assets/contact-us.png"
import CircularProgress from '@mui/material/CircularProgress';


export const ContactUs = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const [isSending, setIsSending] = useState<boolean>(false); 
    const [showPopup, setShowPopup] = useState(false); //false
    

    
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    setIsSending(true);

      emailjs.sendForm('service_xdb540l', 'template_nf5ucwd', form.current as unknown as string , 'DqNYxANfyrS45nhUB')
        .then((result) => {
            setShowPopup(true);
            console.log(result.text);
            setTimeout(() => {
              setShowPopup(false);
            }, 3000);
            if (form.current) {
              form.current.reset();
            }
        }, (error) => {
            console.log(error.text);
        }).finally(
          () => {
            setIsSending(false);
            setTimeout(() => {
              setShowPopup(false);
            }, 3000);
          }
        )
        console.log('sent')
    };
  
    return (
      <div className="contact-form-container">
        <div className='contact-form-left'>
          <div className='contact-form-left-inside'>
          <h1>Contact Us Today!</h1>
          <p>Get in touch with us today! We value your feedback and inquiries.
             If you have any questions, comments, or requests, please use our 
             convenient email form. Just click on the 'Contact Us' title, fill 
             in the required details, and let us know how we can assist you.
              Our team is committed to providing you with timely and personalized 
              responses, so don't hesitate to reach out. Your satisfaction is our
               top priority, and we're here to make your experience exceptional.</p>
          </div>
          <div className='contact-form-left-img'>
        <img alt='img' src={img1} />
      </div>
        </div>

      <form className="contact-form" ref={form as React.RefObject<HTMLFormElement>} onSubmit={sendEmail}>
        <h2>Enter you company contact information</h2>
        <h4>We'll be in touch soon</h4>
        <br/>
        <hr/>
        <label htmlFor="user_email">E-mail</label>
        <input type="email" id="user_email" name="user_email" required/>
        {/* <div className="error-message">{emailError}</div> */}

        <label htmlFor="user_name">Name</label>
        <input type="text" name="user_name" id="user_name" required/>

        <label htmlFor="user_name">Last Name</label>
        <input type="text" name="user_last_name" id="user_last_name" required/>

        <label htmlFor="user_last_name">Country</label>
        <input type="text" name="user_country" id="user_country" required/>

        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" />

        {
          isSending ? (
            <CircularProgress/>
          ) : (
            <input type="submit" value="Send" className="submit-button" />
          )}
                  {showPopup && (

          <h5 style={{color: "green", paddingTop: "20px"}}>Email sent successfully</h5>
      )}

      </form>
      </div>
    );
  };