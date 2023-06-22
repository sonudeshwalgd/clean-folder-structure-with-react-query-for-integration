import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import loading from "./../../../assets/images/loading.svg";

type OTPPropsType = {
  showLoginErrorForm: () => void;
};

export default function LoginError({ showLoginErrorForm }: OTPPropsType) {
  return (
    <>
      <LoginErrorWrapper>
        <div>
          <div className="right">
            <div className="back_opacity"></div>
            <img src={loading}></img>
            {/* <img className='spinner' src={loading}></img> */}
            <h3>Error</h3>
            <p>Invalid EmailId/Password </p>
            <button
              className="closeButton"
              onClick={() => {
                showLoginErrorForm();
              }}
            >
              x
            </button>
          </div>
        </div>
      </LoginErrorWrapper>
    </>
  );
}

const LoginErrorWrapper = styled.div`
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

    /* background-color: rgba(0,0,0,.3) !important; */
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
      min-width: 500px;
      height: max-content;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 10px;
      z-index: 0;
      padding: 0 40px 40px 40px;
      @media (max-width: 698px) {
        max-width: max-content;
      }
      & > img {
        max-width: 150px;
        width: 100%;
        object-fit: contain;
        max-height: 300px;
        margin-top: 50px;
      }
      .spinner {
        height: 80px;
        width: 80px;
        margin-top: 10px;
        animation: rotate 2s linear 0s infinite;
        @keyframes rotate {
          0% {
            transform: rotateZ(0);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
      }
      & > h3 {
        color: var(--heading0);
        padding: 30px 0 10px 0;
        font-size: 16px;
        font-weight: 800;
        color: #111;
      }
      p {
        font-size: 14px;
        color: #333;
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
