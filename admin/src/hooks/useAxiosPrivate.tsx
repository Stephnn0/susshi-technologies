// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({});
//     // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);


//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;



// import { useContext } from "react";

// const useAuth = () => {
//     return useContext(AuthContext);
// }

// export default useAuth;


// const Login = () => {
//     const { setAuth } = useAuth();

//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     const userRef = useRef();
//     const errRef = useRef();

//     const [user, resetUser, userAttribs] = useInput('user', '')
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const [check, toggleCheck] = useToggle('persist', false);


//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(LOGIN_URL,
//                 JSON.stringify({ user, pwd }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             console.log(JSON.stringify(response?.data));
//             //console.log(JSON.stringify(response));
//             const accessToken = response?.data?.accessToken;
//             // const roles = response?.data?.roles;
//             setAuth({ user, accessToken });
//             resetUser();
//             setPwd('');
//             navigate(from, { replace: true });
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 400) {
//                 setErrMsg('Missing Username or Password');
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login Failed');
//             }
//             errRef.current.focus();
//         }
//     }

//     // const togglePersist = () => {
//     //     setPersist(prev => !prev);
//     // }

//     // useEffect(() => {
//     //     localStorage.setItem("persist", persist);
//     // }, [persist])

//     return (

//         <section>
//             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//             <h1>Sign In</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     ref={userRef}
//                     autoComplete="off"
//                     {...userAttribs}
//                     value={user}
//                     required 
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     onChange={(e) => setPwd(e.target.value)}
//                     value={pwd}
//                     required
//                 />
//                 <button>Sign In</button>
//                 <div className="persistCheck">
//                     <input
//                         type="checkbox"
//                         id="persist"
//                         onChange={toggleCheck}
//                         checked={check}
//                     />
//                     <label htmlFor="persist">Trust This Device</label>
//                 </div>
//             </form>
//             <p>
//                 Need an Account?<br />
//                 <span className="line">
//                     <Link to="/register">Sign Up</Link>
//                 </span>
//             </p>
//         </section>

//     )
// }

// export default Login







