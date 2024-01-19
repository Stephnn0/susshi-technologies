import './registerpage.css'
import { Link, useNavigate } from 'react-router-dom';
import { SetStateAction, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { AxiosError } from 'axios';
import axios from 'axios';
import APIEndpoints from '../../../utilities/urls';

interface ErrorResponse {
  message: string;
}

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false); 
  const [showPopup, setShowPopup] = useState(false); //false
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [errMsg, setErrMsg] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<string>('');
  const [lastnameError, setLastNameError] = useState<string>('');


  const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setFirstName(event.target.value);
    setNameError('');
  };

  const handleLastNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setLastName(event.target.value);
    setLastNameError('');
  };

  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPwd(event.target.value);
    setPasswordError('');
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    const nameValue = nameRef.current?.value;
    const lastNameValue = lastnameRef.current?.value;

    if (!emailValue) {
      setEmailError('Email is required');
    }

    if (!passwordValue) {
      setPasswordError('Password is required');
    }
    if (!nameValue) {
      setNameError('Email is required');
    }

    if (!lastNameValue) {
      setLastNameError('Password is required');
    }

    if (emailError || passwordError || nameError || lastnameError ) {
      return;
    }

    try {
      const response = await axios.post(`${APIEndpoints.auth}/register`,
      JSON.stringify({ email, lastName, firstName ,pwd }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    setShowPopup(true);
    setIsSending(false);
    setFirstName('')
    setLastName('')
    setEmail('')
    setPwd('')

    if(response.status === 201){
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      navigate('/login');
    }
    console.log('user created')


    } catch(err){
      const axiosError = err as AxiosError<ErrorResponse>;
      if (!axiosError.response) {
        setErrMsg('ERROR: No Server Response');
      }
      else if (axiosError.response.status === 400) {
           if (axiosError.response.data.message === 'Invalid email address.'){
            setErrMsg('ERROR: Invalid email address.');
        } else if (axiosError.response.data.message === 'Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.') {
          setErrMsg('Password must be at least 8 characters long, contain numbers and special characters.');
        } else {
          setErrMsg('ERROR: Unknown 400 Error');
        }
      } else if (axiosError.response?.status === 409) {
        setErrMsg('ERROR: Email alreday associated with an account');

      } else if (axiosError.response?.status === 401) {
        setErrMsg('ERROR: unauthorized!');
      }
       else if (axiosError.response?.status === 500) {
        setErrMsg('ERROR: Server Error');
      } else {
        setErrMsg('ERROR: Unknown Error');
      }
    } finally {
      setIsSending(false);
    }
   
  }

  
  return (
    <section>
      
        <div className="register-section-main">
        <form onSubmit={handleSubmit}>
        <div className="register-cart">

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1 style={{margin: 10}}>Register</h1>
        {showPopup && (
        <div className="popup">
          <p>Account created successfully!</p>
        </div>
      )}
        <div className="error-message">{emailError}</div>
        <input
           type="email"
           ref={emailRef}
           id="email"
           placeholder='Email'
           value={email}
           onChange={handleEmailChange}
           />
     <div className="error-message">{nameError}</div>
        <input
                    id="firstName"
                    ref={nameRef}
                    placeholder='First Name'
                    value={firstName}
                    onChange={handleNameChange}

                />
       <div className="error-message">{lastnameError}</div>

        <input
                    id="lastName"
                    ref={lastnameRef}
                    placeholder='Last Name'
                    value={lastName}
                    onChange={handleLastNameChange}
                />
             <div className="error-message">{passwordError}</div>
                 <input
                    onChange={handlePasswordChange}
                    ref={passwordRef}
                    value={pwd}
                    placeholder='Password'
                    type="password"
                    id="pwd"
                    className="login-input"
                    
                />
            <br/>

            {
              emailError || passwordError || nameError || lastnameError ? (
                <button disabled><h3>Register</h3></button>
                ): 
           isSending ? (
            <CircularProgress />
            ) : (
           <button><h3>Register</h3></button> 
           )}


        </div>
        </form>
        <div style={{margin: 10,}} className='go-to-login-div' >
        <span style={{margin: 10}}>Already have an account?</span>
        <Link to="/login">
        <span style={{margin: 10}}>Login</span>
        </Link>
        </div>

        </div>
    </section>
  )
}

export default RegisterScreen