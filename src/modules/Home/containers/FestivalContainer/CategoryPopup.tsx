import React, { useEffect, useRef, useState } from "react";
import { CategoryPopUpCard } from "./styled";
import {
  reviewCardData,
  categoryData,
} from "../../../../core/constants/review-card-data";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import TwoPointRangeSlider from "../../../../core/commonComponents/Slider/Slider";
import SelectHTMLTag from "../../../../core/commonComponents/SelectOptions/SelectOptions";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectAndOptionHTMLTag from "../../../../core/commonComponents/SelectAndOptionHTMLTag/SelectOptions";
import { useMutation } from "react-query";
import { getListAllFestivals } from "../../../../core/Api/Api";
import CalenderPopup from "../../../../core/commonComponents/DatePicker/CalenderPopup";

const CategoryPopup = ({ handlePopUpVisibility, searchInput }: any) => {
  const [isPopVisible, setIsPopVisible] = useState<boolean>(false);
  const [isCalendarDeadlineVisible, setIsCalendarDeadlineVisible] =
    useState<boolean>(false);
  const [isCalendarEventVisible, setIsCalendarEventVisible] =
    useState<boolean>(false);
  const [entryFees, setEntryFees] = useState<any>({});
  const [yearRunning, setYearRunning] = useState<any>({});
  const [regionName, setRegionName] = useState<any>();
  const [countryName, setCountryName] = useState<any>();
  const [eventDateName, setEventDateName] = useState<any>();
  const [entryDeadlineDateValue, setEntryDeadlineDateValue] = useState<any>();
  const [eventDateValue, setEventDateValue] = useState<any>();

  const open = useRef<any>();
  const close = useRef<any>();

  const feature = useRef<any>();
  const short = useRef<any>();

  const Animation = useRef<any>();
  const Documentary = useRef<any>();
  const Experimental = useRef<any>();
  const Feature = useRef<any>();
  const Music = useRef<any>();
  const Short = useRef<any>();
  const Student = useRef<any>();
  const Web = useRef<any>();

  const any = useRef<any>();

  const Region = ["Inside", "Outside"];
  const eventDate = ["Before", "After"];
  const country = ["", "India", "Canada"];

  var payloads = {};

  const { mutate, data } = useMutation(
    ["getListAllFestivals", payloads],
    getListAllFestivals,
    {
      onSuccess: (res) => {
        console.log(res[0]?.count);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const runPostRequest = () => {
    const payload = {
      call_for_entry: open.current?.checked
        ? 0
        : close.current?.checked
        ? 1
        : 0,
      categroy: [
        Animation.current?.checked ? "Animation" : "",
        Documentary.current?.checked ? "Documentary" : "",
        Experimental.current?.checked ? "Experimental" : "",
        Feature.current?.checked ? "Feature" : "",
        Music.current?.checked ? "Music Video" : "",
        Short.current?.checked ? "Short" : "",
        Student.current?.checked ? "Student" : "",
        Web.current?.checked ? "Web / New Media" : "",
      ].filter((ele) => ele !== ""),
      country: countryName || "",
      country_type: regionName == "Outside" ? "Outside" : "Inside",
      entry_deadline: entryDeadlineDateValue || "",
      entry_deadline_type: eventDateName || "Before",
      entry_fees_max: Math.ceil(entryFees[1] * 100) || 10000,
      entry_fees_min: Math.floor(entryFees[0] * 100) || 0,
      event_date: eventDateValue || "",
      event_date_type: eventDateName == "After" ? "After" : "Before",
      event_type: [
        feature.current?.checked ? "Feature Film Festivals" : "",
        short.current?.checked ? "Short Film Festivals" : "",
      ].filter((ele) => ele !== ""),
      fest_focus: [],
      page: 1,
      perPage: 10,
      runtime: Number(any.current?.value),
      search_terms: searchInput.current.value || "",
      yrs_max: Math.ceil(yearRunning[1] / 5) || 20,
      yrs_min: Math.floor(yearRunning[0] / 5) || 0,
    };
    console.log("first");
    mutate(payload);
  };

  useEffect(() => {
    runPostRequest();
  }, [
    eventDateValue,
    entryDeadlineDateValue,
    eventDateName,
    countryName,
    regionName,
  ]);

  const handleDeadlineCalendarVisibility = () => {
    setIsCalendarDeadlineVisible(false);
  };
  const handleEventCalendarVisibility = () => {
    setIsCalendarEventVisible(false);
  };

  const setEntryFeesHandler = (value: any) => {
    setEntryFees(value);
  };
  const setYearRunningHandler = (value: any) => {
    setYearRunning(value);
  };
  const regionNameHandler = (value: any) => {
    setRegionName(value);
  };
  const countryNameHandler = (value: any) => {
    setCountryName(value);
  };
  const setEventDateNameHandler = (value: any) => {
    setEventDateName(value);
  };
  const setEntryDeadlineDateValueHandler = (value: any) => {
    setEntryDeadlineDateValue(value);
  };
  const setEventDateNameValueHandler = (value: any) => {
    setEventDateValue(value);
  };

  return (
    <>
      <CategoryPopUpCard
        data-identity=""
        onClick={(e: any) => {
          if ("identity" in e.target.dataset) {
            handlePopUpVisibility();
          }
        }}
      >
        <div>
          {" "}
          <div className="left">
            <div>
              <ul>
                <li style={{ height: "max-content" }}>
                  <p className="filter">Call for Entries </p>
                  <div className="accordian-body">
                    <a>
                      <input
                        name="call"
                        onChange={runPostRequest}
                        ref={open}
                        type="radio"
                        value="0"
                      ></input>
                      Open
                    </a>
                    <a>
                      <input
                        name="call"
                        onChange={runPostRequest}
                        ref={close}
                        type="radio"
                        value="1"
                      ></input>
                      Closed
                    </a>
                  </div>
                </li>
                <li>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        <p className="filter">Event Type</p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="accordian-body">
                          <a>
                            <input
                              ref={feature}
                              onChange={runPostRequest}
                              type="checkbox"
                            ></input>
                            Feature Flim Festival
                          </a>
                          <a>
                            <input
                              ref={short}
                              onChange={runPostRequest}
                              type="checkbox"
                            ></input>{" "}
                            Short Film Festival
                          </a>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {" "}
                        <p className="filter">category</p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="accordian-body">
                          <a>
                            <input
                              value="Animation"
                              onChange={runPostRequest}
                              ref={Animation}
                              type="checkbox"
                            ></input>
                            Animation
                          </a>
                          <a>
                            <input
                              value="Documentary"
                              onChange={runPostRequest}
                              ref={Documentary}
                              type="checkbox"
                            ></input>
                            Documentary
                          </a>
                          <a>
                            <input
                              value="Experimental"
                              onChange={runPostRequest}
                              ref={Experimental}
                              type="checkbox"
                            ></input>
                            Experimental
                          </a>
                          <a>
                            <input
                              value="Feature"
                              onChange={runPostRequest}
                              ref={Feature}
                              type="checkbox"
                            ></input>
                            Feature
                          </a>
                          <a>
                            <input
                              value="Music Video"
                              onChange={runPostRequest}
                              ref={Music}
                              type="checkbox"
                            ></input>
                            Music Video
                          </a>
                          <a>
                            <input
                              value="Short"
                              onChange={runPostRequest}
                              ref={Short}
                              type="checkbox"
                            ></input>
                            Short
                          </a>
                          <a>
                            <input
                              value="Student"
                              onChange={runPostRequest}
                              ref={Student}
                              type="checkbox"
                            ></input>
                            Student
                          </a>
                          <a>
                            <input
                              value="Web / New Media"
                              onChange={runPostRequest}
                              ref={Web}
                              type="checkbox"
                            ></input>
                            Web / New Media
                          </a>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {" "}
                        <p className="filter">Entry Fees</p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="accordian-body">
                          <div className="range">
                            <div>
                              <p>0 $ </p>
                              <p>1000 $</p>
                            </div>
                            <TwoPointRangeSlider
                              range={setEntryFeesHandler}
                              postRequestSendHandler={runPostRequest}
                              dots={false}
                            />
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        <p className="filter">Year Running</p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="accordian-body">
                          <div className="range">
                            <div>
                              <p>0 Years </p>
                              <p>20 Years</p>
                            </div>
                            <TwoPointRangeSlider
                              range={setYearRunningHandler}
                              postRequestSendHandler={runPostRequest}
                              dots={true}
                            />
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {" "}
                        <p className="filter">Project Runtime</p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="accordian-body">
                          <div className="range">
                            <div>
                              <p className="center">Any</p>
                            </div>
                            <input
                              min="0"
                              onChange={runPostRequest}
                              ref={any}
                              max="120"
                              type="range"
                            ></input>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {" "}
                        <p className="filter">Country</p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="accordian-body">
                          <div className="range">
                            <div>{/* <p className="center">Any</p> */}</div>
                            <div className="region-country">
                              <div className="region">
                                <SelectAndOptionHTMLTag
                                  prop={regionNameHandler}
                                  option={Region}
                                />
                              </div>
                              <div className="country">
                                <SelectAndOptionHTMLTag
                                  prop={countryNameHandler}
                                  option={country}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        <p className="filter">Entry Deadline</p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="accordian-body">
                          <div className="range">
                            <div>{/* <p className="center">Any</p> */}</div>
                            <div className="region-country">
                              <div
                                className="calender"
                                onClick={() =>
                                  setIsCalendarDeadlineVisible(true)
                                }
                              >
                                <label htmlFor="festivalDate">
                                  Entry deadline <CalendarTodayIcon />
                                </label>
                                <input type="date" id="festivalDate"></input>
                              </div>
                              <CloseIcon />
                            </div>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
                <li>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {" "}
                        <p className="filter">Event Date</p>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className=" accordian-body">
                          <div className="range ">
                            <div></div>
                            <div className="region-country">
                              <div className="region">
                                <SelectAndOptionHTMLTag
                                  prop={setEventDateNameHandler}
                                  option={eventDate}
                                />
                              </div>
                              <div className="calender">
                                <label
                                  onClick={() =>
                                    setIsCalendarEventVisible(true)
                                  }
                                  htmlFor="festivalDate2"
                                >
                                  Event Date <CalendarTodayIcon />
                                </label>
                                <input type="date" id="festivalDate2"></input>
                              </div>
                              <CloseIcon />
                            </div>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </li>
              </ul>
            </div>
          </div>
          <button onClick={handlePopUpVisibility}>x</button>
        </div>
      </CategoryPopUpCard>
      {isCalendarDeadlineVisible && (
        <CalenderPopup
          handlePopUpVisibility={handleDeadlineCalendarVisibility}
          valueProp={setEntryDeadlineDateValueHandler}
        />
      )}
      {isCalendarEventVisible && (
        <CalenderPopup
          handlePopUpVisibility={handleEventCalendarVisibility}
          valueProp={setEventDateNameValueHandler}
        />
      )}
    </>
  );
};

export default CategoryPopup;
