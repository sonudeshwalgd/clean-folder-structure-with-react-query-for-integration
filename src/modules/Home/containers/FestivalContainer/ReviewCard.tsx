import { Link } from "react-router-dom";
import { ReviewCardWrapper } from "./styled";
import faculties1 from "../../../../assets/images/college_list/faculties1.jpg";
import verify from "../../../../assets/images/verified.svg";

type ReviewCardPropsType = {
  title: string;
  location: string;
  status: boolean;
  deadline?: string;
  time: string;
  verified?: boolean;
  country: string;
  id: string;
  logo: string;
};

const ReviewCard = (props: ReviewCardPropsType) => {
  const {
    title,
    location,
    status,
    deadline,
    time,
    verified,
    country,
    id,
    logo,
  } = props;
  return (
    <>
      <ReviewCardWrapper className="Review_card">
        <Link to="card-detail" className="link">
          <div className="left">
            <img className="pic" src={faculties1}></img>
          </div>
          <div className="middle">
            <div>
              <div className="img-mb">
                <img src={faculties1}></img>
              </div>
              <div className="detail">
                <h5>{title}</h5>
                <h4>
                  {location} , {country}
                </h4>

                {status ? (
                  <small style={{ color: "#2db482" }}> {deadline}</small>
                ) : (
                  <small> {time}</small>
                )}

                <div
                  style={{ visibility: "hidden" }}
                  className={`verified ${verified && "visible"}`}
                >
                  <h4>Verified</h4>
                  <img src={verify}></img>
                </div>
              </div>
            </div>

            <div className="button">
              <button className="like">View festival</button>
              <button className="comment">Submit Now</button>
            </div>
          </div>
        </Link>
      </ReviewCardWrapper>
    </>
  );
};

export default ReviewCard;
