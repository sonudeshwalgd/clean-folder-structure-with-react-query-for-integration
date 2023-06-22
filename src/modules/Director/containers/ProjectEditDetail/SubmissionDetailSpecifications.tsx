import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getDirectorMyProject } from "../../../../core/Api/Api";
import poster from "./../../../../assets/images/detail/poster.jpg";

export default function DirectorSubmissionDetailSpecifications() {
  const { refetch, data } = useQuery("directorMyProject", getDirectorMyProject);
  const { runtime, projectbugdget, studentproject, firsttimefilmmaker } = data
    ? data[0]
    : "";

  return (
    <>
      <SubmissionDetailSpecificationsWrapper>
        <div>
          <div className="card">
            <div>
              <div>
                <h2>Runtime :</h2>
                <p>0 Hrs {runtime} Min 00 Sec</p>
              </div>
              <div>
                <h2>Production Budget :</h2>
                <p>INR {projectbugdget}.00</p>
              </div>
              <div>
                <h2>First Time Film maker :</h2>
                <p>{!firsttimefilmmaker ? "NO" : "Yes"}</p>
              </div>
              <div>
                <h2>Student Project :</h2>
                <p>{!studentproject ? "No" : "Yes"}</p>
              </div>
            </div>
          </div>
        </div>
      </SubmissionDetailSpecificationsWrapper>
    </>
  );
}

const SubmissionDetailSpecificationsWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  max-width: var(--maxwidth);
  margin: auto;
  .card {
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
    width: 50%;
    min-width: 300px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    @media screen and (max-width: 700px) {
      width: 100%;
    }
    & > div {
      padding-bottom: 10px;
      & > div {
        display: flex;
        justify-content: space-between;
        & > p {
          font-size: 17px;
          color: #999;
        }
        & > h2 {
          font-size: 14px;
        }
      }
    }
  }
`;
