import axios from "axios";

const client = axios.create({
  baseURL: "http://172.16.6.75:8080"
});

export default client;