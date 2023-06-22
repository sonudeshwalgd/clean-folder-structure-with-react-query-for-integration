import React from "react";
import styled from "styled-components";

//content
import space from "./../assets/images/lost/space.svg";
import home from "./../assets/images/lost/home.svg";

type ReactPropTypes = {
  no: string;
};

export default function LostInSpace({ no }: ReactPropTypes) {
  return (
    <>
      <LostInSpaceWrapper>
        <div>
          <div className="left">
            <div className="error">{no}</div>
            <div className="content">
              <h1>Lost in Space ?</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                tempus ac elit facilisis nisi elit suscipit eget. Mi scelerisque
                dolor vitae sagittis aliquam aliquet ultrices et. Interdum
                mattis aliquet morbi blandit malesuada. Luctus lectus vitae
                laoreet nunc ut semper.{" "}
              </p>
              <button>
                <img src={home}></img>
                Go to Homepage
              </button>
            </div>
          </div>
          <div className="right">
            <img src={space}></img>
          </div>
        </div>
      </LostInSpaceWrapper>
    </>
  );
}
const LostInSpaceWrapper = styled.div`
  width: 100vw;
  background-color: var(--background);
  height: 100vh;
  position: relative;

  & > div {
    max-width: var(--maxwidth);
    margin: auto;
    position: relative;
    display: flex;
    padding: 20px;
    & > .left {
      width: 60%;
      overflow: hidden;
      & > .error {
        color: #d90000;
        font-size: 15vw;
        font-weight: 600;
        padding: 5vh 2vw;
      }
      & > .content {
        & > h1 {
          color: #999;
          font-size: 30px;
          font-weight: 800;
          padding-bottom: 30px;
        }
        & > p {
          color: #999;
          font-size: 16px;
          padding-bottom: 30px;
          font-weight: 600;
          @media screen and (max-width: 500px) {
            display: none;
          }
        }
        & > button {
          background-color: var(--theme);
          color: white;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          padding: 16px 36px;
          border-radius: 10px;
          outline: none;
          border: none;
          gap: 10px;
          @media screen and (max-width: 500px) {
            font-size: 16px;
            padding: 12px 8px;
            margin-top: 10vh;
          }
          & > img {
            height: 25px;
            width: 25px;
          }
        }
      }
    }
    & > .right {
      margin-top: 20vh;
      width: 40%;
      & > img {
        width: 40vw;
        object-fit: contain;
      }
    }
  }
`;
