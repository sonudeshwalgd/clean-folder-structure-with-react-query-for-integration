import React, { useState } from "react";
import { Route, Outlet } from "react-router-dom";
import Footer from "../../core/commonComponents/Footer/Footer";
import { SignupPage } from "../../core/commonComponents/signup/styled";
import Verified from "../../core/commonComponents/Verified/Verified";
import Test from "./containers/Test deletable folder/Test";
import { ContactUsPage } from "./pages/ContactUsPage";
import { OrganizermarketingPage } from "./pages/Marketing";
import { OrganizerMyFestivalsPage } from "./pages/MyFestival";
import OrganizerNavbar from "./pages/NavbarOrganizer";
import { OrganizerNotificationPage } from "./pages/Notification";
import { OrganizerDashboardPage } from "./pages/OrganiserDashboard";
import { OrganizerReviewPage } from "./pages/Reviews";
import { OrganizerSettingPage } from "./pages/Setting";
import { OrganizerSubmissionPage } from "./pages/Submission";
import { OrganizerSubmissionDetailPage } from "./pages/SubmissionDetail";

export const OrganizerRoutes: Array<React.ReactElement> = [
  <Route
    key={"dashboard"}
    index={false}
    path={"dashboard"}
    element={<OrganizerDashboardPage />}
  />,
  <Route
    key={"contact"}
    index={false}
    path={"contact-us"}
    element={<ContactUsPage />}
  />,
  <Route
    key={"reviews"}
    index={false}
    path={"reviews"}
    element={<OrganizerReviewPage />}
  />,
  <Route
    key={"festivals"}
    index={false}
    path={"my-festival"}
    element={<OrganizerMyFestivalsPage />}
  />,
  <Route
    key={"marketing"}
    index={false}
    path={"marketing"}
    element={<OrganizermarketingPage />}
  />,
  <Route
    key={"submission"}
    index={false}
    path={"submission"}
    element={<OrganizerSubmissionPage />}
  />,
  <Route
    key={"submissionDetail"}
    index={false}
    path={"submission/details"}
    element={<OrganizerSubmissionDetailPage />}
  />,
  <Route
    key={"setting"}
    index={false}
    path={"setting"}
    element={<OrganizerSettingPage />}
  />,
  <Route
    key={"notification"}
    index={false}
    path={"notification"}
    element={<OrganizerNotificationPage />}
  />,
  <Route
    key={"review"}
    index={false}
    path={"review"}
    element={<OrganizerReviewPage />}
  />,
  <Route
  key={"signup"}
  index={false}
  path={"singnup"}
  element={<SignupPage />}
/>,
  <Route key={"test"} index={false} path={"test"} element={<Test />} />,
];

export function OrganizerRoute() {
  const [isVerifiedVisible, setIsVerifiedVisible] = useState<boolean>(true);

  const isVerifiedVisibleHandler = () => {
    setIsVerifiedVisible(false);
  };

  return (
    <>
      <OrganizerNavbar />
      {isVerifiedVisible && (
        <Verified visibilityHandler={isVerifiedVisibleHandler} />
      )}
      <Outlet />
      <Footer />
    </>
  );
}
