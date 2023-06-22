import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { queryClient } from "../../../..";
import {
  patchOrganizerSubmissionJudgingStatus,
  patchOrganizerSubmissionSubmissionStatus,
} from "../../../../core/Api/Api";
import SelectAndOptionHTMLTag from "../../../../core/commonComponents/SelectAndOptionHTMLTag/SelectOptions";
import SelectHTMLTag from "../../../../core/commonComponents/SelectOptions/SelectOptions";
const Category = ["All Category", "Animation Short Film"];

export default function SubmissionCard({ data }: any) {
  const navigate = useNavigate();

  const [judging, setJudging] = useState<string>();
  const [submission, setSubmission] = useState<string>();
  // const [permission , setPermission]=useState<boolean>(false)

  const navigateToDeatil = () => {
    navigate("details", { state: data });
  };

  useEffect(() => {
    console.log(data?.selectedProject?.projectTitle);
  }, []);

  const judgingHandler = (value: any) => {
    setJudging(value);
    // const oldQueryGetAllSeasonsDetails:any=  queryClient.getQueryData("getAllSeasonsDetails")
    const payload = {
      festivalid: localStorage.getItem("festivalId") || "",
      projectid: data?.selectedProject._id,
      status: judging,
      submissionid: data?._id,
      submittedby: data?.submittedby._id,
    };
    judgingStatus(payload);
  };

  const submissionHandler = (value: any) => {
    setSubmission(value);
    // const oldQueryGetAllSeasonsDetails:any=  queryClient.getQueryData("getAllSeasonsDetails")
    const payload = {
      festivalid: localStorage.getItem("festivalId") || "",
      projectid: data?.selectedProject._id,
      status: submission,
      submissionid: data?._id,
      submittedby: data?.submittedby._id,
    };
    submissionStatus(payload);
  };

  const { mutate: submissionStatus } = useMutation(
    ["patchOrganizerSubmissionSubmissionStatus"],
    patchOrganizerSubmissionSubmissionStatus,
    {
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );
  const { mutate: judgingStatus } = useMutation(
    ["patchOrganizerSubmissionJudgingStatus"],
    patchOrganizerSubmissionJudgingStatus,
    {
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );

  return (
    <>
      <Wrapper>
        <td onClick={navigateToDeatil} data-attr="Project Details:">
          <div className="detail">
            <p>{data?.selectedProject?.projectTitle}</p>
            <h4>
              Directors{" "}
              {data?.selectedProject?.creditinformation[0]?.details[0]?.name}
            </h4>
            <h4>
              <i className="ri-map-pin-line"></i>{" "}
              {data?.selectedProject?.countryOfOrigin}
            </h4>
          </div>
        </td>
        <td onClick={navigateToDeatil} data-attr="Runtime">
          {data?.details[0]?.category?.runtime}
        </td>
        <td data-attr="Judging Status">
          <div className="relative">
            <SelectAndOptionHTMLTag option={Category} prop={judgingHandler} />
          </div>
        </td>
        <td data-attr="Submission Status">
          <div className="relative">
            <SelectAndOptionHTMLTag
              option={Category}
              prop={submissionHandler}
            />
          </div>
        </td>
        <td onClick={navigateToDeatil} data-attr="Date">
          {moment(data?.createdAt).format("DD MMMM YYYY")}
        </td>
        <td onClick={navigateToDeatil} className="tohide">
          <Link to="#">
            <button className="preview">Preview</button>
          </Link>
        </td>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.tr`
  width: 100%;
  border-bottom: 2px solid #eee;

  :hover td {
    background-color: #dae8fe;
    /* color: var(--theme) !important; */
  }
  & > td {
    height: 50px;
    font-size: 14px;
    color: #111;
    font-size: 15px;
    font-weight: 500;

    & > * {
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
    }
    .detail {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 5px 0 20 px 0;

      & > p {
        font-weight: 500;
      }
      & > h4 {
        font-weight: 600;
      }
    }
    .preview {
      padding: 8px 22px;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: var(--theme);
      color: white;
      font-size: 16px;
    }
    .relative {
      position: relative;
      width: 90%;
      height: 90%;
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-radius: 10px;
      }
    }
  }
  & > td:nth-child(1) {
    padding-left: 10px;
  }
`;
