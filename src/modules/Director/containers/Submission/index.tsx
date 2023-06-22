import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import girl from "../../../../assets/images/organizer dashboard/girl.svg";
import ViewProjectPopup from "./ViewProjectPopup";
import { Submission } from "../../../Organizer/containers/OrganizerDashboard/Styled";
import SelectHTMLTag from "../../../../core/commonComponents/SelectOptions/SelectOptions";
import { useMutation, useQuery } from "react-query";
import {
  getDirectorMyProject,
  getDirectorMySubmission,
} from "../../../../core/Api/Api";
import SelectAndOptionHTMLTag from "../../../../core/commonComponents/SelectAndOptionHTMLTag/SelectOptions";
import moment from "moment";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const status = [
  "All Status",
  "Undecided",
  "Selected",
  "Not Selected",
  "Award Winner",
  "Finalist",
  "Semi-Finalist",
  "Quarter-Finalist",
  "Nominee",
  "Honorable Mention",
];
const Project = ["Select Project", "DOLIMA"];

const projectList = ["Select Project", "Sample Project"];
const statusList = [
  "All Status",
  "In Consideration",
  "Incomplete",
  "Disqualified",
  "Withdrawn",
];

export default function DirectorSubmission() {
  const [projectPopup, setViewProjectPopup] = useState(false);
  const [statusTag, setStatusTag] = useState<string>();
  const [project, setProject] = useState<string>();

  const searchTerm = useRef<any>();

  const { mutate, data: submissionData } = useMutation(
    "directorMySubmission",
    getDirectorMySubmission,
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const postRequest = () => {
    const data = {
      page: 1,
      project: project || "",
      resPerPage: 10,
      search_terms: searchTerm?.current?.value,
      status: statusTag || "",
    };

    mutate(data);
  };
  useEffect(() => {
    postRequest();
  }, [project, statusTag]);

  const statusTagHandler = (value: any) => {
    setStatusTag(value);
  };
  const projectHandler = (value: any) => {
    setProject(value);
  };
  const handleViewPopup = () => {
    setViewProjectPopup(false);
  };
  //project ---htmltag data
  const { data: projectdata } = useQuery(
    "directorMyProject",
    getDirectorMyProject,
    {
      onSuccess: (res) => {},
      onError: (err) => {},
      select: (res) => {
        const newArray = res?.map((ele: any) => {
          return { option: ele.projectTitle, value: ele._id };
        });
        newArray.unshift({ option: "Select Project", value: "" });
        console.log(newArray);
        return newArray;
      },
    }
  );

  //html tag

  const [age, setAge] = React.useState<any>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    console.log(event.target.value);
    setProject(event.target.value as string);
  };

  return (
    <>
      <SubmissionWrapper>
        <div>
          <div className="season">
            <h1 className="heading">SUBMISSION</h1>
          </div>

          <div className="select">
            <div>
              <h3>Status</h3>
              <div
                className="select_box"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.23) ",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <SelectAndOptionHTMLTag
                  prop={statusTagHandler}
                  option={statusList}
                />
              </div>
            </div>
            <div>
              <h3>Project </h3>
              <div
                className="select_box"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.23) ",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <SelectWrapper>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {projectdata?.map((ele: any) => {
                          return (
                            <MenuItem id={ele} value={ele.value}>
                              {ele.option}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </SelectWrapper>
              </div>
              {/* <div className="select_box">

                <SelectAndOptionHTMLTag
                  prop={projectHandler}
                  option={projectdata}
                />
              </div> */}
            </div>
            <div className="search_box select_box2">
              <div className="search">
                <div>
                  <input
                    ref={searchTerm}
                    placeholder="Search by event name"
                  ></input>
                  <button
                    className="search_btn"
                    onClick={() => {
                      postRequest();
                    }}
                  >
                    Search
                  </button>
                  <button
                    className="clear_btn"
                    onClick={() => (searchTerm.current.value = "")}
                  >
                    Clear search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            {!submissionData?.length ? (
              <>
                <img src={girl}></img>
                <h2>No Submissions found</h2>
                <p>Try submitting your project to festivals</p>
              </>
            ) : (
              <>
                <div className="sub-found">
                  <table>
                    <thead>
                      <tr>
                        <th
                          style={{ width: "5%", padding: " 0 10px" }}
                          className="tohide"
                        >
                          Action{" "}
                        </th>
                        <th style={{ width: "30%" }}>Festival</th>
                        <th style={{ width: "30%" }}>Project</th>
                        <th style={{ width: "13.3%" }}>Notification Date</th>
                        <th style={{ width: "13.33%" }}>Submission Status</th>
                        <th style={{ width: "13.33%" }}>Judging Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissionData?.map((ele: any) => {
                        return (
                          <tr
                            id={ele._id}
                            onClick={() => setViewProjectPopup(true)}
                          >
                            <td data-attr="Action" className="tohide">
                              <div className="link">
                                <i className="ri-eye-fill"></i>
                              </div>
                            </td>
                            <td data-attr="Festival">
                              {ele.festival.event_name}
                            </td>
                            <td data-attr="Project">
                              <div>{ele.selectedProject.projectTitle}</div>
                            </td>
                            <td data-attr="Notification Date">
                              <div>
                                {moment(ele.festival.notification_date).format(
                                  "DD MMMM YYYY"
                                )}
                              </div>
                            </td>
                            <td data-attr="Submission Status">
                              {ele.submissionStatus}
                            </td>
                            <td data-attr="Judging Status">
                              {ele.judgingStaus}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="pagination">
                    <div>
                      <i className="ri-arrow-left-s-fill"></i>
                      <i className="ri-arrow-left-s-line"></i>
                      <div className="no">1</div>
                      <i className="ri-arrow-right-s-line"></i>
                      <i className="ri-arrow-right-s-fill"></i>
                    </div>
                    <div className="tohide">
                      <p>1 of 1 Page</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </SubmissionWrapper>
      {projectPopup && <ViewProjectPopup viewProject={handleViewPopup} />}
    </>
  );
}

const SubmissionWrapper = styled.div`
  width: 100vw;
  background-color: var(--background);
  padding-bottom: 20px;
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-radius: 10px;
  }

  & > div {
    max-width: var(--maxwidth2);
    background-color: white;
    margin: auto;
    padding: 20px;
    box-shadow: 0px 3px 10px 3px rgba(0, 0, 0, 0.1);

    & > .season {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
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
      & > .heading {
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-self: flex-start;
      }
    }
    & > .search_box {
      max-width: var(--maxwidth3);
      margin: auto;
      padding: 3px 0 0px 0;

      & > .search {
        & > div {
          width: 90%;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          & > input {
            width: 56%;
            margin-right: 20px;
            border-radius: 10px;
            height: 45px;
            border: 1px solid var(--heading5);
            padding: 0 10px 2px 10px;
          }
          .search_btn {
            display: flex;
            align-items: center;
            padding: 20px 40px;
            background-color: var(--theme);
            height: 36px;
            font-size: 14px;
            line-height: 24px;
            color: var(--heading1);
            outline: none;
            border: none;
            margin-right: 24px;
            font-weight: 600;
            border-radius: 5px;
            color: white;
            text-decoration: none;
          }
          .clear_btn {
            display: flex;
            align-items: center;
            padding: 17px 28px;
            height: 36px;
            font-size: 16px;
            line-height: 24px;
            color: var(--heading1);
            color: #333;
            outline: none;
            border: 2px solid #333;
            font-weight: 600;
            border-radius: 5px;
            text-decoration: none;
          }
        }
      }
    }
    & > .select {
      width: 100%;
      display: flex;
      padding: 20px 0;
      gap: 10px;
      @media screen and (max-width: 950px) {
        flex-wrap: wrap;
      }
      fieldset {
        border: none !important;
      }

      & > div {
        border-radius: 10px;
        width: 28%;
        @media screen and (max-width: 520px) {
          width: 100%;
          & > .select_box {
            padding: 0 !important;
          }
        }
        & > h3 {
          font-size: 14px;
          color: #111;
          font-weight: 500;
          padding-bottom: 10px;
        }
        & > .select_box {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          position: relative;
          & > h2 {
            font-size: 14px;
            color: #111;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            width: 100%;
            pointer-events: none;
            & > i {
              font-size: 18px;
            }
            & > .date {
              height: 100%;
              width: 100%;
              border: none;
              outline: none;
              pointer-events: all;
            }
          }

          & > .option {
            position: absolute;
            display: none;
            top: 0;
            left: 0;
            padding: 10px 0;
            width: 100%;
            box-shadow: 2px 2px 5px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            & > ul {
              width: 100%;
              list-style: none;
              pointer-events: none;
              & > li {
                width: 100%;
                padding: 10px;
                background-color: white;
                :hover {
                  background-color: #ddd;
                }
              }
            }
          }
        }
        & > .select_box2 {
          border-radius: 10px;
          border: 1px solid #ddd;
        }
      }
      & > .search_box {
        max-width: var(--maxwidth3);
        margin: auto;
        padding: 3px 0 0px 0;
        width: 100%;
        margin: 0;
        margin-top: auto;
        min-width: 300px;
        & > .search {
          & > div {
            row-gap: 10px;
            margin: auto;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            @media screen and (max-width: 540px) {
              flex-wrap: wrap;
              justify-content: space-between;

              input {
                width: 100% !important;
                margin-right: 0 !important;
              }
            }
            & > input {
              min-width: 200px;
              width: 65%;
              margin-right: 10px;
              border-radius: 10px;
              height: 50px;
              border: 1px solid #ccc;
              padding: 0 10px 2px 10px;
            }
            .search_btn {
              display: flex;
              align-items: center;
              padding: 20px 40px;
              background-color: var(--theme);
              height: 36px;
              font-size: 14px;
              line-height: 24px;
              color: var(--heading1);
              outline: none;
              border: none;
              margin-right: 10px;
              font-weight: 600;
              border-radius: 5px;
              color: white;
              text-decoration: none;
            }
            .clear_btn {
              white-space: nowrap;
              display: flex;
              align-items: center;
              padding: 17px 28px;
              height: 36px;
              font-size: 16px;
              line-height: 24px;
              color: var(--heading1);
              color: #333;
              outline: none;
              border: 2px solid #333;
              font-weight: 600;
              border-radius: 5px;
              text-decoration: none;
            }
          }
        }
      }
    }
    & > .body {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      position: relative;
      width: 100%;
      margin-top: 20px;
      & > img {
        width: 13%;
        min-width: 300px;
      }
      & > h2 {
        font-size: 20px;
        font-weight: 700;
      }
      & > p {
        font-size: 14px;
        font-weight: 400;
        padding-bottom: 10px;
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
              border-bottom: 2px solid #eee;

              :hover td {
                background-color: #dae8fe;
                /* color: var(--theme) !important; */
              }
              & > td {
                height: 50px;
                font-size: 14px;
                color: #111;
                font-size: 15px;
                font-weight: 500;
                i {
                  color: #666;
                  font-size: 20px;
                }
                & > * {
                  font-size: inherit;
                  font-weight: inherit;
                  color: inherit;
                }
                .detail {
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                  padding: 5px 0 20 px 0;

                  & > p {
                    font-weight: 500;
                  }
                  & > h4 {
                    font-weight: 600;
                  }
                }
                .preview {
                  padding: 8px 22px;
                  border: none;
                  outline: none;
                  border-radius: 5px;
                  background-color: var(--theme);
                  color: white;
                  font-size: 16px;
                }
              }
              & > td:nth-child(1) {
                padding-left: 10px;
              }
            }
          }
        }
        & > .pagination {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 20px 20px 0px 20px;
          @media screen and (max-width: 750px) {
            .tohide {
              display: none !important;
            }
            & > div {
              margin: auto !important;
            }
          }
          & > div {
            display: flex;
            gap: 20px;
            align-items: center;
            .no {
              height: 40px;
              width: 40px;
              background-color: var(--theme);
              font-size: 16px;
              font-weight: 500;
              border-radius: 50%;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            & > i {
              color: #666;
              font-size: 20px;
            }
            p {
              color: #666;
            }
          }
        }
      }
    }
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  .css-ece9u5 {
    min-width: 100px;
  }
  .MuiFormControl-root {
    width: 100%;
  }
  .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root {
    border-radius: 10px;
    border-color: #999;
  }
  .css-1869usk-MuiFormControl-root {
    margin: 8px 0;
  }
  .MuiSelect-outlined {
    padding: 13.5px 14px;
  }
`;
