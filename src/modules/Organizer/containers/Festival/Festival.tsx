import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
// import EditDetail from '../../../../core/commonComponents/OrganizerMyFestival/EditDetail'
import EditDetail from "../../../../core/commonComponents/OrganizerMyFestival/UpdatedEditDetails";
import ManageFestival from "../../../../core/commonComponents/OrganizerMyFestival/Manage";
import CardDetail from "../../../../core/commonComponents/OrganizerMyFestival/ViewFestivalsDetail";

type ReactProp = {
  manageTab: boolean;
};

export default function OrganizerMyFestival({ manageTab }: ReactProp) {
  const [cardDetail, setCardDetail] = useState(true);
  const [editDetail, setEditDetail] = useState(false);
  const [manageFestival, setManageFestival] = useState(false);
  const [activeCard, setActiveCard] = useState("view");

  const { state } = useLocation();

  const renderselector = (
    value: React.MouseEvent<HTMLDivElement | MouseEvent> | any,
    card: string
  ) => {
    setCardDetail(false);
    setEditDetail(false);
    setManageFestival(false);
    value(true);
    setActiveCard(card);
  };
  useEffect(() => {
    manageTab && setActiveCard("Manage");
    manageTab && setCardDetail(false);
    manageTab && setManageFestival(true);
  }, []);

  useEffect(() => {
    console.log(state);
    if (state == "view") {
      setCardDetail(true);
      setEditDetail(false);
      setManageFestival(false);
      setActiveCard("view");
    }
    if (state == "edit") {
      setCardDetail(false);
      setEditDetail(true);
      setManageFestival(false);
      setActiveCard("Edit");
    }
  }, [state]);

  return (
    <>
      <TopSelectors>
        <div>
          <div>
            <button
              className={` ${activeCard == "view" ? "active_button" : ""}`}
              onClick={() => {
                renderselector(setCardDetail, "view");
              }}
            >
              View Festival
            </button>
            <button
              className={` ${activeCard == "Edit" ? "active_button" : ""}`}
              onClick={() => {
                renderselector(setEditDetail, "Edit");
              }}
            >
              Edit Festival
            </button>
            <button
              className={` ${activeCard == "Manage" ? "active_button" : ""}`}
              onClick={() => {
                renderselector(setManageFestival, "Manage");
              }}
            >
              Manage Festival
            </button>
          </div>
        </div>
      </TopSelectors>
      {cardDetail && <CardDetail />}
      {editDetail && <EditDetail />}
      {manageFestival && <ManageFestival manageReview={manageTab} />}
    </>
  );
}

const TopSelectors = styled.div`
  width: 100vw;
  position: relative;
  position: sticky;
  background-color: var(--background);
  padding-bottom: 10px;
  top: 118px;
  z-index: 999;

  & > div {
    width: 100vw;
    max-width: var(--maxwidth);
    margin: auto;
    & > div {
      width: 400px;
      margin: auto;
      margin: 0 auto 0px auto;
      border-radius: 10px;
      display: flex;
      overflow: hidden;
      @media screen and (max-width: 400px) {
        width: 333px;
      }

      & > button {
        flex: 1;
        padding: 16px 12px;
        color: #aaa;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
        border: none;
        background-color: white;
        outline: none;
      }
    }
  }
`;
