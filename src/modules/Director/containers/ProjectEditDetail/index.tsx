import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import DirectorProjectDetail from "./ProjectDetail";
import DirectorMyProjectEdit from "./ProjectEdit";
import { useLocation } from "react-router-dom";

export default function DirectorMyProjectEditDetail() {
  const [cardDetail, setCardDetail] = useState(false);
  const [EditDetail, setEditDetail] = useState(false);
  const [ManageFestival, setManageFestival] = useState(false);
  const [activeCard, setActiveCard] = useState("detail");
  const location = useLocation();
  const renderSelector = (
    value: React.MouseEvent<HTMLDivElement | MouseEvent> | any,
    card: string
  ) => {
    setActiveCard(card);
    setCardDetail(false);
    setEditDetail(false);
    value(true);
  };
  useEffect(() => {
    if (location?.state?.exButton == "preview") {
      setCardDetail(true);
      setEditDetail(false);
      setActiveCard("detail");
    } else if (location?.state?.exButton == "edit") {
      setCardDetail(false);
      setEditDetail(true);
      setActiveCard("edit");
    }
  }, []);

  useEffect(() => {
    location.state.addProject && setEditDetail(true);
    setActiveCard("edit");
  }, []);

  return (
    <>
      <TopSelector>
        <div className="top">
          <h1>Ganima kawa</h1>
        </div>
        <div>
          <div>
            <button
              disabled={!Boolean(location?.state?.exButton == "preview")}
              className={` ${activeCard == "detail" ? "active_button" : ""}`}
              onClick={(e) => {
                renderSelector(setCardDetail, "detail");
              }}
            >
              View Project
            </button>
            <button
              className={` ${activeCard == "edit" ? "active_button" : ""}`}
              onClick={(e) => {
                renderSelector(setEditDetail, "edit");
              }}
            >
              Edit Project
            </button>
          </div>
        </div>
      </TopSelector>
      {cardDetail && <DirectorProjectDetail />}
      {EditDetail && <DirectorMyProjectEdit />}
    </>
  );
}

const TopSelector = styled.div`
  width: 100vw;
  position: relative;
  position: fixed;
  top: 60px;
  z-index: 10;
  background-color: var(--background);
  padding: 20px 0;
  & > .top {
    padding-left: 20px;
    h1 {
      font-size: 22px;
    }
  }

  & > div {
    width: 100vw;
    max-width: var(--maxwidth);
    margin: auto;

    & > div {
      width: 250px;
      margin: auto;
      margin: 0 auto 0px auto;
      border-radius: 10px;
      display: flex;
      overflow: hidden;

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
