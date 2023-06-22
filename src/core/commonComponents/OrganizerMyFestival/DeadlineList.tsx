import React from "react";
import styled from "styled-components";

// type propType = {
//   gold_fees: number;
//   name: string;
//   silver_fees: number;
//   standard_fee: number;
//   student_fees: number;
//   _id: string;
// };

// type propType={
//     dataList:object
// }

export default function DeadlineList({ dataList }: any) {
  const { gold_fees, name, silver_fees, standard_fee, student_fees, _id } =
    dataList;
  return (
    <Wrapper>
      <div className="list">
        <h2>{dataList.name}</h2>
        <ul>
          <li>Student : ₹ {student_fees}</li>
          <li>standards : ₹ {standard_fee}</li>
          <li>Gold : ₹ {gold_fees}</li>
          <li>Silver : ₹ {silver_fees}</li>
        </ul>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  & > .list {
    color: #aaa;
    padding-bottom: 20px;
    & > h2 {
      font-weight: 600;
      font-size: 18px;
      padding-bottom: 10px;
      text-align: right;
    }
    & > ul {
      list-style: none;
      & > li {
        font-size: 14px;
        font-weight: 600;
        text-align: right;
      }
    }
  }
`;
