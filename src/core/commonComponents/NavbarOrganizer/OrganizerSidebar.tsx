import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Camera from "./../../../assets/images/howitworks/Camera.svg";

type CheckoutPropsType = {
  toggleSidebar: () => void;
};

export default function SidebarOrganizer({ toggleSidebar }: CheckoutPropsType) {
  const [activeCard, setActiveCard] = useState("Dashboard");
  const activeNavbarSelector = (card: string) => {
    setActiveCard(card);
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
                to="/organizer/dashboard"
                onClick={(e) => {
                  activeNavbarSelector("Dashboard");
                }}
                className={`link line ${
                  activeCard == "Dashboard" ? "active_navbar_link2" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/organizer/my-festival"
                onClick={(e) => {
                  activeNavbarSelector("Festival");
                }}
                className={`link  ${
                  activeCard == "Festival" ? "active_navbar_link2" : ""
                }`}
              >
                My Festival
              </Link>
            </li>
            <li>
              <Link
                to="/organizer/submission"
                onClick={(e) => {
                  activeNavbarSelector("Submissions");
                }}
                className={`link  ${
                  activeCard == "Submissions" ? "active_navbar_link2" : ""
                }`}
              >
                Submissions
              </Link>
            </li>
            <li>
              <Link
                to="/organizer/marketing"
                onClick={(e) => {
                  activeNavbarSelector("Marketing");
                }}
                className={`link  ${
                  activeCard == "Marketing" ? "active_navbar_link2" : ""
                }`}
              >
                Marketing
              </Link>
            </li>
            <li>
              <Link
                to="/organizer/contact-us"
                onClick={(e) => {
                  activeNavbarSelector("Contact");
                }}
                className={`link  ${
                  activeCard == "Contact" ? "active_navbar_link2" : ""
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/organizer/review"
                onClick={(e) => {
                  activeNavbarSelector("Reviews");
                }}
                className={`link  ${
                  activeCard == "Reviews" ? "active_navbar_link2" : ""
                }`}
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/organizer/setting"
                onClick={(e) => {
                  activeNavbarSelector("Setting");
                }}
                className={`link  ${
                  activeCard == "Setting" ? "active_navbar_link2" : ""
                }`}
              >
                Setting
              </Link>
            </li>
            <li>
              <Link
                to="/organizer/notification"
                onClick={(e) => {
                  activeNavbarSelector("Notification");
                }}
                className={`link  ${
                  activeCard == "Notification" ? "active_navbar_link2" : ""
                }`}
              >
                Notification
              </Link>
            </li>
            <li>
              <Link
                to="/home"
                onClick={(e) => {
                  activeNavbarSelector("Logout");
                }}
                className={`link  ${
                  activeCard == "Logout" ? "active_navbar_link2" : ""
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
