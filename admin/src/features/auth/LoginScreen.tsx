import './login-screen.css'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useContext, useState } from 'react';
import { AuthContext, TodoContextType } from '../../context/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [user, setUser] = useState('');
  const { setAuthData } = useContext(AuthContext) as TodoContextType
  const [isSending, setIsSending] = useState<boolean>(false); 


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true)
    try {
      const response = await axios.post('/api/admin/login',
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const accessToken: string | null = response?.data?.accessToken;

      setAuthData({
        accessToken,
      });

      setIsSending(false);

      if(accessToken!){
        navigate('/admin');
      }
      
    } catch (err) {
      console.log(err);
    } finally {
      setIsSending(false);

    }
  };



  return (
    <section>
        <div className="login-section-main">
        <div className="login-cart">
        <h1 className="login-header">ADMIN</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="user" className="login-label">Username:</label>
        <input
                    type="user"
                    id="user"
                    placeholder='username'
                    className="login-input"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
        <label htmlFor="pwd" className="login-label">
          Password:
        </label>
                 <input
                    placeholder='password'
                    type="password"
                    id="pwd"
                    className="login-input"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
          
          {
           isSending ? (
            <CircularProgress />
            ) : (
          <button className="login-button">Sign In</button>
          )}     
        </form>
        </div>
        </div>
    </section>
  )
}

export default LoginScreen