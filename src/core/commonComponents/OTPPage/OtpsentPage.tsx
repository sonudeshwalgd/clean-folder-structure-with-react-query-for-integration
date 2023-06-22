import React from "react";
import { useEffect } from "react";
import { OtpsentPage } from "./Styled";

//content
// import login_img from "./../assets/images/login/login_img.svg"
// import Subtract from "./../assets/images/login/login-bg.png"
// import forgot from "./../assets/images/login/forgot.svg"
import otpsent from "./../../../assets/images/login/otpsent.svg";
// import Subtract from "./../assets/images/login/login form.jpg"
// import login_img from "./../assets/images/login/login form.jpg"

type OTPPropsType = {
  showOTPPage: () => void;
};

export default function Otpsent({ showOTPPage }: OTPPropsType) {
  return (
    <>
      <OtpsentPage>
        <div>
          <div className="right">
            <div className="back_opacity"></div>
            <img src={otpsent}></img>
            <h3>Success</h3>
            <h5>OTP Sent Successfully on werf</h5>
            <button
              onClick={() => {
                showOTPPage();
              }}
            >
              x
            </button>
          </div>
        </div>
      </OtpsentPage>
    </>
  );
}
