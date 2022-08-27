const AUTH_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3500/"
    : "https://frozen-anchorage-58528.herokuapp.com/";
export { AUTH_URL };
