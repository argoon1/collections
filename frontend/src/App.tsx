import { Navigation } from "./components/navigation/Navigation";
import { Search } from "./components/search/Search";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { AuthProvider } from "./Context/AuthProvider";
import { CollectionsProvider } from "./Context/CollectionsProvider";
import { axiosMain } from "./api/axiosConfig";
function App() {
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
