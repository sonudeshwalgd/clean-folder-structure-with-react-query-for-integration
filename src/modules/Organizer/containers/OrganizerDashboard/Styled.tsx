import styled from "styled-components";

export const OrganizerBody = styled.div`
  width: 100vw;
  background-color: var(--background);

  & > .season {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: var(--maxwidth2);
    margin: auto;
    & > div {
      & > p {
        font-size: 14px;
        padding: 5px 0;
        font-weight: 500;
      }
      & > select {
        padding: 10px 80px 10px 10px;
        border-radius: 10px;
        font-size: 16px;
        background-color: inherit;
        margin-bottom: 10px;
      }
    }
    @media screen and (max-width: 880px) {
      & > div {
        width: 93%;
        align-self: flex-start;
        margin-left: 16px;
      }
      select {
        width: 99%;
      }
    }
  }
  & > .inner_body {
    max-width: var(--maxwidth2);
    margin: auto;
    display: flex;
    gap: 10px;
    & > .left {
      width: 25%;
      position: relative;
    }
    & > .middle {
      width: 50%;
      position: relative;
    }
    & > .right {
      width: 25%;
      position: relative;
    }
    @media screen and (max-width: 880px) {
      display: flex;
      flex-direction: column;
      margin: 0 16px;
      & > div {
        width: 100% !important;
      }
    }
  }
`;
export const Profile = styled.div`
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  margin-bottom: 20px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 20px;
    & > img {
      width: 250px;
      height: 250px;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid #aaa;
      /* min-height: 250px;
        min-width: 250px; */
    }
    & > div {
      & > h1 {
        color: #111;
        font-size: 20px;
        font-weight: 700;
        padding: 15px;
        text-align: center;
        & > p {
          text-align: left;
          padding-top: 10px;
          font-size: 14px;
          font-weight: 400;
          padding-bottom: 15px;
        }
      }
      & > .link {
        width: 100%;
        display: flex;
        justify-content: center;
        color: #111;
        font-weight: 600;
        align-items: center;
        padding: 8px 0;
        font-size: 16px;
        border: none;
        outline: none;
        background-color: #ccc;
        border-radius: 5px;
        & > i {
          padding: 0 10px;
          font-size: 25px;
        }
      }
      & > .link:first-of-type {
        margin-bottom: 10px;
      }
    }

    /* @media screen and (max-width:500px) {
        .space{
            flex: 1 !important;
        }
        &>div{
            display: flex;
            flex-direction: row !important;
        }
        button p{
            
            display: none;
        }

    }   */
  }
`;
export const CurrentSeason = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  border-radius: 10px;
  background-color: white;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    & > .drop {
      & > h1 {
        font-size: 18px;
        color: #111;
        font-weight: 700;
        padding: 15px 20px;
        background-color: #f6f5f4;
        border-radius: 10px;
      }
      & > .h1_with_right {
        font-size: 18px;
        color: #333;
        padding: 15px 20px;
        background-color: #f6f5f4;
        border-radius: 10px;
        font-weight: 700;
        display: flex;
        align-items: center;
        & > .flex {
          flex: 1;
        }
        & > p {
          font-size: 14px;
          float: right;
          font-weight: 600;
        }
        & > button {
          padding: 8px 20px;
          border-radius: 5px;
          margin-left: 10px;
          float: right;
          font-weight: 600;
        }
      }
      & > .content {
        padding: 10px 20px;
        & > div {
          & > ul {
            list-style: none;
            & > li {
              display: flex;
              justify-content: space-between;
              padding: 10px;
              color: #111;
              font-size: 14px;
              font-weight: 600;
            }
            & > li:last-of-type {
              background-color: #f6f5f4;
            }
          }
        }
        & > .table {
          border: 1px solid #ddd;
        }
        & > .report {
          margin-top: 10px;
          padding: 8px 30px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          background-color: white;
          border: 1px solid #111;
          border-radius: 5px;
          & > i {
            font-weight: 400;
            padding: 0 10px;
            font-size: 25px;
          }
        }
        & > .sale {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
          margin-top: 5px;
          & > h4 {
            font-size: 16px;
            color: #111;
          }
          & > p {
            background-color: #b4f0e0;
            color: #2bd5a9;
            padding: 1px 10px;
            border-radius: 10px;
          }
        }
        & > h3 {
          font-size: 18px;
          font-weight: 600;
          padding: 10px;
        }
        & > .chart {
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          & > div {
            display: flex;
            align-items: center;
            & > h5 {
              padding-right: 2px;
              color: #999;
              font-size: 14px;
              font-weight: 400;
            }
            & > div {
              width: 100%;
              height: 2px;
              background: linear-gradient(to right, #aaa 10%, #ccc 100%);
            }
          }
        }
      }
      & > .content2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        & > img {
          width: 30%;
        }
        & > h1 {
          font-size: 22px;
          font-weight: 700;
          color: #111;
          padding: 10px 0;
        }
      }
      & > .sub-found {
        width: 100%;
        margin-top: 20px;

        & > table {
          border-collapse: collapse;

          position: relative;
          width: 100%;
          & > thead {
            & > tr {
              background-color: #e9e9e9;
              width: 100%;
              & > th {
                height: 50px;
                color: #666;
                font-size: 14px;
                font-weight: 600;
                text-align: left;
              }
            }
          }
          & > tbody {
            & > tr {
              width: 100%;
              :hover td {
                background-color: #dae8fe;
                color: var(--theme) !important;
              }
              & > td {
                height: 50px;
                color: #aaa;
                font-size: 14px;
                font-weight: 400;
              }
              & > td:nth-child(1) {
                padding-left: 10px;
              }
            }
          }
        }
      }
      & > .content3 {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        & > .color {
          display: flex;
          padding: 15px 0;
          gap: 10px;
          width: 100%;
          justify-content: space-between;
          position: relative;
          & > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 25px;
            padding: 15px 0;
            border-radius: 10px;
            width: 25%;
            & > img {
              height: 35px;
              width: 35px;
            }
            & > h5 {
              font-weight: 600;
            }
            & > p {
              font-weight: 600;
              font-size: 14px;
            }
          }
          & > div:nth-child(1) {
            background-color: #fbf1ba;
            h5 {
              color: #f5dc56;
            }
            p {
              color: #f5dc56;
            }
          }
          & > div:nth-child(2) {
            background-color: #b9d6fb;
            h5 {
              color: #4893f5;
            }
            p {
              color: #4893f5;
            }
          }
          & > div:nth-child(3) {
            background-color: #c0e8d9;
            h5 {
              color: #54c299;
            }
            p {
              color: #54c299;
            }
          }
          & > div:nth-child(4) {
            background-color: #f4b2b2;
            h5 {
              color: #dc1515;
            }
            p {
              color: #dc1515;
            }
          }
        }
        & > .non_color {
          display: flex;
          flex-wrap: wrap;
          position: relative;
          width: 100%;
          gap: 15px;
          padding-bottom: 15px;
          & > div {
            padding: 25px 15px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: calc(50% - 15px);
            border: 2px solid #ddd;
            & > h1 {
              font-size: 18px;
              font-weight: 600;
            }
            p {
              color: #999;
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
      & > .content4 {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        padding-top: 15px;

        & > .non_color {
          display: flex;
          position: relative;
          width: 100%;
          gap: 15px;
          padding-bottom: 15px;
          & > div {
            padding: 25px 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 33%;
            border: 2px solid #ddd;
            position: relative;

            & > h1 {
              font-size: 18px;
              font-weight: 600;
              margin: auto;
            }
            p {
              color: #999;
              font-size: 16px;
              font-weight: 600;
              width: 80%;
              margin: auto;
              text-align: center;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
`;
export const Submission = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  margin-bottom: 20px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    & > .drop {
      & > h1 {
        font-size: 18px;
        color: #333;
        padding: 15px 20px;
        background-color: #f6f5f4;
        border-radius: 10px;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        & > p {
          font-size: 14px;
        }
      }
      & > .content {
        & > div {
          padding-top: 20px;
          & > ul {
            list-style: none;
            & > li {
              display: flex;
              justify-content: space-between;
              color: #aaa;
              font-size: 14px;
              font-weight: 600;
              padding: 10px 20px;
              & > div {
                display: flex;
                gap: 20px;
                & > div {
                  display: flex;
                  gap: 5px;
                  align-items: center;
                  & > img {
                    height: 10px;
                    width: 10px;
                  }
                }
                & > p {
                }
              }
            }
            & > .last_list {
              background-color: #f6f5f4;
              color: #333;
              padding: 20px;
            }
          }
        }
      }
    }
    & > .empty {
      height: 20px;
    }
  }
`;
export const SubmissionEvents = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  margin-bottom: 20px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    & > .drop {
      & > h1 {
        font-size: 18px;
        color: #333;
        padding: 15px 20px;
        background-color: #f6f5f4;
        border-radius: 10px;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
      }
      & > .content {
        & > div {
          padding-top: 20px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          & > img {
            width: 60%;
            object-fit: cover;
            margin: auto;
          }
          & > h1 {
            font-size: 18px;
            color: #111;
            margin: auto;
            padding: 20px;
          }
        }
      }
    }
  }
`;
