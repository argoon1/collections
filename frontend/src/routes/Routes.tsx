import { Routes as Switch, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
const Routes = () => {
  return (
    <Switch>
      <Route path={"/Login"} element={<Login />} />
      <Route path={"/Register"} element={<Register />} />
    </Switch>
  );
};

export default Routes;
