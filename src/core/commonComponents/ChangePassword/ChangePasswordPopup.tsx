import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { getChangePassword } from "../../Api/Api";
import ForgotPage from "../Forgot/ForgotPage";
import Result from "../Request result popup/Result";
import login_img from "./../../../assets/images/login/login_img.svg";
import login_img_samll from "./../../../assets/images/login/login_samll.svg";
import { ChangePasswordWrapper } from "./styled";

type LoginPropsType = {
  showChnagePassword: () => void;
};
export default function ChangePassword({ showChnagePassword }: LoginPropsType) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showResponseResultSuccess, setShowResponseResultSuccess] =
    useState(false);
  const [showResponseResultError, setShowResponseResultError] = useState(false);
  const [showDifferentPasswordAlert, setShowDifferentPasswordAlert] =
    useState(false);

  const oldPassword = useRef<any>();
  const newFirstPassword = useRef<any>();
  const newSecondPassword = useRef<any>();

  const { mutate, data } = useMutation(["changePassword"], getChangePassword, {
    onSuccess: (res) => {
      setShowResponseResultSuccess(true);
      // showChnagePassword()
    },
    onError: () => {
      setShowResponseResultError(true);
    },
  });

  const changePasswordHandler = () => {
    setShowDifferentPasswordAlert(false);
    oldPassword.current.setAttribute("required", true);
    newFirstPassword.current.setAttribute("required", true);
    newSecondPassword.current.setAttribute("required", true);
    const userData = {
      oldpassword: oldPassword.current.value,
      newpassword: newFirstPassword.current.value,
    };
    if (newFirstPassword.current.value === newSecondPassword.current.value)
      return mutate(userData);
    return setShowDifferentPasswordAlert(true);
  };

  const handleTogglePopupForgot = () => {
    setShowChangePassword(false);
  };
  const handleToggleResultSuccessPopup = () => {
    setShowResponseResultSuccess(false);
  };
  const handleToggleResultErrorPopup = () => {
    setShowResponseResultError(false);
  };

  return (
    <>
      {showChangePassword && (
        <ForgotPage showForgotForm={handleTogglePopupForgot} />
      )}
      {showResponseResultSuccess && (
        <Result
          state="Success"
          description={data?.message}
          showResult={handleToggleResultSuccessPopup}
        />
      )}
      {showResponseResultError && (
        <Result
          state="Error"
          description="Old password is wrong"
          showResult={handleToggleResultErrorPopup}
        />
      )}

      <ChangePasswordWrapper
        className="logincard"
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            showChnagePassword();
          }
        }}
      >
        <div>
          <div className="left">
            <img className="login_img" src={login_img_samll}></img>
            <h1>Log In </h1>
            <p>Login and Submit Thousand of world Film Festivals</p>
            <div>
              <div className="foam">
                <div className="title">
                  <h1>Change Password</h1>
                </div>
                <div className="foam_field">
                  <div className="full first_half">
                    <label htmlFor="email"> Old Password</label>
                    <input
                      ref={oldPassword}
                      id="email"
                      placeholder="Enter Old Password"
                    ></input>
                    <p style={{ display: "none" }}>Enter Your Old Password</p>
                  </div>

                  <div className="full">
                    <label htmlFor="subject">New Password</label>
                    <input
                      ref={newFirstPassword}
                      id="subject"
                      placeholder="Enter New Password "
                    ></input>
                    <p style={{ display: "none" }}>Enter Your New Password</p>
                  </div>

                  <div className="full">
                    <label htmlFor="subject">New Password Again</label>
                    <input
                      ref={newSecondPassword}
                      id="subject"
                      placeholder="Enter New Password Again "
                    ></input>
                    <p style={{ display: "none" }}>
                      Enter Your New Password Again
                    </p>
                  </div>
                  {showDifferentPasswordAlert && (
                    <h5 style={{ color: "red" }}>Both Password Must Same</h5>
                  )}
                  <div className="full submit_btn">
                    <h5 style={{ visibility: "hidden" }}>
                      Don't have an account click here..
                    </h5>
                    <button
                      className="submit"
                      onClick={() => changePasswordHandler()}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="button button2"
              onClick={() => showChnagePassword()}
            >
              x
            </button>
          </div>
          <div className="right">
            <img src={login_img}></img>

            <button className="button " onClick={() => showChnagePassword()}>
              x
            </button>
          </div>
        </div>
      </ChangePasswordWrapper>
    </>
  );
}
