import { useNavigate } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import girl from "../../../assets/images/organizer dashboard/girl.svg";

export default function EmptyData({
  title,
  button,
  seasonVisibility,
  onClick,
}: any) {
  const routeTo = useNavigate();

  return (
    <>
      <Wrapper>
        <div>
          {seasonVisibility && (
            <>
              <div className="content">
                <div>
                  <p>Season</p>
                  <select>
                    <option>Current season</option>
                  </select>
                </div>
              </div>
            </>
          )}
          <div className="main">
            <h1>{title}</h1>
            <img src={girl}></img>
            <button onClick={onClick}>{button}</button>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--background);
  height: 100%;

  & > div {
    max-width: var(--maxwidth2);
    margin: auto;
    padding: 10px;
  }
  .content {
    padding: 20px 0px 10px 0px;
    max-width: var(--maxwidth2);
    margin: auto;
    /* display: none; */
    @media screen and (max-width: 1150px) {
      padding-top: 56px;
    }
    & > div {
      display: flex;
      gap: 20px;
      align-items: center;
      padding: 0 10px;
      & > input {
        transform: scale(1.3);
      }
    }
    & > div {
      display: block;
      width: max-content;
      margin-left: auto;

      & > p {
        font-size: 14px;
        padding: 5px 0;
        font-weight: 500;
      }
      & > select {
        padding: 10px 80px 10px 10px;
        border-radius: 10px;
        font-size: 16px;
        background-color: inherit;
      }
    }
  }
  .main {
    background-color: white;
    border-radius: 10px;
    min-height: 90vh;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    h1 {
      font-size: 24px;
      color: #333;
    }
    button {
      padding: 8px 22px;
      color: white;
      background-color: var(--theme);
      border: none;
      outline: none;
      border-radius: 5px;
    }
  }
`;
