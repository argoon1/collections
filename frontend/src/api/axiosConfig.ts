import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3500/"
    : "https://frozen-anchorage-58528.herokuapp.com/";

const axiosMain = axios.create({
  baseURL: "http://localhost:3500/",
});
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosMain, axiosPrivate };
