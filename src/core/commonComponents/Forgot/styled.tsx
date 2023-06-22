import styled from "styled-components";

export const ForgotWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 3;
  padding: 42px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1001;
  & > div {
    height: 100%;
    /* max-width: var(--maxwidth2); */
    margin: auto;
    display: flex;
    background-color: #f2f7ff;

    & > .left {
      width: 50%;
      position: relative;
      display: flex;
      align-items: center;
      & > div {
        width: 100%;
        max-width: 490px;
        margin: auto;
        height: 60%;
        position: relative;
        display: flex;
        align-items: center;

        & > .foam {
          top: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          overflow: hidden;

          margin: auto;
          border: 2px dotted var(--theme);
          left: 50%;
          z-index: 5;
          display: flex;
          align-items: center;
          color: var(--heading1);
          padding-top: 20px;
          flex-direction: row;
          padding: 25px;
          border-radius: 5px;
          background-color: white;
          height: 340px;
          height: calc(100% - 60px);
          width: calc(100% - 60px);
          & > .foam_otp {
            margin-right: 100px;
          }
          & > div {
            min-width: 100%;

            & > .title {
              display: flex;
              width: 100%;
              justify-content: center;

              & > h1 {
                font-size: 40px;
                padding-bottom: 5px;
              }
            }

            & > .foam_field {
              display: flex;
              position: relative;
              flex-wrap: wrap;
              width: 100%;
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
                  padding-bottom: 20px;
                }
                & > .otp_input {
                  display: flex;
                  justify-content: space-between;
                  & > input {
                    height: 50px;
                    width: 40px;
                    border: none;
                    outline: none;
                    background-color: #f44336;
                    border-radius: 5px;
                  }
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
                & > .change_btn {
                  padding-top: 25px;
                  display: flex;
                  justify-content: space-between;
                  & > .resend {
                    width: 48.5%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 40px;
                    font-size: 14px;
                    border: 2px solid #111;
                    border-radius: 5px;
                    color: #111;
                    font-weight: 600;
                  }
                  & > .change {
                    width: 48.5%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 40px;
                    background-color: var(--theme);
                    color: white;
                    border: 2px solid var(--theme);
                    border-radius: 5px;
                    font-size: 14px;
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
                flex-wrap: nowrap;
                flex-direction: row;
                align-items: center;
                padding: 10px 0;

                & > h5 {
                  color: var(--theme);
                  font-weight: 500;
                }

                & > .change {
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 40px;
                  background-color: var(--theme);
                  color: white;
                  border: 2px solid var(--theme);
                  border-radius: 5px;
                  font-size: 14px;
                  margin-top: 10px;
                }
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
    }
  }
`;
