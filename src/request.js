import axios from "axios";

const client = axios.create({
  baseURL: "http://rap2api.taobao.org/app/mock/177576/"
});

export default client;