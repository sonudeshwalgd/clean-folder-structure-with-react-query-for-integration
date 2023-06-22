import React from "react";
import styled from "styled-components";

//content
import poster from "./../../../../assets/images/detail/poster.jpg";

export default function OrganizerSubmissionDetailOverview() {
  return (
    <OverviewWrapper>
      <div className="left">
        <div className="card">
          <h1>Poster</h1>
          <div>
            <img src={poster} />
          </div>
        </div>
        <div className="card">
          <h1>
            Poster <h3 style={{ color: "var(--theme)" }}>View All</h3>
          </h1>
          <div className="photos">
            <img src={poster} />
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="card">
          <h1>director</h1>
          <div className="trailer">
            <p style={{ color: "#2196f3" }}>https://vimeo.com/78945</p>
            <button className="button">Watch Trailer</button>
          </div>
        </div>
        <div className="card">
          <h1>Poster</h1>
          <div>
            <img src={poster} />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="card">
          <h1>News & Review</h1>
          <div className="news">
            <h2>Ganimi Got Best Actor Award</h2>
            <p style={{ color: "#666" }}>Lokmat</p>
            <p style={{ color: "#2196f3" }}>
              https:///vimeo.com/78945vimeo.com/78945
            </p>
          </div>
        </div>
        <div className="card">
          <h1>File & Attachment </h1>
          <div className="news">
            <p>
              Director <i className="ri-folder-download-fill"></i>
            </p>
          </div>
        </div>
        <div className="card">
          <div className="bio">
            <h2>Director's Bio</h2>
            <p>This is Director's Bio </p>
            <h2>Director's Bio</h2>
            <p>This is Director's Bio </p>
          </div>
        </div>
      </div>
    </OverviewWrapper>
  );
}

const OverviewWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  flex: 1;
  @media screen and (max-width: 950px) {
    flex-direction: column;
  }

  .card {
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    flex: 1;
    position: relative;
    & > h1 {
      display: flex;
      justify-content: space-between;
    }

    & > div {
      padding: 20px;
      border-radius: 10px;
      border: 2px dotted #a3c9fa;
      width: 100%;
      position: relative;
      img {
        width: 100% !important;
      }
    }
    .trailer {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      flex-direction: column;
    }
    .news {
      border: 1px solid #a3c9fa;
      padding-bottom: 2px;
      padding-left: 5px;

      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden !important;
        & > i {
          font-size: 30px;
          color: #4caf50;
        }
      }
    }
    .photos {
      border: none;
      min-height: 400px;
      & > img {
        width: 30%;
      }
    }
    .bio {
      display: flex;
      flex-direction: column;
      border: none;

      P {
        color: #999;
      }
    }
  }

  & > .left {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: max-content;
  }
  & > .middle {
    height: max-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & > .right {
    height: max-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
