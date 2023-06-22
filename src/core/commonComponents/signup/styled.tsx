import styled from "styled-components";

export const SignupPage = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  padding: 30px;
  position: sticky;
  top: 0;
  margin-top: -80px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  & > div {
    height: 100%;
    /* max-width: var(--maxwidth2); */
    margin: auto;
    display: flex;
    background-color: #f2f7ff;
    @media screen and (max-width: 680px) {
      height: auto;
      input {
        padding: 6px !important;
      }
      h1 {
        font-size: 26px !important;
      }
      .foam {
        padding: 10px !important;
      }
      .submit_btn {
        padding-top: 10px !important ;
      }
    }
    .button {
      position: absolute;
      top: 0;
      right: 0;
      /* button */
      transform: translate(0%, -0%);
      background-color: white;
      /* font-size: 50px; */
      height: 50px;
      display: flex;
      font-size: 40px;
      justify-content: center;
      line-height: 100%;
      width: 50px;
      border: 2px solid var(--heading1);
      border-radius: 50%;
      color: var(--heading2);
    }
    .button2 {
      display: none;
    }

    & > .left {
      width: 50%;
      position: relative;
      display: flex;
      align-items: center;
      .height100 {
        height: 50% !important;
      }
      .login_img {
        position: absolute;
        top: 0;
        left: 00;
        z-index: 0;
      }
      .login_img {
        position: absolute;
        top: 0;
        left: 00;
        z-index: 0;
        height: 200px;
        width: 100%;
        display: none;
        background-color: var(--theme);
      }
      & > h1 {
        position: absolute;
        top: 20px;
        left: 20px;
        color: white;
        font-size: 18px;
        font-weight: 600;
      }
      & > p {
        position: absolute;
        top: 50px;
        left: 20px;
        color: white;
        font-size: 14px;
        font-weight: 500;
      }
      & > div {
        z-index: 999;
        width: 100%;
        max-width: 490px;
        margin: auto;
        height: 90%;
        position: relative;
        display: flex;
        align-items: center;

        & > .foam {
          top: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          overflow: hidden;
          width: calc(100% - 60px);
          height: calc(100% - 60px);
          margin: auto;
          border: 2px dotted var(--theme);
          left: 50%;
          z-index: 5;
          display: flex;
          align-items: center;
          color: var(--heading1);
          padding-top: 20px;
          flex-direction: column;
          padding: 25px;
          border-radius: 5px;
          background-color: white;

          & > .title {
            display: flex;
            justify-content: center;
            & > h1 {
              font-size: 40px;
            }
          }

          & > .foam_field {
            display: flex;
            position: relative;
            flex-wrap: wrap;
            & > h4 {
              padding-top: 20px;
              font-weight: 400;
              font-weight: 14px;
              padding-left: 10px;
            }

            & > .full,
            & > .half {
              display: flex;
              flex-direction: column;
              width: 100%;

              & > label {
                font-size: 14px;
                color: black;
                font-weight: 600;
                padding-bottom: 5px;
              }
              & > .role {
                display: flex;
                justify-content: center;
                border-radius: 5px;
                & > button {
                  width: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 40px;
                  font-weight: 700;
                  font-size: 14px;
                  border: none;
                  outline: none;
                  color: var(--heading1);
                  background-color: #f2f7ff;
                }
              }
              & > input {
                width: 100%;
                margin-bottom: 12px;
                padding: 14px 8px;
                border-radius: 10px;
                border: 1px solid #999;
                outline: 1px solid #999 !important;
                ::placeholder {
                  color: #333;
                  font-size: 14px;
                  font-weight: 500;
                }
                &:focus {
                  outline: 1px solid var(--theme);
                  border: none;
                }
                :invalid {
                  outline: none !important;
                  border: 1px solid red;
                }
                :invalid + p {
                  display: block !important;
                  font-size: 12px;
                  color: red;
                  transform: translateY(-8px);
                }
              }
              & > textarea {
                width: 100%;
                margin-bottom: 12px;
                padding: 5px 10px;
                border-radius: 10px;
                border: 1px solid #999;
                min-height: 140px;
                ::placeholder {
                  color: #333;
                  font-size: 14px;
                  font-weight: 500;
                }
                &:focus {
                  outline: 2px solid var(--theme);
                  border: none;
                }
              }
            }

            & > .half {
              display: flex;
              flex-direction: column;
              width: 50%;
            }
            & > .first_half {
              /* padding-right: 10px; */
            }
            & > .submit_btn {
              display: flex;
              justify-content: space-evenly;
              flex-wrap: nowrap;
              flex-direction: row;
              align-items: center;
              padding-top: 40px;
              & > h5 {
                color: var(--theme);
                font-weight: 500;
              }

              & > .submit {
                width: max-content;
                display: flex;
                align-items: center;
                padding: 20px 25px;
                background-color: var(--theme);
                height: 36px;
                font-size: 14px;
                line-height: 24px;
                color: var(--heading1);
                outline: none;
                border: none;
                font-weight: 600;
                border-radius: 5px;
                color: white;
                text-decoration: none;
              }
            }
          }
        }
      }
    }
    & > .right {
      width: 50%;
      position: relative;
      & > img {
        width: 100%;
        height: 100%;
        background-color: var(--theme);
      }
      & > button {
        position: absolute;
        top: 0;
        right: 0;
        /* button */
        transform: translate(0%, -0%);
        background-color: white;
        /* font-size: 50px; */
        height: 50px;
        display: flex;
        font-size: 40px;
        justify-content: center;
        line-height: 100%;
        width: 50px;
        border: 2px solid var(--heading1);
        border-radius: 50%;
        color: var(--heading2);
      }
    }
    @media screen and (max-width: 680px) {
      flex-direction: column-reverse;
      .left {
        width: 100%;
        height: 100vh;
        .button2 {
          display: block;
        }
        .login_img {
          display: block;
        }
        & > div {
          margin-top: 100px;
        }
      }
      .right {
        height: max-content;
        width: 100%;
        img {
          display: none;
        }
      }
    }
  }
`;
