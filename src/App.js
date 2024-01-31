import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CompanySearchResults from "./components/CompanySearchResults";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store-favorite";
import PageFavorite from "./components/PageFavorite";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            activeClassName="active"
            path="/"
            element={<HomePage />}
          />
          <Route
            activeClassName="active"
            path="/favorites-companies"
            element={<PageFavorite />}
          />
          <Route path="/:company" element={<CompanySearchResults />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
