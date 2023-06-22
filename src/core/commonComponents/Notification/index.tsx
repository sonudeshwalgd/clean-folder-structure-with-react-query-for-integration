import moment from "moment";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";

import notice from "../../../assets/images/organizer dashboard/notice.svg";
import {
  getUserNotificationDelete,
  getUserNotificationDetails,
} from "../../Api/Api";

export default function OrganizerNotification() {
  const { data: notification, refetch } = useQuery(
    "getUserNotificationDetails",
    getUserNotificationDetails,
    {
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );
  const { data: deleteNotification, mutate } = useMutation(
    "getUserNotificationDelete",
    getUserNotificationDelete,
    {
      onSuccess: (res) => {
        console.log(res);
        refetch();
      },
    }
  );

  const deleteNotificationHandler = (data: string) => {
    const payload = {
      id: data,
    };

    mutate(payload);
  };

  return (
    <>
      <NotificationWrapper>
        <div className="account">
          <div className="content">
            <h1> Notifications</h1>
          </div>
          {!notification?.length && (
            <>
              <div className="transactions">
                <img src={notice}></img>
                <h1>No Notifications Found</h1>
                <p>you don't have any notifications </p>
              </div>
            </>
          )}

          {notification?.map((ele: any) => {
            return (
              <Wrapper id={ele._id} style={{ marginBottom: "10px" }}>
                <div>
                  <div className="left">
                    <h3>{ele.title}</h3>
                    <p>{ele.message}</p>
                    <p>{moment(ele.createdAt).format("DD-MM-YYYY HH:MM")}</p>
                  </div>
                  <div className="right">
                    <button
                      onClick={() => deleteNotificationHandler(ele._id)}
                      className="delete"
                    >
                      X
                    </button>
                    {!!ele.isRead && <button className="new">NEW</button>}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </NotificationWrapper>
    </>
  );
}

const NotificationWrapper = styled.div`
  width: 100vw;
  background-color: var(--background);
  padding-bottom: 20px;
  h1 {
    font-size: 20px;
    color: #111;
    font-weight: 700;
    padding: 4px 0;
  }
  h2 {
    font-size: 14px;
    color: #111;
    padding: 4px 0;
    font-weight: 600;
  }
  p {
    font-size: 14px;
    padding: 4px 0;
    color: #111;
    font-weight: 400;
  }
  .p4 {
    padding: 4px 0;
  }
  .p5 {
    padding: 5px 0;
  }
  .p8 {
    padding: 8px 0;
  }
  .mb5 {
    margin-bottom: 5px;
  }
  .mb15 {
    margin-bottom: 15px !important;
  }
  .mb20 {
    margin-bottom: 20px !important;
  }
  .green {
    color: #2db482;
  }
  .light_green {
    background-color: #dafef1 !important;
    color: #2db482 !important;
  }
  .title {
    width: 100%;
    padding-bottom: 20px;
    font-size: 16px;
  }
  .button_blue {
    padding: 8px 62px;
    background-color: var(--theme);
    color: white;
    font-weight: 600;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 10px;
    width: max-content;
  }
  .smallest {
    width: 25% !important;
    & > label {
      color: #333;
      font-weight: 600 !important ;
    }
  }
  .smallest_button {
    width: 50% !important;
    & > input {
      border-radius: 0px !important;
    }
  }
  .noradius {
    border-radius: 0 !important;
  }

  & > .selector_tab {
    max-width: var(--maxwidth2);
    padding: 0;
    background-color: inherit;
    box-shadow: none;
    & > .tab {
      display: flex;
      gap: 10px;
      padding: 10px;
      width: max-content;
      background-color: white;
      box-shadow: var(--shadow);
      border-radius: 10px;
      margin-left: 0;
      & > button {
        padding: 5px 22px;
        background-color: #ddd;
        border: none;
        border-radius: 10px;
        outline: none;
        :hover {
          background-color: var(--theme);
          color: white;
        }
      }
    }
  }
  .transactions {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 500px;
    padding-top: 40px;

    & > img {
      height: 150px;
      padding-bottom: 20px;
    }
  }

  & > div {
    width: 100vw;
    max-width: var(--maxwidth2);
    margin: auto;
    background-color: white;
    padding: 0 20px;
    border-radius: 10px;
    box-shadow: var(--shadow);
    padding-bottom: 10px;

    & > .content {
      padding: 20px 0px 10px 0px;
      max-width: var(--maxwidth2);
      margin: auto;
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

    & > .body {
      display: flex;
      width: 100%;
      position: relative;
      gap: 20px;
      & > .left {
        flex: 1.5;
        position: relative;
      }
      & > .right {
        flex: 8;
        position: relative;
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
              color: #111;
              font-weight: 500;
              padding-bottom: 5px;
            }
            & > input {
              width: 100%;
              margin-bottom: 12px;
              padding: 14px 8px;
              border-radius: 10px;
              border: 1px solid #999;
              margin-bottom: 20px;
              ::placeholder {
                color: #333;
                font-size: 14px;
                font-weight: 500;
              }
              &:focus {
                outline: 2px solid var(--theme);
                border: none;
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

    & > .important {
      width: 100%;
      display: flex;
      background-color: #b9d6fb;
      padding: 15px;
      margin-bottom: 40px;
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

    & > .result {
      width: 100%;
      position: relative;
      & > div {
        border: 2px solid #999;
        margin-top: 5px;

        & > ul {
          & > li {
            display: flex;
            margin-bottom: 5px;
            border-radius: 10px;
            background-color: #eee;
            padding: 8px 10px;
            flex-wrap: wrap;
            & > h2 {
              flex: 1;
              display: flex;
              position: relative;
              align-items: center;
              pointer-events: none;
              & > img {
                height: 25px;
                width: 25px;
                object-fit: contain;
                margin-right: 10px;
              }
            }
            & > h2.last {
              flex: 1;
              display: flex;
              justify-content: space-between;
              position: relative;
              & > div {
                display: flex;
                align-items: center;
                gap: 10px;
              }
              img {
                height: 15px;
                width: 15px;
                object-fit: contain;
              }
            }
            .toopen {
              pointer-events: all;
              overflow: hidden;
              width: 100%;
              background-color: white;
              height: 0;
              overflow: hidden;
              & > div {
                margin-top: 10px;
                & > .top {
                  margin: 10px;
                  border: 1px solid #999;
                  border-radius: 10px;
                  padding: 10px;
                  min-height: 120px;
                }
                & > .bottom {
                  margin: 10px;
                  border: 1px solid #777;
                  border-radius: 10px;
                  padding: 10px;
                  min-height: 140px;
                  display: flex;
                  & > img {
                    height: 130px;
                    width: 130px;
                    object-fit: cover;
                  }
                  & > .content {
                    display: flex;
                    flex-direction: column;
                    padding: 5px 20px;
                    gap: 15px;
                    width: 100%;

                    & > div {
                      & > div {
                        display: flex;
                        gap: 8px;
                        align-items: center;
                        img {
                          height: 22px;
                        }
                      }
                      & > .line {
                        padding: 25px 10px;
                        border-bottom: 1px solid var(--theme);
                        width: 100%;
                        flex: 1;
                        font-size: 16px;
                      }
                    }
                  }
                }
                & > button {
                  padding: 8px 62px;
                  background-color: var(--theme);
                  color: white;
                  font-weight: 600;
                  font-size: 16px;
                  border: none;
                  outline: none;
                  border-radius: 5px;
                  margin-left: 10px;
                  margin-bottom: 10px;
                }
              }
            }
          }
          & > li:nth-child(1) {
            border-radius: 0;
          }
        }
      }
    }
    & > .newmail {
      & > button {
        padding: 10px 26px;
        background-color: var(--theme);
        color: white;
        font-weight: 600;
        font-size: 16px;
        border: none;
        outline: none;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        & > img {
          height: 18px;
          margin-right: 5px;
        }
      }
      & > .content_email {
        display: flex;
        justify-content: center;
        flex-direction: column;
        & > img {
          height: 120px;
          margin-bottom: 15px;
          object-fit: contain;
        }
        & > h1 {
          margin: auto;
        }
        & > p {
          margin: auto;
        }
        & > button {
          padding: 8px 16px;
          background-color: var(--theme);
          color: white;
          font-weight: 600;
          font-size: 16px;
          border: none;
          outline: none;
          border-radius: 5px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          margin: 10px auto;
        }
      }
    }
    & > .top {
      margin: 10px 0;
      border: 1px solid #999;
      border-radius: 10px;
      padding: 10px;
      min-height: 200px;
      & > p {
        font-size: 16px;
        color: #333;
      }
    }
    & > button {
      padding: 8px 54px;
      background-color: var(--theme);
      color: white;
      font-weight: 600;
      font-size: 16px;
      border: none;
      outline: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      margin: auto;
    }
  }
`;
const Wrapper = styled.div`
  width: 100%;
  position: relative;
  border: 1px solid black;
  border-radius: 10px;
  & > div {
    display: flex;
    justify-content: space-between;
    padding: 30px 20px;
  }
  .left {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .right {
    width: max-content;
    display: flex;
    flex-direction: column;
    gap: 40px;
    .delete {
      border: none;
      outline: none;
      background-color: inherit;
    }
    .new {
      border: none;
      outline: none;
      padding: 6px 16px;
      color: white;
      background-color: #81c784;
      border-radius: 15px;
    }
  }
`;
