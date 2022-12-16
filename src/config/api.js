import axios from "axios";

const request = axios.create({
  // baseURL: "https://redux-server-nine.vercel.app/",
  baseURL: "http://localhost:5000/",
});

export default request;
