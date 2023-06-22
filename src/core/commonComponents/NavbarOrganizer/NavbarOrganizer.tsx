import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

//content
import setting from "./../../../assets/images/navbar-login/settings.svg";
import logo from "./../../../assets/images/navbar/logo3.png";
import notifications from "./../../../assets/images/navbar-login/notifications.svg";
import logout from "./../../../assets/images/navbar-login/logout.svg";
import review1 from "./../../../assets/images/navbar-login/review1.jpeg";
import SidebarOrganizer from "./OrganizerSidebar";
import { useQuery } from "react-query";
import { getOrganizerProfileDetails } from "../../Api/Api";
import axios from "axios";

export default function NavbarOrganizer() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeCard, setActiveCard] = useState("Dashboard");

  const handletoggleSidebar = () => {
    setShowSidebar(false);
  };

  const activeNavbarSelector = (card: string) => {
    setActiveCard(card);
  };

  const unAuth = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.clear();
  };

  const { data } = useQuery(
    ["organizerDashboardProfile"],
    getOrganizerProfileDetails,
    {
      onSuccess: (response) => {
        console.log(response?.createdAt);
      },
      onError: (error) => {
        console.error(error);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Header>
        <div>
          <ul>
            <li>
              <Link to="/" className="link2">
                <img className="logo" src={logo}></img>
              </Link>
            </li>
            <li className="flexgap "></li>
            <li>
              <div>
                <ul className="tohide">
                  <li>
                    <Link
                      to="/organizer/dashboard"
                      onClick={(e) => {
                        activeNavbarSelector("Dashboard");
                      }}
                      className={`link line ${
                        activeCard == "Dashboard" ? "active_navbar_link" : ""
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
                        activeCard == "Festival" ? "active_navbar_link" : ""
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
                        activeCard == "Submissions" ? "active_navbar_link" : ""
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
                        activeCard == "Marketing" ? "active_navbar_link" : ""
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
                        activeCard == "Contact" ? "active_navbar_link" : ""
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
                        activeCard == "Reviews" ? "active_navbar_link" : ""
                      }`}
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="flexgap2 "></li>
            <li className="icon tohide">
              <Link to="/organizer/setting">
                <img src={setting}></img>
              </Link>
              <Link to="/organizer/notification">
                {" "}
                <img src={notifications}></img>
              </Link>
              <Link onClick={unAuth} to="/home">
                <img className="profile" src={logout}></img>
              </Link>
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
            <li className="profile ">
              <img
                src={"http://3.89.138.204:3000/uploads/" + data?.imgurl}
              ></img>
            </li>
          </ul>
        </div>
      </Header>

      {showSidebar && (
        <SidebarOrganizer
          toggleSidebar={handletoggleSidebar}
        ></SidebarOrganizer>
      )}
    </>
  );
}

const Header = styled.div`
  width: 100vw;
  position: relative;
  position: sticky !important;
  top: 0;
  height: 68px;
  background-color: var(--background);
  z-index: 999;
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
  @media screen and (max-width: 880px) {
    .tohide {
      display: none !important;
    }
    .burgor {
      display: block !important;
    }
    .profile {
      display: none;
    }
  }
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
              white-space: nowrap;
              border-radius: 2px;
              @media screen and (max-width: 1080px) {
                margin-right: 10px;
              }
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
        gap: 20px;
        margin: 0 12px;
        & > img {
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
`;
