import React from "react";
import styled from "styled-components";

//content

import loading from "./../assets/images/lost/loading.svg";
import film from "./../assets/images/lost/film.svg";
import sphere from "./../assets/images/lost/sphere.svg";

export default function Loading() {
  return (
    <>
      <LoadingWrapper>
        <div>
          <img className="sphere" src={sphere}></img>
          <img className="loading" src={loading}></img>
          <img className="film " src={film}></img>
          <p>
            “Filmmaking is a chance to live many lifetime.”{" "}
            <b>- Robert Altman.</b>{" "}
          </p>
        </div>
      </LoadingWrapper>
    </>
  );
}

const LoadingWrapper = styled.div`
  width: 100vw;
  background-color: var(--background);
  & > div {
    max-width: 1400px;
    margin: auto;
    position: relative;
    height: 100vh;
    width: 100vw;
    display: grid;
    place-content: center;
    & > .sphere {
      position: absolute;
      left: 0;
      top: 10vh;
    }
    & > .loading {
      width: 20vw;
      min-width: 250px;
    }
    & > .film {
      position: absolute;
      right: 0;
      top: 40vh;
    }
    & > p {
      padding-top: 5vh;
      font-size: 16px;
      font-weight: 500;
      color: #999;
      & > b {
        color: #777;
      }
    }
  }
`;
