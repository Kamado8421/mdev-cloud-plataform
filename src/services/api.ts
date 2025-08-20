import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST || 'http://192.168.1.36:8000', // pega do .env
  headers: {
    Authorization: process.env.NEXT_PUBLIC_SECRET_KEY || "", // envia no header
  },
});

export default api; 
