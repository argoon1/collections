import { UserNavigation } from "./components/userNavigation/UserNavigation";
import { Search } from "./components/search/Search";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/Routes";
import { AuthProvider } from "./Context/authProvider/AuthProvider";
import { BackgroundTheme } from "./components/backgroundTheme/BackgroundTheme";
import { CollectionItemProvider } from "./Context/collectionItemProvider/CollectionItemProvider";
import { ThemeProvider } from "./Context/themeProvider/ThemeProvider";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BackgroundTheme />
        <AuthProvider>
          <CollectionItemProvider>
            <UserNavigation />
            <Search />
            <Routes />
          </CollectionItemProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
