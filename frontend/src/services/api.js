import axios from "axios";

const API = axios.create({
  baseURL: "https://fd-manager-api.onrender.com/api"
});

export default API;