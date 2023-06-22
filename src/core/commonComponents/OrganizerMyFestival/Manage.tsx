import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import { CardReview } from './CardDetail'
import { useLocation, useNavigate } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//content

import icon2 from "../../../assets/images/organizer dashboard/2.svg";
import icon1 from "../../../assets/images/organizer dashboard/1.svg";
import icon3 from "../../../assets/images/organizer dashboard/3.svg";
import icon4 from "../../../assets/images/organizer dashboard/4.svg";
import icon5 from "../../../assets/images/organizer dashboard/5.svg";
import icon6 from "../../../assets/images/organizer dashboard/6.svg";
import icon7 from "../../../assets/images/organizer dashboard/7.svg";
import icon8 from "../../../assets/images/organizer dashboard/8.svg";
import icon9 from "../../../assets/images/organizer dashboard/9.svg";
import pen from "../../../assets/images/organizer dashboard/pen.svg";
import arrow from "../../../assets/images/organizer dashboard/arrow.svg";
import email_img from "../../../assets/images/organizer dashboard/email.svg";
import message from "../../../assets/images/organizer dashboard/message.svg";
import Rectangle from "../../../assets/images/organizer dashboard/Rectangle 55.png";
import money from "../../../assets/images/organizer dashboard/money.svg";
import greeni from "../../../assets/images/organizer dashboard/greeni.svg";
import red_delete from "../../../assets/images/organizer dashboard/red_delete.svg";
import star from "./../../../assets/images/organizer dashboard/star.svg";
import star_grey from "./../../../assets/images/organizer dashboard/star_grey.svg";
import review_pic from "./../../../assets/images/organizer dashboard/review_pic.svg";
import ComposemailPopup from "./ComposeMailPoppup";
import { useMutation, useQuery } from "react-query";
import {
  getOrganizerFestival,
  getOrganizerManageComposeEmail,
  getOrganizerReviews,
  getOrganizerReviewsManageConfirmMessage,
  getOrganizerReviewsManageReviews,
  patchOrganizerReviewManageConfirmMessage,
  patchOrganizerReviewManageNotificationPreference,
} from "../../Api/Api";
import ReviewCard from "./ReviewsCard";
import ReviewSectionCard from "./ReviewsCard";
import moment from "moment";
import LoadingPage from "../LoadingFallback/Loading";
import Result from "../Request result popup/Result";
import YesNoCondition from "../Yes no condition/YesNoCondition";
import EmptyData from "../empty data pages/EmptyData";

type ReactProp = {
  manageReview: boolean;
};
let promiseResolve: any;

export default function ManageFestival({ manageReview }: ReactProp) {
  const [notification, setNotification] = useState(true);
  const [email, useemail] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [review, setReview] = useState(false);
  const [compose, setCompose] = useState(false);
  const [activeCard, setActiveCard] = useState("Notification");

  const [hasEvent, setHasEvent] = useState<boolean>(false);
  const routeTo = useNavigate();

  const confirmMessage = useRef<any>();

  const { data, refetch: myFestivalRefetch } = useQuery(
    "Organizer-Festival",
    getOrganizerFestival,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        data?._id && setHasEvent(true);
      },
      onError: (error) => {},
    }
  );

  const renderSelector = (
    e: React.MouseEvent<HTMLDivElement | MouseEvent> | any,
    tab: React.MouseEvent<HTMLDivElement | MouseEvent> | any
  ) => {
    setNotification(false);
    useemail(false);
    setConfirm(false);
    setReview(false);
    tab(true);
  };

  const handleToggleCompose = () => {
    setCompose(false);
  };

  const activeTab = (card: string) => {
    setActiveCard(card);
  };

  useEffect(() => {
    if (manageReview) {
      setNotification(false);
      setReview(true);
      setActiveCard("Reviews");
    }
  }, []);

  //review

  //notification
  const { data: reviewData } = useQuery(
    "reviewDataOrganizer",
    getOrganizerReviews,
    {
      enabled: hasEvent,
      onSuccess: (res) => {},
      onError: (err) => {},
    }
  );

  const [resultData, setResultData] = useState<any>();
  const {
    mutate: changeNotificationPreferenceMutate,
    isLoading: prefrenceChangeIsLoading,
  } = useMutation(
    ["changenotipref"],
    patchOrganizerReviewManageNotificationPreference,
    {
      onSuccess: (res) => {
        setIsResultVisibleTwo(true);
        setResultData(res);
      },
    }
  );

  const { mutate: notificationStatusMutate, isLoading: statusChange } =
    useMutation(
      ["changenotistatus"],
      patchOrganizerReviewManageNotificationPreference,
      {
        onSuccess: (res) => {
          setIsResultVisibleTwo(true);
          setResultData(res);
        },
      }
    );

  const notificationPreference = (e: any) => {
    const promise = new Promise((resolve, reject) => {
      promiseResolve = resolve;
    });

    setYesNoPopup(true);
    promise.then(() => {
      const payload = {
        notiText: e.target.value,
      };
      changeNotificationPreferenceMutate(payload);
    });
  };
  const notificationStatus = (e: any) => {
    const payload = {
      emailType:
        e.target.parentNode.childNodes[1].childNodes[1].childNodes[0]
          .childNodes[1].childNodes[1].innerText,
      message: e.target.parentNode.childNodes[0].firstChild.value,
      projectSubtitle:
        e.target.parentNode.childNodes[1].childNodes[1].childNodes[0]
          .childNodes[2].value,
    };
    notificationStatusMutate(payload);
  };

  //confirm message

  const { data: message, isFetching: messageFetching } = useQuery(
    "getOrganizerReviewsManageConfirmMessage",
    getOrganizerReviewsManageConfirmMessage,
    { enabled: hasEvent }
  );
  const { mutate: confirmMessageMutate, isLoading } = useMutation(
    ["patchOrganizerReviewManageConfirmMessage"],
    patchOrganizerReviewManageConfirmMessage,
    {
      onSuccess: (res) => {
        setResultData(res);
        setIsResultVisibleTwo(true);
      },
      onError: (err: any) => {
        setResultData(err.response.data);
        setIsResultVisibleTwo(true);
      },
    }
  );

  const confirmMessageHandler = () => {
    const payload = {
      festivalid: localStorage.getItem("festivalId"),
      message: confirmMessage.current.value,
    };
    confirmMessageMutate(payload);
  };

  //reviews

  const {
    data: reviewsData,
    refetch: refetchReview,
    isFetching: reviewIsFetching,
  } = useQuery(
    "getOrganizerReviewsManageReviews",
    getOrganizerReviewsManageReviews,
    {
      enabled: hasEvent,
      onSuccess: (res) => {
        setResultData(res);
        setIsResultVisibleTwo(true);
      },
      onError: (err: any) => {
        console.log(err);
        setResultData(err.response.data);
        setIsResultVisibleTwo(true);
      },
    }
  );

  //email

  const {
    data: composeMail,
    refetch: refetchEmail,
    isFetching,
  } = useQuery(
    "getOrganizerManageComposeEmail",
    getOrganizerManageComposeEmail,
    {
      enabled: hasEvent,
      onSuccess: (res) => {},
    }
  );

  const [isResultVisibleTwo, setIsResultVisibleTwo] = useState<boolean>(false);
  const resultVisibilityTwoFalseHandler = () => {
    setIsResultVisibleTwo(false);
  };

  const [yesNoPopup, setYesNoPopup] = useState<boolean>();
  const yesNoPopupVisibilityHandler = () => {
    setYesNoPopup(false);
  };

  return (
    <>
      {hasEvent ? (
        <>
          {statusChange && <LoadingPage />}
          {prefrenceChangeIsLoading && <LoadingPage />}
          {isFetching && <LoadingPage />}
          {isLoading && <LoadingPage />}
          {messageFetching && <LoadingPage />}
          {reviewIsFetching && <LoadingPage />}

          {isResultVisibleTwo && (
            <Result
              state={resultData?.message ? "Success" : "Error"}
              description={
                resultData?.message
                  ? resultData?.message
                  : "Something Went Wrong"
              }
              showResult={resultVisibilityTwoFalseHandler}
            />
          )}

          {yesNoPopup && (
            <YesNoCondition
              togglePopup={yesNoPopupVisibilityHandler}
              promiseProp={promiseResolve}
              title="Are you want to change Notification Preference"
            />
          )}

          <ManageWrapper>
            <div className="selector_tab">
              <div className="tab">
                <button
                  className={` ${
                    activeCard == "Notification" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderSelector(e, setNotification);
                    activeTab("Notification");
                  }}
                >
                  <h2>Notification</h2>
                </button>
                <button
                  className={` ${
                    activeCard == "Submission" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderSelector(e, useemail);
                    activeTab("Submission");
                  }}
                >
                  <h2>Email Submission</h2>
                </button>
                <button
                  className={` ${
                    activeCard == "Message" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderSelector(e, setConfirm);
                    activeTab("Message");
                  }}
                >
                  <h2>Confirm Message</h2>
                </button>
                <button
                  className={` ${
                    activeCard == "Reviews" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderSelector(e, setReview);
                    activeTab("Reviews");
                  }}
                >
                  <h2>Reviews</h2>
                </button>
              </div>
            </div>

            {/*Tabs of content  */}

            {notification && (
              <div className="notification_tab">
                <div className="content">
                  <h1>Notification Prefrences</h1>
                  <p className="mb5">
                    Film festival company will automatically notify submitters
                    of the{" "}
                  </p>
                  <div>
                    <input
                      type="radio"
                      value="Notify entrants of their Judging Status only on my festival's Notification Date"
                      name="notifyType"
                      onChange={(e) => notificationPreference(e)}
                    ></input>
                    <h2>
                      Notify entrants of their Judging Status only on my
                      festival's Notification Date
                    </h2>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="Notify submitters immediately when their Judging Status is changed."
                      name="notifyType"
                      onChange={(e) => notificationPreference(e)}
                    ></input>
                    <h2>
                      Notify submitters immediately when their Judging Status is
                      changed.
                    </h2>
                  </div>
                </div>
                <div className="important">
                  <p>
                    <img src={icon1}></img>It is certainly the most famous
                    placeholder text even if there are different versions
                    distinguishable from the order in which the Latin words are
                    repeated.It is certainly the most famous placeholder text
                    even if there are different versions distinguishable from
                    the order in which the Latin words are repeated.It is
                    certainly the most famous placeholder text even if there are
                    different versions distinguishable from the order in which
                    the Latin words are repeated.
                  </p>
                </div>
                <div className="result">
                  <h1>Email Notification</h1>
                  <p>Tou can customize your email notificatin below:</p>
                  <div>
                    <ul>
                      <li>
                        <h2>Notification</h2>
                        <h2>Message</h2>
                        <h2>Modified</h2>
                        <h2>Action</h2>
                      </li>
                      <li>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              <h2>
                                <img src={icon2}></img>Selected
                              </h2>
                              <h2>Custom</h2>
                              <h2>2022-10-15</h2>
                              <h2 className="last">
                                <div>
                                  <img src={pen}></img>
                                  <h2>Edit</h2>
                                </div>
                              </h2>{" "}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="toopen">
                                <div>
                                  <div className="top">
                                    <textarea value="It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated."></textarea>
                                  </div>
                                  <div className="bottom">
                                    <img src={Rectangle}></img>
                                    <div className="content">
                                      <div>
                                        <h1>The Film of Awasome</h1>
                                        <div>
                                          <img src={icon2}></img>
                                          <p>Not Selected</p>
                                        </div>
                                        <textarea
                                          className="line"
                                          value="Project has Not Been Selected and can't include in festival."
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      notificationStatus(e);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </li>
                      <li>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              <h2>
                                <img src={icon3}></img>Selected
                              </h2>
                              <h2>Custom</h2>
                              <h2>2022-10-15</h2>
                              <h2 className="last">
                                <div>
                                  <img src={pen}></img>
                                  <h2>Edit</h2>
                                </div>
                              </h2>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="toopen">
                                <div>
                                  <div className="top">
                                    <textarea value="It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated."></textarea>
                                  </div>
                                  <div className="bottom">
                                    <img src={Rectangle}></img>
                                    <div className="content">
                                      <div>
                                        <h1>The Film of Awasome</h1>
                                        <div>
                                          <img src={icon2}></img>
                                          <p>Not Selected</p>
                                        </div>
                                        <textarea
                                          className="line"
                                          value="Project has Not Been Selected and can't include in festival."
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      notificationStatus(e);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </li>
                      <li>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              <h2>
                                <img src={icon4}></img>Selected
                              </h2>
                              <h2>Custom</h2>
                              <h2>2022-10-15</h2>
                              <h2 className="last">
                                <div>
                                  <img src={pen}></img>
                                  <h2>Edit</h2>
                                </div>
                              </h2>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="toopen">
                                <div>
                                  <div className="top">
                                    <textarea value="It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated."></textarea>
                                  </div>
                                  <div className="bottom">
                                    <img src={Rectangle}></img>
                                    <div className="content">
                                      <div>
                                        <h1>The Film of Awasome</h1>
                                        <div>
                                          <img src={icon2}></img>
                                          <p>Not Selected</p>
                                        </div>
                                        <textarea
                                          className="line"
                                          value="Project has Not Been Selected and can't include in festival."
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      notificationStatus(e);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </li>
                      <li>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              <h2>
                                <img src={icon5}></img>Selected
                              </h2>
                              <h2>Custom</h2>
                              <h2>2022-10-15</h2>
                              <h2 className="last">
                                <div>
                                  <img src={pen}></img>
                                  <h2>Edit</h2>
                                </div>
                              </h2>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="toopen">
                                <div>
                                  <div className="top">
                                    <textarea value="It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated."></textarea>
                                  </div>
                                  <div className="bottom">
                                    <img src={Rectangle}></img>
                                    <div className="content">
                                      <div>
                                        <h1>The Film of Awasome</h1>
                                        <div>
                                          <img src={icon2}></img>
                                          <p>Not Selected</p>
                                        </div>
                                        <textarea
                                          className="line"
                                          value="Project has Not Been Selected and can't include in festival."
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      notificationStatus(e);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </li>
                      <li>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              <h2>
                                <img src={icon6}></img>Selected
                              </h2>
                              <h2>Custom</h2>
                              <h2>2022-10-15</h2>
                              <h2 className="last">
                                <div>
                                  <img src={pen}></img>
                                  <h2>Edit</h2>
                                </div>
                              </h2>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="toopen">
                                <div>
                                  <div className="top">
                                    <textarea value="It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated."></textarea>
                                  </div>
                                  <div className="bottom">
                                    <img src={Rectangle}></img>
                                    <div className="content">
                                      <div>
                                        <h1>The Film of Awasome</h1>
                                        <div>
                                          <img src={icon2}></img>
                                          <p>Not Selected</p>
                                        </div>
                                        <textarea
                                          className="line"
                                          value="Project has Not Been Selected and can't include in festival."
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      notificationStatus(e);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </li>
                      <li>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              <h2>
                                <img src={icon7}></img>Selected
                              </h2>
                              <h2>Custom</h2>
                              <h2>2022-10-15</h2>
                              <h2 className="last">
                                <div>
                                  <img src={pen}></img>
                                  <h2>Edit</h2>
                                </div>
                              </h2>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="toopen">
                                <div>
                                  <div className="top">
                                    <textarea value="It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated."></textarea>
                                  </div>
                                  <div className="bottom">
                                    <img src={Rectangle}></img>
                                    <div className="content">
                                      <div>
                                        <h1>The Film of Awasome</h1>
                                        <div>
                                          <img src={icon2}></img>
                                          <p>Not Selected</p>
                                        </div>
                                        <textarea
                                          className="line"
                                          value="Project has Not Been Selected and can't include in festival."
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      notificationStatus(e);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {email && (
              <div className="notification_tab">
                <div className="content">
                  <h1>Email Submitters</h1>
                  <p className="mb5">
                    Send a custom email to our submitters during a current entry
                    season , upto 2 weeks before your Event Date
                  </p>
                </div>
                <div className="important mb20">
                  <p>
                    <img src={icon1}></img>It is certainly the mo there are
                    different versions distinguishable from the order in which
                    the Latin words are repeated.
                  </p>
                </div>
                <div className="newmail">
                  <button
                    onClick={() => {
                      setCompose(true);
                    }}
                  >
                    <img src={message}></img> Compose New Mail
                  </button>
                  {!composeMail.length ? (
                    <div className="content_email">
                      <img src={email_img}></img>
                      <h1>No Email Found</h1>
                      <p>Add email to see them here</p>
                    </div>
                  ) : (
                    <div className="sub-found">
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: "70%", paddingLeft: "10px" }}>
                              Message
                            </th>
                            <th style={{ width: "15%" }}>Reciptants</th>
                            <th style={{ width: "15%" }}>Sent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {composeMail.map((ele: any) => {
                            return (
                              <tr id={ele._id}>
                                <td>{ele.message}</td>
                                <td>All Submitters(67)</td>
                                <td>
                                  {moment(ele.updatedAt).format("YYYY-MM-DD")}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="content_email">
                    <button onClick={() => refetchEmail()}>Reload ?</button>
                  </div>
                </div>
              </div>
            )}

            {confirm && (
              <div className="notification_tab">
                <div className="content">
                  <h1>Submission Confirmation Message</h1>
                  <p className="mb15">
                    Film festivalcompany will automaticaly notify submitters of
                    the{" "}
                  </p>
                  <p className="mb5">
                    Film festivalcompany will automaticaly notify submitters of
                    the{" "}
                  </p>
                </div>
                <div className="important mb20">
                  <p>
                    <img src={icon1}></img>I orders are repeated.It is certainly
                    the most famous placeholder text even if there are different
                    versions distinguishable from the order in which the Latin
                    words are repeated.
                  </p>
                </div>
                <p className="mb5">Message </p>

                <textarea
                  ref={confirmMessage}
                  className="top"
                  style={{ width: "100%", outline: "none" }}
                >
                  {/* <p>
            Hi, Thanks for contacting ASK Film Festival
            <br></br>
            for more information about this festival
            <br></br>
            Contact :-  9284460667
            <br></br>
            visit the website :- http://www.filmfestival.com
            <br></br>
            Email :- askajay3@gmail.com
            </p> */}
                </textarea>
                <button
                  onClick={() => {
                    confirmMessageHandler();
                  }}
                >
                  Save{" "}
                </button>
              </div>
            )}
            {review && (
              <div className="notification_tab">
                <div className="content">
                  <h1>Reviews</h1>
                  <p className="mb5">
                    upload Laurel image for easy distribution for your laurel
                    reciptants
                  </p>
                </div>
                <div className="important mb20 light_green">
                  <p className="light_green">
                    <img src={greeni}></img>It is certainly the mo there are
                    different versions distinguishable from the order in which
                    the Latin words are repeated.
                  </p>
                </div>
                <div className="newmail">
                  {!reviewsData?.length && (
                    <div className="content_email">
                      <img src={money}></img>
                      <h1>No Email Found</h1>
                      <p>Add email to see them here</p>
                    </div>
                  )}
                  <div className="review_found">
                    {reviewsData?.length && (
                      <h1>Reviews({reviewsData?.length})</h1>
                    )}
                    {reviewsData?.map((ele: any) => {
                      return <ReviewSectionCard id={ele?._id} {...ele} />;
                    })}
                  </div>
                  <div className="content_email">
                    <button onClick={() => refetchReview()}>Reload ?</button>
                  </div>
                </div>
              </div>
            )}
            {compose && (
              <ComposemailPopup
                toggleCheckout={handleToggleCompose}
              ></ComposemailPopup>
            )}
          </ManageWrapper>
        </>
      ) : (
        <>
          <EmptyData
            subSection="edit"
            title="You have not Created any event yet "
            button="create now"
            onClick={() => routeTo("/organizer/my-festival", { state: "edit" })}
            seasonVisibility={false}
          />
        </>
      )}
    </>
  );
}

const ManageWrapper = styled.div`
  width: 100vw;
  background-color: var(--background);

  h1 {
    font-size: 20px;
    color: #111;
    font-weight: 700;
    padding: 4px 0;
  }
  h2 {
    font-size: 14px;
    color: #111;
    padding: 4px 0;
    font-weight: 600;
  }
  p {
    font-size: 14px;
    padding: 4px 0;
    color: #111;
    font-weight: 400;
  }
  .p4 {
    padding: 4px 0;
  }
  .p5 {
    padding: 5px 0;
  }
  .p8 {
    padding: 8px 0;
  }
  .mb5 {
    margin-bottom: 5px;
  }
  .mb15 {
    margin-bottom: 15px !important;
  }
  .mb20 {
    margin-bottom: 20px !important;
  }
  .green {
    color: #2db482;
  }
  .light_green {
    background-color: #dafef1 !important;
    color: #2db482 !important;
  }

  & > .selector_tab {
    max-width: var(--maxwidth2);
    padding: 0;
    background-color: inherit;
    box-shadow: none;
    z-index: 999;
    position: sticky;
    top: 166px;
    background-color: var(--background);
    margin-bottom: 0;
    @media screen and (max-width: 1150px) {
      position: fixed;
      top: 175px;
    }
    & > .tab {
      display: flex;
      gap: 10px;
      padding: 10px;
      width: max-content;
      background-color: white;
      box-shadow: var(--shadow);
      border-radius: 10px;
      margin-left: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      @media screen and (max-width: 615px) {
        max-width: 400px;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }
      }
      @media screen and (max-width: 420px) {
        max-width: 100vw;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }
      }
      & > button {
        padding: 5px 22px;
        background-color: #ddd;
        border: none;
        border-radius: 10px;
        outline: none;
        & > h2 {
          pointer-events: none;
          color: inherit;
          white-space: nowrap;
        }
      }
    }
  }

  & > div {
    width: 100vw;
    max-width: var(--maxwidth2);
    margin: auto;
    background-color: white;
    padding: 0 20px;
    border-radius: 10px;
    box-shadow: var(--shadow);
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-top-left-radius: 0;
    @media screen and (max-width: 1150px) {
      padding-top: 40px;
      width: auto;
      margin: 0 10px;
    }

    & > .content {
      padding: 20px 0px 20px 0px;
      max-width: var(--maxwidth2);
      margin: auto;
      & > div {
        display: flex;
        gap: 20px;
        align-items: center;
        padding: 0 10px;
        & > input {
          transform: scale(1.3);
        }
      }
    }

    & > .important {
      width: 100%;
      display: flex;
      background-color: #b9d6fb;
      padding: 15px;
      margin-bottom: 40px;
      border-radius: 10px;

      & > p {
        display: flex;
        align-items: center;
        color: var(--theme);

        & > img {
          height: 30px;
          width: 30px;
          float: left;
          display: block;
          color: var(--theme);
          margin-right: 20px;
        }
      }
    }

    & > .result {
      width: 100%;
      position: relative;
      .css-ahj2mt-MuiTypography-root {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .css-o4b71y-MuiAccordionSummary-content {
        margin: 0;
      }
      .css-1elwnq4-MuiPaper-root-MuiAccordion-root {
        background-color: #eeeeee;
        box-shadow: none;
      }
      .MuiAccordionSummary-gutters {
        padding: 0;
      }
      .MuiPaper-elevation {
        width: 100%;
      }
      & > div {
        border: 2px solid #999;
        margin-top: 5px;

        & > ul {
          & > li:nth-child(1) {
            padding: 8px 10px;
          }
          & > li {
            display: flex;
            margin-bottom: 5px;
            border-radius: 10px;
            background-color: #eee;
            padding: 2px 10px;
            flex-wrap: wrap;
            h2 {
              flex: 1;
              display: flex;
              position: relative;
              align-items: center;
              pointer-events: none;
              gap: 10px;
              & > img {
                height: 25px;
                width: 25px;
                object-fit: contain;
                margin-right: 10px;
              }
            }
            h2.last {
              flex: 1;
              display: flex;
              justify-content: space-between;
              position: relative;
              & > div {
                display: flex;
                align-items: center;
                gap: 10px;
              }
              img {
                height: 15px;
                width: 15px;
                object-fit: contain;
              }
            }
            .toopen {
              pointer-events: all;
              overflow: hidden;
              width: 100%;
              background-color: white;
              height: max-content;
              overflow: hidden;
              & > div {
                margin-top: 10px;
                & > .top {
                  margin: 10px;
                  border: 1px solid #999;
                  border-radius: 10px;
                  padding: 10px;
                  min-height: 120px;
                  textarea {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: 16px;
                  }
                }
                & > .bottom {
                  margin: 10px;
                  border: 1px solid #777;
                  border-radius: 10px;
                  padding: 10px;
                  min-height: 140px;
                  display: flex;
                  & > img {
                    height: 130px;
                    width: 130px;
                    object-fit: cover;
                  }
                  & > .content {
                    display: flex;
                    flex-direction: column;
                    padding: 5px 20px;
                    gap: 15px;
                    width: 100%;

                    & > div {
                      & > div {
                        display: flex;
                        gap: 8px;
                        align-items: center;
                        img {
                          height: 22px;
                        }
                      }
                      & > .line {
                        padding: 25px 10px;
                        border-bottom: 1px solid var(--theme);
                        width: 100%;
                        flex: 1;
                        font-size: 16px;
                      }
                    }
                    textarea {
                      width: 100%;
                      border: none;
                      outline: none;
                      font-size: 16px;
                    }
                  }
                }
                & > button {
                  padding: 8px 62px;
                  background-color: var(--theme);
                  color: white;
                  font-weight: 600;
                  font-size: 16px;
                  border: none;
                  outline: none;
                  border-radius: 5px;
                  margin-left: 10px;
                  margin-bottom: 10px;
                }
              }
            }
          }
          li:nth-child(1) {
            border-radius: 0;
          }
        }
      }
    }
    & > .newmail {
      & > button {
        padding: 10px 26px;
        background-color: var(--theme);
        color: white;
        font-weight: 600;
        font-size: 16px;
        border: none;
        outline: none;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        & > img {
          height: 18px;
          margin-right: 5px;
        }
      }
      & > .content_email {
        display: flex;
        justify-content: center;
        flex-direction: column;
        & > img {
          height: 120px;
          margin-bottom: 15px;
          object-fit: contain;
        }
        & > h1 {
          margin: auto;
        }
        & > p {
          margin: auto;
        }
        & > button {
          padding: 8px 16px;
          background-color: var(--theme);
          color: white;
          font-weight: 600;
          font-size: 16px;
          border: none;
          outline: none;
          border-radius: 5px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          margin: 10px auto;
        }
      }
    }
    & > .review_found {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding-top: 40px;
      flex-wrap: wrap;
      gap: 20px;
    }

    & > .sub-found {
      width: 100%;
      margin-top: 20px;

      & > table {
        border-collapse: collapse;

        position: relative;
        width: 100%;
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
            .red_delete {
              display: flex;
              align-items: center;
              gap: 5px;
            }
            & > td:nth-child(1) {
              padding-left: 10px;
            }
          }
        }
      }
    }

    & > .top {
      margin: 10px 0;
      border: 1px solid #999;
      border-radius: 10px;
      padding: 10px;
      min-height: 200px;
      & > p {
        font-size: 16px;
        color: #333;
      }
    }
    & > button {
      padding: 8px 54px;
      background-color: var(--theme);
      color: white;
      font-weight: 600;
      font-size: 16px;
      border: none;
      outline: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      margin: auto;
    }
  }
`;
