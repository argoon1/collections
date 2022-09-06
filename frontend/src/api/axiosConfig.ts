import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3500/"
    : "https://thawing-bayou-93653.herokuapp.com/";

const axiosMain = axios.create({
  baseURL: BASE_URL,
});
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosMain, axiosPrivate };
