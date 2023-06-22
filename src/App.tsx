import React, { useEffect, useLayoutEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { LayoutWrapper } from "./core/commonComponents";
import { HomepageRoute, HomeRoutes } from "./modules/Home/HomeRoutes";
import "./App.css";
import {
  DirectorRoute,
  DirectorRoutes,
} from "./modules/Director/DirectorRoutes";
import {
  OrganizerRoute,
  OrganizerRoutes,
} from "./modules/Organizer/OrganizerRoutes";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import GlobalStyle from "./assets/css/gloablStyledComponents";

axios.defaults.baseURL = "https://api.ffcmail.in/api/v1/";

let userToken = localStorage.getItem("userToken");
if (userToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ` + `${userToken}`;
}

function App() {
  const navigate = useNavigate();


  return (
    <div className="App">
      <GlobalStyle />
      <LayoutWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomepageRoute />
              </>
            }
          >
            {HomeRoutes}
          </Route>
          <Route
            path="/director"
            element={
              <>
                <DirectorRoute />
              </>
            }
          >
            {DirectorRoutes}
          </Route>
          <Route
            path="/organizer"
            element={
              <>
                <OrganizerRoute />
              </>
            }
          >
            {OrganizerRoutes}
          </Route>
        </Routes>
      </LayoutWrapper>
    </div>
  );
}
export default App;
