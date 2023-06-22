import React from "react";
import styled from "styled-components";

//content
import icon1 from "../../../../assets/images/organizer dashboard/1.svg";
import icon2 from "../../../../assets/images/organizer dashboard/red_important.svg";

type CheckoutPropsType = {
  toggleWithdraw: () => void;
};

export default function Withdraw({ toggleWithdraw }: CheckoutPropsType) {
  return (
    <>
      <WithdrawWrapper>
        <div>
          <div className="notification_tab">
            <div className="content">
              <h1>Withdrawal Request</h1>
            </div>
            <div className="important ">
              <p>
                <img src={icon1}></img>It is certainly the mo there are
                different versions distinguishable from the order in which the
                Latin words are repeated.
              </p>
            </div>
            <div
              style={{ color: "#d90000", background: "#f4b2b2" }}
              className="important  mb20"
            >
              <p style={{ color: "#d90000", background: "#f4b2b2" }}>
                <img src={icon2}></img>It is certainly the mo there are
                different versions distinguishable from the order in which the
                Latin words It is certainly<br></br> the mo there are different
                versions distinguishable from the order in which the LaIt is
                certainly the mo there are <br></br> different versions
                distinguishable from the order in which the La are repeated.
              </p>
            </div>
            <div className="approve">
              <p>Account Details</p>
              <p>
                Payout Type : <span>Gpay</span>
              </p>
              <p>
                Details : <span>9874563210</span>
              </p>
              <div
                style={{ background: "#c0e8d9", width: "max-content" }}
                className="important small_important"
              >
                <p>
                  <span>
                    It is certainly the mo there are different versions
                    distinguishable from the order in which the Latin words are
                    repeated.
                  </span>
                </p>
              </div>
              <h4>Available balance : 70.00 ₹</h4>
              <p>Enter Amount</p>
              <input placeholder="Enter Amount"></input>
              <button className="blue_button">Withdraw</button>
            </div>
          </div>
          <button onClick={() => toggleWithdraw()}>x</button>
        </div>
      </WithdrawWrapper>
    </>
  );
}

const WithdrawWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: sticky;
  top: 0;
  margin-top: -120px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  overflow: auto;
  .small_important {
    @media screen and (max-width: 880px) {
      width: auto !important;
    }
  }
  & > div {
    height: max-content;
    margin: auto;
    display: flex;
    background-color: #f2f7ff;
    position: relative;
    background-color: transparent;

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
    & > .notification_tab {
      width: 100vw;
      max-width: var(--maxwidth2);
      margin: auto;
      background-color: white;
      padding: 0 20px;
      border-radius: 10px;
      box-shadow: var(--shadow);
      padding-bottom: 10px;

      & > .content {
        padding: 20px 0px 20px 0px;
        max-width: var(--maxwidth2);
        margin: auto;
        & > h1 {
          font-size: 20px;
        }
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

      .important {
        width: 100%;
        display: flex;
        background-color: #b9d6fb;
        padding: 15px;
        margin-bottom: 10px;
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
      & > .approve {
        display: flex;
        flex-direction: column;
        gap: 10px;
        p {
          font-size: 14px;
          color: #111;
          font-weight: 600;
        }
        span {
          color: #3bb98a;
        }
        h4 {
          font-weight: 500;
          color: #3bb98a;
        }
        & > input {
          width: 45%;
          min-width: 300px;
          padding: 14px 10px;
          border-radius: 10px;
          border: 1px solid #666;
          outline: none;
          ::placeholder {
            font-size: 16px;
            color: #111;
          }
        }
        & > .blue_button {
          padding: 8px 22px;
          font-size: 16px;
          font-weight: 500;
          color: white;
          background-color: var(--theme);
          border-radius: 5px;
          width: max-content;
          border: none;
          outline: none;
          margin-bottom: 10px;
        }
      }
    }
  }
`;
