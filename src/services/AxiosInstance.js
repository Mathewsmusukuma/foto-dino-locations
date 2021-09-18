import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.photodino.com/locations/",
  withCredentials: false,
  headers: {},
});