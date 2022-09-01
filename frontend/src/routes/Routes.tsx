import { Routes as Switch, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { NotFound } from "../components/notFound/NotFound";
import { PrivateRoutes } from "./PrivateRoutes";
import { Collections } from "../pages/collections/Collections";
import { PersistLogin } from "./PersistLogin";
const Routes = () => {
  return (
    <Switch>
      <Route element={<PersistLogin />}>
        <Route path={"/"} element={<Login />} />
        <Route path={"/Login"} element={<Login />} />
        <Route path={"/Register"} element={<Register />} />
        <Route path={"/collections"} element={<Collections />} />
        <Route element={<PrivateRoutes allowedRoles={["user", "admin"]} />}>
          <Route path="/admin" element={<Login />} />
        </Route>

        <Route path={"/*"} element={<NotFound />} />
      </Route>
    </Switch>
  );
};

export default Routes;
