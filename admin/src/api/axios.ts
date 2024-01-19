import axios from 'axios';
//PRODUCTION
const BASE_URL = 'https://biolab.lol';
//TESTING
// const BASE_URL = 'http://localhost:3001';


export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});