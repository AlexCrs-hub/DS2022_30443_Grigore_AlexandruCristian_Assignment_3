import axios from "axios";

let token;
if(localStorage.getItem('user') != null){
  token = JSON.parse(localStorage.getItem('user') || '');
}


const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, X-Auth-Token",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Authorization": `Bearer ${token}`,
};
const defaultConfig = {
  baseURL: "http://localhost:3000",
  headers: defaultHeaders,
};

const getAxiosInstance = () => {
  return axios.create(defaultConfig);
};
export default getAxiosInstance;
