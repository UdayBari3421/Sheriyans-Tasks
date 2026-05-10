import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})