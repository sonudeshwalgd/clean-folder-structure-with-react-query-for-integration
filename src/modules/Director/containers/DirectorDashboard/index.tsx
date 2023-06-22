import React, { useState } from "react";
import styled from "styled-components";
import SelectionPopup from "./Selectionpopup";
import { useNavigate } from "react-router-dom";

//content

import caleder from "./../../../../assets/images/organizer dashboard/caleder.svg";
import review1 from "./../../../../assets/images/organizer dashboard/review1.jpeg";
import girl from "./../../../../assets/images/organizer dashboard/girl.svg";
import calender from "./../../../../assets/images/organizer dashboard/calender.svg";
import red from "./../../../../assets/images/organizer dashboard/red.svg";
import rd from "./../../../../assets/images/organizer dashboard/rd.svg";
import movie from "./../../../../assets/images/organizer dashboard/movie.svg";
import add from "./../../../../assets/images/organizer dashboard/plus.svg";
import project from "./../../../../assets/images/organizer dashboard/Rectangle 42.jpg";
import { useQuery } from "react-query";
import {
  getDirectorDashboard,
  getDirectorProfile,
} from "../../../../core/Api/Api";
import moment from "moment";

export default function DirectorDashboard() {
  const [selection, setSelection] = useState(false);
  const navigate = useNavigate();

  const handleTogglePopupSelection = () => {
    setSelection(false);
  };
  //profile
  const { data: profile } = useQuery("directorProfile", getDirectorProfile, {
    onSuccess: (res) => {},
    onError: (err) => {
      console.log(err);
    },
  });
  //dashboard
  const { data } = useQuery("directorDashboard", getDirectorDashboard, {
    onSuccess: (res) => {},
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <DirectorBody>
      <div className="inner_body">
        <div className="left">
          <Profile>
            <div>
              <img
                src={"http://3.89.138.204:3000/uploads/" + profile?.imgurl}
              ></img>
              <button className="button-blue">
                <i className="ri-pencil-line"></i>Change Profile picture
              </button>
              <h1>{profile?.name}</h1>
              <p>
                Member since {moment(profile?.createdAt).format("MMMM DD YYYY")}
              </p>
              <button
                onClick={() => {
                  navigate("/director/setting");
                }}
              >
                <i className="ri-settings-3-fill"></i>View Profile
              </button>
              <button
                onClick={() => {
                  navigate("/director/setting");
                }}
              >
                <i className="ri-equalizer-fill"></i>Account Setting
              </button>
            </div>
          </Profile>
        </div>
        <div className="middle">
          <CurrentSeason>
            <div>
              <div className="drop">
                <h1 className="h1_with_right">
                  Submission
                  <div className="flex"></div>
                  <p>View All</p>
                </h1>
                <div className="content3">
                  <div className="color">
                    <div>
                      <img src={calender}></img>
                      <h5>{data?.submission?.submission}</h5>
                      <p>Submission</p>
                    </div>
                    <div
                      onClick={() => {
                        setSelection(true);
                      }}
                    >
                      <img src={movie}></img>
                      <h5>{data?.submission?.selections}</h5>
                      <p>Selection</p>
                    </div>
                    <div>
                      <img src={red}></img>
                      <h5>₹ {data?.submission?.selected}</h5>
                      <p>Selected</p>
                    </div>
                    <div>
                      <img src={rd}></img>
                      <h5>₹ {data?.submission?.award_winner}</h5>
                      <p>Award Winner</p>
                    </div>
                    <div>
                      <img src={rd}></img>
                      <h5>₹ {data?.submission?.finalist}</h5>
                      <p>Finalist</p>
                    </div>
                    <div>
                      <img src={rd}></img>
                      <h5>₹ {data?.submission?.semi_finalist}</h5>
                      <p>Semi Finalist</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="drop">
                {!data ? (
                  <>
                    <h1 className="h1_with_right">Recent Submission </h1>
                    <div className="content2">
                      <img src={girl}></img>
                      <h1>No Submission found</h1>
                      <p>Try submitting Your project to festival </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sub-found">
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: "20%", paddingLeft: "10px" }}>
                              Project Name
                            </th>
                            <th style={{ width: "45%" }}>Festivals Name</th>
                            <th style={{ width: "20%" }}>Date</th>
                            <th style={{ width: "15%" }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.recentSubmission.map((ele: any) => {
                            // {console.log();}
                            return (
                              <tr id={ele._id}>
                                <td data-attr="Project Name">
                                  {ele.selectedProject.projectTitle}
                                </td>
                                <td data-attr="Festivals Name">
                                  {ele.festival.event_name}
                                </td>
                                <td data-attr="Date">
                                  {moment(ele.selectedProject.createdAt).format(
                                    "DD MMMM YYYY"
                                  )}
                                </td>
                                <td data-attr="Amount">₹ {ele.total}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div className="drop">
                <h1>Submission Map</h1>
                <div className="content2">
                  <h1>Don't Have any submission</h1>
                </div>
              </div>
            </div>
          </CurrentSeason>
        </div>
        <div className="right">
          <SubmissionEvents>
            <div>
              <div className="drop">
                <h1 className="h1_with_right">
                  Project
                  <div className="flex"></div>
                  <p>View All</p>
                </h1>
                {!data?.projects.length && (
                  <div className="content">
                    <div>
                      <img src={caleder}></img>
                      <h1>No Project Found</h1>
                      <p>Try uploading some project</p>
                      <button>
                        <img src={add} />
                        Add project
                      </button>
                    </div>
                  </div>
                )}

                <div className="project_found">
                  {data?.projects.map((ele: any) => {
                    return (
                      <CardMyProject>
                        <div className="left">
                          <img
                            src={
                              "http://3.89.138.204:3000/uploads/" +
                              ele.posterimage
                            }
                          ></img>
                        </div>
                        <div className="right">
                          <h3>{ele.projectTitle}</h3>
                          <h5>{ele.submission} Submission</h5>
                          <h5>{ele.selections} Selections</h5>
                          <h5>{ele.selected} Selected </h5>
                          <h5>{ele.award_winner} Award Winner</h5>
                        </div>
                      </CardMyProject>
                    );
                  })}
                </div>
              </div>
            </div>
          </SubmissionEvents>
        </div>
      </div>
      {selection && (
        <SelectionPopup
          showSelectionPopup={handleTogglePopupSelection}
        ></SelectionPopup>
      )}
    </DirectorBody>
  );
}

const DirectorBody = styled.div`
  width: 100vw;
  background-color: var(--background);
  & > .season {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: var(--maxwidth2);
    margin: auto;
    & > div {
      & > p {
        font-size: 14px;
        padding: 5px 0;
        font-weight: 500;
      }
      & > select {
        padding: 10px 80px 10px 10px;
        border-radius: 10px;
        font-size: 16px;
        background-color: inherit;
        margin-bottom: 10px;
      }
    }
  }
  & > .inner_body {
    max-width: var(--maxwidth2);
    margin: auto;
    display: flex;
    gap: 10px;
    & > .left {
      width: 25%;
      position: relative;
    }
    & > .middle {
      width: 50%;
      position: relative;
    }
    & > .right {
      width: 25%;
      position: relative;
      flex-wrap: wrap;
    }
    @media screen and (max-width: 900px) {
      flex-direction: column;
      & > div {
        width: 100% !important;
        margin: auto;
      }
    }
  }
`;
const Profile = styled.div`
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  margin-bottom: 20px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 20px;
    & > img {
      width: 20vw;
      height: 20vw;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid #aaa;
      max-height: 250px;
      max-width: 250px;
    }
    & > h1 {
      color: #111;
      font-size: 20px;
      font-weight: 500;
      padding: 15px;
    }
    & > p {
      font-size: 14px;
      font-weight: 400;
      padding-bottom: 15px;
    }
    & > button {
      width: 100%;
      display: flex;
      justify-content: center;
      color: #111;
      font-weight: 600;
      align-items: center;
      padding: 8px 0;
      font-size: 16px;
      border: none;
      outline: none;
      background-color: #ccc;
      border-radius: 5px;
      & > i {
        padding: 0 10px;
        font-size: 25px;
      }
    }
    & > button {
      margin-bottom: 10px;
    }
    & > .button-blue {
      background-color: #b9d6fb;
      color: var(--theme);
      margin-top: 20px;
    }
  }
`;
const CurrentSeason = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  border-radius: 10px;
  background-color: white;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    & > .drop {
      & > h1 {
        font-size: 18px;
        color: #111;
        font-weight: 600;
        padding: 15px 20px;
        background-color: #f6f5f4;
        border-radius: 10px;
      }
      & > .h1_with_right {
        font-size: 18px;
        color: #333;
        padding: 15px 20px;
        background-color: #f6f5f4;
        border-radius: 10px;
        font-weight: 500;
        display: flex;
        align-items: center;
        & > .flex {
          flex: 1;
        }
        & > p {
          font-size: 14px;
          float: right;
          font-weight: 600;
        }
        & > button {
          padding: 8px 20px;
          border-radius: 5px;
          margin-left: 10px;
          float: right;
          font-weight: 600;
        }
      }
      & > .content {
        padding: 10px 20px;
        & > div {
          & > ul {
            list-style: none;
            & > li {
              display: flex;
              justify-content: space-between;
              padding: 10px;
              color: #111;
              font-size: 14px;
              font-weight: 600;
            }
            & > li:last-of-type {
              background-color: #f6f5f4;
            }
          }
        }
        & > .table {
          border: 1px solid #ddd;
        }
        & > .report {
          margin-top: 10px;
          padding: 8px 30px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          background-color: white;
          border: 1px solid #111;
          border-radius: 5px;
          & > i {
            font-weight: 400;
            padding: 0 10px;
            font-size: 25px;
          }
        }
        & > .sale {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
          margin-top: 5px;
          & > h4 {
            font-size: 16px;
            color: #111;
          }
          & > p {
            background-color: #b4f0e0;
            color: #2bd5a9;
            padding: 1px 10px;
            border-radius: 10px;
          }
        }
        & > h3 {
          font-size: 18px;
          font-weight: 600;
          padding: 10px;
        }
        & > .chart {
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          & > div {
            display: flex;
            align-items: center;
            & > h5 {
              padding-right: 2px;
              color: #999;
              font-size: 14px;
              font-weight: 400;
            }
            & > div {
              width: 100%;
              height: 2px;
              background: linear-gradient(to right, #aaa 10%, #ccc 100%);
            }
          }
        }
      }
      & > .content2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 60px;
        & > img {
          width: 25%;
          margin-top: 60px;
          min-width: 250px;
        }
        & > h1 {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          padding: 10px 0;
        }
        & > p {
          font-size: 14px;
        }
      }
      & > .sub-found {
        width: 100%;
        margin-top: 20px;

        & > table {
          border-collapse: collapse;

          position: relative;
          width: 100%;

          @media screen and (max-width: 750px) {
            thead {
              display: none;
            }
            .tohide {
              display: none;
            }
            tbody {
              display: flex;
              flex-direction: column;
              tr {
                width: 90% !important;

                margin: 10px auto;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
              }
              td {
                height: max-content !important;
                padding: 10px;
                width: 100%;
                display: block;
                ::before {
                  content: attr(data-attr);
                  padding: 5px 0;
                  color: #111;
                  display: block;
                  font-weight: 600;
                }
              }
            }
          }
          & > thead {
            & > tr {
              background-color: #e9e9e9;
              width: 100%;
              & > th {
                height: 50px;
                color: #666;
                font-size: 14px;
                font-weight: 600;
                text-align: left;
              }
            }
          }
          & > tbody {
            & > tr {
              width: 100%;
              :hover td {
                background-color: #dae8fe;
                color: var(--theme) !important;
              }
              & > td {
                height: 50px;
                color: #aaa;
                font-size: 14px;
                font-weight: 400;
              }
              & > td:nth-child(1) {
                padding-left: 10px;
              }
            }
          }
        }
      }
      & > .content3 {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        & > .color {
          display: flex;
          padding: 15px 0;
          gap: 10px;
          width: 100%;
          position: relative;
          flex-wrap: wrap;
          justify-content: center;

          & > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 25px;
            padding: 15px 0;
            border-radius: 10px;
            width: 25%;
            width: 160px;
            & > img {
              height: 35px;
              width: 35px;
            }
            & > h5 {
              font-weight: 600;
            }
            & > p {
              font-weight: 600;
              font-size: 14px;
            }
          }
          & > div:nth-child(1),
          & > div:nth-child(5) {
            background-color: #fbf1ba;
            h5 {
              color: #f5dc56;
            }
            p {
              color: #f5dc56;
            }
          }
          & > div:nth-child(2),
          & > div:nth-child(3) {
            background-color: #b9d6fb;
            h5 {
              color: #4893f5;
            }
            p {
              color: #4893f5;
            }
          }
          & > div:nth-child(4) {
            background-color: #c0e8d9;
            h5 {
              color: #54c299;
            }
            p {
              color: #54c299;
            }
          }

          & > div:nth-child(6) {
            background-color: #f4b2b2;
            h5 {
              color: #dc1515;
            }
            p {
              color: #dc1515;
            }
          }
        }
        & > .non_color {
          display: flex;
          flex-wrap: wrap;
          position: relative;
          width: 100%;
          gap: 15px;
          padding-bottom: 15px;
          & > div {
            padding: 25px 15px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: calc(50% - 15px);
            border: 2px solid #ddd;
            & > h1 {
              font-size: 18px;
              font-weight: 600;
            }
            p {
              color: #999;
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
      & > .content4 {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        padding-top: 15px;

        & > .non_color {
          display: flex;
          position: relative;
          width: 100%;
          gap: 15px;
          padding-bottom: 15px;
          & > div {
            padding: 25px 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 33%;
            border: 2px solid #ddd;
            position: relative;

            & > h1 {
              font-size: 18px;
              font-weight: 600;
              margin: auto;
            }
            p {
              color: #999;
              font-size: 16px;
              font-weight: 600;
              width: 80%;
              margin: auto;
              text-align: center;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
`;
const Submission = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  margin-bottom: 20px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    & > .drop {
      & > h1 {
        font-size: 18px;
        color: #333;
        padding: 15px 20px;
        background-color: #f6f5f4;
        border-radius: 10px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        & > p {
          font-size: 14px;
        }
      }
      & > .content {
        & > div {
          padding-top: 20px;
          & > ul {
            list-style: none;
            & > li {
              display: flex;
              justify-content: space-between;
              color: #aaa;
              font-size: 14px;
              font-weight: 600;
              padding: 10px 20px;
            }
            & > li:last-of-type {
              background-color: #f6f5f4;
              color: #333;
              padding: 20px;
            }
          }
        }
      }
    }
    & > .empty {
      height: 20px;
    }
  }
`;
const SubmissionEvents = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  margin-bottom: 20px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    & > .drop {
      & > .h1_with_right {
        font-size: 18px;
        color: #333;
        padding: 15px 20px;
        background-color: #f6f5f4;
        border-radius: 10px;
        font-weight: 500;
        display: flex;
        align-items: center;
        & > .flex {
          flex: 1;
        }
        & > p {
          font-size: 14px;
          float: right;
          font-weight: 600;
        }
        & > button {
          padding: 8px 20px;
          border-radius: 5px;
          margin-left: 10px;
          float: right;
          font-weight: 600;
        }
      }
      & > .content {
        & > div {
          padding-top: 20px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          & > img {
            width: 90%;
            object-fit: cover;
            margin: auto;
            max-width: 300px;
          }
          & > h1 {
            font-size: 18px;
            color: #111;
            margin: auto;
            padding: 15px;
            font-weight: 700;
          }
          & > p {
            color: #666;
            text-align: center;
            padding-bottom: 5px;
            font-size: 14px;
          }
          & > button {
            width: 90%;
            padding: 8px 20px;
            border-radius: 5px;
            font-size: 16px;
            float: right;
            font-weight: 600;
            background-color: var(--theme);
            color: white;
            display: flex;
            align-items: center;
            border: none;
            outline: none;
            margin: 10px auto;
            justify-content: center;
            & > img {
              margin-right: 10px;
              height: 20px;
            }
          }
        }
      }
    }
  }
`;
const CardMyProject = styled.div`
  padding: 10px;
  background-color: #e9e9e9;
  border-radius: 10px;
  display: flex;
  width: calc(100% - 20px);
  position: relative;
  margin: auto;
  margin-bottom: 20px;
  max-width: 350px;

  .left {
    width: 40%;
    position: relative;
    & > img {
      border-radius: 10px;
      width: 100%;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 10px;
    & > h3 {
      color: #333;
      font-weight: 600;
    }
    & > h5 {
      font-weight: 600;
      color: #999;
    }
    & > .bar {
      border-radius: 10px;
      width: 100%;
      height: 5px;
      background-color: #999;
      position: relative;
      & > div {
        width: 40%;
        height: 100%;
        background-color: #2db482;
        border-radius: 10px;
      }
    }
  }
`;
