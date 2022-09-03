import { Routes as Switch, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { NotFound } from "../components/notFound/NotFound";
import { PrivateRoutes } from "./PrivateRoutes";
import { Collections } from "../pages/collections/Collections";
import { PersistLogin } from "./PersistLogin";
import { AdminDashboard } from "../pages/adminDashboard/AdminDashboard";
import { AddCollection } from "../pages/addCollection/AddCollection";
const Routes = () => {
  return (
    <Switch>
      <Route element={<PersistLogin />}>
        <Route element={<PrivateRoutes allowedRoles={["user"]} />}>
          <Route path="/addcollection" element={<AddCollection />} />
        </Route>
        <Route element={<PrivateRoutes allowedRoles={["user", "admin"]} />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Route>
        <Route path={"/"} element={<Login />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/collections"} element={<Collections />} />

        <Route path={"/*"} element={<NotFound />} />
      </Route>
    </Switch>
  );
};

export default Routes;
