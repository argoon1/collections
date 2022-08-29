import Navigation from "./components/Navigation/Navigation";
import Search from "./components/search/Search";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { useAuth } from "./Context/AuthProvider";
import AuthProvider from "./Context/AuthProvider";
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
