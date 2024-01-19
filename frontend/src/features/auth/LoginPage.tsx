import './loginpage.css'
import { Link, useNavigate } from 'react-router-dom';
import { SetStateAction, useContext, useRef, useState } from 'react';
import { AuthContext, TodoContextType } from '../../context/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { AxiosError } from 'axios';
import axios from 'axios';
import APIEndpoints from '../../utilities/urls';
import { useLoading } from './../../context/LoadingScreenContext';
import LoadingScreen from '../../components/LoadingPage/LoadingPage';


const LoginPage = () => {


  const { showLoading, hideLoading, isLoading } = useLoading();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [email, setUser] = useState('');
  const { setAuthData } = useContext(AuthContext) as TodoContextType
  const [isSending, setIsSending] = useState<boolean>(false); 
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [errMsg, setErrMsg] = useState('');
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');




  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setUser(event.target.value);
    setEmailError('');
  };



  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPwd(event.target.value);
    setPasswordError('');
  };




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true)
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (!emailValue) {
      setEmailError('Email is required');
    }
    
    if (!passwordValue) {
      setPasswordError('Password is required');
    }
    if (emailError || passwordError) {
      return;
    }
    showLoading(); 

    try {
      const response = await axios.post(`${APIEndpoints.auth}/login`,
        JSON.stringify({ email, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const accessToken: string | null = response?.data?.accessToken;

      setAuthData({ accessToken });
      setIsSending(false);
      setPwd('')
      setUser('')

      if(accessToken){
        navigate('/dashboard');
      }
      
    } catch (err) {
      const axiosError = err as AxiosError;
      if (!axiosError.response) {
        setErrMsg('ERROR: No Server Response');
      } else if (axiosError.response?.status === 400) {
        setErrMsg('ERROR: Missing Arguments');
      } else if (axiosError.response?.status === 401) {
        setErrMsg('ERROR: Wrong credentials, try again');
      }
       else if (axiosError.response?.status === 500) {
        setErrMsg('ERROR: Server Error');
      } else {
        setErrMsg('ERROR: Unknown Error');
      }
    } finally {
      setIsSending(false);
      hideLoading(); 

    }
  };

  
  return (
    <section>
      { 
      isLoading ?  
      
         <LoadingScreen/> :

        <div className="login-section-main">
        <div className="login-cart">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1 style={{margin: 10}}>Log in to Dashboard</h1>
          <form onSubmit={handleSubmit}>
              <div className='auth-input-div'>
              <div className="error-message">{emailError}</div>
              <input
                    ref={emailRef}
                    type="user"
                    id="user"
                    placeholder='Email'
                    className="login-input"
                    onChange={handleEmailChange}
                    value={email}
                />
             <div className="error-message">{passwordError}</div>
              <input
                    placeholder='Password'
                    type="password"
                    id="pwd"
                    className="login-input"
                    onChange={handlePasswordChange}
                    value={pwd}
                    ref={passwordRef}
                />
              </div>
          {emailError || passwordError ? (
           <button disabled>Sign In</button>
           ): isSending ? (
            <CircularProgress />
            ) : (
           <button>Sign In</button>
         )}     
        </form>
        </div>

        <div style={{margin: 10,}} className='create-account-div' >
          <span style={{margin: 10}}>Don't have an account?</span>
          <Link to="/register">
          <span style={{margin: 10}}>Create one now!</span>
          </Link>
        </div>
      </div> 
}
    </section>
  )
}

export default LoginPage