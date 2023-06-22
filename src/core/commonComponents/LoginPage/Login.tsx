import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate,Link } from "react-router-dom";
import { postLogin } from "../../Api/Api";
import ForgotPage from "../Forgot/ForgotPage";
import LoginError from "../Login error popup/LoginError";
import styled from "styled-components";
// import Forgot from './Forgot'
// import Ticket from './Ticket'

//content
import login_img from "./../../../assets/images/login/login_img.svg";
import login_img_samll from "./../../../assets/images/login/login_samll.svg";
// import Subtract from "./../../../assets/images/login/login-bg.png";

// import foam2 from "./../../../assets/images/login/foam2.png";

type LoginPropsType = {
  showLoginForm: () => void;
};
export default function Login({ showLoginForm }: LoginPropsType) {
  const navigate = useNavigate();

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [showForgot, setShowForgot] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);

  const password = useRef<any>();
  const email = useRef<any>();

  const userData = {
    emailid: formEmail,
    password: formPassword,
  };

  const { mutate, data } = useMutation(["login", userData], postLogin, {
    onSuccess: (response) => {
      if (response?.user?.account == 0) return navigate("/organizer/dashboard");
      if (response?.user?.account == 1) return navigate("/director/festival");
    },
    onError: (error) => {
      console.log(error);
      setShowLoginError(true);
    },
  });

  const requestUserLogin = () => {
    password.current.setAttribute("required", true);
    email.current.setAttribute("required", true);
    mutate(userData);
  };

  const handleTogglePopupForgot = () => {
    setShowForgot(false);
  };
  const handleTogglePopupLoginError = () => {
    setShowLoginError(false);
  };
  return (
    <>
      {showForgot && (
        <ForgotPage showForgotForm={handleTogglePopupForgot}></ForgotPage>
      )}
      {showLoginError && (
        <LoginError
          showLoginErrorForm={handleTogglePopupLoginError}
        ></LoginError>
      )}

      <LoginPage className="logincard">
        <div>
          <div className="left">
            <img className="login_img" src={login_img_samll}></img>

            <h1>Log In </h1>
            <p>Login and Submit Thousand of world Film Festivals</p>
            <div>
              <div className="foam">
                <div className="svg-wrapper">
                  <svg>
                    <mask id="m" fill="transparent">
                      <rect
                        id="b"
                        width="100%"
                        height="100%"
                        style={{ fill: "var(--theme)" }}
                      />
                      <circle id="c" r="30" fill="#000" />
                      <use href="#c" x="100%" />
                      <use href="#c" y="100%" />
                      <use href="#c" x="100%" y="100%" />
                    </mask>
                    <use href="#b" mask="url(#m)" />
                  </svg>
                </div>
                <div className="main-form">
                  <div>
                    <div>
                      <div className="title">
                        <h1>Log In</h1>
                      </div>
                      <div className="foam_field">
                        <div className="full first_half">
                          <label htmlFor="email"> E-mail Address</label>
                          <input
                            ref={email}
                            id="email"
                            type="email"
                            placeholder="Enter  Email id "
                            onChange={(e) => {
                              setFormEmail(e.target.value);
                            }}
                          ></input>
                          <p style={{ display: "none" }}>Enter Your Email</p>
                        </div>

                        <div className="full">
                          <label htmlFor="subject">Password</label>
                          <input
                            ref={password}
                            id="subject"
                            placeholder="Enter  Password "
                            onChange={(e) => {
                              setFormPassword(e.target.value);
                            }}
                          ></input>
                          <p style={{ display: "none" }}>Enter Your Password</p>
                        </div>
                        <h4 onClick={() => setShowForgot(true)}>
                          Forgot password
                        </h4>

                        <div className="full submit_btn">
                          <Link to="signup"><h5>Don't have an account click here..</h5></Link>
                          <button
                            className="submit"
                            onClick={() => requestUserLogin()}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="button button2" onClick={() => showLoginForm()}>
              x
            </button>
          </div>
          <div className="right">
            <img src={login_img}></img>

            <button className="button " onClick={() => showLoginForm()}>
              x
            </button>
          </div>
        </div>
      </LoginPage>
    </>
  );
}

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  padding: 3vw;
  position: sticky;
  top: 0;
  margin-top: -80px;
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
        max-width: 490px;
        margin: auto;
        position: relative;
        display: flex;
        align-items: center;

        & > .foam {
          width: calc(100% - 80px);
          margin: auto;
          z-index: 5;
          display: flex;
          align-items: center;
          color: var(--heading1);
          /* padding-top: 20px; */
          flex-direction: column;
          /* padding: 25px; */
          border-radius: 5px;
          background-color: white;
          height: max-content;
          position: relative;
          .main-form {
            /* padding: 40px; */
            & > div {
              padding: 40px;
              & > div {
                padding: 20px;
                border: 2px dotted var(--theme);
              }
            }
          }
          .title {
            display: flex;
            justify-content: center;
            & > h1 {
              font-size: 40px;
            }
          }

          .foam_field {
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
  .svg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  svg {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }
`;
