import React, { useState } from "react";
import review1 from "../../../../assets/images/organizer dashboard/review1.jpeg";
import caleder from "../../../../assets/images/organizer dashboard/caleder.svg";
import { Link, useNavigate } from "react-router-dom";
//content
import girl from "./../../../../assets/images/organizer dashboard/girl.svg"
import calender from "./../../../../assets/images/organizer dashboard/calender.svg"
import red from "./../../../../assets/images/organizer dashboard/red.svg"
import rd from "./../../../../assets/images/organizer dashboard/rd.svg"
import movie from "./../../../../assets/images/organizer dashboard/movie.svg"
import red_down from "./../../../../assets/images/organizer dashboard/red_down.svg"
import green from "../../../../assets/images/organizer dashboard/green.svg"
import { OrganizerBody, CurrentSeason, Profile, Submission, SubmissionEvents } from './Styled'
import Withdraw from './Withdraw'
import UserProfile from './UserProfile'
import { useMutation, useQuery } from 'react-query'
import { getAllSeasonsDetails, getOrganizerDashboard } from '../../../../core/Api/Api'
import EditDetail from '../../../../core/commonComponents/OrganizerMyFestival/EditDetail'
// import EmptyData from '../../../../core/commonComponents/empty data pages/EmptyData'
// import Withdraw from './Withdraw'
// popupleft here

export default function OrganizerDashboard() {
  const routeTo = useNavigate();
  const handleToggleWithdraw = () => {
    setWithdraw(false);
  };
  const [withdraw, setWithdraw] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  const { data: allSeasons } = useQuery(
    "getAllSeasonsDetails",
    getAllSeasonsDetails,
    {
      onSuccess: (res) => {
        console.log(res);
        if (res[0]?._id) {
          localStorage.setItem("festivalId", res[0]?._id);
          setDashboard(true);
          mutate();
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const { mutate, data } = useMutation("hjk", getOrganizerDashboard, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      {withdraw && <Withdraw toggleWithdraw={handleToggleWithdraw}></Withdraw>}

      {dashboard ? (
        <>
          <OrganizerBody>
            <div className="season">
              <div>
                <p>Season</p>
                <select>
                  <option>Current season</option>
                </select>
              </div>
            </div>
            <div className="inner_body">
              <div className="left">
                <UserProfile />

                <SubmissionEvents>
                  <div>
                    <div className="drop">
                      <h1>Upcoming Dates </h1>
                      <div className="content">
                        <div>
                          <img src={caleder}></img>
                          <h1>No Upcoming Event</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </SubmissionEvents>
              </div>
              <div className="middle">
                <CurrentSeason>
                  <div>
                    <div className="drop">
                      <h1>Current Season</h1>
                      <div className="content">
                        <div className="table">
                          <ul>
                            <li>
                              <p>Gross sales (INR) </p>
                              <p>₹ {data?.sales?.gross_sales}.00</p>
                            </li>
                            <li>
                              <p>Company Charges (1%) </p>
                              <p>₹ {data?.sales?.filmfestival_charges}.00</p>
                            </li>
                            <li>
                              <p>Transaction Charges (3%) </p>
                              <p>₹ {data?.sales?.other_charges}.00</p>
                            </li>
                            <li>
                              <p>Net Sales </p>
                              <p>₹ {data?.sales?.netsales}.00</p>
                            </li>
                          </ul>
                        </div>
                        <button className="report">
                          <i className="ri-file-text-line"></i>
                          View Sales Report
                        </button>
                        <div className="sale">
                          <h4>Sales</h4>
                          <p>0%</p>
                        </div>

                        <h3>₹ 0</h3>

                        <div className="chart">
                          <div>
                            <h5>6</h5>
                            <div></div>
                          </div>
                          <div>
                            <h5>5</h5>
                            <div></div>
                          </div>
                          <div>
                            <h5>4</h5>
                            <div></div>
                          </div>
                          <div>
                            <h5>3</h5>
                            <div></div>
                          </div>
                          <div>
                            <h5>2</h5>
                            <div></div>
                          </div>
                          <div>
                            <h5>1</h5>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="drop">
                      <h1 className="h1_with_right">
                        Payout
                        <div className="flex"></div>
                        <p>Balance : {data?.balance}.00 ₹</p>
                        <button
                          onClick={() => {
                            setWithdraw(true);
                          }}
                        >
                          Withdraw
                        </button>
                      </h1>
                      <div className="content2">
                        <img src={girl}></img>
                        <h1>Don't have any payout information</h1>
                      </div>
                      <div className="sub-found">
                        <table>
                          <thead>
                            <tr>
                              <th style={{ width: "20%", paddingLeft: "10px" }}>
                                Date
                              </th>
                              <th style={{ width: "50%" }}>Method</th>
                              <th style={{ width: "15%" }}>Status</th>
                              <th style={{ width: "15%" }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>24 August 2021</td>
                              <td>PayPal</td>
                              <td>Pending</td>
                              <td>₹ 4860</td>
                            </tr>
                            <tr>
                              <td>24 August 2021</td>
                              <td>PayPal</td>
                              <td>Pending</td>
                              <td>₹ 4860</td>
                            </tr>
                            <tr>
                              <td>24 August 2021</td>
                              <td>PayPal</td>
                              <td>Pending</td>
                              <td>₹ 4860</td>
                            </tr>
                            <tr>
                              <td>24 August 2021</td>
                              <td>PayPal</td>
                              <td>Pending</td>
                              <td>₹ 4860</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="drop">
                      <h1>All Time History</h1>
                      <div className="content3">
                        <div className="color">
                          <div>
                            <img src={calender}></img>
                            <h5>{data?.allTimeHistory?.total_season}</h5>
                            <p>Total Season</p>
                          </div>
                          <div>
                            <img src={movie}></img>
                            <h5>{data?.allTimeHistory?.total_submission}</h5>
                            <p>Total Submissions</p>
                          </div>
                          <div>
                            <img src={red}></img>
                            <h5>₹ {data?.allTimeHistory?.total_gross}.00</h5>
                            <p>Total Gross</p>
                          </div>
                          <div>
                            <img src={rd}></img>
                            <h5>₹ {data?.allTimeHistory?.net_gross}.00</h5>
                            <p>net Gross</p>
                          </div>
                        </div>
                        <div className="non_color">
                          <div>
                            <h1>
                              {data?.allTimeHistory?.avg_season_submission}.00
                            </h1>
                            <p>Average Season Submission</p>
                          </div>
                          <div>
                            <h1>{data?.allTimeHistory?.avg_season_gross}.00</h1>
                            <p>Average Season Gross</p>
                          </div>
                          <div>
                            <h1>
                              {
                                data?.allTimeHistory
                                  ?.heightest_season_submission
                              }
                              .00
                            </h1>
                            <p>Highest Season Submission</p>
                          </div>
                          <div>
                            <h1>
                              {data?.allTimeHistory?.heightest_season_gross}.00
                            </h1>
                            <p>Highest Season Gross</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="drop">
                      <h1>Judging Insights</h1>
                      <div className="content4">
                        <div className="non_color">
                          <div>
                            <h1>{data?.allJudging?.submissionjudge}</h1>
                            <p> Submission Judged</p>
                          </div>
                          <div>
                            <h1>{data?.allJudging?.submissionnotjudge}</h1>
                            <p>Submission Not Judged</p>
                          </div>
                          <div>
                            <h1>{data?.allJudging?.percentagejudge} %</h1>
                            <p>Percentage Judged</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="drop">
                      <h1>All Time History</h1>
                      <div className="content2">
                        <h1>Don't Have any submission</h1>
                      </div>
                    </div>
                  </div>
                </CurrentSeason>
              </div>
              <div className="right">
                <Submission>
                  <div>
                    <div className="drop">
                      <h1>
                        Submission <p>View All</p>
                      </h1>
                      <div className="content">
                        <div>
                          <ul>
                            <li>
                              <p>Last 7 days </p>
                              <div>
                                <div>
                                  <img src={red_down}></img>
                                  <p>20%</p>
                                </div>
                                <p>-10</p>
                              </div>
                            </li>
                            <li>
                              <p>Last 30 days </p>
                              <div>
                                <div>
                                  <img src={green}></img>
                                  <p>20%</p>
                                </div>
                                <p>+15</p>
                              </div>
                            </li>
                            <li className="last_list">
                              <p>Undecided </p>
                              <div>
                                <div>
                                  <img
                                    style={{ visibility: "hidden" }}
                                    src={green}
                                  ></img>
                                  <p>20%</p>
                                </div>
                                <p>+15</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Submission>
                <Submission>
                  <div>
                    <div className="drop">
                      <h1>Submission By Location</h1>
                      <div className="content">
                        <div>
                          <ul>
                            <li>
                              <p>India </p>
                              <div>
                                <div>
                                  <img src={red_down}></img>
                                  <p>20%</p>
                                </div>
                                <p>-10</p>
                              </div>
                            </li>
                            <li>
                              <p>United state </p>
                              <div>
                                <div>
                                  <img src={green}></img>
                                  <p>20%</p>
                                </div>
                                <p>+15</p>
                              </div>
                            </li>
                            <li>
                              <p>Canada </p>
                              <div>
                                <div>
                                  <img src={green}></img>
                                  <p>20%</p>
                                </div>
                                <p>+15</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Submission>
              </div>
            </div>
          </OrganizerBody>
        </>
      ) : (
        <>
          {/* <EmptyData
            subSection="view"
            title="You have not Created any event yet "
            button="create now"
            seasonVisibility={true}
            onClick={() => routeTo("/organizer/my-festival", { state: "view" })}
          /> */}
          <EditDetail/>
        </>
      )}
    </>
  );
}
