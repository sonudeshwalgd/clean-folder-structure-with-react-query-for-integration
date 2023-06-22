import styled from "styled-components";

export const OtpsentPage = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 4;
  padding: 42px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1002;
  & > div {
    height: 100%;
    /* max-width: var(--maxwidth2); */
    margin: auto;
    display: flex;
    /* background-color: #F2F7FF; */
    justify-content: center;
    align-items: center;
    & > .back_opacity {
      height: 100%;
      width: 100%;
      position: absolute;
      opacity: 0.5;
      z-index: -1;
    }

    & > .right {
      width: 350px;
      height: 320px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 10px;
      z-index: 0;
      & > img {
        width: 50%;
        margin-top: 50px;
      }
      & > h3 {
        color: var(--heading0);
        padding: 20px 0;
      }
      & > h5 {
        font-weight: 600;
        font-size: 14px;
      }
      & > button {
        position: absolute;
        top: 0;
        right: 0;
        box-shadow: 0 0 5px 5px rgba(0, 00, 0, 0.1);
        transform: translate(40%, -50%);
        background-color: white;
        /* font-size: 50px; */
        height: 40px;
        display: flex;
        font-size: 25px;
        justify-content: center;
        align-items: center;
        line-height: 100%;
        padding-bottom: 8px;
        width: 40px;
        border: 0px solid var(--heading1);
        border-radius: 50%;
        color: var(--heading3);
        font-weight: 500;
      }
    }
  }
`;
