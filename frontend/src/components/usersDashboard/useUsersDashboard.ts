import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosMain } from "../../api/axiosConfig";
export type User = {
  email: string;
};
export type ToolbarActions = "block" | "unblock" | "delete";
const useUsersDashboard = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<null | User[]>(null);
  function checkUser(email: string) {
    if (checkedUsers.includes(email)) {
      setCheckedUsers((prevCheckedUsers) =>
        prevCheckedUsers.filter((checkedEmail) => checkedEmail !== email)
      );
      return;
    }
    setCheckedUsers((prevCheckedUsers) => [...prevCheckedUsers, email]);
  }

  async function getUsers() {
    try {
      const {
        data: { users },
      } = await axiosMain("/users", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setUsers(users);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  }

  async function handleUserData(resp: Response) {
    const { users, currentUser, status } = await resp.json();
    if (currentUser.blocked) {
      navigate("/login");
      localStorage.setItem("token", "");
      return;
    }
    if (status == 200) {
      setUsers(users);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  function isCheckedUser(email: string) {
    return checkedUsers.includes(email);
  }

  async function toolbarAction(action: ToolbarActions) {
    try {
      await axiosMain.post("users/" + action, ...getToolbarFetchOptions());
    } catch (e) {}
  }
  function getToolbarFetchOptions() {
    return [
      JSON.stringify(checkedUsers),
      {
        headers: { "Content-Type": "application/json" },
      },
    ];
  }
  function selectAllUsers() {
    if (users) {
      setCheckedUsers(users.map(({ email }) => email));
    }
  }

  return { users, checkUser, isCheckedUser, selectAllUsers, toolbarAction };
};

export { useUsersDashboard };
