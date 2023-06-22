import React from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeadlineList from "./DeadlineList";

type props = {
  title: string;
  description: string;
  id: string | number;
  runtime: string;
  deadline: Array<object>;
};

export default function CategoryAndFees({
  title = "BestComedy",
  runtime = "",
  description = "play the game",
  deadline = [],
  id = Math.random(),
}: props) {
  return (
    <>
      <Wrapper>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <button className="content-opener">{title} </button>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="content-to-open">
                  <p>{description}</p>
                  <div className="hide">
                    <div className="left">
                      <h4>Accepted Duration</h4>
                    </div>
                    <div className="right">
                      <h4>0 Hrs {runtime} Min 00 Sec </h4>
                      {deadline.map((ele) => {
                        console.log(ele);
                        return <DeadlineList dataList={ele} />;
                      })}
                    </div>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  .MuiButtonBase-root {
    background-color: #efefef;
    border-radius: 10px;
  }
  .css-o4b71y-MuiAccordionSummary-content {
    margin: 0;
  }

  & > div {
    width: 100%;
    overflow: hidden;
    height: max-content;
    .content-opener {
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
    .content-to-open {
      padding: 20px;
      & > P {
        color: #aaa;
        font-size: 14px;
        font-weight: 500;
      }
      & > .hide {
        display: flex;
        flex-wrap: wrap;
        & > .left {
          flex: 1;
          & > h4 {
            color: var(--theme);
            font-weight: 600;
            font-size: 16px;
            padding: 20px 0;
          }
        }
        & > .right {
          flex: 1;
          & > h4 {
            color: var(--theme);
            font-weight: 600;
            font-size: 16px;
            padding: 20px 0;
          }
        }
        & > button {
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
  }
`;
