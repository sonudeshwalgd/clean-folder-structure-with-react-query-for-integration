import React from "react";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { patchDirectorProjectViewNews } from "../../../../core/Api/Api";
import loading from "./../../../assets/images/loading.svg";

type OTPPropsType = {
  toggleVisibility: () => void;
  payloadId: string;
  refetch: any;
};

export default function AddNewsPopup({
  toggleVisibility,
  payloadId,
  refetch,
}: OTPPropsType) {
  const Title = useRef<any>();
  const Publication = useRef<any>();
  const Link = useRef<any>();

  const { mutate: patchNewsRequest, data: patchNews } = useMutation(
    ["patchDirectorProjectViewNews"],
    patchDirectorProjectViewNews,
    {
      onSuccess: (res) => {
        console.log(res);
        refetch();
      },
    }
  );
  const patchHandler = () => {
    var payload = {
      id: payloadId,
      link: Link.current.value,
      publication: Publication.current.value,
      title: Title.current.value,
    };
    console.log(payload);
    patchNewsRequest(payload);
  };

  return (
    <>
      <SelectRoleWrapper
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            toggleVisibility();
          }
        }}
      >
        <div>
          <div className="right">
            <div className="back_opacity"></div>
            <div className="foam_right">
              <div className="foam">
                <div className="foam_field">
                  <div className="full">
                    <label htmlFor="name">Title</label>
                    <input
                      ref={Title}
                      id="name"
                      placeholder="Enter your Title "
                    ></input>
                    <p style={{ display: "none" }}>Enter Your Title</p>
                  </div>
                  <div className="full ">
                    <label htmlFor="email">Publication</label>
                    <input
                      ref={Publication}
                      type="text"
                      id="email"
                      placeholder="Enter  Email Publication "
                    ></input>
                    <p style={{ display: "none" }}>Enter Your Publication</p>
                  </div>
                  <div className="full">
                    <label htmlFor="mobile">Link</label>
                    <input
                      ref={Link}
                      id="mobile"
                      type="text"
                      placeholder="Enter Your Link    "
                    ></input>
                    <p style={{ display: "none" }}>Enter Your Link</p>
                  </div>

                  <div className="full">
                    <button className="submit" onClick={() => patchHandler()}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="closeButton"
              onClick={() => {
                toggleVisibility();
              }}
            >
              x
            </button>
          </div>
        </div>
      </SelectRoleWrapper>
    </>
  );
}

const SelectRoleWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 4;
  padding: 42px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3) !important;
  z-index: 1002;
  & > div {
    height: 100%;
    margin: auto;
    display: flex;

    /* background-color: rgba(0,0,0,.3) !important; */
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
      min-width: 500px;
      height: max-content;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 10px;
      z-index: 0;
      padding: 0 40px 40px 40px;
      @media (max-width: 698px) {
        max-width: max-content;
      }
      & > img {
        max-width: 150px;
        width: 100%;
        object-fit: contain;
        max-height: 300px;
        margin-top: 50px;
      }
      .spinner {
        height: 80px;
        width: 80px;
        margin-top: 10px;
        animation: rotate 2s linear 0s infinite;
        @keyframes rotate {
          0% {
            transform: rotateZ(0);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
      }
      & > h3 {
        color: var(--heading0);
        padding: 30px 0 10px 0;
        font-size: 16px;
        font-weight: 800;
        color: #111;
      }
      p {
        font-size: 14px;
        color: #333;
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
  .foam_right {
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
  .closeButton {
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
`;
