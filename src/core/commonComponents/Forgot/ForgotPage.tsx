import React from "react";
import { useEffect, useState, useRef } from "react";
import { useMutation } from "react-query";
import UserProfile from "../../../modules/Organizer/containers/OrganizerDashboard/UserProfile";
import { postForgotOTPSend } from "../../Api/Api";
import { emailRegex } from "../../utils/regexes";
import Otpsent from "../OTPPage/OtpsentPage";

import forgot from "./../../../assets/images/login/forgot.svg";
import { ForgotWrapper } from "./styled";
import {Link} from 'react-router-dom';

type LoginPropsType = {
  showForgotForm: () => void;
};

export default function ForgotPage({ showForgotForm }: LoginPropsType) {
  const [formEmail, setFormEmail] = useState("");
  const [showOtpSent, setShowOtpSent] = useState(false);
  const forgotFoam: any = useRef();
  const email = useRef<any>();

  const userData = {
    emailid: formEmail,
  };

  const { mutate, data } = useMutation(
    ["otpsent", userData],
    postForgotOTPSend,
    {
      onSuccess: (response) => {
        console.log(response);
        confirmEmail();
        // if(response.user.account==0) return navigate("/organizer/dashboard")
        // return navigate("/director/festival")
      },
      onError: (error) => {
        //   setShowLoginError(true)
      },
    }
  );

  const requestUserOTPSend = () => {
    if (email.current.value.length === 0 || !emailRegex.test(email.current.value)
    ) {
      alert("Please enter valid email id");
      return;
    }
    // password.current.setAttribute("required",true)
    email.current.setAttribute("required", true);

    mutate(userData);
  };

  const handleTogglePopupOTP = () => {
    setShowOtpSent(false);
  };
  const confirmEmail = () => {
    setShowOtpSent(true);
    forgotFoam.current.scrollTo({ left: 600, behavior: "smooth" });
  };
  const changeEmail = () => {
    // setShowOtpSent(false)
    forgotFoam.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <>
      {showOtpSent && <Otpsent showOTPPage={handleTogglePopupOTP}></Otpsent>}
      <ForgotWrapper>
        <div>
          <div className="left">
            <div className="reset_otp">
              <div className="foam" ref={forgotFoam}>

                <div className="foam_otp">
                  <div className="title">
                    <h1>Forgot password</h1>
                  </div>

                  <div className="foam_field">
                    <div className="full first_half">
                      <label htmlFor="email" >
                        {" "}
                        E-mail Address
                      </label>
                      <input
                        id="email"
                        ref={email}
                        placeholder="Enter  Email id "
                        onChange={(e) => {
                          setFormEmail(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="full submit_btn">
                      <button
                        onClick={() => {
                          requestUserOTPSend();
                        }}
                        className="change"
                        type="submit"
                      >
                        CONFIRM MAIL
                      </button>
                    </div>
                  </div>
                </div>

                <div className="foam_email">
                  <div className="title">
                    <h1>Enter OTP</h1>
                  </div>

                  <div className="foam_field">
                    <div className="full first_half">
                      <label htmlFor="email"> Enter the 6 digit OTP</label>
                      <div className="otp_input">
                        <input type="number"></input>
                        <input type="number"></input>
                        <input type="number"></input>
                        <input type="number"></input>
                        <input type="number"></input>
                        <input type="number"></input>
                      </div>
                    </div>

                    <div className="full">
                      <div className="change_btn">
                        <button
                          className="resend"
                          onClick={() => {
                            requestUserOTPSend();
                          }}
                        >
                          RESEND
                        </button>
                        <button className="change">Change Password</button>
                      </div>
                    </div>

                    <div className="full submit_btn">
                      <button
                        className="change"
                        onClick={() => {
                          changeEmail();
                        }}
                      >
                        {" "}
                        Change Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <img src={forgot}></img>
            <button onClick={() => showForgotForm()}>x</button>
          </div>
        </div>
      </ForgotWrapper>
    </>
  );
}
