import { UserNavigation } from "./components/userNavigation/UserNavigation";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/Routes";
import { AuthProvider } from "./Context/authProvider/AuthProvider";
import { BackgroundTheme } from "./components/backgroundTheme/BackgroundTheme";
import { CollectionItemProvider } from "./Context/collectionItemProvider/CollectionItemProvider";
import { ThemeProvider } from "./Context/themeProvider/ThemeProvider";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <BackgroundTheme />
          <CollectionItemProvider>
            <UserNavigation />
            <Routes />
          </CollectionItemProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
