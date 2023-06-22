import React from "react";
import styled from "styled-components";

//content
import icon1 from "../../../../assets/images/organizer dashboard/1.svg";
import icon2 from "../../../../assets/images/organizer dashboard/red_important.svg";
import rect from "../../../../assets/images/organizer dashboard/Rectangle 42.jpg";

type ReactProp = {
  viewProject: () => void;
};

export default function ViewProjectPopup({ viewProject }: ReactProp) {
  return (
    <>
      <PopupCardWrapper
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            viewProject();
          }
        }}
      >
        <div>
          <div className="notification_tab">
            <div className="grid">
              <div className="item item1">
                <img src={rect}></img>
              </div>
              <div className="item item2">
                <h1>Logo vacum designer accutre film produ</h1>
              </div>
              <div className="item item3">
                <div className="heading">
                  <p>Category</p>
                  <p>Amount</p>
                </div>
                <div className="value">
                  <p>Best documantary film</p>
                  <p>70</p>
                </div>
              </div>
              <div className="item item4">
                <div>
                  <div className="heading">
                    <p>Submission Date</p>
                    <p>25 Nov 2023</p>
                  </div>
                  <div className="heading">
                    <p>Notification Date</p>
                    <p>25 Nov 2023</p>
                  </div>
                  <div className="heading">
                    <p>Event Date</p>
                    <p>25 Nov 2023</p>
                  </div>
                </div>
              </div>
              <div className="item item5">
                <div>
                  <div>
                    <i className="ri-phone-line"></i>
                    <p>9874563120</p>
                  </div>
                  <div>
                    <i className="ri-map-pin-line"></i>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <i className="ri-chat-2-line"></i>
                      </li>
                      <li>
                        <i className="ri-global-line"></i>
                      </li>
                      <li>
                        <i className="ri-facebook-circle-fill"></i>
                      </li>
                      <li>
                        <i className="ri-instagram-line"></i>
                      </li>
                      <li>
                        <i className="ri-twitter-fill"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => viewProject()}>x</button>
        </div>
      </PopupCardWrapper>
    </>
  );
}

const PopupCardWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  & > div {
    margin: auto;
    display: flex;
    background-color: #f2f7ff;
    position: relative;
    box-shadow: var(--shadow);
    background-color: white;
    width: 100%;
    max-width: var(--maxwidth2);
    /* margin: minmax(auto , 20px ); */
    /* margin:min(20px,auto); */
    margin: auto;
    border-radius: 10px;
    @media screen and (max-width: 1200px) {
      margin: 20px;
    }
    & > button {
      position: absolute;
      background-color: white;
      top: 0;
      right: 0;
      transform: translate(40%, -40%);
      height: 40px;
      display: flex;
      font-size: 30px;
      justify-content: center;
      align-items: center;
      line-height: 100%;
      padding-bottom: 8px;
      width: 40px;
      border: 0px solid var(--heading1);
      border-radius: 50%;
      color: var(--heading2);
      font-weight: 300;
      box-shadow: 0 0 5px 2px rgba(0, 00, 0, 0.3);
    }
    & > .notification_tab {
      background-color: white;
      padding: 20px 10px 20px 20px;
      border-radius: 10px;
      padding-bottom: 10px;
      width: 100%;
      position: relative;
      @media screen and (max-width: 900px) {
        padding: 10px;
      }

      h1 {
        font-size: 20px;
      }
      & > .grid {
        display: grid;
        width: 100%;
        grid-template-columns: 8fr 46fr 46fr;
        grid-template-rows: auto auto auto;
        gap: 1vw;
        position: relative;
        .item {
        }

        & > .item1 {
          grid-row: 1/3;
          &.img {
            height: 100%;
            width: 100%;
          }
        }

        & > .item3 {
          grid-row: 1/3;
          grid-column: 3/4;
          .heading {
            display: flex;
            padding: 16px 10px;
            border-radius: 10px;
            background-color: #ccc;
            justify-content: space-between;
            font-weight: 600;
            font-size: 16px;
            color: #111;
          }
          .value {
            color: #333;
            display: flex;
            padding: 16px 10px;
            justify-content: space-between;
            font-weight: 400;
            font-size: 16px;
          }
        }

        & > .item4 {
          padding-right: 20px;
          & > div {
            display: flex;
            justify-content: space-between;
            .heading {
              p {
                font-size: 14px;
                color: #111;
                font-weight: 500;
              }
              p:nth-child(2) {
                font-size: 14px;
                color: #333;
                font-weight: 400;
              }
            }
          }
        }

        & > .item5 {
          grid-column: 2/3;
          grid-row: 3/4;
          & > div {
            & > div {
              padding: 6px 0;
              display: flex;
              gap: 10px;
              & > ul {
                display: flex;
                column-gap: 16px;
                list-style: none;
                i {
                  font-size: 30px;
                }
              }
            }
          }
        }

        @media screen and (max-width: 900px) {
          grid-template-rows: repeat(5, auto);
          grid-template-columns: repeat(3, auto);
          p {
            font-size: 14px;
          }
          gap: 10px;
          & > .item1 {
            grid-row: 1/2;
            grid-column: 1/2;
          }
          & > .item2 {
            grid-row: 1/2;
            grid-column: 2/3;
            display: flex;
            align-items: center;
          }
          & > .item5 {
            grid-row: 2/3;
            grid-column: 1/3;
            & > div {
              & > div {
                padding: 3px 0;
              }
            }
          }
          & > .item4 {
            grid-row: 3/4;
            grid-column: 1/3;
          }
          & > .item3 {
            grid-row: 4/5;
            grid-column: 1/3;
          }
        }
      }
    }
  }
`;
