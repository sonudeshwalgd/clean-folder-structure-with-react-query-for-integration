import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import loading from "./../../../assets/images/loading.svg";

type OTPPropsType = {
  toggleSelectRole: () => void;
};
// {toggleSelectRole}: OTPPropsType
// onClick={()=> {toggleSelectRole()}}
export default function YesNoCondition({
  togglePopup,
  promiseProp,
  title = "Are you sure ?",
}: any) {
  const deleteHandler = (arg: boolean) => {
    togglePopup();

    if (arg) return promiseProp("yes");
    return "";
  };

  return (
    <>
      <YesNoConditionWrapper>
        <div>
          <div className="right">
            <div className="back_opacity"></div>
            <h3>{title}</h3>
            <div className="button-div">
              <button className="yes" onClick={() => deleteHandler(true)}>
                Yes
              </button>
              <button className="no" onClick={() => deleteHandler(false)}>
                No
              </button>
            </div>
            <button className="closeButton" onClick={togglePopup}>
              x
            </button>
          </div>
        </div>
      </YesNoConditionWrapper>
    </>
  );
}

const YesNoConditionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 4;
  padding: 42px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3) !important;
  z-index: 1002;
  & > div {
    height: 100%;
    margin: auto;
    display: flex;

    justify-content: center;
    align-items: center;
    & > .back_opacity {
      height: 100%;
      width: 100%;
      position: absolute;
      opacity: 0.5;
      z-index: -1;
    }

    & > .right {
      min-width: 400px;
      height: max-content;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 5px;
      z-index: 0;
      padding: 0 40px 10px 40px;
      @media (max-width: 698px) {
        max-width: max-content;
      }

      & > h3 {
        color: var(--heading0);
        padding: 30px 0 10px 0;
        font-size: 16px;
        font-weight: 800;
        color: #111;
      }
      .button-div {
        display: flex;
        gap: 10px;
        padding-top: 12px;
        width: 100%;
        button {
          padding: 6px 52px;
          width: 100%;
          color: white;
          font-weight: 400 !important;
          font-size: 18px;
          border-radius: 5px;
          outline: none;
          border: none;
        }
        .yes {
          background-color: #4caf50;
        }
        .no {
          background-color: #f44336;
        }
      }

      & > button {
        position: absolute;
        top: 0;
        right: 0;
        box-shadow: 0 0 5px 5px rgba(0, 00, 0, 0.1);
        transform: translate(40%, -50%);
        background-color: white;
        /* font-size: 50px; */
        height: 40px;
        display: flex;
        font-size: 25px;
        justify-content: center;
        align-items: center;
        line-height: 100%;
        padding-bottom: 8px;
        width: 40px;
        border: 0px solid var(--heading1);
        border-radius: 50%;
        color: var(--heading3);
        font-weight: 500;
      }
    }
  }
  .closeButton {
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: 0 0 5px 5px rgba(0, 00, 0, 0.1);
    transform: translate(40%, -50%);
    background-color: white;
    /* font-size: 50px; */
    height: 40px;
    display: flex;
    font-size: 25px;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    padding-bottom: 8px;
    width: 40px;
    border: 0px solid var(--heading1);
    border-radius: 50%;
    color: var(--heading3);
    font-weight: 500;
  }
`;
