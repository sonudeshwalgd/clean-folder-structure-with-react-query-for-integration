import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Login from "../LoginPage/Login";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//content
import logo from "./../../../assets/images/navbar/logo3.png";
import Signup from "../signup/Signup";
import Sidebar from "./HomePageSidebar";

export default function NavbarHomePage() {
  const [showlogin, setShowLogin] = useState(false);
  const [showsignup, setShowSignup] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [activeCard, setActiveCard] = useState("home");

  const activeNavbarSelector = (card: string) => {
    setActiveCard(card);
  };

  const handleTogglePopupLogin = () => {
    setShowLogin(false);
  };
  const handleTogglePopupSignup = () => {
    setShowSignup(false);
  };

  const handleToggleSidebar = () => {
    setSidebar(false);
  };

  return (
    <>
      <Header>
        <div>
          <ul>
            <li className="logo">
              <Link to="/home" className="link2">
                <img src={logo}></img>
              </Link>
            </li>
            <li className="flexgap "></li>
            <li>
              <div>
                <ul>
                  <li>
                    <Link
                      to="/home"
                      onClick={() => {
                        activeNavbarSelector("home");
                      }}
                      className={`link line default_active-link ${
                        activeCard == "home" ? "active_navbar_link" : ""
                      }`}
                    >
                      Home{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/how-it-works"
                      onClick={() => {
                        activeNavbarSelector("works");
                      }}
                      className={`link ${
                        activeCard == "works" ? "active_navbar_link" : ""
                      }`}
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/view-festivals"
                      onClick={() => {
                        activeNavbarSelector("festivals");
                      }}
                      className={`link ${
                        activeCard == "festivals" ? "active_navbar_link" : ""
                      }`}
                    >
                      View Festivals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact-us"
                      onClick={() => {
                        activeNavbarSelector("contact");
                      }}
                      className={`link ${
                        activeCard == "contact" ? "active_navbar_link" : ""
                      }`}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flexgap"></li>
            <li className="button">
              <div className="link2 ">
                <button onClick={() => setShowLogin(true)} className="login ">
                  Log In
                </button>
              </div>
              <div className="link2">
                <button onClick={() => setShowSignup(true)} className="signup">
                  Sign Up
                </button>
              </div>
            </li>
            <li
              className="burgor"
              onClick={() => {
                setSidebar(true);
              }}
            >
              <button>
                <div></div>
                <div></div>
                <div></div>
              </button>
            </li>
          </ul>
        </div>
      </Header>

      {sidebar && <Sidebar showSidebar={handleToggleSidebar}></Sidebar>}
      {showlogin && <Login showLoginForm={handleTogglePopupLogin}></Login>}
      {showsignup && <Signup showSigninForm={handleTogglePopupSignup}></Signup>}
    </>
  );
}

const Header = styled.div`
  width: 100vw;
  position: relative;
  height: 68px;
  background-color: var(--background);
  & > div {
    max-width: var(--maxwidth);
    margin: 0 auto;
    ul {
      margin: 0;
      padding: 8px 0 16px 0px;
      display: flex;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      & > li {
        display: flex;
        text-decoration: none;
        white-space: nowrap;

        img {
          width: 170px;
          background-color: inherit;
          height: 90%;
        }
        .gapmaker {
          padding-left: 40px;
        }
        .login {
          display: flex;
          align-items: center;
          padding: 19px 25px;
          background-color: var(--theme);
          height: 36px;
          font-size: 14px;
          line-height: 24px;
          color: var(--heading1);
          outline: none;
          border: none;
          margin-right: 15px;
          font-weight: 600;
          border-radius: 5px;
          color: white;
          text-decoration: none;
        }
        .signup {
          display: flex;
          align-items: center;
          padding: 17px 28px;
          height: 36px;
          font-size: 14px;
          line-height: 24px;
          color: var(--heading1);
          color: #333;
          outline: none;
          border: 2px solid #333;
          font-weight: 600;
          border-radius: 5px;
          text-decoration: none;
        }
        & > div {
          margin-left: 30px;
          ul {
            .link {
              font-size: 14px;
              line-height: 20px;
              color: var(--heading0);
              font-weight: 600;
              margin-right: 32px;
              text-decoration: none;
              position: relative;
              border-radius: 2px;
              :hover {
                background-color: rgba(0, 0, 0, 0.1);
                transition: all 0.2s;
                box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1);
              }
            }
            .line {
            }
          }
        }

        & > .link2 {
          text-decoration: none;
        }
      }
      & > .burgor {
        display: none;
        width: 40px;
        position: relative;
        & > button {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          border: none;
          outline: none;

          & > div {
            width: 100%;
            height: 3px;
            border-radius: 3px;
            background-color: #aaa;
          }
        }
      }
      @media (max-width: 830px) {
        justify-content: space-between;
        & > li:not(.logo) {
          display: none;
        }
        .burgor {
          display: block !important;
        }
      }
    }
  }
`;
