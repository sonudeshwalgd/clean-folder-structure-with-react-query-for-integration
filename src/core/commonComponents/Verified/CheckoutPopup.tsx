import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAllSeasonsDetails,
  getBlueBatchDetails,
  getOrganizerDashboard,
} from "../../Api/Api";

//content
import icon1 from "../assets/images/organizer dashboard/1.svg";
import icon2 from "../assets/images/organizer dashboard/red_important.svg";
type CheckoutPropsType = {
  toggleCheckout: () => void;
};

export default function Checkout({ toggleCheckout }: CheckoutPropsType) {
  const { data } = useQuery("blueBatchDetails", getBlueBatchDetails, {
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      console.log("first");
      console.log(response);
    },
  });

  return (
    <>
      <VerifiedCard
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            toggleCheckout();
          }
        }}
      >
        <div>
          <div className="notification_tab">
            <h1>Withdrawal Request</h1>
            <p>
              It is certainly the mo there are different versions distinguishab
              are repeated.
            </p>
            <div>
              {data?.plan.map((ele: any) => {
                return (
                  <div id={ele?._id} className="card">
                    <h1>{ele?.name}</h1>
                    <p>₹ {ele?.price} /-</p>
                    <p className="months">{ele?.month} Months</p>
                    <button>Choose Plan</button>
                  </div>
                );
              }, [])}
            </div>
          </div>
          <button onClick={() => toggleCheckout()}>x</button>
        </div>
      </VerifiedCard>
    </>
  );
}

const VerifiedCard = styled.div`
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
      display: flex;
      flex-direction: column;
      justify-content: center;

      & > h1 {
        text-align: center;
        padding: 20px;
        font-size: 28px;
      }
      & > p {
        text-align: center;
        font-size: 16px;
        padding-bottom: 20px;
      }
      & > div {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
      }
      .card {
        display: block;
        margin: auto;
        border: 1px solid var(--theme);
        border-radius: 10px;
        width: max-content;
        min-width: 260px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 30px;
        align-items: center;
        padding: 20px;
        margin-bottom: 20px;
        p {
          font-weight: 500;
        }
        .months {
          font-weight: 400;
        }
        button {
          padding: 6px 10px;
          font-weight: 500;
          border: 1px solid black;
          border-radius: 5px;
        }
      }
    }
  }
`;
