import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import SelectHTMLTag from "../../../../core/commonComponents/SelectOptions/SelectOptions";
import OrganizerSubmissionDetailCredits from "./DetailCredits";
import OrganizerSubmissionDetailOverview from "./DetailOverview";
import OrganizerSubmissionDetailSpecifications from "./DetailSpecifications";
import { useLocation } from "react-router-dom";

export default function OrganizerSubmissionDetail() {
  const [cardDetail, setCardDetail] = useState(true);
  const [EditDetail, setEditDetail] = useState(false);
  const [ManageFestival, setManageFestival] = useState(false);
  const [activeCard, setActiveCard] = useState("Overview");

  const location = useLocation();
  const data = location.state;

  const renderselector = (value: any, card: string) => {
    setActiveCard(card);
    setCardDetail(false);
    setEditDetail(false);
    setManageFestival(false);
    value(true);
  };

  const Region = ["Inside", "Outside"];
  // console.log();

  return (
    <>
      <SubmissionWrapper>
        <div>
          <div className="top">
            <h1>Ganima kawa</h1>
            <button className="button">Download</button>
            <div style={{ flex: "1" }}></div>
            <div className="button ">
              <i className="ri-arrow-left-line"></i>
            </div>
            <div className="button ">
              <i className="ri-arrow-right-line"></i>
            </div>
          </div>

          <div className="player">
            <div className="left">
              <div>
                <p style={{ color: "#2196f3" }}>https://vimeo.com</p>
                <button className="button">Watch Video</button>
                <p>Password :</p>
                <p>132</p>
              </div>
            </div>
            <div className="right">
              <div>
                <div className="tohide">
                  <h3 className="label-option">Judging status</h3>
                  <div className="label-option">Award winner</div>
                  {/* <h2>Details</h2>
                        <h3>Country Of origin</h3>
                        <h3>Runtime</h3>
                        <h3>Submitted By</h3>
                        <h3>Submitted On</h3> */}
                </div>
                <div className="div-label">
                  <h3 className="hidden">Judging status</h3>
                  <SelectHTMLTag option={Region} />

                  <div className="hidden">Award winner</div>
                  <SelectHTMLTag option={Region} />
                  {/*                        
                        <h2 className='hidden'>Details</h2>
                        <h4 data-label="Details">Directed By</h4>
                        
                        <h3 className='hidden'>Country Of origin</h3>
                        <h4 data-label="Country Of origin">India</h4>

                        <h3 className='hidden'>Runtime</h3>
                        <h4 data-label="Runtime">0 Hrs 40 Min 00 Sec</h4>

                        <h3 className='hidden'>Submitted By</h3>
                        <h4 data-label="Submitted By">director</h4>

                        <h3 className='hidden'>Submitted On</h3>
                        <h4 data-label="Submitted On">12 july 2022</h4> */}
                </div>
              </div>

              <div className="list-parent">
                <h3>Details</h3>
                <div className="main">
                  <div className="width50">
                    <div className="list">
                      <h4>Director</h4>
                      <p>
                        {
                          data[0]?.selectedProject?.creditinformation[0]
                            ?.details[0].name
                        }
                      </p>
                    </div>
                    <div className="list">
                      <h4>Country Of origion</h4>
                      <p>{data[0]?.selectedProject?.countryOfOrigin}</p>
                    </div>
                  </div>
                  <div className="width50">
                    <div className="list">
                      <h4>Runtime</h4>
                      <p>{data[0]?.selectedProject?.runtime} Min</p>
                    </div>
                    <div className="list">
                      <h4>Submitted by</h4>
                      <p>{data[0]?.submittedby.name} </p>
                    </div>
                    <div className="list">
                      <h4>Submitted on</h4>
                      <p>{data[0]?.createdAt} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Top>
            <div>
              <div>
                <button
                  className={` ${
                    activeCard == "Overview" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderselector(setCardDetail, "Overview");
                  }}
                >
                  Overview
                </button>
                <button
                  className={` ${
                    activeCard == "Credits" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderselector(setEditDetail, "Credits");
                  }}
                >
                  Credits
                </button>
                <button
                  className={`manage ${
                    activeCard == "Specifications" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderselector(setManageFestival, "Specifications");
                  }}
                >
                  Specifications
                </button>
              </div>
            </div>
          </Top>

          {cardDetail && (
            <OrganizerSubmissionDetailOverview></OrganizerSubmissionDetailOverview>
          )}
          {EditDetail && (
            <OrganizerSubmissionDetailCredits></OrganizerSubmissionDetailCredits>
          )}
          {ManageFestival && (
            <OrganizerSubmissionDetailSpecifications></OrganizerSubmissionDetailSpecifications>
          )}
        </div>
      </SubmissionWrapper>
    </>
  );
}

const Top = styled.div`
  width: 100vw;
  position: relative;
  position: sticky;
  padding: 20px 0;

  & > div {
    width: 100vw;
    max-width: var(--maxwidth);

    & > div {
      background-color: var(--background);
      width: 400px;
      display: flex;
      overflow: hidden;
      @media screen and (max-width: 450px) {
        width: calc(100vw - 50px);
        margin: auto;
      }

      & > button {
        flex: 1;

        padding: 14px 12px;
        color: #333;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
        border: none;
        background-color: inherit;
        outline: none;
        border-radius: 10px;
      }
    }
  }
`;

const SubmissionWrapper = styled.div`
  width: 100vw;
  background-color: var(--background);
  position: relative;

  h1 {
    color: #111;
    font-size: 22px;
    font-weight: 700;
    padding: 5px 0;
  }
  h2 {
    color: #222;
    font-size: 16px;
    font-weight: 600;
    padding: 5px 0;
  }
  h3 {
    color: #111;
    font-size: 15px;
    font-weight: 500;
    padding: 5px 0;
  }
  h4 {
    color: #333;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 0 15px 0;
  }
  h5 {
    color: #333;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 0 0px 0;
  }
  p {
    color: #111;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 0;
  }
  .button {
    color: white;
    background-color: var(--theme);
    padding: 8px 22px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
  }
  .MuiFormLabel-root {
    transform: translate(11px, 9px);
  }
  .MuiInputBase-root {
    height: 35px;
    margin-bottom: 6px;
  }

  & > div {
    max-width: var(--maxwidth2);
    margin: auto;
    border-radius: 5px;
    background-color: white;
    padding: 5px 20px 20px 20px;
    .label-option {
      padding: 10px 0;
    }
    h4 {
      padding-bottom: 5px;
    }
    @media screen and (max-width: 425px) {
      .top {
        gap: 5px !important;
        .button {
          padding: 8px 18px;
        }
      }
      h1 {
        font-size: 16px;
      }
    }
    h3 {
      padding: 0;
      color: black;
    }
    h4 {
      color: #333;
      font-size: 14px;
      padding-bottom: 10px;
    }

    .top {
      display: flex;
      gap: 15px;
      padding: 15px 0px;
      align-items: center;
      border-bottom: 8px solid #a3c9fa;
    }
    .hidden {
      display: none;
    }
    .player {
      display: flex;
      width: 100%;
      position: relative;
      padding-top: 10px;
      gap: 15px;
      height: max-content;
      position: relative;
      @media screen and (max-width: 760px) {
        flex-direction: column;
        .hidden {
          display: block;
        }
        .tohide {
          display: none;
        }
        .left {
          width: 100% !important;
        }
        .right {
          width: 100% !important;
          & > div {
            width: 100% !important;
          }
        }
      }
      & > .left {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #a3c9fa;
        & > div {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          height: max-content;
        }
      }
      & > .right {
        width: 40%;
        position: relative;
        display: flex;
        flex-direction: column;
        & > div {
          display: flex;
          gap: 10px;
          width: 100%;
          position: relative;
        }
        .list-parent {
          display: block;
          width: 100%;
          h3 {
          }
          .main {
            display: flex;
            position: relative;
          }
          .width50 {
            width: 50%;
          }
          .list {
            padding: 4px 0;
            display: flex;
            flex-direction: column;
            h4 {
              padding-bottom: 0;
            }
          }
        }
      }
    }
  }
`;
