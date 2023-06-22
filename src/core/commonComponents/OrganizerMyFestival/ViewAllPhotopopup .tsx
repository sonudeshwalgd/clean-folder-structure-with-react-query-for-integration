import React, { useRef } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import {
  deleteOrganizerPhotoDelete,
  getOrganizerFestival,
  getOrganizerFestivalUploadPhoto,
} from "../../Api/Api";
import DeleteIcon from "@mui/icons-material/Delete";

//content
import icon1 from "../assets/images/organizer dashboard/1.svg";
import icon2 from "../assets/images/organizer dashboard/red_important.svg";

type CheckoutPropsType = {
  toggleCheckout: () => void;
};

export default function ViewAllPhotos({ toggleCheckout }: CheckoutPropsType) {
  //upload pic
  const album = useRef<any>();
  const year = useRef<any>();
  const input = useRef<any>();

  //photos
  const { data, refetch: myFestivalRefetch } = useQuery(
    "Organizer-Festival",
    getOrganizerFestival,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {},
      onError: (error) => {},
    }
  );
  const { mutate: deletePhoto } = useMutation(
    "deleteOrganizerPhotoDelete",
    deleteOrganizerPhotoDelete,
    {
      onSuccess: (data) => {
        myFestivalRefetch();
      },
      onError: (error) => {},
    }
  );

  const imageDeleteHandler = (ele: any) => {
    // const payload={
    //     filename:name
    // }
    const payload = new FormData();
    payload.append("filename", ele?.photo);
    payload.append("id", ele?._id);

    deletePhoto(payload);
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
          <div>
            {data?.photos.map((ele: any) => {
              return (
                <>
                  <div id={ele._id}>
                    <DeleteIcon
                      onClick={() => {
                        imageDeleteHandler(ele);
                      }}
                      className="delete"
                    />
                    <img
                      src={"http://3.89.138.204:3000/uploads/" + ele.photo}
                    ></img>
                  </div>
                </>
              );
            })}
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
  padding: 20px;
  & > div {
    height: 100%;
    width: 100%;
    display: flex;
    background-color: #f2f7ff;
    position: relative;

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
    & > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 20px;
      & > div {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        .delete {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          border-radius: 50%;
          overflow: hidden;
          color: red;
        }
      }
    }
  }
`;
