import { useEffect } from "react";
import { axiosMain } from "../../../api/axiosConfig";
const userUsersList = () => {
  function getAllUsers() {
    axiosMain.get("/users");
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  return {};
};

export default userUsersList;
