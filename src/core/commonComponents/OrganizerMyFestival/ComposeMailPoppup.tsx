import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { postComposeMail } from "../../Api/Api";

//content
import icon1 from "../assets/images/organizer dashboard/1.svg";
import icon2 from "../assets/images/organizer dashboard/red_important.svg";
import LoadingPage from "../LoadingFallback/Loading";
import Result from "../Request result popup/Result";

type CheckoutPropsType = {
  toggleCheckout: () => void;
};

export default function ComposemailPopup({
  toggleCheckout,
}: CheckoutPropsType) {
  const [formSubject, setSubject] = useState("");
  const [formMessage, setMessage] = useState("");

  const subject = useRef<any>();
  const message = useRef<any>();

  const userData = {
    subject: formSubject,
    message: formMessage,
    festivalid: localStorage.getItem("festivalId"),
  };

  const [resultData, setResultData] = useState<any>();
  const { mutate, isLoading } = useMutation(
    ["composeMail", userData],
    postComposeMail,
    {
      onSuccess: (res) => {
        setIsResultVisibleTwo(true);
        setResultData(res);
        // if(response.user.account==0) return navigate("/organizer/dashboard")
        // return navigate("/director/festival")
      },
      onError: (err: any) => {
        setResultData(err.response.data);
        setIsResultVisibleTwo(true);
      },
    }
  );

  const sendComposeMail = () => {
    subject.current.setAttribute("required", true);
    message.current.setAttribute("required", true);
    mutate(userData);
  };

  const [isResultVisibleTwo, setIsResultVisibleTwo] = useState<boolean>(false);
  const resultVisibilityTwoFalseHandler = () => {
    setIsResultVisibleTwo(false);
  };

  return (
    <>
      {isLoading && <LoadingPage />}

      {isResultVisibleTwo && (
        <Result
          state={resultData?.message ? "Success" : "Error"}
          description={
            resultData?.message ? resultData?.message : "Something Went Wrong"
          }
          showResult={resultVisibilityTwoFalseHandler}
        />
      )}

      <ComposeMailWrapper
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            toggleCheckout();
          }
        }}
      >
        <div>
          <div className="notification_tab">
            <h1>Compose Mail</h1>
            <div className="foam">
              <ul>
                <li>
                  <p>Subject</p>
                  <input
                    ref={subject}
                    placeholder="Subject"
                    type="text"
                    value={formSubject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                  ></input>
                  <p style={{ display: "none" }}>Enter Your Number</p>
                </li>
                <li>
                  <p>Message</p>
                  <textarea
                    ref={message}
                    placeholder="Message"
                    value={formMessage}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
                  <p style={{ display: "none" }}>Enter Your Number</p>
                </li>
              </ul>
              <button className="submit" onClick={() => sendComposeMail()}>
                <i className="ri-send-plane-line"></i>Send Mail
              </button>
            </div>
          </div>
          <button onClick={() => toggleCheckout()}>x</button>
        </div>
      </ComposeMailWrapper>
    </>
  );
}

const ComposeMailWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0;
  /* margin-top: -120px; */
  left: 0;
  background-color: rgba(0, 0, 0, 0.3) !important;
  z-index: 1000;
  display: flex;
  align-items: center;
  margin: auto;
  max-width: 100vw !important;
  & > div {
    height: max-content;
    margin: auto;
    display: flex;
    background-color: #f2f7ff;
    position: relative;
    background-color: transparent;

    & > button {
      position: absolute;
      top: 0;
      right: 0;
      /* button */
      transform: translate(0%, -0%);
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
    & > .notification_tab {
      width: calc(100vw - 40px);

      max-width: var(--maxwidth2);
      margin: auto;
      padding: 0 20px;
      border-radius: 10px;
      box-shadow: var(--shadow);
      padding: 20px 0;
      background-color: white;

      & > h1 {
        padding-left: 30px;
      }

      & > .content {
        padding: 20px 0px 20px 0px;
        max-width: var(--maxwidth2);
        margin: auto;
        & > h1 {
          font-size: 20px;
        }
        & > div {
          display: flex;
          gap: 20px;
          align-items: center;
          padding: 0 10px;
          & > input {
            transform: scale(1.3);
          }
        }
      }

      .important {
        width: 100%;
        display: flex;
        background-color: #b9d6fb;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 10px;

        & > p {
          display: flex;
          align-items: center;
          color: var(--theme);

          & > img {
            height: 30px;
            width: 30px;
            float: left;
            display: block;
            color: var(--theme);
            margin-right: 20px;
          }
        }
      }
      & > .approve {
        display: flex;
        flex-direction: column;
        gap: 10px;
        p {
          font-size: 14px;
          color: #111;
          font-weight: 600;
        }
        span {
          color: #3bb98a;
        }
        h4 {
          font-weight: 500;
          color: #3bb98a;
        }
        & > input {
          width: 45%;
          min-width: 300px;
          padding: 14px 10px;
          border-radius: 10px;
          border: 1px solid #666;
          outline: none;
          ::placeholder {
            font-size: 16px;
            color: #111;
          }
        }
        & > .blue_button {
          padding: 8px 22px;
          font-size: 16px;
          font-weight: 500;
          color: white;
          background-color: var(--theme);
          border-radius: 5px;
          width: max-content;
          border: none;
          outline: none;
          margin-bottom: 10px;
        }
      }
      @media screen and (max-width: 500px) {
        width: 90vw;
        & > h1 {
          padding-left: 10px;
        }
        .foam {
          width: 100% !important;
        }
      }
    }
  }
  .foam {
    width: 85%;
    margin-left: auto;
    display: flex;
    align-self: flex-end;
    flex-direction: column;
    & > ul {
      list-style: none;
      & > li {
        display: flex;
        padding: 10px;

        & > p {
          padding-right: 15px;
          width: 120px;
          font-size: 14px;
          font-weight: 600;
          color: #111;
          text-align: right;
          white-space: nowrap;
        }
        & > input {
          width: 100%;
          height: 50px;
          border-radius: 10px;
          border: 1px solid #333;
          background-color: inherit;
          padding: 10px;
          ::placeholder {
            font-size: 16px;
            color: #111;
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
          height: 150px;
          border-radius: 10px;
          border: 1px solid #333;
          background-color: inherit;
          padding: 10px;
          ::placeholder {
            font-size: 16px;
            color: #333;
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
        @media screen and (max-width: 500px) {
          flex-direction: column;
          & > p {
            text-align: left;
            padding-bottom: 10px;
          }
        }
      }
    }
    & > .submit {
      width: max-content;
      padding: 10px 50px;
      align-items: center;
      display: flex;
      color: white;
      background-color: var(--theme);
      font-size: 18px;
      font-weight: 600;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 10px 20px 0;
      margin-left: 20%;

      & > i {
        padding-right: 20px;
        font-size: 20px;
        font-weight: 700;
        color: white;
      }
    }
  }
`;
