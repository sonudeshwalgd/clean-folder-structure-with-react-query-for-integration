import styled from "styled-components";

export const HomeWrapper = styled.div`
  width: 100vw;
  position: relative;
  background-color: var(--background);
  padding-top: 10px;
  padding-bottom: 50px;
  & > div {
    max-width: var(--maxwidth);
    margin: auto;
    & > .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: 20px 0;
      @media screen and (max-width: 700px) {
        flex-direction: column-reverse;
        align-items: center;
        .text {
          width: 100% !important;
        }
        .img {
          width: 75% !important;
          margin: auto;
          margin-bottom: 80px;
          transform: scaleY(1.3);
          margin-top: 40px;
        }
      }
      & > .text {
        width: 40%;
        display: flex;
        flex-direction: column;
        z-index: 500;
        justify-content: space-between;
        & > h1 {
          font-weight: 700;
          line-height: 38px;
          color: var(--heading1);
          margin: 0;
        }
        & > h5 {
          font-weight: 500;
          font-size: 15px;
          line-height: 20px;
          color: var(--heading0);
          margin: 0;
          padding: 25px 0;
        }
        & > .link {
          text-decoration: none;
          & > button {
            color: white;
            background-color: var(--theme);
            padding: 12px 35px;
            font-weight: 700;
            font-size: 14px;
            line-height: 18px;
            border: none;
            padding: none;
            border-radius: 3px;
            display: flex;
            align-items: center;
            font-family: "sans bold" !important;
            & > i {
              padding-right: 8px;
              font-size: 24px;
            }
          }
        }
        @media screen and (max-width: 520px) {
          h1 {
            font-size: 26px;
            color: #111;
            padding-left: 20px;
          }
          h5 {
            font-size: 14px;
            color: #111;
            padding: 10px 10px 32px 20px;
            font-weight: 600;
          }
          button {
            padding: 8px 50px !important;
            line-height: 12px;
            margin-left: 20px;
          }
          i {
            display: none;
          }
        }
      }
      & > .img {
        width: 45%;
        position: relative;

        & > img {
          width: 100%;
        }
      }
    }
    & > .mouse {
      & > .mouse {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 60px 30px 60px;
        transform: scale(1);
        @media screen and (max-width: 600px) {
          padding: 0;
        }
        & > img {
          padding-right: 8px;
        }

        & > h5 {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: var(--heading0);
          margin: 0;
          padding: 30px 0;
        }
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
        @media screen and (max-width: 520px) {
          h1 {
            font-size: 24px;
            color: #111;
            padding-left: 20px;
            padding-bottom: 20px;
            letter-spacing: 0;
          }
          h5 {
            font-size: 14px;
            color: #111;
            padding: 10px 10px 30px 20px;
            font-weight: 600;
          }
          button {
            padding: 8px 35px !important;
            line-height: 12px;
            margin-left: 20px;
          }
          i {
            display: none;
          }
        }
      }
    }
    & > .benifit_card {
      padding-bottom: 100px;
      & > div {
        display: flex;
        margin: auto;
        max-width: 850px;
        justify-content: space-between;

        & > .card {
          width: 250px;
          height: 230px;
          background-color: white;
          padding: 20px;
          border-radius: 10px;

          & > h2 {
            color: #111;
            font-size: 22px;
            pointer-events: none;
          }
          & > h5 {
            pointer-events: none;
            font-weight: 300;
            font-size: 14px;
            line-height: 20px;
            color: var(--heading2);
            margin: 0;
            padding: 40px 0;
          }
        }
        @media screen and (max-width: 700px) {
          flex-direction: column;
          gap: 20px;

          align-items: center;
          & > .card {
            width: 90%;
            margin: auto;
            max-width: 450px;
            h5 {
              padding-top: 80px;
            }
          }
        }
      }
    }
    & > .gallery {
      & > .grid {
        min-height: 100px;
        display: grid;
        grid-template-columns: 70% 30%;
        grid-template-rows: 150px 500px;
        overflow: hidden;
        grid-template-areas:
          "myArea1 myArea2"
          "myArea3 myArea2";
        @media screen and (max-width: 700px) {
          grid-template-columns: 100%;
          grid-template-rows: 150px 250px;
          grid-template-areas:
            "myArea1 "
            "myArea3 ";
          position: relative;
          width: 100%;
          justify-content: center;
          & > .item {
            width: 100%;
            position: relative;
            & > img {
              margin: auto;
              width: 90%;
              display: block;
            }
          }
          .item2 {
            display: none;
            height: 0 !important;
          }
          h1 {
            font-size: 26px !important;
            color: #111 !important;
            text-align: center;
          }
          h5 {
            text-align: center;
            font-size: 14px !important;
            color: #111 !important;
          }
        }

        & > .item {
          /* padding:  10px 10px; */
          overflow: hidden;
          & > img {
            object-fit: cover;
            height: 100%;
            width: 100%;
            border-radius: 20px;
          }
        }
        & > .item1 {
          grid-area: myArea1;
          & > div {
            & > h1 {
              font-weight: 700;
              font-size: 38px;
              /* letter-spacing: 2px; */
              line-height: 38px;
              color: var(--heading1);
              margin: 0;
            }
            & > h5 {
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
              color: var(--heading2);
              margin: 0;
              padding: 40px 0;
            }
          }
        }
        & > .item2 {
          grid-area: myArea2;
          position: relative;
          & > img {
            height: 100%;
            /* margin-left: 10px; */
          }
        }
        & > .item3 {
          grid-area: myArea3;
          position: relative;
          & > img {
            height: 100%;
            width: 95%;
          }
        }
      }
    }
  }
  .active_card {
    background-color: var(--theme) !important;
    & > h2,
    & > h5 {
      color: white !important;
    }
  }
`;
