import React, { useState } from "react";
import styled from "styled-components";
import star from "./../../../assets/images/organizer dashboard/star.svg";
import review_pic from "./../../../assets/images/organizer dashboard/review_pic.svg";
import star_grey from "./../../../assets/images/organizer dashboard/star_grey.svg";
import { useMutation } from "react-query";
import { getOrganizerReviewsManageReviewsDelete } from "../../Api/Api";
import moment from "moment";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function ReviewSectionCard(ele: any) {
  const { _id, rating, review, updatedAt, userid } = ele;
  const { name, imgurl } = userid;

  const [underReview, setUnderReview] = useState<boolean>(false);

  const { mutate: deleteReview } = useMutation(
    ["deleteReview"],
    getOrganizerReviewsManageReviewsDelete,
    {
      onSuccess: (res) => {
        setUnderReview(true);
      },
    }
  );

  const deleteReviewHandler = () => {
    const payload = {
      id: _id,
    };
    deleteReview(payload);
  };

  return (
    <>
      <CardReview>
        <div className="top">
          <div className="left">
            <img src={"http://3.89.138.204:3000/uploads/" + imgurl}></img>
          </div>
          <div className="right">
            <div>
              <h5>{name}</h5>
              <div>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={rating}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              </div>
            </div>
            <p>{moment(updatedAt).format("DD-MM-YYYY")}</p>
          </div>
        </div>
        <div className="middle">
          <p>{review}</p>
        </div>
        <div className="bottom">
          <h5>Reply</h5>
          <h5 className="delete" onClick={deleteReviewHandler}>
            Delete
          </h5>
        </div>
        {underReview && (
          <h5 style={{ color: "#f6d81b" }}>UNDER ADMIN REVIEW</h5>
        )}
      </CardReview>
    </>
  );
}
const CardReview = styled.div`
  width: 40%;
  border: 1px solid #bfbfbf;
  border-radius: 15px;
  padding: 25px 20px;
  width: 300px;
  margin-bottom: 40px;
  margin: auto;
  .css-ryrseu-MuiRating-root {
    color: #1877f2;
  }
  .css-1vooibu-MuiSvgIcon-root {
    height: 20px;
  }
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
    display: flex;
    justify-content: space-between;

    & > h5 {
      color: var(--theme);
      font-weight: 700;
    }
    & > .delete {
      color: red;
      font-weight: 700;
    }
  }
`;
