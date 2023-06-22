import styled from "styled-components";

export const Body = styled.section`
  width: 100vw;
  position: relative;
  background-color: var(--background);
  & > div {
    width: 100vw;
    max-width: var(--maxwidth);
    margin: auto;
    padding-top: 20px;

    & > .heading {
      width: 100%;
      position: relative;
      border-radius: 20px;
      background-color: var(--theme);
      overflow: hidden;
      & > img {
        position: absolute;
        top: 0;
        left: 5%;
        height: 100%;
        width: 100%;
        object-fit: fill;
        @media screen and (max-width: 500px) {
          position: relative;
          transform: translate(-96px, 48px) scale(1.35);
        }
      }
      & > h1:nth-child(2) {
        padding: 70px 0 0px 70px;
        font-size: calc(1.5vw + 20px);
        color: #fff;
        margin: 0;
      }
      & > h1:nth-child(3) {
        padding: 0px 0 70px 70px;
        font-size: calc(1.5vw + 20px);
        color: #fff;
        margin: 0;
      }
      @media screen and (max-width: 500px) {
        width: 90%;
        margin: auto;

        h1 {
          font-size: 20px !important;
          padding: 0px 0 5px 30px !important;
          transform: translateY(-30px);
        }
      }
    }
    & > .selector {
      padding: 50px;
      display: flex;
      justify-content: center;
      z-index: 999;
      & > div {
        width: fit-content;
        border-radius: 10px;
        & > ul {
          padding: 0;
          list-style: none;
          display: flex;
          margin: 0px;
          padding: 10px;
          background-color: #dae8fe;
          border-radius: 10px;
          overflow: auto;
          @media screen and (max-width: 450px) {
            width: 100vw !important;
            overflow: auto;
            ::-webkit-scrollbar {
              display: none;
            }
            & > li {
              border-radius: 5px !important;
            }
          }

          & > li {
            border-radius: 10px;
            font-weight: 600;
            padding: 14px 25px;
            font-size: 14px;
            color: var(--heading0);
            white-space: nowrap;
          }
        }
      }
    }
    & > .scale {
      padding-bottom: 50px;
      position: relative;
      height: max-content;
      & > div {
        & > h1 {
          display: block;
          margin: auto;
          text-align: center;
          color: var(--heading4);
          font-size: 40px;
          font-weight: 700;
          padding-top: 5px;
          padding-bottom: 10px;
        }
        & > ol {
          list-style: none;
          padding-bottom: 50px;

          & > li {
            display: block;
            margin: auto;
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
            font-weight: 600;
          }
        }
        & > .benifits {
          display: flex;
          justify-content: center;
          & > div {
            display: flex;
            flex-direction: column;
            align-items: center;

            & > h1 {
              font-weight: 700;
              font-size: 38px;
              letter-spacing: 2px;
              line-height: 38px;
              color: var(--heading1);
              margin: 0;
            }
            & > h5 {
              font-weight: 500;
              font-size: 16px;
              line-height: 20px;
              color: var(--heading1);
              color: #333;
              margin: 0;
              padding: 30px 0 60px 0;
            }
          }
        }

        & > .benifit_card {
          & > div {
            display: flex;
            margin: auto;
            max-width: 850px;
            justify-content: space-between;
            @media screen and (max-width: 700px) {
              flex-direction: column;
              gap: 20px;
              align-items: center;
            }

            & > .card {
              width: 250px;
              height: 230px;
              background-color: white;
              padding: 20px;
              border-radius: 10px;
              :hover {
                background-color: var(--theme);
                & > h2 {
                  color: white !important;
                  pointer-events: none;
                }
                & > h5 {
                  color: white !important;
                  pointer-events: none;
                }
              }
              & > h2 {
                color: #111;
                font-size: 22px;
              }
              & > h5 {
                font-weight: 300;
                font-size: 14px;
                line-height: 20px;
                color: var(--heading2);
                margin: 0;
                padding: 40px 0;
              }
            }
          }
        }
        & > .benifit_card_left {
          display: inline-block;
          margin: auto;
          position: relative;
          margin-right: 40px;
          margin-bottom: 40px;
          @media screen and (max-width: 500px) {
            display: block;
            margin-right: auto;
          }

          & > div {
            max-width: 100%;
          }
        }
      }
      .benefits_simple {
        & > ol {
          & > li {
            text-align: left;
            color: #333;
            font-weight: 400;
            padding: 12px 0;
          }
          .heading {
            color: #111;
            font-weight: 600;
            font-size: 16px;
          }
          .heading2 {
            color: #111;
            font-weight: 500;
          }
          .inside {
            display: flex;
            align-items: center;
            ::before {
              content: "";
              height: 3px;
              width: 3px;
              border-radius: 50%;
              background-color: #111;
              margin: 0 5px;
            }
          }
          .last {
          }
        }
        .card2 {
          width: 230px !important;

          & > h1 {
            display: block;
            margin: auto;
            text-align: center;
            color: var(--heading4);
            font-size: 40px;
            font-weight: 700;
            padding-top: 5px;
            padding-bottom: 10px;
          }
          & > h3 {
            display: block;
            margin: auto;
            text-align: center;
            color: var(--heading4);
            font-size: 30px;
            font-weight: 700;
            padding-top: 5px;
            padding-bottom: 10px;
          }
          & > h4 {
            display: block;
            margin: auto;
            text-align: center;
            color: #111;
            font-size: 14px;
            font-weight: 500;
            padding-top: 25px;
            padding-bottom: 10px;
          }
          :hover {
            & > h1,
            & > h3,
            & > h4 {
              color: white;
            }
          }
        }
      }
      /* &>.film_maker,&>.organizer,&>.benefits{
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            margin: auto;
            max-width: var(--maxwidth);
        } */
    }
  }
  .active_card {
    background-color: var(--theme) !important;
    & > h2,
    & > h5 {
      color: white !important;
    }
  }
  @media screen and (max-width: 700px) {
    .scale h1 {
      font-size: 26px !important;
      color: #111 !important;
      text-align: center !important;
      letter-spacing: 0 !important;
    }
    .card {
      width: 90% !important;
      margin: auto !important;
      & > h5 {
        font-weight: 600 !important;
        padding-top: 70px !important;
      }
    }
    ol {
      li {
        text-align: left !important;
        color: #333 !important;
        font-size: 14px !important;
        padding: 10px !important;
        padding-left: 20px !important;
      }
    }
  }
`;
