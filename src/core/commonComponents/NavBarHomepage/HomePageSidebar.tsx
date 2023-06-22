import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Login from "../LoginPage/Login";
import Signup from "../signup/Signup";
import Camera from "./../../../assets/images/howitworks/Camera.svg";

type SidebarPropsType = {
  showSidebar: () => void;
};

export default function Sidebar({ showSidebar }: SidebarPropsType) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleShowLogin = () => {
    setShowLogin(false);
  };
  const toggleShowSignup = () => {
    setShowSignup(false);
  };
  const [activeCard, setActiveCard] = useState("home");

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
            showSidebar();
          }
        }}
      >
        <div>
          <ul>
            <li>
              <Link
                to="/home"
                onClick={(e) => {
                  activeNavbarSelector("home");
                }}
                className={`link line default_active-link ${
                  activeCard == "home" ? "active_navbar_link2" : ""
                }`}
              >
                Home{" "}
              </Link>
            </li>
            <li>
              <Link
                to="/how-it-works"
                onClick={(e) => {
                  activeNavbarSelector("works");
                }}
                className={`link ${
                  activeCard == "works" ? "active_navbar_link2" : ""
                }`}
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                to="/view-festivals"
                onClick={(e) => {
                  activeNavbarSelector("festivals");
                }}
                className={`link ${
                  activeCard == "festivals" ? "active_navbar_link2" : ""
                }`}
              >
                View Festivals
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                onClick={(e) => {
                  activeNavbarSelector("contact");
                }}
                className={`link ${
                  activeCard == "contact" ? "active_navbar_link2" : ""
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li className="button">
              <Link to="#" className="link2 ">
                <button onClick={() => setShowLogin(true)} className="login ">
                  Log In
                </button>
              </Link>
              <Link to="#" className="link2">
                <button onClick={() => setShowSignup(true)} className="signup">
                  Sign Up
                </button>
              </Link>
            </li>
          </ul>
          <img className="bottom-img" src={Camera}></img>
        </div>
      </SidebarBody>
      {showLogin && <Login showLoginForm={toggleShowLogin}></Login>}
      {showSignup && <Signup showSigninForm={toggleShowSignup}></Signup>}
    </>
  );
}

const SidebarBody = styled.div`
  width: 120vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  @media (min-width: 830px) {
    display: none;
  }
  & > div {
    min-width: 300px;
    padding: 120px 30px !important;
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
      gap: 35px;
      & > li {
        list-style: none;

        & > * {
          color: white;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }
      }
      & > .button {
        display: flex;
        flex-direction: column;
        gap: 30px;
        .login {
          padding: 4px 22px;
          background-color: var(--theme);
          color: white;
          border: none;
          outline: none;
          border-radius: 5px;
          font-weight: 500;
          width: 100%;
          font-size: 16px;
          font-weight: 500;
        }
        .signup {
          font-weight: 500;

          font-size: 16px;
          padding: 4px 22px;
          color: var(--theme);
          color: white;
          border: 2px solid white;
          font-weight: 500;
          outline: none;
          width: 100%;
          border-radius: 5px;
          background-color: transparent;
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
