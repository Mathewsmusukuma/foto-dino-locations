import axios from "axios";

export default function axiosInstance (){
  return axios.create({
    baseURL: "https://api.photodino.com/locations/",
  });
};

