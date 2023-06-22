import React, { useEffect, useState, useRef } from "react";
import { FestivalWrapper, CategoryWrapper } from "./styled";
import moment from "moment";
import ReviewCard from "./ReviewCard";
import FilterPopup from "./CategoryPopup";
import noresult from "../../../../assets/images/viewfestivals/noresult.svg";
import { KeyboardArrowUp } from "@mui/icons-material";
import {
  reviewCardData,
  categoryData,
} from "../../../../core/constants/review-card-data";
import TwoPointRangeSlider from "../../../../core/commonComponents/Slider/Slider";
import SelectHTMLTag from "../../../../core/commonComponents/SelectOptions/SelectOptions";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "react-query";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getListAllFestivals } from "../../../../core/Api/Api";
import SelectAndOptionHTMLTag from "../../../../core/commonComponents/SelectAndOptionHTMLTag/SelectOptions";
import CalenderPopup from "../../../../core/commonComponents/DatePicker/CalenderPopup";

const FestivalContainer = () => {
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

  const searchInput = useRef<any>();

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
  const country = ["", "India", "Canada", "Nepal"];

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

  const handlePopUpVisibility = () => {
    setIsPopVisible(false);
  };
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
      <FestivalWrapper>
        <div>
          <div className="search">
            <div>
              <input
                placeholder="search festivals you wants to apply"
                ref={searchInput}
              ></input>
              <button onClick={runPostRequest} className="search_btn">
                Search
              </button>
              <button
                onClick={() => (searchInput.current.value = "")}
                className="clear_btn"
              >
                Clear search
              </button>
            </div>
          </div>
        </div>
      </FestivalWrapper>
      <CategoryWrapper>
        <div>
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
          <div className="right">
            <button
              onClick={() => {
                setIsPopVisible(true);
              }}
              className="filter"
            >
              Filter
            </button>
            <img src={noresult}></img>
            {/* {data?.count?.length} */}

            {/* {data.map((ele:any) => {
              return <ReviewCard  title={ele.result[0].event_name} location={ele.result[0].state} status={ele.result[0].event_name} deadline={ele.result[0].latestDeadline} time={ele.result[0].event_name} verified={ele.result[0].event_name} country={ele.result[0].country} id={ele.result[0].id} logo={ele.result[0].event_logo} />;
            })} */}
            {/* {reviewCardData.map((review) => {
              return <ReviewCard key={review.id} {...review} />;
            })} */}
            <div className="pagination">
              <div className="left">
                <h4>1 festivals</h4>
                <h4> Page 1/1</h4>
              </div>
              <div className="right">
                <h4>Prev Page</h4>
                <h4>Next Page</h4>
              </div>
            </div>
          </div>
        </div>
      </CategoryWrapper>
      {isPopVisible && (
        <FilterPopup
          handlePopUpVisibility={handlePopUpVisibility}
          searchInput={searchInput}
        />
      )}
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

export default FestivalContainer;
