import axios from "axios";

const client = axios.create({
  baseURL: "http://172.16.6.60:8080"
});

export default client;