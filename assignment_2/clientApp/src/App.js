import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/home/Home";
import Detail from "./Components/detail/Detail";
import Search from "./Components/search/Search";
import Auth from "./Components/authentication/auth";
import Transaction from "./Components/Transaction/Transaction";

import navbarJS from "./data/navBar.json";
import footerJS from "./data/footer.json";

import { StroreContext } from "./Components/store/store";
import { useContext, useEffect } from "react";

function App() {
  const { ha_noi, hcm, da_nang, rating } = useContext(StroreContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/home"
          element={
            <Home
              navbar={navbarJS}
              city={{ ha_noi, hcm, da_nang }}
              hotelList={rating}
              footer={footerJS}
            />
          }
        />
        <Route
          path="/search"
          element={<Search navbar={navbarJS} footer={footerJS} />}
        />
        <Route
          path="/detail"
          element={<Detail navbar={navbarJS} footer={footerJS} />}
        />
        <Route
          path="/transaction"
          element={<Transaction navbar={navbarJS} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
