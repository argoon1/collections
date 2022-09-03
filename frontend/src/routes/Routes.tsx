import { Routes as Switch, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { NotFound } from "../components/notFound/NotFound";
import { PrivateRoutes } from "./PrivateRoutes";
import { Home } from "../pages/home/Home";
import { PersistLogin } from "./PersistLogin";
import { AdminDashboard } from "../pages/adminDashboard/AdminDashboard";
import { AddCollection } from "../pages/addCollection/AddCollection";
import { UserCollections } from "../pages/userCollections/UserCollections";
import { CollectionItems } from "../pages/collectionItems/CollectionItems";
const Routes = () => {
  return (
    <Switch>
      <Route element={<PersistLogin />}>
        <Route element={<PrivateRoutes allowedRoles={["user"]} />}>
          <Route path="/addcollection" element={<AddCollection />} />
          <Route path="/collections" element={<UserCollections />} />
        </Route>
        <Route element={<PrivateRoutes allowedRoles={["user", "admin"]} />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Route>
        <Route path={"/"} element={<Login />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/home"} element={<Home />} />
        <Route path="/collection/:id" element={<CollectionItems />} />

        <Route path={"/*"} element={<NotFound />} />
      </Route>
    </Switch>
  );
};

export default Routes;
