import { BACKEND_BASE_URL} from "../config/config";
import axios from "axios";

const Headers = {
  "Access-Control-Allow-Origin": "http://15.206.66.113:3000",
  "Access-Control-Allow-Methods": "POST, GET, PUT, PATCH, DELETE, OPTIONS",
  "Content-Type": "application/json",
}
// Create an Axios instance with default options
const AxiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL  });

export default AxiosInstance;
