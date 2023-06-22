import React from "react";
import styled from "styled-components";

//content
import icon1 from "../assets/images/organizer dashboard/1.svg";
import icon2 from "../assets/images/organizer dashboard/red_important.svg";

type CheckoutPropsType = {
  togglePopup: () => void;
  promiseProp: any;
};

export default function DeletePopup({
  togglePopup,
  promiseProp,
}: CheckoutPropsType) {
  const deleteHandler = (arg: boolean) => {
    togglePopup();

    if (arg) return promiseProp("yes");
    return "";
  };

  return (
    <>
      <DeletePopupCard
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            togglePopup();
          }
        }}
      >
        <div>
          <div className="notification_tab">
            <h1>Are you Sure Want to delete</h1>
            <p>
              All the data related project will be deleted do you still want to
              delete
            </p>
            <div>
              <button onClick={() => deleteHandler(true)} className="yes">
                <i className="ri-delete-bin-line"></i>Yes{" "}
              </button>
              <button onClick={() => deleteHandler(false)} className="no">
                <i className="ri-close-circle-line"></i>No{" "}
              </button>
            </div>
          </div>
          <button onClick={() => togglePopup()}>x</button>
        </div>
      </DeletePopupCard>
    </>
  );
}

const DeletePopupCard = styled.div`
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
      transform: translate(40%, -40%);
      background-color: white;
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
      width: max-content;
      max-width: var(--maxwidth2);
      margin: auto;
      background-color: white;
      padding: 20px 10px 20px 20px;
      border-radius: 10px;
      box-shadow: var(--shadow);
      padding-bottom: 10px;
      p {
        padding: 20px 0;
      }
      h1 {
        font-size: 20px;
      }
      & > div {
        display: flex;
        padding: 10px;
        gap: 10px;
        justify-content: flex-end;
        align-items: center;
        padding-right: 0;

        button {
          padding: 8px 16px;
          display: flex;
          gap: 10px;
          align-items: center;
          border: none;
          outline: none;
          border-radius: 5px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          & > i {
            color: white;
            font-size: 20px;
          }
        }
        .yes {
          background-color: red;
        }
        .no {
          background-color: var(--theme);
        }
      }
    }
  }
`;
