import React, { useRef } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { getOrganizerFestivalUploadPhoto } from "../../Api/Api";

//content
import icon1 from "../assets/images/organizer dashboard/1.svg";
import icon2 from "../assets/images/organizer dashboard/red_important.svg";

type CheckoutPropsType = {
  toggleCheckout: () => void;
  showSuccessPopupHandler: () => void;
  myFestivalRefetch: any;
};

export default function UploadPhotos({
  toggleCheckout,
  myFestivalRefetch,
  showSuccessPopupHandler,
}: CheckoutPropsType) {
  //upload pic
  const album = useRef<any>();
  const year = useRef<any>();
  const input = useRef<any>();

  const { mutate: getOrganizerFestivalUploadPhotoMutate } = useMutation(
    ["eventLogoImageUpdate"],
    getOrganizerFestivalUploadPhoto,
    {
      onSuccess: () => {
        myFestivalRefetch();
        toggleCheckout();
        showSuccessPopupHandler();
      },
    }
  );

  const UploadPhotoHandler = () => {
    const payload = new FormData();
    payload.append("img", input.current.files[0]);
    payload.append("year", year.current.value);
    payload.append("album_name", album.current.value);
    payload.append("festival", localStorage.getItem("festivalId") || "");
    getOrganizerFestivalUploadPhotoMutate(payload);
  };

  return (
    <>
      <UploadPhoto
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            toggleCheckout();
          }
        }}
      >
        <div>
          <div className="notification_tab">
            <h1>Upload Photos</h1>
            <p>Enter Album Name</p>
            <input ref={album} placeholder="Enter Album Name"></input>
            <p>Enter Year</p>
            <input
              type="number"
              ref={year}
              placeholder="Enter Year Of The Photo"
            ></input>
            <div className="card">
              <input
                style={{ display: "none" }}
                type="file"
                id="photo"
                ref={input}
              ></input>
              <button>
                <label htmlFor="photo">Choose Photo</label>
              </button>
              {input?.current?.files.length > 0 ? (
                <p>Image Selected</p>
              ) : (
                <p>Image Not Selected</p>
              )}
            </div>
            <button onClick={UploadPhotoHandler} className="blue_button">
              Upload
            </button>
          </div>
          <button onClick={() => toggleCheckout()}>x</button>
        </div>
      </UploadPhoto>
    </>
  );
}

const UploadPhoto = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  & > div {
    height: max-content;
    margin: auto;
    display: flex;
    background-color: #f2f7ff;
    position: relative;
    background-color: transparent;
    width: 500px;
    @media screen and (max-width: 700px) {
      width: calc(100vw - 100px) !important;
    }

    & > button {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
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
      box-shadow: var(--shadow);
    }
    & > .notification_tab {
      max-width: var(--maxwidth2);
      margin: auto;
      background-color: white;
      padding: 10px;
      border-radius: 10px;
      box-shadow: var(--shadow);
      padding-bottom: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      width: 100%;
      position: relative;

      & > h1 {
        font-size: 28px;
      }
      p {
        font-size: 14px;
        font-weight: 600;
      }
      input {
        width: 100%;
        padding: 010px;
        border-radius: 5px;
        border: 1px solid black;
        ::placeholder {
          font-size: 14px;
          font-weight: 500;
          color: #111;
        }
      }
      .card {
        display: flex;
        gap: 20px;
        align-items: center;
        button {
          padding: 6px 10px;
          font-weight: 500;
          border: 1px solid black;
          border-radius: 5px;
        }
      }
      .blue_button {
        margin: auto;
      }
    }
  }
`;
