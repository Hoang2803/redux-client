import axios from "axios";

const request = axios.create({
  baseURL: "https://redux-server-nine.vercel.app/",
});

export default request;
