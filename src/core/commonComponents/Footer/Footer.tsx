import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <>
      <FooterWrapper>
        <div>
          <div className="top">
            <h3>Film Festival Company</h3>
            <ul>
              <li>
                <i className="ri-instagram-line"></i>
              </li>
              <li>
                <i className="ri-facebook-circle-fill"></i>
              </li>
              <li>
                <i className="ri-youtube-fill"></i>
              </li>
              <li>
                <i className="ri-twitter-fill"></i>
              </li>
            </ul>
          </div>
          <div className="bottom">
            <h5>All Right And Term Reserved by @Film Festival Company </h5>
            <h5 className="spacer">||</h5>
            <h5 className="tohide">Privacy Policy</h5>
          </div>
        </div>
      </FooterWrapper>
    </>
  );
}

const FooterWrapper = styled.footer`
  background-color: #2c2c2c;
  width: 100vw;
  & > div {
    width: var(--maxwidth);
    margin: auto;
    width: 100vw;
    & > .top {
      display: flex;
      justify-content: space-between;
      padding-top: 22px;
      & > h3 {
        font-weight: 600;
        color: white;
        font-size: 18px;
      }
      & > ul {
        display: flex;
        list-style: none;
        align-items: center;
        & > li {
          padding: 0 10px;
          & > i {
            font-size: 25px;
            color: white;
          }
        }
      }
    }
    & > .bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      padding-bottom: 20px;
      @media screen and (max-width: 520px) {
        padding-top: 20px;
        h5 {
        }
        .spacer {
          display: none;
        }
      }
    }
    & > h5 {
      font-weight: 500;
      margin: 0 0 0 10px;
      font-size: 14px;
      padding-bottom: 20px;
    }
  }
  @media screen and (max-width: 700px) {
    h3 {
      display: none;
    }
    .spacer,
    .tohide {
      display: none;
    }
    h5,
    ul {
      margin: auto;
      text-align: center;
    }
  }
`;
