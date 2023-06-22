import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

//content
import logo from "./../../../assets/images/navbar/logo3.png";
import setting from "./../../../assets/images/navbar-login/settings.svg";
import notifications from "./../../../assets/images/navbar-login/notifications.svg";
import logout from "./../../../assets/images/navbar-login/logout.svg";
import review1 from "./../../../assets/images/navbar-login/review1.jpeg";
import SidebarDirector from "./DirectorSidebar";
import { useQuery } from "react-query";
import { getDirectorProfile } from "../../Api/Api";
import axios from "axios";
// import Sidebar_director from './DirectorSidebar'

export default function NavbarDirector() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handletoggleSidebar = () => {
    setShowSidebar(false);
  };
  const [activeNavbar, setActiveNavbar] = useState("Festival");
  const activeNavbarSelector = (card: string) => {
    setActiveNavbar(card);
  };

  //profile pic
  const { data: profile } = useQuery("directorProfile", getDirectorProfile, {
    onSuccess: (res) => {},
    onError: (err) => {
      console.log(err);
    },
  });

  const unAuth = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.clear();
  };

  return (
    <>
      <Header>
        <div>
          <ul>
            <li>
              <Link to="/director/dashboard" className="link2">
                <img className="logo" src={logo}></img>
              </Link>
            </li>
            <li className="flexgap "></li>
            <li className="tohide">
              <div>
                <ul>
                  <li>
                    <Link
                      to="/director/festival"
                      onClick={() => {
                        activeNavbarSelector("Festival");
                      }}
                      className={`link ${
                        activeNavbar == "Festival" ? "active_navbar_link" : ""
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
                        activeNavbar == "Dashboard" ? "active_navbar_link" : ""
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
                        activeNavbar == "Project" ? "active_navbar_link" : ""
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
                        activeNavbar == "Submissions"
                          ? "active_navbar_link"
                          : ""
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
                        activeNavbar == "Contact" ? "active_navbar_link" : ""
                      }`}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flexgap2"></li>
            <li className="icon tohide ">
              <Link to="/director/setting">
                <img src={setting}></img>
              </Link>
              <Link to="/director/notification">
                {" "}
                <img src={notifications}></img>
              </Link>
              <Link to="/home" onClick={unAuth}>
                <img src={logout}></img>
              </Link>
              {/* <Link to="/home" onClick={()=>localStorage.clear()}><img src={logout}></img></Link> */}
            </li>
            <li
              className="burgor"
              onClick={() => {
                setShowSidebar(true);
              }}
            >
              <button>
                <div></div>
                <div></div>
                <div></div>
              </button>
            </li>
            <li className="profile tohide">
              <img
                src={"http://3.89.138.204:3000/uploads/" + profile?.imgurl}
              ></img>
            </li>
          </ul>
        </div>
      </Header>
      {showSidebar && (
        <SidebarDirector toggleSidebar={handletoggleSidebar}></SidebarDirector>
      )}
    </>
  );
}

const Header = styled.div`
  width: 100vw;
  position: relative;
  height: 68px;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: var(--background);
  & > div {
    max-width: var(--maxwidth);
    margin: 0 auto;
    ul {
      margin: 0;
      padding: 12px 0 16px 0px;
      display: flex;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      & > li {
        display: flex;
        text-decoration: none;

        .logo {
          width: 150px;
          /* margin-top: -5px; */
          background-color: inherit;
          height: 90%;
        }
        .gapmaker {
          padding-left: 40px;
        }

        & > div {
          /* margin-left: 30px; */
          ul {
            .link {
              font-size: 14px;
              line-height: 20px;
              color: var(--heading0);
              font-weight: 600;
              margin-right: 32px;
              text-decoration: none;
              position: relative;
              white-space: nowrap;
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
          white-space: nowrap;
        }
      }
      & > .flexgap2 {
        width: 0vw;
      }
      & > .icon {
        display: flex;
        gap: 12px;
        margin: 0 10px;
        img {
          display: flex;
          align-self: center;
          height: 20px;
        }
      }
      & > .profile {
        & > img {
          height: 40px;
          width: 40px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid white;
          margin-left: 20px;
        }
      }
    }
  }
  .burgor {
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
        background-color: #777;
      }
    }
  }
  @media screen and (max-width: 950px) {
    .tohide {
      display: none !important;
    }
    .burgor {
      display: block !important;
    }
  }
`;
