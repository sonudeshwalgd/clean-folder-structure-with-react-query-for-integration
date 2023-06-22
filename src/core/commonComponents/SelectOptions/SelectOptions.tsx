import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";
import { useEffect } from "react";

type ReactProp = {
  option: any;
};

// type MapProp={
//   item:()=>void,
//   index:()=>void,
// }
type MapProp = {
  item: string;
  index: string;
};

export default function SelectHTMLTag({ option }: ReactProp) {
  const [age, setAge] = React.useState<any>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    console.log(age);
  }, [age]);

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
              {/* {option.map((item ,index):MapProp=>{
                    return (
                    <MenuItem id={index}>{item}</MenuItem>)

                  })} */}
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
`;
