import { Navigation } from "./components/navigation/Navigation";
import { Search } from "./components/search/Search";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { AuthProvider } from "./Context/AuthProvider";
import { useEffect } from "react";
import { useRefreshToken } from "./hooks/useRefreshToken";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Search />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
