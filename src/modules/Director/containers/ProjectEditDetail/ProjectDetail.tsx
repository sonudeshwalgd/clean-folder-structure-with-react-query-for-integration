import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { queryClient } from "../../../..";
import { getDirectorMyProject } from "../../../../core/Api/Api";
import AddvWatchVideoPopup from "./AddWatchVideoPopup";
import DirectorSubmissionDetailOverview from "./SubmissionDetailOverview";
import DirectorSubmissionDetailSpecifications from "./SubmissionDetailSpecifications";
let main: any;

export default function DirectorProjectDetail() {
  const [cardDetail, setCardDetail] = useState(true);
  const [ManageFestival, setManageFestival] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [activeCard, setActiveCard] = useState("Overview");

  const [isVisibleAddWatchVideoPopup, setVisibleAddWatchVideoPopup] =
    useState<any>(false);

  const renderSelector = (
    value: React.MouseEvent<HTMLDivElement | MouseEvent> | any,
    card: string
  ) => {
    setActiveCard(card);
    setManageFestival(false);
    setCardDetail(false);
    value(true);
  };

  const { data, refetch } = useQuery(
    "directorMyProject",
    getDirectorMyProject,
    {
      select: (res) => {
        return res.filter(
          (ele: any) => ele._id == localStorage.getItem("projectId")
        );
      },
      onError: (err) => {},
    }
  );
  const toggleVisibilityAddWatchVideoPopupHandler = () => {
    setVisibleAddWatchVideoPopup(false);
  };

  return (
    <>
      {isVisibleAddWatchVideoPopup && (
        <AddvWatchVideoPopup
          payloadId={data ? data[0]._id : ""}
          refetch={refetch}
          toggleVisibility={toggleVisibilityAddWatchVideoPopupHandler}
        />
      )}
      <ProjectDetailWrapper>
        <div>
          <div className="player">
            <h1>Watch Video File</h1>
            <button onClick={() => setVisibleAddWatchVideoPopup(true)}>
              +
            </button>
            <div className="left">
              <div>
                <p style={{ color: "#2196f3" }}>
                  {data ? data[0]?.videofile?.videofileurl : ""}
                </p>
                <button
                  onClick={() =>
                    (window.location.href = data
                      ? data[0]?.videofile?.videofileurl
                      : "")
                  }
                  className="button"
                >
                  Watch Video
                </button>
                <p>Password :</p>
                <p>{data ? data[0]?.videofile?.password : ""}</p>
                <h1>Watch Trailer</h1>
                <p style={{ color: "#2196f3" }}>
                  {data ? data[0]?.trailor : ""}
                </p>
                <button
                  onClick={() =>
                    (window.location.href = data ? data[0]?.trailor : "")
                  }
                  className="button"
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
          <Top>
            <div>
              <div>
                <button
                  className={` ${
                    activeCard == "Overview" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderSelector(setCardDetail, "Overview");
                  }}
                >
                  Overview
                </button>
                <button
                  className={`manage ${
                    activeCard == "Specifications" ? "active_button" : ""
                  }`}
                  onClick={(e) => {
                    renderSelector(setManageFestival, "Specifications");
                  }}
                >
                  Specifications
                </button>
              </div>
            </div>
          </Top>
          {cardDetail && <DirectorSubmissionDetailOverview />}
          {ManageFestival && <DirectorSubmissionDetailSpecifications />}
        </div>
      </ProjectDetailWrapper>
    </>
  );
}

const Top = styled.div`
  width: 100vw;
  position: relative;
  position: sticky;
  padding: 20px 0;

  & > div {
    width: 100vw;
    max-width: var(--maxwidth);
    & > div {
      background-color: white;
      width: 250px;
      display: flex;
      overflow: hidden;

      & > button {
        flex: 1;
        padding: 14px 12px;
        color: #333;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
        border: none;
        background-color: inherit;
        outline: none;
        border-radius: 10px;
      }
    }
  }
`;

const ProjectDetailWrapper = styled.div`
  width: 100vw;
  background-color: var(--background);
  position: relative;
  margin-top: 60px;

  h1 {
    color: #111;
    font-size: 22px;
    font-weight: 700;
    padding: 5px 0;
  }
  h2 {
    color: #222;
    font-size: 16px;
    font-weight: 600;
    padding: 5px 0;
  }
  h3 {
    color: #111;
    font-size: 15px;
    font-weight: 500;
    padding: 5px 0;
  }
  h4 {
    color: #333;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 0 15px 0;
  }
  h5 {
    color: #333;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 0 0px 0;
  }
  p {
    color: #111;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 0;
  }
  .button {
    color: white;
    background-color: var(--theme);
    padding: 8px 22px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
  }

  & > div {
    max-width: var(--maxwidth);
    margin: auto;
    border-radius: 5px;
    padding: 5px 20px 20px 20px;

    .player {
      width: 100%;
      position: relative;
      padding: 20px;
      gap: 15px;
      height: max-content;
      background-color: white;
      position: relative;
      & > button {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        font-size: 30px;
        border: none;
        outline: none;
        margin-left: 95%;
        background-color: var(--background);
        color: var(--theme);
      }
      & > .left {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        & > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: max-content;
        }
      }
    }
  }
`;
