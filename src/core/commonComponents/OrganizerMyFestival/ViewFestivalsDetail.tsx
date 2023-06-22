import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import banner from "./../../../assets/images/card detail/banner.jpg";

//content
import college_gallery1 from "../../../assets/images/college_list/gallery1.jpg";
import college_gallery2 from "../../../assets/images/college_list/gallery2.jpg";
import college_gallery3 from "../../../assets/images/college_list/gallery3.jpg";
import college_gallery4 from "../../../assets/images/college_list/gallery4.jpg";
import homepage_banner1 from "../../../assets/images/homepage_banner1.jpg";
import girl from "../../../assets/images/card detail/girl.svg";
import star from "./../../../assets/images/organizer dashboard/star.svg";
import star_grey from "./../../../assets/images/organizer dashboard/star_grey.svg";
import review_pic from "./../../../assets/images/organizer dashboard/review_pic.svg";
import UploadPhotos from "./UploadPhotopopup";
import { useMutation, useQuery } from "react-query";
import {
  getOrganizerFestival,
  getOrganizerFestivalUploadPhoto,
  patchOrganizerChangeEventLogo,
  patchOrganizerUpdateCoverPic,
} from "../../Api/Api";
import moment from "moment";
import CategoryAndFees from "./CategoryAndFees";
import DatesAndDeadline from "./DatesAndDeadline";
import ImageIcon from "@mui/icons-material/Image";
import ViewAllPhotos from "./ViewAllPhotopopup ";
import Result from "../Request result popup/Result";
import LoadingPage from "../LoadingFallback/Loading";
import EmptyData from "../empty data pages/EmptyData";
import { useNavigate } from "react-router-dom";

// import Upload_photos from './Upload_photo';

export default function CardDetail() {
  const [hasEvent, setHasEvent] = useState<Boolean>(false);
  const routeTo = useNavigate();

  //myfestival
  const { data, refetch: myFestivalRefetch } = useQuery(
    "Organizer-Festival",
    getOrganizerFestival,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        data?._id && setHasEvent(true);
      },
      onError: (error) => {},
    }
  );

  //coverpic
  const inputCoverLg = useRef<any>();
  const inputCoverMb = useRef<any>();
  const [resultData, setResultData] = useState<any>();

  const {
    mutate: coverImageUpdateMutate,
    isLoading: isLoadingCoverImage,
    data: coverImageData,
  } = useMutation(["coverImageUpdate"], patchOrganizerUpdateCoverPic, {
    onSuccess: (res) => {
      myFestivalRefetch();
      setIsResultVisibleTwo(true);
      setResultData(res);
    },
  });
  const coverImageUpdatedLg = (e: any) => {
    let data = new FormData();
    data.append("img", inputCoverLg?.current?.files[0]);
    data.append("festival", localStorage.getItem("festivalId") || "");
    coverImageUpdateMutate(data);
  };
  const coverImageUpdatedMb = (e: any) => {
    let data = new FormData();
    data.append("img", inputCoverMb?.current?.files[0]);
    coverImageUpdateMutate(data);
  };

  //eventlogopic
  const inputEventLogo = useRef<any>();

  const { mutate: eventLogoImageUpdateMutate, isLoading: isEventLogoLoading } =
    useMutation(["eventLogoImageUpdate"], patchOrganizerChangeEventLogo, {
      onSuccess: (res) => {
        myFestivalRefetch();
        setIsResultVisibleTwo(true);
        setResultData(res);
      },
    });
  const eventLogoHandler = () => {
    let data = new FormData();
    data.append("img", inputEventLogo.current.files[0]);
    data.append("festival", localStorage.getItem("festivalId") || "");
    eventLogoImageUpdateMutate(data);
  };
  //popup section

  const [upload, setUpload] = useState<boolean>(false);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const handleToggleUpload = () => {
    setUpload(false);
  };
  const handleToggleViewAll = () => {
    setViewAll(false);
    myFestivalRefetch();
  };

  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const resultVisibilityFalseHandler = () => {
    setIsResultVisible(false);
  };
  const resultVisibilityTrueHandler = () => {
    setIsResultVisible(true);
  };

  const [isResultVisibleTwo, setIsResultVisibleTwo] = useState<boolean>(false);
  const resultVisibilityTwoFalseHandler = () => {
    setIsResultVisibleTwo(false);
  };
  return (
    <>
      {hasEvent ? (
        <>
          {isEventLogoLoading && <LoadingPage />}
          {isLoadingCoverImage && <LoadingPage />}

          {isResultVisibleTwo && (
            <Result
              state={resultData?.message ? "Success" : "Error"}
              description={
                resultData?.message
                  ? resultData?.message
                  : "Something Went Wrong"
              }
              showResult={resultVisibilityTwoFalseHandler}
            />
          )}
          {isResultVisible && (
            <Result
              state="Success"
              description="Your Image Upload Successfully"
              showResult={resultVisibilityFalseHandler}
            />
          )}

          {upload && (
            <UploadPhotos
              showSuccessPopupHandler={resultVisibilityTrueHandler}
              myFestivalRefetch={myFestivalRefetch}
              toggleCheckout={handleToggleUpload}
            ></UploadPhotos>
          )}

          {viewAll && (
            <ViewAllPhotos toggleCheckout={handleToggleViewAll}></ViewAllPhotos>
          )}

          <Banner>
            <div>
              <div className="img">
                <div className="img_div">
                  <img
                    id="testimg"
                    src={
                      "http://3.89.138.204:3000/uploads/" + data?.cover_photo
                    }
                  ></img>
                  <label htmlFor="cover-image" className="text-button">
                    {" "}
                    Change Cover photo
                  </label>
                  <input
                    type="file"
                    ref={inputCoverLg}
                    id="cover-image"
                    onChange={(e) => {
                      coverImageUpdatedLg(e);
                    }}
                  ></input>
                  <label htmlFor="cover-image-mb" className="icon-button">
                    {" "}
                    <i className="ri-image-fill"></i>
                  </label>
                  <input
                    type="file"
                    id="cover-image-mb"
                    ref={inputCoverMb}
                    onChange={(e) => {
                      coverImageUpdatedMb(e);
                    }}
                  ></input>
                </div>
              </div>
              <div className="content">
                <div>
                  <div className="left">
                    <div className="image-container">
                      <img
                        src={
                          "http://3.89.138.204:3000/uploads/" + data?.event_logo
                        }
                      ></img>
                      <label htmlFor="image">
                        <i className="ri-image-fill"></i>
                      </label>
                      <input
                        ref={inputEventLogo}
                        onChange={() => eventLogoHandler()}
                        type="file"
                        id="image"
                      ></input>
                    </div>

                    <div>
                      <h2>{data?.event_name}</h2>
                      <button>closed</button>
                    </div>
                  </div>
                  <div className="right">
                    <button>
                      <a href={data?.facebook}>
                        <i className="ri-facebook-fill"></i>
                        <p>Share on facebook</p>
                      </a>
                    </button>
                    <button>
                      <a href={data?.instagram}>
                        <i className="ri-instagram-line"></i>
                        <p>Share on instagram</p>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Banner>
          <ViewFestivalsDetailWrapper>
            <div>
              <div className="left">
                <div className="card_one">
                  <h2>Dates & Deadlines</h2>
                  <DatesAndDeadline data={data} />
                </div>
                <div className="card_two">
                  <h2>Category and Fees</h2>
                  {data?.category?.map((ele: any) => {
                    return (
                      <CategoryAndFees
                        id={ele?._id}
                        deadline={ele?.deadline}
                        runtime={ele?.runtime}
                        title={ele?.name}
                        description={ele?.description}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="middle">
                <div id="Overview">
                  <Overview>
                    <h1>About</h1>
                    <p>
                      {data?.event_description}
                      <button className="read_more">Read more ...</button>
                    </p>
                  </Overview>
                </div>

                <div id="gallery">
                  <Gallery>
                    <h1>
                      Photos{" "}
                      <button
                        onClick={() => {
                          setUpload(true);
                        }}
                      >
                        Upload Photos
                      </button>
                    </h1>
                    <div>
                      <div className="gallery">
                        <div className="image">
                          <div
                            className="seeAll"
                            onClick={() => {
                              setViewAll(true);
                            }}
                          >
                            <div>
                              <ImageIcon />
                              <h4>View All Photos</h4>
                            </div>
                          </div>
                          {data?.photos?.map((ele: any) => {
                            return (
                              <>
                                <div>
                                  <img
                                    src={
                                      "http://3.89.138.204:3000/uploads/" +
                                      ele.photo
                                    }
                                  ></img>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Gallery>
                </div>

                <div id="Overview">
                  <Overview>
                    <h1>Rules & Terms</h1>
                    <p>
                      {" "}
                      {data?.rule_terms}
                      <button className="read_more">Read more ...</button>
                    </p>
                  </Overview>
                </div>

                <div id="Overview">
                  <Overview>
                    <h1>Awards & Prices</h1>
                    <p>
                      {" "}
                      {data?.award_prizes}
                      <button className="read_more">Read more ...</button>
                    </p>
                  </Overview>
                </div>

                <div id="retry">
                  <Retry>
                    <h1>Reviews & Rating</h1>
                    <img className="img" src={girl}></img>
                    <h1 className="middle">no Review Found</h1>
                    <button className="button">Retry?</button>
                    <div className="review_found">
                      <Card_review className="review">
                        <div className="top">
                          <div className="left">
                            <img src={review_pic}></img>
                          </div>
                          <div className="right">
                            <div>
                              <h5>Madhu R </h5>
                              <div>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star_grey}></img>
                              </div>
                            </div>
                            <p>a year ago</p>
                          </div>
                        </div>
                        <div className="middle">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vulputate malesuada viverra aliquam est, cras
                            id. Est missim id vel elementum amet neque
                            malesuada. Porta mollis non.
                          </p>
                        </div>
                        <div className="bottom">
                          <h5>Reply</h5>
                        </div>
                      </Card_review>
                      <Card_review className="review">
                        <div className="top">
                          <div className="left">
                            <img src={review_pic}></img>
                          </div>
                          <div className="right">
                            <div>
                              <h5>Madhu R </h5>
                              <div>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star_grey}></img>
                              </div>
                            </div>
                            <p>a year ago</p>
                          </div>
                        </div>
                        <div className="middle">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vulputate malesuada viverra aliquam est, cras
                            id. Est missim id vel elementum amet neque
                            malesuada. Porta mollis non.
                          </p>
                        </div>
                        <div className="bottom">
                          <h5>Reply</h5>
                        </div>
                      </Card_review>
                      <Card_review className="review">
                        <div className="top">
                          <div className="left">
                            <img src={review_pic}></img>
                          </div>
                          <div className="right">
                            <div>
                              <h5>Madhu R </h5>
                              <div>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star_grey}></img>
                              </div>
                            </div>
                            <p>a year ago</p>
                          </div>
                        </div>
                        <div className="middle">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vulputate malesuada viverra aliquam est, cras
                            id. Est missim id vel elementum amet neque
                            malesuada. Porta mollis non.
                          </p>
                        </div>
                        <div className="bottom">
                          <h5>Reply</h5>
                        </div>
                      </Card_review>
                      <Card_review className="review">
                        <div className="top">
                          <div className="left">
                            <img src={review_pic}></img>
                          </div>
                          <div className="right">
                            <div>
                              <h5>Madhu R </h5>
                              <div>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star}></img>
                                <img src={star_grey}></img>
                              </div>
                            </div>
                            <p>a year ago</p>
                          </div>
                        </div>
                        <div className="middle">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vulputate malesuada viverra aliquam est, cras
                            id. Est missim id vel elementum amet neque
                            malesuada. Porta mollis non.
                          </p>
                        </div>
                        <div className="bottom">
                          <h5>Reply</h5>
                        </div>
                      </Card_review>
                    </div>
                  </Retry>
                </div>
                <div id="submit">
                  <Submit>
                    <h1>Submit Review</h1>
                    <div className="review_submit">
                      <p>Type your review</p>
                      <input placeholder="Example review"></input>
                      <div>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star_grey}></img>
                        <button className="button">Submit Review</button>
                      </div>
                    </div>
                  </Submit>
                </div>
              </div>
              <div className="right">
                <Cards_address>
                  <div className="right_div">
                    <div>
                      <h2>Information</h2>
                      <ul>
                        <li>
                          <i className="ri-phone-line"></i> <p>{data?.phone}</p>
                        </li>
                        <li>
                          <i className="ri-map-pin-line"></i>
                          <p>{data?.address}</p>
                        </li>
                      </ul>
                      <ul className="icons">
                        <li>
                          <a href={data?.email}>
                            <i className="ri-mail-line"></i>
                          </a>
                        </li>
                        <li>
                          <a href={data?.website}>
                            <i className="ri-global-line"></i>
                          </a>
                        </li>
                        <li>
                          <a href={data?.facebook}>
                            <i className="ri-facebook-fill"></i>
                          </a>
                        </li>
                        <li>
                          <a href={data?.instagram}>
                            <i className="ri-instagram-line"></i>
                          </a>
                        </li>
                        <li>
                          <a href={data?.twitter}>
                            <i className="ri-twitter-line"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Cards_address>
                <Cards_address>
                  <div className="right_div">
                    <div>
                      <h2>Organizers</h2>
                      {data?.event_organizer?.map((ele: any) => {
                        return (
                          <div id={ele._id} className="detail">
                            <h1>{ele.title}</h1>
                            <h1 style={{ color: "#777" }}>{ele.name}</h1>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Cards_address>
              </div>
            </div>
          </ViewFestivalsDetailWrapper>
        </>
      ) : (
        <>
          <EmptyData
            subSection="edit"
            title="You have not Created any event yet "
            button="create now"
            onClick={() => routeTo("/organizer/my-festival", { state: "edit" })}
            seasonVisibility={false}
          />
        </>
      )}
    </>
  );
}

const Banner = styled.section`
  width: 100vw;
  background-color: var(--background);
  & > div {
    margin: auto;
    position: relative;

    & > .img {
      width: 100%;
      height: 290px;
      @media screen and (max-width: 500px) {
        height: auto;
        max-height: 150px;
      }

      & > .img_div {
        height: 365px;
        box-shadow: 0px 5px 10px 0 rgb(0 0 0 / 30%);
        @media screen and (max-width: 500px) {
          height: auto;
          max-height: 150px;
        }
        & > img {
          position: absolute;
          top: 0;
          width: 100vw;
          object-fit: cover;
          overflow: hidden;
          height: 365px;
          box-shadow: 0px 9px 6px 2px rgb(0 0 0 / 30%);
          @media screen and (max-width: 500px) {
            height: auto;
            max-height: 150px;
          }
        }
        & > label {
          position: absolute;
          top: 10px;
          right: 20px;
          padding: 8px 26px;
          border: 2px solid white;
          background-color: transparent;
          color: white;
          font-weight: 500;
          font-size: 16px;
          border-radius: 5px;
        }
        & > #cover-image {
          display: none;
        }
        & > #cover-image-mb {
          /* display: none; */
        }

        .icon-button {
          display: none;
          color: var(--theme);
          font-size: 26px;
          border: none;
          height: 40px;
          width: 40px;
          background-color: white;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        @media screen and (max-width: 500px) {
          .text-button {
            display: none;
          }
          .icon-button {
            display: flex !important;
          }
        }
      }
    }
    & > .content {
      max-width: var(--maxwidth2);
      margin: auto;
      position: relative;
      #image {
        display: none;
      }
      & > div {
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 500px) {
          flex-direction: column;
          gap: 10px;
        }
        & > .left {
          display: flex;
          align-items: flex-end;
          margin-top: 50px;
          @media screen and (max-width: 500px) {
            margin-top: 168px !important;
          }
          @media screen and (max-width: 410px) {
            margin-top: 90px !important;
          }
          .image-container {
            position: relative;
            @media screen and (max-width: 410px) {
              margin-top: 40px;
              & > label {
                transform: scale(0.8);
                margin-top: -8px !important;
              }
            }
            & > img {
              height: 150px;
              width: 150px;
              position: relative;
              @media screen and (max-width: 410px) {
                margin-left: 20px;
                height: 100px;
                width: 100px;
                display: flex;
                align-self: flex-start;
              }
            }
            & > label {
              position: absolute;
              top: 10px;
              right: 5px;
              padding: 8px 26px;
              border: 2px solid red;
              background-color: var(--theme);
              color: white;
              font-weight: 500;
              font-size: 16px;
              border-radius: 5px;
              display: flex;
              font-size: 26px;
              border: none;
              height: 40px;
              width: 30px;
              border-radius: 50%;
              align-items: center;
              justify-content: center;
            }
          }

          & > div {
            padding-left: 20px;
            & > h2 {
              color: #222;
              font-size: 20px;
              font-weight: 700;
              padding-bottom: 30px;
            }
            & > button {
              padding: 8px 62px;
              font-size: 14px;
              font-weight: 600;
              border: none;
              color: var(--theme);
              background-color: #dad9d8;
              margin-bottom: 20px;
              border-radius: 5px;
            }
          }
        }
        & > .right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: end;

          @media screen and (max-width: 558px) {
            flex-direction: row;
            gap: 10px;
          }
          & > button {
            font-size: 14px;
            font-weight: 600;
            border: 1px solid var(--heading0);
            color: var(--heading0);
            background-color: white;
            margin-bottom: 20px;
            border-radius: 5px;
            width: 220px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-right: 20px;
            a {
              text-decoration: none;
              display: flex;
              align-items: center;
            }
            i {
              padding-right: 10px;
              color: var(--theme);
              font-size: 25px;
            }
            .ri-instagram-line {
              color: #bc2a8d;
            }
            @media screen and (max-width: 558px) {
              width: max-content;
              i {
                width: 100%;
                padding: 0;
                margin-left: 18px;
              }
              p {
                display: none;
              }
            }
          }
        }
      }
    }
  }
`;

const ViewFestivalsDetailWrapper = styled.section`
  width: 100vw;
  background-color: var(--background);

  & > div {
    width: 100vw;
    max-width: var(--maxwidth2);
    margin: auto;
    display: flex;
    @media screen and (max-width: 1074px) {
      flex-wrap: wrap;
      & > .right {
        margin: auto;
        width: 100%;
      }
    }
    @media screen and (max-width: 906px) {
      flex-direction: column;
      & > div {
        width: 100% !important;
        margin: auto;
      }
      .review {
        margin: auto;
        margin-bottom: 20px;
      }
    }
    & > div.left {
      width: 30%;
      position: relative;
      margin-top: 20px;
      padding: 10px;
      padding-top: 10px;

      & > .card_one {
        padding: 0 20px;
        box-shadow: 0px 5px 10px 0 rgb(0 0 0 / 30%);
        border: solid 1px #f7f7f7;
        position: relative;
        border-radius: 5px;
        background-color: white;
        padding-bottom: 30px;
        margin-bottom: 20px;

        & > h2 {
          padding: 20px 0;
          font-size: 20px;
          color: #222;
        }
        /* &>div{
                &>ul{
                    list-style: none;
                    &>li{
                        display: flex;
                        height: 60px;
                        align-items: center;
                        &>.emoji{
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            position: relative;
                            overflow: hidden;
                            padding: 0 10px 0 0px;
                            &>.line{
                                display: flex;
                                flex: 1;
                                flex-direction: column;
                                width: 1px  ;
                                background-color: #999;
                                min-height: 20px;
                            }
                            &>.line_top,&>.line_bottom{
                                visibility: hidden;
                            }
                            &>.circle{
                                height: 20px;
                                width: 20px;
                                border-radius: 50%;
                                border: 1px solid #999;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background-color: white;
                                position: relative;
                                &>div{
                                    height: 14px !important;
                                    border-radius: 50%;
                                    width: 14px;
                                    background-color: #999;
                                }

                            }

                        }
                        &>.detail{
                            &>h3{
                                color: #aaa;
                                font-weight: 500;
                            }
                            &>h4{
                                color:#aaa;
                                font-weight: 500;

                            }
                        }

                    }
                }
            } */
      }
      & > .card_two {
        padding: 0 0px;
        box-shadow: 0px 5px 10px 0 rgb(0 0 0 / 30%);
        border: solid 1px #f7f7f7;
        position: relative;
        border-radius: 5px;
        background-color: white;
        padding-bottom: 20px;
        & > h2 {
          padding: 20px 20px;
          font-size: 20px;
          color: #222;
        }
        /* &>div{
                    width: 100%;
                    overflow: hidden;
                    height: max-content;
                    &>button{
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        padding: 0 10px;
                        border-radius: 15px;
                        border: none;
                        outline: none;
                        font-weight: 600;
                        font-size: 16px;
                        display: flex;
                        justify-content: space-between;

                    }
                    &>div{
                        padding: 20px;
                        &>P{
                            color: #aaa;
                            font-size: 14px;
                            font-weight: 500;
                        }
                        &>.hide{
                            display: flex;
                            flex-wrap: wrap;
                            &>.left{
                                flex:1;
                                &>h4{
                                    color: var(--theme);
                                    font-weight: 600;
                                    font-size: 16px;
                                    padding: 20px 0;
                                }

                            }
                            &>.right{
                                flex:1;
                                &>h4{
                                    color: var(--theme);
                                    font-weight: 600;
                                    font-size: 16px;
                                    padding: 20px 0;

                                }
                                &>.list{
                                    color: #aaa;
                                    padding-bottom: 20px;
                                    &>h2{
                                        font-weight: 600;
                                        font-size: 18px;
                                        padding-bottom:10px;
                                        text-align: right;

                                    }
                                    &>ul{
                                        list-style: none;
                                        &>li{
                                            font-size: 14px;
                                            font-weight: 600;
                                            text-align: right;
                                        }
                                    }
                                }

                            }
                            &>button{
                                width: 100%;
                                padding: 8px 0;
                                color: var(--theme);
                                font-weight: 600;
                                font-size: 14px;
                                border-radius: 5px;
                                border: none;
                                outline: none;
                                background-color: #aaa;

                                
                            }

                        }
                    }

                } */
      }
    }

    & > div.middle {
      width: 55%;
      position: relative;
      margin: 10px 0;
      margin-top: 20px;
      & > div {
        padding: 10px;
      }
    }
    & > div.right {
      width: 28%;
      position: relative;
      padding: 10px 0;
    }
  }
  .blue {
    div,
    h3,
    h4 {
      color: var(--theme) !important;
      border-color: var(--theme) !important;
    }
    .line {
      background-color: var(--theme) !important ;
    }
    .circle > div {
      background-color: var(--theme) !important;
    }
  }
  .black {
    div,
    h3,
    h4 {
      border-color: #111 !important;
      color: #111 !important;
    }
    .line {
      background-color: #111 !important ;
    }
    .circle > div {
      background-color: #111 !important;
    }
  }
`;

const Overview = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 00 0 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 8px 0 rgb(0 0 0 / 30%);
  border-radius: 10px;
  background-color: white;
  padding: 0 20px;
  position: relative;

  & > h1 {
    padding: 20px 0;
    font-size: 20px;
    color: #222;
  }
  & > p {
    padding: 0 0 35px 0;
    color: rgba(0, 0, 0, 0.8);
    line-height: 25px;
    & > div {
      height: 10px;
    }
  }
  & > .img {
  }
  & > .button {
    color: var(--light_blue);
    border: none;
    outline: none;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: inherit;
  }
`;
const Gallery = styled.div`
  /* border: 1px solid rgba(0,0,0,.1); */
  box-shadow: 00 0 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 8px 0 rgb(0 0 0 / 30%);

  border-radius: 10px;
  background-color: white;
  padding: 20px;
  position: relative;
  text-align: justify;
  & > h1 {
    padding: 5px 0;
    color: var(--light_blue);
    display: flex;
    justify-content: space-between;
    font-size: 20px;

    & > button {
      padding: 8px 26px;
      border: 2px solid #666;
      background-color: transparent;
      color: #666;
      font-weight: 500;
      font-size: 14px;
      border-radius: 5px;
    }
  }
  .seeAll {
    border-radius: 8px;
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    font-weight: 400;
    align-items: center;
    text-align: center;
    background-color: var(--theme) !important;
  }
  & > div {
    display: flex;
    position: relative;
    padding: 20px 0 35px 0;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;
    & > .gallery {
      height: 100%;
      width: 100%;
      position: relative;
      border-radius: 5px;
      padding-top: 20px;

      .image {
        display: flex;
        align-self: flex-end;
        flex-wrap: wrap;

        & > div {
          min-width: 150px;
          position: relative;
          width: 25%;
          max-height: 250px;
          object-fit: contain;
          margin: 0.5vw;
          img {
            height: 100%;
            width: 100%;
            border-radius: 5px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 620px) {
    .overlay {
      display: none !important;
    }
  }
`;

const Cards_address = styled.div`
  background-color: white;

  & > div.right_div {
    & > div {
      background-color: var(--alt_background);
      box-shadow: 0px 1px 8px 0 rgb(0 0 0 / 30%);
      border: solid 1px #f7f7f7;
      width: 100%;
      margin: 20px auto 0 auto;
      border-radius: 10px;
      overflow: hidden;
      padding: 0 20px;
      padding-bottom: 10px;

      & > h2 {
        padding: 20px 0;
        font-size: 20px;
        color: #111;
        padding-bottom: 30px;
      }
      & > .detail {
        padding-bottom: 14px;
        & > h1 {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
        & > h1:nth-child(2) {
          color: #111;
          font-weight: 600;
        }
      }
      & > ul {
        list-style: none;
        & > li {
          display: flex;
          color: var(--theme);
          padding-bottom: 15px;
          & > i {
            padding-right: 20px;
            font-size: 25px;
          }
          & > p {
            font-weight: 600;
            font-size: 14px;
          }
        }
      }
      & > .icons {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 70%;
        margin: auto;
        padding: 10px 0;
        li {
          a {
            display: flex;
            text-decoration: none;
          }
          i {
            color: #111;
            font-size: 30px;
          }
        }
      }
    }
  }
`;
const Retry = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 00 0 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 8px 0 rgb(0 0 0 / 30%);
  border-radius: 10px;
  background-color: white;
  padding: 0 20px;
  position: relative;
  display: flex;
  flex-direction: column;

  & > h1 {
    padding: 20px 0;
    font-size: 20px;
    color: #222;
  }

  & > .img {
    display: flex;
    align-self: center;
    height: 120px;
  }
  & > .middle {
    display: block;
    margin: auto;
  }
  & > .button {
    color: white;
    background-color: var(--theme);
    border: none;
    outline: none;
    padding: 10px 20px;
    display: flex;
    font-weight: 600;
    align-self: center;
    margin-bottom: 20px;
    border-radius: 5px;
  }
  & > .review_found {
    width: 100%;
    position: relative;
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;
export const Card_review = styled.div`
  width: 40%;
  border: 1px solid #bfbfbf;
  border-radius: 15px;
  padding: 25px 20px;
  width: 300px;
  margin-bottom: 40px;
  margin: auto;
  & > .top {
    display: flex;
    padding: 10px 0;
    align-items: flex-end;
    height: 60px;
    position: relative;

    & > .left {
      height: 100%;
      display: flex;
      & > img {
        height: 35px;
        width: 35px;
        border-radius: 50%;
      }
    }
    & > .right {
      height: 100%;
      display: flex;
      justify-content: space-between;
      padding-left: 10px;
      flex: 1;
      & > div {
        display: flex;
        flex-direction: column;
        gap: 5px;
        & > h5 {
          color: #bbb;
          font-weight: 600;
          font-size: 14px;
        }
        & > div {
          display: flex;
          gap: 3px;
          & > img {
            height: 12px;
            width: 12px;
          }
        }
      }
      & > p {
        color: #bbb;
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
  & > .middle {
    & > p {
      font-weight: 400;
      font-size: 12px;
      color: #aaa;
    }
  }

  & > .bottom {
    padding: 10px 0;
    & > h5 {
      color: var(--theme);
      font-weight: 700;
    }
  }
`;
const Submit = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 00 0 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 8px 0 rgb(0 0 0 / 30%);
  border-radius: 10px;
  background-color: white;
  padding: 0 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  & > h1 {
    padding: 20px 0;
    font-size: 20px;
    color: #222;
  }

  .button {
    color: white;
    background-color: var(--theme);
    border: none;
    outline: none;
    padding: 10px 24px;
    font-weight: 600;
    margin-bottom: 20px;
    border-radius: 5px;
    margin: auto 0 auto auto;
  }
  & > .review_submit {
    width: 100%;
    & > p {
      color: #999;
      font-size: 14px;
      font-weight: 500;
      padding: 20px 0 10px 10px;
    }
    & > input {
      width: 100%;
      border: 2px solid #bfbfbf;
      border-radius: 10px;
      height: 50px;
      padding-left: 20px;
      margin-bottom: 50px;
      ::placeholder {
        color: #bbb;
        font-size: 16px;
        font-weight: 600;
      }
    }
    & > div {
      display: flex;
      align-items: center;
      height: max-content;
      gap: 3px;
      & > img {
        height: 25px;
        width: 25px;
      }
    }
  }
`;
