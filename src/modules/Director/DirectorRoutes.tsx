import React, { useState } from "react";
import { Route, Outlet } from "react-router-dom";
import Footer from "../../core/commonComponents/Footer/Footer";
import NavbarDirector from "../../core/commonComponents/NavbarDirector/NavbarDirector";
import FestivalPage from "../Home/pages/FestivalPage";
import Verified from "../../core/commonComponents/Verified/Verified";
import DirectorSubmissionPage from "./pages/Submission";
import { ContactUsPage } from "./pages/ConntactUsPage";
import DirectorDashboardPage from "./pages/DirectorDashboard";
import DirectorNotificationPage from "./pages/Notification";
import { DirectorSettingPage } from "./pages/Setting";
import DirectorProjectEditDetailPage from "./pages/ProjectEditDetail";
import DirectorProjectPage from "./pages/Project";

export const DirectorRoutes: Array<React.ReactElement> = [
  <Route
    key={"festival"}
    index={false}
    path={"festival"}
    element={<FestivalPage />}
  />,
  <Route
    key={"dashboard"}
    index={false}
    path={"dashboard"}
    element={<DirectorDashboardPage />}
  />,
  <Route
    key={"project"}
    index={false}
    path={"my-project"}
    element={<DirectorProjectPage />}
  />,
  <Route
    key={"submission"}
    index={false}
    path={"my-submission"}
    element={<DirectorSubmissionPage />}
  />,
  <Route
    key={"contact"}
    index={false}
    path={"contact-us"}
    element={<ContactUsPage />}
  />,
  <Route
    key={"setting"}
    index={false}
    path={"setting"}
    element={<DirectorSettingPage />}
  />,
  <Route
    key={"notification"}
    index={false}
    path={"notification"}
    element={<DirectorNotificationPage />}
  />,
  <Route
    key={"my-project/details-edit"}
    index={false}
    path={"my-project/details-edit"}
    element={<DirectorProjectEditDetailPage />}
  />,
];

export function DirectorRoute() {
  const [isVerifiedVisible, setIsVerifiedVisible] = useState<boolean>(true);

  const isVerifiedVisibleHandler = () => {
    setIsVerifiedVisible(false);
  };
  return (
    <>
      <NavbarDirector />
      {isVerifiedVisible && (
        <Verified visibilityHandler={isVerifiedVisibleHandler} />
      )}
      <Outlet />
      <Footer />
    </>
  );
}
