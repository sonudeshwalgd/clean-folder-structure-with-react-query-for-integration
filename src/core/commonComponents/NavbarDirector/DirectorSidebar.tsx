import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Camera from "./../../../assets/images/howitworks/Camera.svg";

type CheckoutPropsType = {
  toggleSidebar: () => void;
};

export default function SidebarDirector({ toggleSidebar }: CheckoutPropsType) {
  const [activeNavbar, setActiveNavbar] = useState("Festival");

  const activeNavbarSelector = (card: string) => {
    setActiveNavbar(card);
  };

  return (
    <>
      <SidebarBody
        className="popup_sidebar"
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            toggleSidebar();
          }
        }}
      >
        <div>
          <button
            onClick={() => {
              toggleSidebar();
            }}
            className="cut"
          >
            X
          </button>
          <ul className="tohide">
            <li>
              <Link
                to="/director/festival"
                onClick={() => {
                  activeNavbarSelector("Festival");
                }}
                className={`link ${
                  activeNavbar == "Festival" ? "active_navbar_link2" : ""
                }`}
              >
                Festival
              </Link>
            </li>
            <li>
              <Link
                to="/director/dashboard"
                onClick={() => {
                  activeNavbarSelector("Dashboard");
                }}
                className={`link line ${
                  activeNavbar == "Dashboard" ? "active_navbar_link2" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/director/my-project"
                onClick={() => {
                  activeNavbarSelector("Project");
                }}
                className={`link ${
                  activeNavbar == "Project" ? "active_navbar_link2" : ""
                }`}
              >
                My Project
              </Link>
            </li>
            <li>
              <Link
                to="/director/my-submission"
                onClick={() => {
                  activeNavbarSelector("Submissions");
                }}
                className={`link ${
                  activeNavbar == "Submissions" ? "active_navbar_link2" : ""
                }`}
              >
                My Submissions
              </Link>
            </li>
            <li>
              <Link
                to="/director/contact-us"
                onClick={() => {
                  activeNavbarSelector("Contact");
                }}
                className={`link ${
                  activeNavbar == "Contact" ? "active_navbar_link2" : ""
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/director/setting"
                onClick={() => {
                  activeNavbarSelector("Setting");
                }}
                className={`link ${
                  activeNavbar == "Setting" ? "active_navbar_link2" : ""
                }`}
              >
                Setting
              </Link>
            </li>
            <li>
              <Link
                to="/director/notification"
                onClick={() => {
                  activeNavbarSelector("Notification");
                }}
                className={`link ${
                  activeNavbar == "Notification" ? "active_navbar_link2" : ""
                }`}
              >
                Notification
              </Link>
            </li>
            <li>
              <Link
                to="/home"
                onClick={() => {
                  activeNavbarSelector("Logout");
                }}
                className={`link ${
                  activeNavbar == "Logout" ? "active_navbar_link2" : ""
                }`}
              >
                Logout
              </Link>
            </li>
          </ul>
          <img className="bottom-img" src={Camera}></img>
        </div>
      </SidebarBody>
    </>
  );
}

const SidebarBody = styled.div`
  width: 120vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  @media (min-width: 950px) {
    display: none;
  }
  & > div {
    min-width: 300px;
    padding: 60px !important;
  }
  .cut {
    position: absolute;
    right: 5px;
    height: 30px;
    width: 30px;
    top: 15px;
    border-radius: 50%;
    border: none;
    outline: none;
    color: white;
    font-size: 16px;
    background-color: transparent;
  }

  .active_navbar_link2 {
    border-bottom: 2px solid white;
  }

  & > div {
    background-color: #2c2c2c;
    width: max-content;
    padding: 20px 10vw 20px 40px;
    height: 100vh;
    position: relative;

    & > ul {
      display: flex;
      flex-direction: column;
      gap: 40px;
      & > li {
        list-style: none;

        & > * {
          color: white;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
        }
      }
      & > .button {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .login {
          padding: 6px 22px;
          background-color: var(--theme);
          color: white;
          border: none;
          outline: none;
          border-radius: 5px;
          font-weight: 500;
          width: 100%;
          font-size: 16px;
        }
        .signup {
          font-size: 16px;
          padding: 6px 22px;
          color: var(--theme);
          background-color: white;
          border: none;
          font-weight: 500;
          outline: none;
          width: 100%;
          border-radius: 5px;
        }
      }
    }
    & > .bottom-img {
      width: 250px;
      object-fit: contain;
      margin-top: auto;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
`;
