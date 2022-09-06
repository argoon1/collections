import { Routes as Switch, Route } from "react-router-dom";
import { UserLogin } from "../pages/userLogin/UserLogin";
import { UserRegister } from "../pages/userRegister/UserRegister";
import { NotFound } from "../components/notFound/NotFound";
import { PrivateRoutes } from "./PrivateRoutes";
import { Home } from "../pages/home/Home";
import { PersistLogin } from "./PersistLogin";
import { AdminDashboard } from "../pages/adminDashboard/AdminDashboard";
import { AddCollection } from "../pages/addCollection/AddCollection";
import { UserCollections } from "../pages/userCollections/UserCollections";
import { CollectionItems } from "../pages/collectionItems/CollectionItems";
import { CollectionItemDetailed } from "../components/collections/collection/collectionItem/collectionItemDetailed/CollectionItemDetailed";
import { UpdateCollectionItem } from "../components/collections/updateCollectionItem/UpdateCollectionItem";
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
        <Route path={"/login"} element={<UserLogin />} />
        <Route path={"/register"} element={<UserRegister />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path="/collection/:id" element={<CollectionItems />} />
        <Route
          path="/collections/collection/item/:itemId"
          element={<CollectionItemDetailed />}
        />
        <Route
          path="/collections/collection/item/edit/:id"
          element={<UpdateCollectionItem />}
        />
        <Route path={"/*"} element={<NotFound />} />
      </Route>
    </Switch>
  );
};

export { Routes };
