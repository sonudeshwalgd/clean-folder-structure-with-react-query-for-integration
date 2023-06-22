import React from "react";
import styled from "styled-components";

//content
// import icon1 from "../assets/images/organizer dashboard/1.svg"
// import icon2 from "../assets/images/organizer dashboard/red_important.svg"
import girl from "./../../../../assets/images/organizer dashboard/girl.svg";

type SelectionPropsType = {
  showSelectionPopup: () => void;
};

export default function SelectionPopup({
  showSelectionPopup,
}: SelectionPropsType) {
  return (
    <>
      <SelectionPopupWrapper
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            showSelectionPopup();
          }
        }}
      >
        <div>
          <div>
            <div className="card">
              <div className="project">
                <p>Project detail</p>
                <div>
                  <img src={girl}></img>
                  <div>
                    <p>Ganimi Kawa</p>
                    <p>Submission Status : Award winner</p>
                  </div>
                </div>
              </div>
              <div className="festival">
                <p>Festival detail</p>
                <div>
                  <img src={girl}></img>
                  <div>
                    <p>Ganimi Kawa</p>
                    <p>Submission Status : Award winner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => showSelectionPopup()}>x</button>
        </div>
      </SelectionPopupWrapper>
    </>
  );
}

const SelectionPopupWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  & > div {
    height: max-content;
    margin: auto;
    display: flex;
    width: 100%;
    background-color: #f2f7ff;
    position: relative;
    background-color: transparent;
    max-width: var(--maxwidth2);

    & > button {
      position: absolute;
      top: 0;
      right: 0;
      /* button */
      transform: translate(0%, -0%);
      background-color: white;
      height: 50px;
      display: flex;
      font-size: 30px;
      justify-content: center;
      align-items: center;
      line-height: 100%;
      padding-bottom: 8px;
      width: 50px;
      border: 0px solid var(--heading1);
      border-radius: 50%;
      color: var(--heading2);
      font-weight: 300;
    }
    & > div {
      border-radius: 10px;
      background-color: white;
      padding: 20px;
      width: 100%;
      .card {
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
        display: flex;
        position: relative;
        padding: 0 20px;
        & > div {
          width: 50%;
          & > P {
            padding: 10px 0;
            font-size: 14px;
            font-weight: 500;
          }
          & > div {
            display: flex;
            gap: 20px;
            padding-bottom: 20px;
            & > img {
              width: 5vw;
              border-radius: 10px;
              object-fit: contain;
              min-width: 100px;
            }
            & > div {
              & > p:nth-child(1) {
                color: var(--theme);
                font-size: 14px;
                font-weight: 600;
                padding: 10px 0;
              }
              & > p:nth-child(2) {
                color: #2db482;
                font-size: 14px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
`;
