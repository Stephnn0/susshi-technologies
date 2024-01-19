// import axios from 'axios';
// import { useContext } from 'react';
// import { AuthContext, TodoContextType } from '../context/AuthProvider';

// //PRODUCTION
// // const BASE_URL = 'https://biolab.lol';
// //TESTING
// const AUTH_URL = 'http://localhost:3001';

// export default axios.create({
//     baseURL: AUTH_URL
// });


// // AUTH API OR LOCALHOST 3001
// export const axiosPrivate = axios.create({
    
//     baseURL: AUTH_URL,
//     headers: { 'Content-Type': 'application/json',
//     },
//     withCredentials: true,

    

// });

// axiosPrivate.interceptors.request.use(
//     async (config) => {
//         const { accessToken } = useContext(AuthContext) as TodoContextType
//       if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken.accessToken}`;
        
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

  
  
  
  
  
  
