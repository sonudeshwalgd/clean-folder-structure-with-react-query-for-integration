import React from "react";
import styled from "styled-components";
import poster from "./../assets/images/detail/poster.jpg";

export default function OrganizerSubmissionDetailCredits() {
  return (
    <>
      <DetailCreditsWrapper>
        <div>
          <div className="card">
            <h1>Director</h1>
            <div>
              <div>
                <h2>Credit 1 :</h2>
                <p>Director 1 name</p>
              </div>
              <div>
                <h2>Credit 1 :</h2>
                <p>Director 1 name</p>
              </div>
            </div>
            <h1>Writer</h1>
            <div>
              <div>
                <h2>Credit 1 :</h2>
                <p>Director 1 name</p>
              </div>
              <div>
                <h2>Credit 1 :</h2>
                <p>Director 1 name</p>
              </div>
            </div>
            <h1>Producer</h1>
            <div>
              <div>
                <h2>Credit 1 :</h2>
                <p>Director 1 name</p>
              </div>
              <div>
                <h2>Credit 1 :</h2>
                <p>Director 1 name</p>
              </div>
            </div>
            <h1>Cameraman</h1>
            <div>
              <div>
                <h2>Kl</h2>
                <p>POP Camera</p>
              </div>
            </div>
          </div>
        </div>
      </DetailCreditsWrapper>
    </>
  );
}

const DetailCreditsWrapper = styled.div`
  width: 100%;
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
          font-size: 15px;
        }
      }
    }
  }
`;
