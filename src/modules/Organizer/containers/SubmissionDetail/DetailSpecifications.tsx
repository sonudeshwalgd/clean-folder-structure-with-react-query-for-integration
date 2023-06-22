import React from "react";
import styled from "styled-components";
import poster from "./../assets/images/detail/poster.jpg";

export default function OrganizerSubmissionDetailSpecifications() {
  return (
    <>
      <DetailSpecificationsWrapper>
        <div>
          <div className="card">
            <div>
              <div>
                <h2>Runtime :</h2>
                <p>0 Hrs 55 Min 00 Sec</p>
              </div>
              <div>
                <h2>Production Budget :</h2>
                <p>INR 16000.00</p>
              </div>
              <div>
                <h2>First Time Film maker :</h2>
                <p>No</p>
              </div>
              <div>
                <h2>Student Project :</h2>
                <p>No</p>
              </div>
            </div>
          </div>
        </div>
      </DetailSpecificationsWrapper>
    </>
  );
}

const DetailSpecificationsWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  .card {
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
    width: 50%;
    min-width: 300px;
    padding: 20px;
    border-radius: 10px;
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
