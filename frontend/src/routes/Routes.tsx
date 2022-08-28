import { Routes as Switch, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../components/notFound/NotFound";
import PrivateRoutes from "./PrivateRoutes";
const Routes = () => {
  return (
    <Switch>
      <Route path={"/"} element={<Login />} />
      <Route path={"/Login"} element={<Login />} />
      <Route path={"/Register"} element={<Register />} />
      <Route element={<PrivateRoutes allowedRoles={["user", "admin"]} />}>
        <Route path="/admin" element={<Login />} />
      </Route>

      <Route path={"/*"} element={<NotFound />} />
    </Switch>
  );
};

export default Routes;
