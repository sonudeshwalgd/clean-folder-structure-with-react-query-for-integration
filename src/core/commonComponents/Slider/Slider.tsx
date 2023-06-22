import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import styled from "styled-components";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function TwoPointRangeSlider({
  range,
  dots,
  postRequestSendHandler,
}: any) {
  const [value, setValue] = React.useState<number[]>([0, 100]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    // postRequestSendHandler()

    range(newValue);
  };
  const marks = [
    {
      value: 10,
    },
    {
      value: 20,
    },
    {
      value: 30,
    },
    {
      value: 40,
    },
    {
      value: 50,
    },
    {
      value: 60,
    },
    {
      value: 70,
    },
    {
      value: 80,
    },
    {
      value: 90,
    },
  ];

  return (
    <Sliderwrapper onMouseUp={() => postRequestSendHandler()}>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={dots && marks}
        />
      </Box>
    </Sliderwrapper>
  );
}

const Sliderwrapper = styled.div`
  width: 100%;
  position: relative;
  .css-1gv0vcd-MuiSlider-track {
    height: 8px;
  }
`;
