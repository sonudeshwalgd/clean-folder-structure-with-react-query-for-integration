import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import moment from "moment";

import { getOrganizerFestival } from "../../Api/Api";

type propType = {
  data: any;
};

export default function DatesAndDeadline({ data }: propType) {
  return (
    <>
      <Wrapper>
        <div>
          {/* <ul>
                        <li>
                            <div className="emoji">
                                <div className="line line_top"></div>
                                <div className="circle">
                                    <div></div>
                                </div>
                                <div className="line"></div>

                            </div>
                            <div className="detail">
                                <h3>{moment(data?.opening_date).format("DD MMMM YYYY")}</h3>
                                <h4>Opening Date</h4>
                            </div>
                        </li>


                        <li className='blue'>
                            <div className="emoji">
                                <div className="line"></div>
                                <div className="circle">
                                    <div></div>
                                </div>
                                <div className="line"></div>

                            </div>
                            <div className="detail">
                                <h3>{moment(data?.entry_deadline[0]?.date).format("DD MMMM YYYY")} </h3>
                                <h4>{moment(data?.entry_deadline[0]?.deadline).format("DD MMMM YYYY")} </h4>
                            </div>
                        </li>
                        {data?.entry_deadline?.map((ele:any)=>{
                            return <li id={ele?._id} className='blue'>
                                    <div className="emoji">
                                        <div className="line"></div>
                                        <div className="circle">
                                            <div></div>
                                        </div>
                                        <div className="line"></div>

                                    </div>
                                    <div className="detail">
                                        <h3>{moment(ele?.date).format("DD MMMM YYYY")}  </h3>
                                        <h4>{moment(ele?.deadline).format("DD MMMM YYYY")} </h4>
                                    </div>
                             </li>
                        })}
                        <li className='black'>
                            <div className="emoji">
                                <div className="line "></div>
                                <div className="circle">
                                    <div></div>
                                </div>
                                <div className="line "></div>
                            </div>
                            <div className="detail">
                                <h3>{moment(data?.notification_date).format("DD MMMM YYYY")} </h3>
                                <h4>Notification Date</h4>
                            </div>
                        </li>
                        <li className='black'>
                            <div className="emoji">
                                <div className="line "></div>
                                <div className="circle">
                                    <div></div>
                                </div>
                                <div className="line line_bottom"></div>

                            </div>
                            <div className="detail">
                                <h3>{moment(data?.event_date_from).format("DD MMMM YYYY")} </h3>
                                <h4>Event Date</h4>
                            </div>
                        </li>
    
                    </ul> */}
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  & > div {
    & > ul {
      list-style: none;
      & > li {
        display: flex;
        height: 60px;
        align-items: center;
        & > .emoji {
          display: flex;
          align-items: center;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          padding: 0 10px 0 0px;
          & > .line {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 1px;
            background-color: #999;
            min-height: 20px;
          }
          & > .line_top,
          & > .line_bottom {
            visibility: hidden;
          }
          & > .circle {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            border: 1px solid #999;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            position: relative;
            & > div {
              height: 14px !important;
              border-radius: 50%;
              width: 14px;
              background-color: #999;
            }
          }
        }
        & > .detail {
          & > h3 {
            color: #aaa;
            font-weight: 500;
          }
          & > h4 {
            color: #aaa;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
