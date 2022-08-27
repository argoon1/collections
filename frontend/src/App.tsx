import Navigation from "./components/Navigation/Navigation";
import Search from "./components/search/Search";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
function App() {
  alert(process.env.NODE_ENV);
  return (
    <BrowserRouter>
      <Navigation />
      <Search />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
