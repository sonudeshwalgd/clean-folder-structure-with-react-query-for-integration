import styled from "styled-components";

export const ChangePasswordWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  padding: 3vw;
  position: sticky;
  top: 0;
  margin-top: -140px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  & > div {
    height: 100%;
    margin: auto;
    display: flex;
    background-color: #f2f7ff;
    .button {
      position: absolute;
      top: 0;
      right: 0;
      /* button */
      transform: translate(0%, -0%);
      background-color: white;
      height: 50px;
      display: flex;
      font-size: 30px;
      justify-content: center;
      align-items: center;
      line-height: 100%;
      padding-bottom: 8px;
      width: 50px;
      border: 0px solid var(--heading1);
      border-radius: 50%;
      color: var(--heading2);
      font-weight: 300;
    }

    & > .left {
      width: 50%;
      position: relative;
      display: flex;
      align-items: center;
      .button2 {
        display: none;
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
        width: 100%;
        max-width: 600px;
        margin: auto;
        height: 88%;
        position: relative;
        display: flex;
        align-items: center;

        & > .foam {
          top: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          overflow: hidden;
          width: calc(100% - 80px);
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
          height: calc(100% - 80px);
          height: max-content;
          & > .title {
            display: flex;
            justify-content: center;
            & > h1 {
              font-size: 40px;
              padding-bottom: 20px;
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
                font-weight: 500;
                padding-bottom: 5px;
              }
              & > input {
                width: 100%;
                margin-bottom: 12px;
                padding: 14px 8px;
                border-radius: 10px;
                border: 1px solid #999;
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
              padding-top: 8px;
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
                white-space: nowrap;
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
          margin-top: 115px;
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
