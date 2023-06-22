import { constants } from "fs";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { queryClient } from "../../../..";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
//content
import poster from "../../../../assets/images/detail/poster.jpg";
import uploadImg from "../../../../assets/images/upload.png";
import delete_red from "../../../../assets/images/organizer dashboard/delete_red.svg";
import {
  deleteDirectorProjectViewNews,
  getDirectorMyProject,
  patchDirectorImage,
  patchDirectorProjectPoster,
  patchDirectorStillPhoto,
} from "../../../../core/Api/Api";
import AddBioPopup from "./AddBioPopup";
import AddNewsPopup from "./AddNewsPopup";
import Slider from "../../../../core/commonComponents/slider  Half/Slider";
import AddFilePopup from "./AddFilesPopup";

export default function DirectorSubmissionDetailOverview() {
  const [isVisibleAddNewsPopup, setVisibleAddNewsPopup] = useState<any>(false);
  const [isVisibleAddBioPopup, setVisibleAddBioPopup] = useState<any>(false);

  const { refetch, data } = useQuery(
    "directorMyProject",
    getDirectorMyProject,
    {
      select: (res) => {
        return res.filter(
          (ele: any) => ele._id == localStorage.getItem("projectId")
        );
      },
      onError: (err) => {},
    }
  );

  const { mutate: deleteNewsRequest, data: deleteNews } = useMutation(
    ["deleteDirectorProjectViewNews"],
    deleteDirectorProjectViewNews,
    {
      onSuccess: (res) => {
        console.log(res);
        refetch();
      },
    }
  );
  //delete news
  const deleteNewsHandler = (articleId: any) => {
    const payload = {
      articleid: articleId,
      id: data && data[0]?._id,
    };

    console.log(payload);
    deleteNewsRequest(payload);
  };

  const toggleVisibilityAddNewsPopupHandler = () => {
    setVisibleAddNewsPopup(false);
  };
  const toggleVisibilityAddBioPopupHandler = () => {
    setVisibleAddBioPopup(false);
  };

  //upload poster
  const { mutate: uploadPoster } = useMutation(
    "patchDirectorProjectPoster",
    patchDirectorProjectPoster,
    {
      onSuccess: (res) => {
        refetch();
      },
    }
  );

  const uploadPosterHandler = (e: any) => {
    const payload = new FormData();
    payload.append("img", e.target.files[0]);
    payload.append("id", data[0]?._id);
    payload.append("oldposter", "default.jpg");

    uploadPoster(payload);
  };

  //upload uploadDirectorImage
  const { mutate: uploadDirectorImage } = useMutation(
    "patchDirectorImage",
    patchDirectorImage,
    {
      onSuccess: (res) => {
        refetch();
      },
    }
  );

  const uploadDirectorImageHandler = (e: any) => {
    const payload = new FormData();
    payload.append("img", e.target.files[0]);
    payload.append("id", data[0]?._id);
    payload.append("image", "default.jpg");

    uploadDirectorImage(payload);
  };

  //upload uploadDirectorStillPhoto
  const { mutate: uploadDirectorStillPhotos } = useMutation(
    "patchDirectorStillPhoto",
    patchDirectorStillPhoto,
    {
      onSuccess: (res) => {
        refetch();
      },
    }
  );

  const uploadDirectorStillPhotoHandler = (e: any) => {
    const payload = new FormData();
    payload.append("img", e.target.files[0]);
    payload.append("id", data[0]?._id);

    uploadDirectorStillPhotos(payload);
  };

  const [sliderVisible, setSliderVisible] = useState<boolean>(false);

  const sliderVisibleHandler = () => {
    setSliderVisible(false);
  };
  const [isVisibleAddFilePopup, setIsVisibleAddFilePopup] =
    useState<boolean>(false);

  const toggleVisibilityAddFilePopupHandler = () => {
    setIsVisibleAddFilePopup(false);
  };

  return (
    <>
      {sliderVisible && <Slider sliderVisibleHandler={sliderVisibleHandler} />}

      <SubmissionDetailOverviewWrapper>
        {isVisibleAddNewsPopup && (
          <AddNewsPopup
            payloadId={data && data[0]?._id}
            refetch={refetch}
            toggleVisibility={toggleVisibilityAddNewsPopupHandler}
          />
        )}
        {isVisibleAddFilePopup && (
          <AddFilePopup
            payloadId={data && data[0]?._id}
            refetch={refetch}
            toggleVisibility={toggleVisibilityAddFilePopupHandler}
          />
        )}
        {isVisibleAddBioPopup && (
          <AddBioPopup
            payloadId={data && data[0]?._id}
            refetch={refetch}
            toggleVisibility={toggleVisibilityAddBioPopupHandler}
          />
        )}
        <div className="left">
          <div className="card">
            <h1>Poster</h1>
            {data && data[0].posterimage == "default.jpg" ? (
              <>
                <div>
                  <label
                    htmlFor="posterImage"
                    className="upload-poster-img-content"
                  >
                    <ImageOutlinedIcon />
                    <h2>Upload Poster</h2>
                    <p>
                      Upload an poster for your project (Note : Poster size must
                      be 400 X 500 and less than 2MB){" "}
                    </p>
                  </label>
                </div>
                <input
                  onChange={(e: any) => {
                    uploadPosterHandler(e);
                  }}
                  style={{ display: "none" }}
                  type="file"
                  id="posterImage"
                />
              </>
            ) : (
              <>
                <div className="parent-upload-absolute-wrapper">
                  <div className="upload-absolute-wrapper">
                    <input
                      onChange={(e: any) => {
                        uploadPosterHandler(e);
                      }}
                      style={{ display: "none" }}
                      type="file"
                      id="posterImage"
                    />
                    <label htmlFor="posterImage">
                      <CloudUploadOutlinedIcon />
                    </label>
                  </div>
                  {data && (
                    <img
                      style={{ padding: "20px" }}
                      src={
                        "http://3.89.138.204:3000/uploads/" +
                        data[0]?.posterimage
                      }
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="card">
            <h1>
              Photos{" "}
              <h3
                onClick={() => setSliderVisible(true)}
                style={{ color: "var(--theme)" }}
              >
                View All
              </h3>
            </h1>
            <div className="photos">
              <label htmlFor="directorPhotos">
                <img src={uploadImg} />
              </label>
              <input
                onChange={(e: any) => uploadDirectorStillPhotoHandler(e)}
                style={{ display: "none" }}
                type="file"
                id="directorPhotos"
              />

              {data &&
                data[0]?.stillphotos?.map((ele: any, index: any) => {
                  return (
                    <img
                      id={index}
                      src={"http://3.89.138.204:3000/uploads/" + ele}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="card">
            <h1>Director</h1>
            {data && data[0]?.directorbiography?.image == "default.jpg" ? (
              <>
                <div>
                  <label
                    htmlFor="directorHeadshot"
                    className="upload-poster-img-content"
                  >
                    <FeedOutlinedIcon />
                    <h2>Upload Director Headshot</h2>
                    <p>Upload an Director Headshot</p>
                  </label>
                </div>
                <input
                  onChange={(e: any) => {
                    uploadDirectorImageHandler(e);
                  }}
                  style={{ display: "none" }}
                  type="file"
                  id="directorHeadshot"
                />
              </>
            ) : (
              <>
                <div className="parent-upload-absolute-wrapper">
                  <div className="upload-absolute-wrapper">
                    <input
                      onChange={(e: any) => {
                        uploadDirectorImageHandler(e);
                      }}
                      style={{ display: "none" }}
                      type="file"
                      id="directorHeadshot"
                    />
                    <label htmlFor="directorHeadshot">
                      <CloudUploadOutlinedIcon />
                    </label>
                  </div>
                  {data && (
                    <img
                      style={{ padding: "20px" }}
                      src={
                        "http://3.89.138.204:3000/uploads/" +
                        data[0]?.directorbiography?.image
                      }
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="right">
          <div className="card">
            <h1>News & Review</h1>
            {data &&
              data[0]?.article?.map((ele: any) => {
                return (
                  <div id={ele?._id} className="news">
                    <h2>
                      {ele?.title}
                      <img
                        onClick={() => {
                          deleteNewsHandler(ele?._id);
                        }}
                        src={delete_red}
                      ></img>
                    </h2>
                    <p style={{ color: "#666" }}>{ele?.publication}</p>
                    <p
                      style={{
                        color: "#2196f3",
                        overflow: "hidden !important",
                      }}
                    >
                      {ele?.link}
                    </p>
                  </div>
                );
              })}

            <button
              style={{ margin: "10px 00 0 0", width: "100%" }}
              className="blue_button"
              onClick={() => {
                setVisibleAddNewsPopup(true);
              }}
            >
              Add Article
            </button>
          </div>
          <div className="card">
            <h1
              style={{
                borderBottom: "8px solid #a3c9fa",
                marginBottom: "10px",
              }}
            >
              File & Attachment{" "}
            </h1>
            <div className="news">
              {data &&
                data[0]?.file_attached?.map((ele: any) => {
                  return (
                    <p id={ele?._id}>
                      {ele?.name}{" "}
                      <i
                        onClick={() =>
                          (window.location.href =
                            "http://3.89.138.204:3000/uploads/" + ele?.file)
                        }
                        className="ri-folder-download-fill"
                      >
                        <img src={delete_red}></img>
                      </i>
                    </p>
                  );
                })}
            </div>
            <button
              style={{ margin: "10px 00 0 0", width: "100%" }}
              className="blue_button"
              onClick={() => {
                setIsVisibleAddFilePopup(true);
              }}
            >
              Add Files
            </button>
          </div>
          <div className="card">
            <div className="bio">
              <h2>Director's Bio</h2>
              <p>{data && data[0]?.directorbiography?.biography} </p>
              <h2>Director's Bio</h2>
              <p>{data && data[0]?.directorbiography?.statement} </p>
            </div>
            <button
              style={{ margin: "10px 00 0 0", width: "100%" }}
              className="blue_button"
              onClick={() => {
                setVisibleAddBioPopup(true);
              }}
            >
              Add Bio
            </button>
          </div>
        </div>
      </SubmissionDetailOverviewWrapper>
    </>
  );
}

const SubmissionDetailOverviewWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  flex: 1;
  max-width: var(--maxwidth);
  margin: auto;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }

  .card {
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    flex: 1;
    & > h1 {
      display: flex;
      justify-content: space-between;
    }

    & > div {
      padding: 20px;
      border-radius: 10px;
      border: 2px dotted #a3c9fa;
      img {
        width: 100%;
      }
    }
    .trailer {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      flex-direction: column;
    }
    .news {
      border: 1px solid #a3c9fa;
      padding-bottom: 2px;
      padding-left: 5px;
      margin-bottom: 10px;

      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        overflow: hidden !important;
        & > i {
          font-size: 30px;
          color: #4caf50;
          display: flex;
          gap: 5px;
          align-items: center;
          & > img {
            height: 20px;
          }
        }
      }
      h2 {
        display: flex;
        justify-content: space-between;
        & > img {
          height: 20px;
        }
      }
    }
    .photos {
      border: none;
      display: flex;
      gap: 4%;
      flex-wrap: wrap;
      @media screen and (max-width: 600px) {
        flex-direction: column;
        gap: 20px;
        & > img {
          width: 100% !important;
          max-height: 300px !important;
        }
      }

      img {
        width: 48%;
        object-fit: contain;
        /* max-height: 200px; */
        border-radius: 10px;
      }
      label {
        width: 48%;
        img {
          width: 100%;
        }
      }
    }
    .bio {
      display: flex;
      flex-direction: column;
      border: none;

      P {
        color: #999;
      }
    }
  }

  & > .left {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: max-content;
  }
  & > .middle {
    height: max-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & > .right {
    height: max-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
