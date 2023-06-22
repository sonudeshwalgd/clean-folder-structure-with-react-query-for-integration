import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { getListAllPlans, postContactUsMessage } from "../../Api/Api";
import EmailSent from "../Email sent successfull popup/LoginError";

//content

import contact from "./../../../assets/images/contact/contact_new.svg";

export default function ContactUs() {
  const [showEmailSentSuccess, setShowEmailSentSuccess] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMobile, setFormMobile] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const name = useRef<any>();
  const email = useRef<any>();
  const number = useRef<any>();
  const subject = useRef<any>();
  const message = useRef<any>();

  const userData = {
    subject: formSubject,
    body: `name : ${formName}<br/>\nmobile :${formMobile}<br/>\n\n${formMessage}\n `,
  };

  const { mutate } = useMutation(
    ["contactUsMessage", userData],
    postContactUsMessage,
    {
      onSuccess: (response) => {
        setShowEmailSentSuccess(true);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const requestUserRegistration = () => {
    name.current.setAttribute("required", true);
    email.current.setAttribute("required", true);
    number.current.setAttribute("required", true);
    message.current.setAttribute("required", true);
    subject.current.setAttribute("required", true);
    if (
      formName.length > 0 &&
      formEmail.length > 11 &&
      formSubject.length > 0 &&
      formMobile.length > 5 &&
      formMessage.length > 0
    )
      return mutate(userData);
  };

  const handleTogglePopupEmailSent = () => {
    setShowEmailSentSuccess(false);
  };

  return (
    <>
      {showEmailSentSuccess && (
        <EmailSent toggleShowEmailSent={handleTogglePopupEmailSent} />
      )}

      <ContactUsWrapper>
        <div>
          <div className="start">
            <div className="img">
              <img src={contact}></img>
            </div>
            <div className="foam_right">
              <h2>Contact Us</h2>
              <div className="foam">
                <h3>
                  Have Questions ? you may find answers here. If not get in
                  touch with us. We'are listening and ready to help.
                </h3>
                <div className="foam_field">
                  <div className="full">
                    <label htmlFor="name">Name</label>
                    <input
                      ref={name}
                      id="name"
                      placeholder="Enter your name "
                      value={formName}
                      onChange={(e) => {
                        setFormName(e.target.value);
                      }}
                    ></input>
                    <p style={{ display: "none" }}>Enter Your Name</p>
                  </div>
                  <div className="half first_half">
                    <label htmlFor="email">Email Id</label>
                    <input
                      ref={email}
                      type="email"
                      id="email"
                      placeholder="Enter  Email id "
                      value={formEmail}
                      onChange={(e) => {
                        setFormEmail(e.target.value);
                      }}
                    ></input>
                    <p style={{ display: "none" }}>Enter Your Email</p>
                  </div>
                  <div className="half">
                    <label htmlFor="mobile">Mobile No</label>
                    <input
                      ref={number}
                      id="mobile"
                      type="number"
                      placeholder="Enter  Mobile No "
                      value={formMobile}
                      onChange={(e) => {
                        setFormMobile(e.target.value);
                      }}
                    ></input>
                    <p style={{ display: "none" }}>Enter Your Number</p>
                  </div>
                  <div className="full">
                    <label htmlFor="subject">Subject</label>
                    <input
                      ref={subject}
                      id="subject"
                      placeholder="Enter  Subject "
                      value={formSubject}
                      onChange={(e) => {
                        setFormSubject(e.target.value);
                      }}
                    ></input>
                    <p style={{ display: "none" }}>Enter Your Subject</p>
                  </div>
                  <div className="full">
                    <label htmlFor="message">Message</label>
                    <textarea
                      ref={message}
                      id="message"
                      placeholder="Enter  Message "
                      value={formMessage}
                      onChange={(e) => {
                        setFormMessage(e.target.value);
                      }}
                    ></textarea>
                    <p style={{ display: "none" }}>Enter Your Message</p>
                  </div>
                  <div className="full">
                    <button
                      className="submit"
                      onClick={() => requestUserRegistration()}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContactUsWrapper>
    </>
  );
}

const ContactUsWrapper = styled.section`
  width: 100;
  position: relative;
  background-color: var(--background);
  padding: 3px 0 20px 0;
  min-height: calc(100vh - 205px);
  & > div {
    max-width: var(--maxwidth1);
    position: relative;
    margin: auto;
    & > .start {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10%;
      overflow: hidden;
      & > .img {
        flex: 1;
        margin: auto;
        position: relative;
        width: 100vw;
        display: flex;
        justify-content: center;
        min-width: 340px;
        & > img {
          width: 70%;
          height: 80%;
          object-fit: cover;
        }
      }
      & > .foam_right {
        /* width: 40%; */
        flex: 1;
        /* min-height: 320px; */
        min-width: 300px;
        margin: auto;

        & > h2 {
          color: #333;
          font-size: 20px;
          padding-bottom: 20px;
        }
        & > .foam {
          border-radius: 20px;
          background-color: white;
          padding: 20px;

          & > h3 {
            font-size: 14px;
            color: #999;
            font-weight: 500;
            padding-bottom: 20px;
          }
          & > .foam_field {
            display: flex;
            position: relative;
            flex-wrap: wrap;

            & > .full,
            & > .half {
              display: flex;
              flex-direction: column;
              width: 100%;

              & > label {
                font-size: 14px;
                color: #999;
                font-weight: 400;
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

              & > .submit {
                width: max-content;
                align-self: center;
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

            & > .half {
              display: flex;
              flex-direction: column;
              width: 50%;
            }
            & > .first_half {
              padding-right: 10px;
            }
          }
        }
      }
    }
  }
`;
