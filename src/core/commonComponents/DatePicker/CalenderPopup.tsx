import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { CategoryPopUpCard } from "../../../modules/Home/containers/FestivalContainer/styled";

const CalenderPopup = ({ handlePopUpVisibility, valueProp }: any) => {
  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));

  return (
    <>
      <CategoryPopUpCard
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            console.log("object");
            handlePopUpVisibility();
          }
        }}
      >
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={value}
              shouldDisableDate={isWeekend}
              onChange={(newValue: any) => {
                setValue(newValue);
                valueProp(
                  newValue?.year() +
                    "-" +
                    newValue?.month() +
                    "-" +
                    newValue?.date()
                );
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </CategoryPopUpCard>
    </>
  );
};

export default CalenderPopup;
