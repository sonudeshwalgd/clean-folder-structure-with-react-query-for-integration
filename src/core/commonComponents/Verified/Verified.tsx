import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getAllSeasonsDetails } from "../../Api/Api";
import Checkout from "./CheckoutPopup";

export default function Verified({ visibilityHandler }: any) {
  const [checkout, setCheckout] = useState(false);
  const handleTogglePopupCheckout = () => {
    setCheckout(false);
  };

  return (
    <>
      <VerifiedStripWrapper>
        <div>
          <div className="left">
            <h1>Get Verified for most exciting benifits.</h1>
          </div>
          <div className="right">
            <button
              onClick={() => {
                setCheckout(true);
              }}
              className="check"
            >
              <i className="ri-arrow-right-s-fill"></i>
              <h2>Checkout</h2>
            </button>
            <button className="close">
              <div onClick={visibilityHandler}>
                <i className="ri-close-fill"></i>
              </div>
            </button>
          </div>
        </div>
      </VerifiedStripWrapper>
      {checkout && (
        <Checkout toggleCheckout={handleTogglePopupCheckout}></Checkout>
      )}
    </>
  );
}

const VerifiedStripWrapper = styled.div`
  width: 100vw;
  background-color: var(--theme);
  height: 50px;
  position: sticky;
  top: 68px;
  z-index: 999;
  & > div {
    max-width: var(--maxwidth2);
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0vw;
    height: 100%;

    & > .left {
      height: 100%;
      display: flex;
      align-items: center;

      & > h1 {
        font-size: 14px;
        color: white;
        font-weight: 500;
      }
    }
    & > .right {
      display: flex;
      height: 100%;

      & > .check {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 100%;
        border-radius: 5px;
        border: none;
        outline: none;
        background-color: white;
        & > i {
          font-size: 20px;
          padding: 0 10px 0 5px;
        }
        & > h2 {
          font-size: 16px;
          font-weight: 500;
        }
        @media screen and (max-width: 520px) {
          padding: 0 10px;
          & > h2 {
            font-size: 14px;
          }
        }
      }
      & > .close {
        background-color: inherit;
        border: none;
        outline: none;
        & > div {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          background-color: #0b3771;
          color: white;
          font-size: 30px;
          font-weight: 400;
          display: flex;
          margin-left: 20px;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;
