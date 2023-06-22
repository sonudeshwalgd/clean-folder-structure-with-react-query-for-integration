import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

//content

import banner from "../../../../assets/images/organizer dashboard/banner.jpg";
import { useMutation, useQuery } from "react-query";
import {
  getOrganizerFestival,
  postOrganizerMarketing,
} from "../../../../core/Api/Api";
import LoadingPage from "../../../../core/commonComponents/LoadingFallback/Loading";
import Result from "../../../../core/commonComponents/Request result popup/Result";
import EmptyData from "../../../../core/commonComponents/empty data pages/EmptyData";

export default function OrganizerMarketing() {
  const whatsappFile = useRef<any>();
  const emailFile = useRef<any>();
  const subject = useRef<any>();
  const message = useRef<any>();
  const email = useRef<any>();
  const whatappno = useRef<any>();

  const [hasEvent, setHasEvent] = useState<boolean>(false);

  const {
    mutate: whatsappFileMutate,
    isLoading,
    data,
    isError,
  } = useMutation(["postOrganizerMarketing"], postOrganizerMarketing, {
    onSuccess: (res) => {
      setIsResultVisible(true);
    },
    onError: (err) => {
      setIsResultVisible(true);
    },
  });

  console.log(data);

  function whatsappFileMutateHandler(e: any) {
    e.preventDefault();
    const payload = new FormData();

    payload.append("whatsappfile", whatsappFile.current.files[0]);
    payload.append("emailfile", emailFile.current.files[0]);
    payload.append("festivalid", localStorage.getItem("festivalId") || "");
    payload.append("subject", subject.current.value);
    payload.append("message", message.current.value);
    payload.append("whatappno", whatappno.current.value);
    payload.append("email", email.current.value);

    email.current.setAttribute("required", true);
    whatappno.current.setAttribute("required", true);
    message.current.setAttribute("required", true);
    subject.current.setAttribute("required", true);
    if (
      email.current.value.length > 0 &&
      whatappno.current.value.length > 0 &&
      message.current.value.length > 0 &&
      subject.current.value.length > 0
    )
      return whatsappFileMutate(payload);
  }

  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const resultVisibilityFalseHandler = () => {
    setIsResultVisible(false);
  };

  const { data: festivalData, refetch } = useQuery(
    "getOrganizerFestival",
    getOrganizerFestival,
    {
      onSuccess: (res) => {
        if (res?._id) {
          setHasEvent(true);
        }
      },
    }
  );

  return (
    <>
      {isLoading && <LoadingPage />}
      {isResultVisible && (
        <Result
          state={isError ? "Error" : "Success"}
          description={data?.message || "Request Failed"}
          showResult={resultVisibilityFalseHandler}
        />
      )}

      <MarketingBody>
        <div>
          <h2>Marketing</h2>
          {hasEvent ? (
            <>
              <div className="banner">
                <img
                  style={{ minHeight: "250px" }}
                  src={
                    "http://3.89.138.204:3000/uploads/" +
                    festivalData?.cover_photo
                  }
                ></img>
                <div>
                  <img
                    src={
                      "http://3.89.138.204:3000/uploads/" +
                      festivalData?.event_logo
                    }
                  ></img>
                  <h2>ASK Film Festival</h2>
                </div>
              </div>
              <div className="content">
                <form>
                  <div className="content-data">
                    <div className="title">
                      <h2>Email And Whatsapp Marketing</h2>
                      <p>(You can select XLXS/CSV/PDF file format only)</p>
                    </div>

                    <div className="button_div">
                      <button type="button">
                        <i className="ri-user-6-line"></i>
                        <label htmlFor="whatsapp">Choose Whatsapp file</label>
                      </button>
                      <button type="button">
                        <i className="ri-user-6-line"></i>
                        <label htmlFor="email">Choose Email file</label>
                      </button>
                      <input
                        ref={whatsappFile}
                        id="whatsapp"
                        type="file"
                        style={{ display: "none" }}
                      ></input>
                      <input
                        ref={emailFile}
                        id="email"
                        type="file"
                        style={{ display: "none" }}
                      ></input>
                    </div>
                    <div className="foam">
                      <ul>
                        <li>
                          <p>Subject</p>
                          <div>
                            <input
                              ref={subject}
                              placeholder="Subject"
                              type="text"
                            ></input>
                            <p style={{ display: "none" }}>
                              Enter Your Subject
                            </p>
                          </div>
                        </li>
                        <li>
                          <p>Whatsapp No</p>
                          <div>
                            <input
                              ref={whatappno}
                              placeholder="Whatsapp No"
                              type="number"
                            ></input>
                            <p style={{ display: "none" }}>
                              Enter Your WhatsApp Number
                            </p>
                          </div>
                        </li>
                        <li>
                          <p>Email</p>
                          <div>
                            <input
                              ref={email}
                              placeholder="Email"
                              type="email"
                            ></input>
                            <p style={{ display: "none" }}>Enter Your Email</p>
                          </div>
                        </li>
                        <li>
                          <p>Message</p>
                          <div>
                            <textarea
                              ref={message}
                              placeholder="Message"
                            ></textarea>
                            <p style={{ display: "none" }}>
                              Enter Your Message
                            </p>
                          </div>
                        </li>
                      </ul>
                      <button
                        onClick={whatsappFileMutateHandler}
                        type="submit"
                        className="submit"
                      >
                        <i className="ri-send-plane-line"></i>Send Files
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <EmptyData
                subSection="view"
                title="You have not Created any event yet . If you have please refresh ... "
                button="create now"
                onClick={() => refetch()}
                seasonVisibility={false}
              />
            </>
          )}
        </div>
      </MarketingBody>
    </>
  );
}

const MarketingBody = styled.div`
  width: 100vw;
  background-color: var(--background);

  & > div {
    width: 100vw;
    margin: auto;
    & > h2 {
      font-size: 20px;
      font-weight: 700;
      color: #111;
      padding: 20px 0;
      max-width: var(--maxwidth);
      margin: auto;
    }
    & > .banner {
      & > img {
        width: 100vw;
        object-fit: cover;
        max-height: 250px;
        @media screen and (max-width: 540px) {
          height: 150px;
        }
      }
      & > div {
        max-width: var(--maxwidth);
        margin: auto;
        transform: translate(0, -50%);
        display: flex;
        align-items: flex-end;
        margin-left: 10vw;
        & > img {
          border-radius: 10px;
          height: 200px;
          width: 200px;
          border: 1px solid black;
          @media screen and (max-width: 540px) {
            height: 100px;
            width: 100px;
          }
        }
        & > h2 {
          padding: 20px 15px;
          font-size: 20px;
          font-weight: 700;
          color: #111;
          @media screen and (max-width: 540px) {
            font-size: 16px;
            color: #333;
            padding: 0 15px;
          }
        }
      }
    }
    & > .content {
      max-width: var(--maxwidth);
      margin: auto;
      /* display: flex; */
      .content-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        & > .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 20px;
          @media screen and (max-width: 340px) {
            text-align: center;
          }

          & > h2 {
            font-size: 20px;
            font-weight: 700;
            color: #111;
          }
          & > p {
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }
        }
        & > .button_div {
          display: flex;
          align-items: center;
          gap: 50px;
          margin-bottom: 20px;
          @media screen and (max-width: 540px) {
            flex-direction: column;
            align-items: center !important;
            justify-content: center !important;
            width: 100%;
            & > button {
              width: 96% !important;
            }
          }
          & > button:nth-child(2) {
            background-color: #1877f2;
            padding: 10px 25px;
            color: white;
            font-size: 15px;
            font-weight: 600;
            border: none;
            outline: none;
            border-radius: 5px;

            & > i {
              padding-right: 15px;
            }
          }
          & > button:nth-child(1) {
            background-color: #169179;
            padding: 10px 25px;
            color: white;
            font-size: 15px;
            font-weight: 600;
            border: none;
            outline: none;
            border-radius: 5px;
            & > i {
              padding-right: 15px;
            }
          }
        }
        & > .foam {
          width: 87%;
          display: flex;
          align-self: flex-end;
          flex-direction: column;
          @media screen and (max-width: 540px) {
            width: 100% !important;
          }
          & > ul {
            list-style: none;
            & > li {
              display: flex;
              padding: 10px;
              @media screen and (max-width: 540px) {
                flex-direction: column;
                gap: 10px;
                p {
                  text-align: left !important;
                }
              }

              & > p {
                padding-right: 15px;
                width: 120px;
                font-size: 14px;
                font-weight: 600;
                color: #111;
                text-align: right;
                white-space: nowrap;
              }
              & > div {
                flex: 1;
                flex-direction: column;
                p {
                  padding-top: 8px;
                }
              }
              input {
                width: 100%;
                height: 50px;
                border-radius: 10px;
                border: 2px solid #bbb;
                background-color: inherit;
                padding: 10px;
                ::placeholder {
                  font-size: 16px;
                  color: #333;
                }
              }
              textarea {
                width: 100%;
                height: 200px;
                border-radius: 10px;
                border: 1px solid #aaa;
                background-color: inherit;
                padding: 10px;
                ::placeholder {
                  font-size: 16px;
                  color: #333;
                }
              }
            }
          }
          & > .submit {
            width: max-content;
            align-self: flex-end;
            padding: 10px 50px;
            align-items: center;
            display: flex;
            color: white;
            background-color: #2db482;
            font-size: 18px;
            font-weight: 600;
            border: none;
            outline: none;
            border-radius: 5px;
            margin: 10px 10px 20px 0;

            & > i {
              padding-right: 20px;
              font-size: 20px;
              font-weight: 700;
              color: white;
            }
          }
        }
      }
    }
  }
`;
