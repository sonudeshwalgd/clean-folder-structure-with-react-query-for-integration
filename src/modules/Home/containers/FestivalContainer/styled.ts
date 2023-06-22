import styled from "styled-components";

export const FestivalWrapper = styled.section`
  width: 100vw;
  position: relative;
  background-color: var(--background);
  & > div {
    max-width: var(--maxwidth);
    margin: auto;
    padding: 3px 0 0px 0;

    & > .search {
      padding: 22px 0;
      & > div {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        row-gap: 20px;
        @media screen and (max-width: 540px) {
          justify-content: flex-end;
          gap: 10px !important;
          button {
            padding: 0px 32px !important;
            font-size: 14px !important;
          }
          .search_btn,
          input {
            margin-right: 0 !important;
          }
        }

        & > input {
          width: 56%;
          margin-right: 20px;
          border-radius: 10px;
          height: 45px;
          border: 1px solid var(--heading5);
          padding: 0 10px 2px 10px;
          @media screen and (max-width: 540px) {
            width: 100%;
          }
        }
        .search_btn {
          display: flex;
          align-items: center;
          padding: 20px 40px;
          background-color: var(--theme);
          height: 36px;
          font-size: 14px;
          line-height: 24px;
          color: var(--heading1);
          outline: none;
          border: none;
          margin-right: 24px;
          font-weight: 600;
          border-radius: 5px;
          color: white;
          text-decoration: none;
        }
        .clear_btn {
          display: flex;
          align-items: center;
          padding: 17px 28px;
          height: 36px;
          font-size: 16px;
          line-height: 24px;
          color: var(--heading1);
          color: #333;
          outline: none;
          border: 2px solid #333;
          font-weight: 600;
          border-radius: 5px;
          text-decoration: none;
        }
      }
    }
  }
`;

export const CategoryWrapper = styled.div`
  width: 100%;
  background-color: var(--background);

  & > div {
    max-width: var(--maxwidth);
    width: 100vw;
    margin: auto;
    display: flex;
    min-height: 500px;
    & > div.left {
      width: 29.5%;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0 rgb(0 0 0 / 10%);
      background-color: white;
      margin-bottom: 30px;
      @media (max-width: 940px) {
        display: none;
      }
      & > div {
        /* padding: 20px 10px; */

        & > ul {
          list-style: none;
          margin: 0;
          & > li {
            /* height: max-content; */
            overflow: hidden;
            transition: all 0.5s;
            .filter {
              cursor: pointer;
              padding: 15px;
              border-radius: 10px;
              color: var(--heading5);
              background-color: var(--input);
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-weight: 600;
              font-size: 16px;
              margin: 0;
              /* pointer-events: none; */
            }
            .accordian-body {
              padding: 10px 0 0 10px;
              display: flex;
              flex-direction: column;
              transition: all 0.3s;
              overflow: hidden;
              background-color: white;
              border-radius: 5px;
              position: relative;
              & > a {
                padding: 5px 0;
                font-size: 16px;
                font-weight: 400;
                color: var(--heading5);
                & > input {
                  margin: 0 10px;
                  border-radius: none;
                  font-size: 30px;
                  transform: scale(1.3);
                }
              }
              & > .range {
                padding: 0 20px 0 10px;

                & > div {
                  display: flex;
                  justify-content: space-between;
                  & > .center {
                    display: block;
                    margin: auto;
                  }
                }
                & > input {
                  width: 100%;
                  padding: 10px 0;
                }
              }

              & > button {
                position: absolute;
                bottom: 0;
                left: 0;
                border: none;
                background-color: inherit;
                padding: 0;
                display: flex;
                align-items: center;
                outline: none;
                padding: 5px 40px 0 5px;
                font-size: 12px;
                font-weight: 600;
                color: var(--theme_color);
                & > img {
                  height: 8px;
                  width: 8px;
                  margin: 0 10px 0 0;
                }
              }
            }
            .MuiButtonBase-root {
              padding: 0 16px 0 0;
              height: 52px;
              border-radius: 10px;
              background-color: var(--input);
            }
            .MuiAccordionDetails-root {
              padding: 0;
            }
          }
        }
      }
    }
    & > .right {
      width: 70%;
      padding: 0 18px;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 5px;
      @media screen and (max-width: 500px) {
        padding: 0;
        .filter {
          margin-left: 18px !important;
        }
      }
      .filter {
        padding: 6px 52px;
        margin-left: 0;
        display: flex;
        align-self: flex-start;
        outline: none;
        border: none;
        background-color: #ddd;
        font-size: 16px;
        font-weight: 500;
        border-radius: 5px;
        display: none;
      }

      @media screen and (max-width: 940px) {
        width: 100%;
        .filter {
          display: block;
        }
      }

      & > img {
        transform: scaleX(0.9);
        @media screen and (max-width: 900px) {
          transform: scaleX(0.7);
        }
      }
      & > .pagination {
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        & > * {
          white-space: nowrap;
        }
        & > .left {
          display: flex;
          padding-left: 5px;
          & > h4:nth-child(1) {
            padding-right: 2vw;
          }
          & > h4 {
            font-size: 14px;
            color: #222;
            font-weight: 600;
          }
        }
        & > .right {
          display: flex;
          padding-left: 5px;
          & > h4:nth-child(1) {
            padding-right: 2vw;
          }
          & > h4 {
            font-size: 14px;
            color: var(--theme);
            font-weight: 600;
          }
        }
        @media screen and (max-width: 500px) {
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
      }
    }
  }
  .region-country {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    padding-bottom: 10px;
    svg {
      color: #777;
    }
    & > .country {
      position: relative;
      width: 65%;

      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-width: auto;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }
    & > .region {
      position: relative;
      width: 35%;
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-width: auto;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }
    }

    .calender {
      min-height: 56px;
      height: 100%;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      width: 100%;
      margin-right: 5px;
      padding: 0 5px;

      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        width: 100%;
      }
      input {
        display: none;
      }
      .flex {
        flex: 1;
      }
    }
  }
  .css-1v5z18m {
    width: 100%;
  }
`;
export const ReviewCardWrapper = styled.div`
  width: 100%;
  position: relative;
  .visible {
    visibility: visible !important ;
  }
  & > .link {
    width: 100%;
    margin: auto;
    background-color: white;
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
    padding: 15px;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    @media screen and (max-width: 500px) {
      border-radius: 0px;
    }
    & > .left {
      width: 27%;
      min-width: 110px;
      overflow: hidden;
      @media screen and (max-width: 500px) {
        display: none;
        overflow: hidden;
      }
      & > img {
        width: 100%;
        height: 130px;
        width: 130px;
        object-fit: cover;
        object-position: center top;
        top: 0;
        left: 0;
      }
    }
    & > .middle {
      padding: 0 1vw 0px 1vw;
      width: 100%;
      & > div {
        display: flex;
        gap: 10px;
        & > .img-mb {
          & > img {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            display: none;
            @media screen and (max-width: 500px) {
              display: block;
            }
          }
        }
        & > .detail {
          & > h5 {
            font-size: 14px;
            font-weight: 600;
            color: #222 !important;
            padding-bottom: 5px;
          }
          & > h4 {
            font-weight: 400;
            padding: 0px 0 5px 0;
            color: #333;
            font-size: 14px;
          }
          & > small {
            padding: 0px 0 5px 0;
            color: red;
            font-size: 14px;
            margin-bottom: 10px;
          }
          .verified {
            padding-bottom: 5px;
            h4 {
              background-color: white !important;
              font-size: 16px !important;
              padding: 0 !important;
            }
          }
          img {
            height: 25px;
            width: 25px;
          }
        }
      }

      & > .button {
        width: 100%;
        margin: auto;
        display: flex;
        padding-top: 18px;

        & > .like {
          padding: 4px 3vw;
          outline: none;
          border: none;
          color: white;
          border-radius: 5px;
          background-color: #169179;
          font-size: 14px;
          line-height: 150%;
          font-weight: 600;
          letter-spacing: -1px;
          white-space: nowrap;
          width: 100%;
          border-radius: 2px;
        }
        & > .comment {
          width: 100%;
          white-space: nowrap;
          padding: 6px 3vw;
          outline: none;
          border: none;
          font-size: 14px;
          line-height: 150%;
          font-weight: 600;
          color: inherit;
          border-radius: 5px;
          color: white;
          letter-spacing: -1px;
          background-color: var(--theme);
          border-radius: 2px;
        }
      }
    }
    & > .right {
    }
  }
`;

export const CategoryPopUpCard = styled.div`
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
  overflow: auto;
  padding-top: 34px;
  & > div {
    height: max-content;
    margin: auto;
    display: flex;
    background-color: #f2f7ff;
    position: relative;
    background-color: transparent;
    max-width: calc(100vw - 60px);
    & > button {
      position: absolute;
      top: 0;
      right: 0;
      /* button */
      transform: translate(0%, -0%);
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
      background-color: var(--theme);
      color: white;
    }
    & > div.left {
      border-radius: 10px;
      width: 90vw;
      box-shadow: 0px 0px 10px 0 rgb(0 0 0 / 10%);
      background-color: white;
      height: max-content;

      & > div {
        /* padding: 20px 10px; */
        & > ul {
          list-style: none;
          margin: 0;
          & > li {
            overflow: hidden;
            transition: all 0.5s;
            .filter {
              cursor: pointer;
              padding: 15px;
              border-radius: 10px;
              color: var(--heading5);
              background-color: var(--input);
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-weight: 600;
              font-size: 16px;
              margin: 0;
            }
            .accordian-body {
              padding: 10px 0 0 10px;
              display: flex;
              flex-direction: column;
              transition: all 0.3s;
              overflow: hidden;
              background-color: white;
              border-radius: 5px;
              position: relative;
              & > a {
                padding: 5px 0;
                font-size: 16px;
                font-weight: 400;
                color: var(--heading5);
                & > input {
                  margin: 0 10px;
                  border-radius: none;
                  font-size: 30px;
                  transform: scale(1.3);
                }
              }
              & > .range {
                padding: 0 20px 0 10px;

                & > div {
                  display: flex;
                  justify-content: space-between;
                  & > .center {
                    display: block;
                    margin: auto;
                  }
                }
                & > input {
                  width: 100%;
                  padding: 10px 0;
                }
              }

              & > button {
                position: absolute;
                bottom: 0;
                left: 0;
                border: none;
                background-color: inherit;
                padding: 0;
                display: flex;
                align-items: center;
                outline: none;
                padding: 5px 40px 0 5px;
                font-size: 12px;
                font-weight: 600;
                color: var(--theme_color);
                & > img {
                  height: 8px;
                  width: 8px;
                  margin: 0 10px 0 0;
                }
              }
            }
            .MuiButtonBase-root {
              padding: 0 16px 0 0;
              height: 52px;
              border-radius: 10px;
              background-color: var(--input);
            }
            .MuiAccordionDetails-root {
              padding: 0;
            }
          }
        }
        /* & > ul {
          list-style: none;
          margin: 0;
          & > li {
            overflow: hidden;
            & > p.filter {
              padding: 15px;
              border-radius: 10px;
              color: var(--heading5);
              background-color: var(--input);
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-weight: 600;
              font-size: 16px;
              margin: 0;
              
            }
            & > div {
              padding: 10px 0 0 10px;
              display: flex;
              flex-direction: column;
              transition: all 0.3s;
              overflow: hidden;
              background-color: white;
              border-radius: 5px;
              position: relative;
              & > a {
                padding: 5px 0;
                font-size: 16px;
                font-weight: 400;
                color: var(--heading5);
                & > input {
                  margin: 0 10px;
                  border-radius: none;
                  font-size: 30px;
                  transform: scale(1.3);
                }
              }
              & > .range {
                padding: 0 20px 0 10px;

                & > div {
                  display: flex;
                  justify-content: space-between;
                  & > .center {
                    display: block;
                    margin: auto;
                  }
                }
                & > input {
                  width: 100%;
                  padding: 10px 0;
                }
              }

              & > button {
                position: absolute;
                bottom: 0;
                left: 0;
                border: none;
                background-color: inherit;
                padding: 0;
                display: flex;
                align-items: center;
                outline: none;
                padding: 5px 40px 0 5px;
                font-size: 12px;
                font-weight: 600;
                color: var(--theme_color);
                & > img {
                  height: 8px;
                  width: 8px;
                  margin: 0 10px 0 0;
                }
              }
            }
          }
        } */
      }
    }
  }
  .region-country {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    padding-bottom: 10px;
    svg {
      color: #777;
    }
    & > .country {
      position: relative;
      width: 65%;

      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-width: auto;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }
    & > .region {
      position: relative;
      width: 35%;
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-width: auto;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }
    }

    .calender {
      min-height: 56px;
      height: 100%;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      width: 100%;
      margin-right: 5px;
      padding: 0 5px;

      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        width: 100%;
      }
      input {
        display: none;
      }
      .flex {
        flex: 1;
      }
    }
  }
  .css-1v5z18m {
    width: 100%;
  }
`;
