import React, { useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import girl from "../../../..//assets/images/organizer dashboard/girl.svg";
import Selection from "../../../../core/commonComponents/Selection/Selection";
import SelectHTMLTag from "../../../../core/commonComponents/SelectOptions/SelectOptions";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAllSeasonsDetails,
  getOrganizerSubmission,
} from "../../../../core/Api/Api";
import SelectAndOptionHTMLTag from "../../../../core/commonComponents/SelectAndOptionHTMLTag/SelectOptions";
import DateRangeCalendar from "../../../../core/commonComponents/Daterange/DateRange";
import SubmissionCard from "./submissionCard";
import { queryClient } from "../../../..";
import LoadingPage from "../../../../core/commonComponents/LoadingFallback/Loading";
import EmptyData from "../../../../core/commonComponents/empty data pages/EmptyData";
// popupleft here selection
// localStorage.getItem("userId")

const JudgingStatus = [
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
const SubmissionStatus = [
  "All Status",
  "In Consideration",
  "Incomplete",
  "Disqualified",
  "Withdrawn",
];
const Category = ["All Category", "Animation Short Film"];

export default function OrganizerSubmission() {
  const [hasEvent, setHasEvent] = useState<boolean>(false);

  const [isDateRangeVisible, setIsDateRangeVisible] = useState<Boolean>(true);
  const [searchbox, setSearchBox] = useState<string>();
  const [judging, setJudging] = useState<string>();
  const [submission, setSubmission] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const searchValue = useRef<any>();

  const judgingHandler = (value: any) => {
    setJudging(value);
  };
  const submissionHandler = (value: any) => {
    setSubmission(value);
  };
  const categoryHandler = (value: any) => {
    setCategory(value);
  };
  const startDateHandler = (value: any) => {
    setStartDate(value);
  };
  const endDateHandler = (value: any) => {
    setEndDate(value);
  };

  const dataPost = {
    category: category || "",
    endDate: endDate || "",
    festivalid: localStorage.getItem("festivalId"),
    judge: judging || "",
    searchText: searchbox || "",
    startDate: startDate || "",
    submission: submission || "",
  };

  const { data: allSeasons, refetch } = useQuery(
    "getAllSeasonsDetails",
    getAllSeasonsDetails,
    {
      onSuccess: (res) => {
        if (res[0]?._id) {
          localStorage.setItem("festivalId", res[0]._id);
          setHasEvent(true);
        }
      },
      onError: (err) => {},
    }
  );

  const { mutate, data, isLoading } = useMutation(
    ["postOrganizerSubmission", dataPost],
    getOrganizerSubmission,
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log("err");
      },
    }
  );
  useEffect(() => {
    mutate(dataPost);
  }, [judging, category, endDate, startDate, submission]);

  const handleCalenderVisibility = () => setIsDateRangeVisible(false);

  const searchHandler = () => {
    mutate(dataPost);
  };

  return (
    <>
      {hasEvent ? (
        <>
          {isLoading && <LoadingPage />}
          {isDateRangeVisible && (
            <DateRangeCalendar
              propStart={startDateHandler}
              propEnd={endDateHandler}
              handleCalenderVisibility={handleCalenderVisibility}
            />
          )}

          <SubmissionBody>
            <div>
              <div className="season">
                <h1 className="heading">Submission</h1>
                <div>
                  <p>Season</p>
                  <select>
                    <option>Current season</option>
                  </select>
                </div>
              </div>
              <div className="search_box">
                <div className="search">
                  <div>
                    <input
                      ref={searchValue}
                      onClick={searchHandler}
                      placeholder="search festivals you wants to apply"
                      value={searchbox}
                      onChange={(e) => setSearchBox(e.target.value)}
                    ></input>
                    <button className="search_btn">Search</button>
                    <button className="clear_btn">Clear search</button>
                  </div>
                </div>
              </div>
              <div className="select">
                <div>
                  <h3>Judging Status</h3>
                  <div className="select_box">
                    <SelectAndOptionHTMLTag
                      prop={judgingHandler}
                      option={JudgingStatus}
                    />
                  </div>
                </div>
                <div>
                  <h3>
                    Submission Status <i className="ri-arrow-down-s-fill"></i>
                  </h3>
                  <div className="select_box">
                    <SelectAndOptionHTMLTag
                      prop={submissionHandler}
                      option={SubmissionStatus}
                    />
                  </div>
                </div>
                <div>
                  <h3>
                    Category <i className="ri-arrow-down-s-fill"></i>
                  </h3>
                  <div className="select_box">
                    <SelectAndOptionHTMLTag
                      prop={categoryHandler}
                      option={Category}
                    />
                  </div>
                </div>
                <div>
                  <h3>Date</h3>
                  <div className="select_box DateBox">
                    <h2
                      style={{
                        textAlign: "center",
                        pointerEvents: "all",
                      }}
                      onClick={() => {
                        setIsDateRangeVisible(true);
                      }}
                    >
                      {startDate} {endDate}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="body">
                {!data ? (
                  <>
                    <img src={girl}></img>
                    <h2>You Don't Have any Submissions</h2>
                    <p>Use Marketing options to reach more directors</p>
                  </>
                ) : (
                  <>
                    <div className="sub-found">
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: "30%", paddingLeft: "10px" }}>
                              Project{" "}
                            </th>
                            <th style={{ width: "5%" }}>Runtime</th>
                            <th style={{ width: "14%" }}>Judging Status</th>
                            <th style={{ width: "14%" }}>Submission Status</th>
                            <th style={{ width: "17%" }}>Date</th>
                            <th style={{ width: "10%" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((ele: any) => {
                            return <SubmissionCard id={ele?._id} data={ele} />;
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
                        <div>
                          <p>1 of 1 Page</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </SubmissionBody>
        </>
      ) : (
        <>
          <EmptyData
            subSection="view"
            title="You have not Created any event yet  If you have please refresh "
            button="create now"
            onClick={() => refetch()}
            seasonVisibility={false}
          />
        </>
      )}
    </>
  );
}

const SubmissionBody = styled.div`
  width: 100vw;
  background-color: var(--background);
  padding-bottom: 20px;
  .active {
    background-color: var(--background) !important;
  }
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-radius: 10px;
  }

  & > div {
    max-width: var(--maxwidth2);
    background-color: white;
    margin: auto;
    padding: 20px;
    box-shadow: 0px 3px 10px 3px rgba(0, 0, 0, 0.1);

    .select_box {
      border: 1px solid #ccc;
    }
    & > .season {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      @media screen and (max-width: 340px) {
        align-items: flex-start;
      }
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
          @media screen and (max-width: 880px) {
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            width: 100%;
            input {
              width: 100% !important;
              margin: auto;
              margin-right: 0 !important;
            }
          }
          @media screen and (max-width: 340px) {
            justify-content: flex-start;
            width: 100%;
          }
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
      @media screen and (max-width: 725px) {
        flex-wrap: wrap;
        justify-content: center;
        & > div {
          width: 45% !important;
        }
      }
      @media screen and (max-width: 450px) {
        flex-direction: column;
        justify-content: center;
        & > div {
          width: 100% !important;
        }
      }
      & > div {
        border-radius: 10px;
        width: 25%;
        & > h3 {
          font-size: 16px;
          color: #111;
          font-weight: 500;
          padding-bottom: 10px;
        }
        & > .select_box {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          border-radius: 10px;
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
            box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            & > ul {
              width: 100%;
              list-style: none;
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
        & > .DateBox {
          border: 1px solid #ccc;
          padding: 0 10px;
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
      min-height: 600px;
      & > img {
        width: 13%;
        min-height: 250px;
        min-width: 250px;
      }
      & > h2 {
        font-size: 20px;
        font-weight: 700;
      }
      & > p {
        font-size: 14px;
        font-weight: 500;
      }
      & > .sub-found {
        width: 100%;
        margin-top: 20px;
        overflow: auto;

        & > table {
          border-collapse: collapse;
          position: relative;
          width: 100%;
          justify-content: center;
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
                  color: var(--theme);
                  display: block;
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
                .relative {
                  position: relative;
                  width: 90%;
                  height: 90%;
                  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
                    border-radius: 10px;
                  }
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
