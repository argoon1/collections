import { UserNavigation } from "./components/userNavigation/UserNavigation";
import { Search } from "./components/search/Search";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { AuthProvider } from "./Context/AuthProvider";
import { BackgroundTheme } from "./components/backgroundTheme/BackgroundTheme";
import { CollectionItemProvider } from "./Context/CollectionItemProvider";
function App() {
  return (
    <BrowserRouter>
      <BackgroundTheme>
        <AuthProvider>
          <CollectionItemProvider>
            <UserNavigation />
            <Search />
            <Routes />
          </CollectionItemProvider>
        </AuthProvider>
      </BackgroundTheme>
    </BrowserRouter>
  );
}

export default App;
