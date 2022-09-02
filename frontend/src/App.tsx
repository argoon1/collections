import { Navigation } from "./components/navigation/Navigation";
import { Search } from "./components/search/Search";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { AuthProvider } from "./Context/AuthProvider";
import { CollectionsProvider } from "./Context/CollectionsProvider";
import { axiosMain } from "./api/axiosConfig";
function App() {
  axiosMain.get("/users", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionsProvider>
          <Navigation />
          <Search />
          <Routes />
        </CollectionsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
