import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";
import { useEffect } from "react";

type ReactProp = {
  option: any;
};

type MapProp = {
  prop: any;
  option: any;
  preValue: any;
};

export default function SelectOptionsApiValue({
  prop,
  option,
  preValue,
}: MapProp) {
  const [age, setAge] = React.useState<any>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    prop(event.target.value as string);
  };

  useEffect(() => {
    setAge(option[preValue]);
  }, []);

  return (
    <>
      <SelectWrapper>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {option.map((ele: any, index: any) => {
                return (
                  <MenuItem id={ele} value={index == 0 ? "" : ele}>
                    {ele}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </SelectWrapper>
    </>
  );
}

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  .css-ece9u5 {
    min-width: 100px;
  }
  .MuiFormControl-root {
    width: 100%;
  }
  .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root {
    border-radius: 10px;
    border-color: #999;
  }
  .css-1869usk-MuiFormControl-root {
    margin: 8px 0;
  }
  .MuiSelect-outlined {
    padding: 13.5px 14px;
  }
  * {
    border: none !important;
    outline: none !important;
  }
`;
