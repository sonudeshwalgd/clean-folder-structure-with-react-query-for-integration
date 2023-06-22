import React from "react";
import { Route, Outlet } from "react-router-dom";
import NavbarHomePage from "../../core/commonComponents/NavBarHomepage/NavbarHomePage";
import { ContactUsPage } from "./pages/ContactUsPage";
import FestivalPage from "./pages/FestivalPage";
import HomePage from "./pages/HomePage";
import HowItWork from "./pages/HowItWork";
import Footer from "../../core/commonComponents/Footer/Footer";
import CardDetail from "../../core/commonComponents/OrganizerMyFestival/ViewFestivalsDetail";

export const HomeRoutes: Array<React.ReactElement> = [
  <Route key={"home"} index path={"home"} element={<HomePage />} />,
  <Route
    key={"festival"}
    index={false}
    path={"view-festivals"}
    element={<FestivalPage />}
  />,
  <Route
    key={"howItWork"}
    index={false}
    path={"how-it-works"}
    element={<HowItWork />}
  />,
  <Route
    key={"CardDetail"}
    index={false}
    path={"view-festivals/card-detail"}
    element={<CardDetail />}
  />,
  <Route
    key={"ContactUs"}
    index={false}
    path={"contact-us"}
    element={<ContactUsPage />}
  />,
];

export function HomepageRoute() {
  return (
    <>
      <NavbarHomePage></NavbarHomePage>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
