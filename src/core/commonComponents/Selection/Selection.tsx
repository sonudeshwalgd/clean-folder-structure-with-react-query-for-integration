import React from "react";
import styled from "styled-components";

// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {LocalizationProvider} from "@mui/material"
// import {  LocalizationProvider } from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Selection() {
  return (
    <>
      <SelectionWrapper>
        <select>
          <option
            style={{ padding: "8px", lineHeight: "20px", color: "red" }}
            className="option"
          >
            consider
          </option>
          <option className="option">selected</option>
          <option className="option">rejected</option>
        </select>
      </SelectionWrapper>
    </>
  );
}

const SelectionWrapper = styled.div`
  width: 100%;
  position: relative;

  & > select {
    width: 90%;
    padding: 16px;

    border-radius: 10px;
    border: 1px solid #aaa !important;
  }
  .option {
    border: 1px solid red !important;
    padding: 8px;
    margin: 10px !important;
    width: 100%;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  }
`;
