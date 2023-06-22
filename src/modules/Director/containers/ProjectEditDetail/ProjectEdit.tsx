import React, { useState, useRef, cloneElement } from "react";
import styled from "styled-components";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
//content
import review1 from "./../../../../assets/images/organizer dashboard/review1.jpeg";
import CalenderPopup from "../../../../core/commonComponents/DatePicker/CalenderPopup";
import SelectAndOptionHTMLTag from "../../../../core/commonComponents/SelectAndOptionHTMLTag/SelectOptions";
import { useMutation, useQuery } from "react-query";
import {
  getDirectorMyProject,
  postDirectorProject,
} from "../../../../core/Api/Api";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import SelectOptionsApiValue from "../../../../core/commonComponents/SelectAndOptionHTMLTag/SelectOptionsApiValue";

const countryArray = ["", "asdasd", "asdasda", "asdasd"];
const genderArray = ["", "Male", "Female", "Other"];
export default function DirectorMyProjectEdit(propData: any) {
  const [a, b] = useState<any>(false);

  const appendNode = (e: any, parentNode: any, ChildNode: any) => {
    var insertBeforeNde = e.target;
    var newClonedNode: any = ChildNode.cloneNode(true);
    newClonedNode.querySelectorAll(".deleteNode").forEach((element: any) => {
      element.addEventListener("click", (e: any) => {
        newClonedNode.remove();
      });
    });
    parentNode?.insertBefore(newClonedNode, insertBeforeNde);
  };
  const appendNode2 = (e: any) => {
    var insertBeforeNde = e.target;
    var parentNode = e.target.parentNode;
    var newClonedNode: any = e.target.parentNode.childNodes[0].cloneNode(true);
    newClonedNode.querySelectorAll(".deleteNode").forEach((element: any) => {
      element.addEventListener("click", (e: any) => {
        newClonedNode.remove();
      });
    });
    parentNode?.insertBefore(newClonedNode, insertBeforeNde);
  };

  //get respective project
  const location = useLocation();

  const {
    data: project,
    isLoading,
    isFetching,
  } = useQuery(`aaa${location?.state?.exButton}`, getDirectorMyProject, {
    enabled: location?.state?.exButton == "edit",
    select: (res) => {
      const filter = res.filter(
        (ele: any) => ele._id == localStorage.getItem("projectId")
      );
      // console.log(genderArray.indexOf(filter[0]?.gender))
      console.log(
        moment(filter[0]?.screening[0]?.screeningdate).format("yyyy-MM-dd")
      );
      // console.log(filter[0]?.gender)
      return filter[0];
    },
    onError: (err) => {},
  });

  // --------------------------------------------------------------

  //event2
  //calendar
  const [calendarValue, setCalendarValue] = useState<any>("");
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const calendarHandler = () => {
    setIsCalendarVisible(false);
  };
  //HtmlSelectOptions
  const [countryValue, setCountryValue] = useState<string>("");

  const [genderValue, setGenderValue] = useState<string>("");

  //event3
  const aa = project?.creditinformation.map((ele: any) => {
    return { child: ele?.details?.length - 1 };
  });

  const [incrementLooping3, setIncrementLooping3] = useState<any>(
    project?.creditinformation.map((ele: any) => {
      return { child: ele?.details?.length - 1 };
    }) || [{ child: 0 }]
  );

  // console.log(incrementLooping4)
  // incrementLooping4.map((ele:any)=>{
  //    console.log(ele)
  // })

  // { child: Number(project?.creditinformation[1]?.details?.length-1)}
  // --------------

  const parentNodeDirectorEvent3 = useRef<any>();
  const childNodeDirectorEvent3 = useRef<any>();
  const parentNodeWritersEvent3 = useRef<any>();
  const childNodeWritersEvent3 = useRef<any>();
  const parentNodeProducersEvent3 = useRef<any>();
  const childNodeProducersEvent3 = useRef<any>();
  const parentNodeMainEvent3 = useRef<any>();
  const childNodeMainEvent3 = useRef<any>();

  const toClone = useRef<any>();

  //event 4
  //calendar
  const [completionCalendarValue, setCompletionCalendarValue] =
    useState<string>("");
  const [isCompletionCalendarVisible, setIsCompletionCalendarVisible] =
    useState<boolean>(false);
  const completionCalendarHandler = () => {
    setIsCompletionCalendarVisible(false);
  };

  //HtmlSelectOptions
  const [countryValue2, setCountryValue2] = useState<string>("");
  const [countryOriginValue2, setCountryOriginValue2] = useState<string>("");
  const colorArray = ["Color", "Black & White and Color", "Black & White"];
  const [colorValue, setColorValue] = useState<string>("");
  const studentProjectArray = ["", "Yes", "NO"];
  const [studentProjectValue, setStudentProjectValue] = useState<string>("");
  const firstFilmMakerArray = ["", "Yes", "NO"];
  const [firstFilmMakerValue, setFirstFilmMakerValue] = useState<string>("");

  // event 5
  const [incrementMainScrenning5, setIncrementMainScrenning5] =
    useState<number>(1);
  const [incrementMainDistributor5, setIncrementMainDistributor5] =
    useState<number>(1);

  const parentNodeDirectorEvent5 = useRef<any>();
  const childNodeDirectorEvent5 = useRef<any>();
  const parentNodeWritersEvent5 = useRef<any>();
  const childNodeWritersEvent5 = useRef<any>();

  const DistributorArray = ["", "Distributor", "Sales Agent"];
  const [countryValue5, setCountryValue5] = useState<string>("");

  //posting project

  const { mutate, data } = useMutation(
    "postDirectorProject",
    postDirectorProject,
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const postData = async (e: any) => {
    e.preventDefault();
    const data: any = [];
    const payload = new FormData(e.target);
    for (const key of payload.keys()) {
      console.log(key, payload.get(key));
    }
    payload.append("country", countryValue);
    payload.append("gender", genderValue);
    payload.append("completiondate", completionCalendarValue);
    payload.append("countryOfOrigin", countryOriginValue2);
    payload.append("countryOfFilming", countryValue2);
    payload.append("filmColor", colorValue);
    payload.append("_id", "0");
    payload.append(
      "studentproject",
      studentProjectValue == "Yes" ? "true" : "false"
    );
    payload.append(
      "firsttimefilmmaker",
      firstFilmMakerValue == "Yes" ? "true" : "false"
    );
    payload.append("dob", calendarValue);
    !payload.get("categoryType[]") && payload.append("categoryType[]", "");
    !payload.get("synopsis") && payload.append("synopsis", "");
    setRequiredField(true);
    mutate(payload);
  };

  //authentivcation required
  const [requiredField, setRequiredField] = useState<boolean>(false);

  return (
    <>
      {isCalendarVisible && (
        <CalenderPopup
          handlePopUpVisibility={calendarHandler}
          valueProp={setCalendarValue}
        />
      )}
      {isCompletionCalendarVisible && (
        <CalenderPopup
          handlePopUpVisibility={completionCalendarHandler}
          valueProp={setCompletionCalendarValue}
        />
      )}
      <ProjectEditWrapper>
        <form
          method="post"
          onSubmit={(e: any) => {
            postData(e);
          }}
        >
          <div className="event" style={{ marginTop: "80px" }}>
            <div className="no">
              <div>1</div>
              <h2>Project Information</h2>
            </div>
            <div className="foam">
              <ul>
                <li>
                  <p className="radio_title">Project Type</p>
                  <div className="radio">
                    <div>
                      <input
                        name="projectType"
                        defaultChecked
                        checked={project?.projectType == "Film / Video"}
                        value="Film / Video"
                        type="radio"
                      ></input>
                      <p>Film / Video</p>
                    </div>
                    <div>
                      <input
                        value="Feature Film"
                        name="projectType"
                        type="radio"
                        checked={project?.projectType == "Feature Film"}
                      ></input>
                      <p>Feature Film</p>
                    </div>
                    <div>
                      <input
                        value="Short Film"
                        name="projectType"
                        type="radio"
                        checked={project?.projectType == "Short Film"}
                      ></input>
                      <p>Short Film</p>
                    </div>
                  </div>
                </li>
                <li>
                  <p>Project Title</p>
                  <div className="input-para-wrapper">
                    <input
                      defaultValue={project?.projectTitle}
                      required={requiredField}
                      name="projectTitle"
                      placeholder="Enter Project Title"
                      type="text"
                    ></input>
                    <p className="para">Enter project title</p>
                  </div>
                </li>
                <li>
                  <p>Short Description</p>
                  <input
                    defaultValue={project?.synopsis}
                    placeholder="Enter Short Description About Project"
                    type="text"
                    name="synopsis"
                  ></input>
                </li>
                <li>
                  <p>Website</p>
                  <input
                    defaultValue={project?.website}
                    name="website"
                    placeholder="http://www.filmfestival.com"
                    type="text"
                  ></input>
                </li>
                <li>
                  <p>Twitter</p>
                  <input
                    defaultValue={project?.twitter}
                    name="twitter"
                    placeholder="twitter.com/filmfestival"
                    type="text"
                  ></input>
                </li>
                <li>
                  <p>Facebook</p>
                  <input
                    defaultValue={project?.facebook}
                    name="facebook"
                    placeholder="facebook.com/filmfestival"
                    type="text"
                  ></input>
                </li>
                <li>
                  <p>Instagram</p>
                  <input
                    defaultValue={project?.instagram}
                    name="instagram"
                    placeholder="instagram.com/filmfestival"
                    type="text"
                  ></input>
                </li>
              </ul>
            </div>
          </div>
          <div className="event">
            <div className="no">
              <div>2</div>
              <h2>Contact Information</h2>
            </div>
            <div className="foam">
              <ul>
                <li>
                  <p>Email</p>
                  <div className="input-para-wrapper">
                    <input
                      defaultValue={project?.email}
                      required={requiredField}
                      name="email"
                      placeholder="Enter Email Address"
                      type="text"
                    ></input>
                    <p className="para">Enter your Email</p>
                  </div>
                </li>
                <li>
                  <p>Phone </p>
                  <div className="input-para-wrapper">
                    <input
                      defaultValue={project?.phone}
                      required={requiredField}
                      name="phone"
                      placeholder="Enter Phone Number"
                      type="text"
                    ></input>
                    <p className="para">Enter Your Phone Number</p>
                  </div>
                </li>
                <li>
                  <p>Address</p>
                  <div className="input-para-wrapper">
                    <input
                      defaultValue={project?.address}
                      required={requiredField}
                      name="address"
                      placeholder="Enter Your Address"
                      type="text"
                    ></input>
                    <p className="para">Enter Your Address</p>
                  </div>
                </li>
                <li>
                  <p>City</p>
                  <div className="input-para-wrapper">
                    <input
                      defaultValue={project?.city}
                      required={requiredField}
                      name="city"
                      placeholder="Enter Your City"
                      type="text"
                    ></input>
                    <p className="para">Enter Your City</p>
                  </div>
                </li>
                <li>
                  <p>State</p>
                  <div className="input-para-wrapper">
                    <input
                      defaultValue={project?.state}
                      required={requiredField}
                      name="state"
                      placeholder="Enter Your State"
                      type="text"
                    ></input>
                    <p className="para">Enter Your State</p>
                  </div>
                </li>
                <li>
                  <p>PostalCode</p>
                  <div className="input-para-wrapper">
                    <input
                      defaultValue={project?.postalCode}
                      required={requiredField}
                      name="postalCode"
                      placeholder="Enter Your Postal Code"
                      type="text"
                    ></input>
                    <p className="para">Enter Your PostalCode</p>
                  </div>
                </li>
                <li>
                  <p>Country</p>
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid #999",
                      borderRadius: "10px",
                    }}
                  >
                    <SelectAndOptionHTMLTag
                      prop={setCountryValue}
                      option={countryArray}
                    />
                  </div>
                </li>
                <li>
                  <p>BirthDate</p>
                  <div
                    onClick={() => setIsCalendarVisible(true)}
                    style={{ maxWidth: "none" }}
                    className="global-calender-div"
                  >
                    <input
                      type="text"
                      value={calendarValue}
                      placeholder={
                        project?.dob &&
                        moment(project?.dob).format("YYYY-MM-DD")
                      }
                    ></input>
                    <CalendarTodayIcon />
                  </div>
                </li>
                <li>
                  <p>Gender</p>
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid #999",
                      borderRadius: "10px",
                    }}
                  >
                    <SelectOptionsApiValue
                      prop={setGenderValue}
                      option={genderArray}
                      preValue={genderArray.indexOf(project?.gender)}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="event3">
            <div className="no">
              <div>3</div>
              <h2>Credit Information</h2>
            </div>
            <div className="foam">
              {incrementLooping3?.map((ele: any, index: any) => {
                return cloneElement(
                  <>
                    <ul id={index}>
                      <div className="add">
                        <div className="head head_input">
                          <input
                            defaultValue={
                              project?.creditinformation[index]?.title
                            }
                            name={`creditinformation[${index}][title]`}
                            placeholder="Enter Credit Title"
                          ></input>
                          <i
                            onClick={(e: any) => {
                              if (index !== 0)
                                e.target.parentNode.parentNode.parentNode.remove();
                            }}
                            className="ri-delete-bin-6-line"
                          ></i>
                        </div>
                      </div>
                      <li>
                        <div className="add">
                          <div className="body">
                            <div>
                              <div className="left">
                                <div className="half first_half">
                                  <label htmlFor="email">Name </label>
                                  <div className="input-para-wrapper">
                                    <input
                                      defaultValue={
                                        project?.creditinformation[index]
                                          ?.details[0]?.name
                                      }
                                      required={requiredField}
                                      name={`creditinformation[${index}]details[${0}][name]`}
                                      id="email"
                                      placeholder="Enter Name of Person "
                                    ></input>

                                    <p className="para">Enter Your State</p>
                                  </div>
                                </div>
                                <div className="half">
                                  <label htmlFor="date">Credit </label>
                                  <div className="input-para-wrapper">
                                    <input
                                      defaultValue={
                                        project?.creditinformation[index]
                                          ?.details[0]?.credit
                                      }
                                      required={requiredField}
                                      name={`creditinformation[${index}]details[${0}][credit]`}
                                      type="text"
                                      placeholder="Enter Prior credit"
                                    ></input>

                                    <p className="para">Enter Your State</p>
                                  </div>
                                </div>
                              </div>
                              <div className="right">
                                <i
                                  style={{ color: "red" }}
                                  className="deleteNode ri-delete-bin-6-fill"
                                ></i>
                              </div>
                            </div>
                            {new Array(Number(ele?.child))
                              .fill("")
                              .map((_, childIndex: any) => {
                                return cloneElement(
                                  <>
                                    <div>
                                      <div className="left">
                                        <div className="half first_half">
                                          <label htmlFor="email">Name </label>
                                          <input
                                            defaultValue={
                                              project?.creditinformation[index]
                                                ?.details[childIndex + 1]?.name
                                            }
                                            name={`creditinformation[${index}]details[${
                                              childIndex + 1
                                            }][name]`}
                                            id="email"
                                            placeholder="Enter Name of Person "
                                          ></input>
                                        </div>
                                        <div className="half">
                                          <label
                                            htmlFor="date"
                                            onClick={() => {
                                              alert("io");
                                            }}
                                          >
                                            Credit{" "}
                                          </label>
                                          <input
                                            defaultValue={
                                              project?.creditinformation[index]
                                                ?.details[childIndex + 1]
                                                ?.credit
                                            }
                                            name={`creditinformation[${index}]details[${
                                              childIndex + 1
                                            }][credit]`}
                                            type="text"
                                            placeholder="Enter Prior credit"
                                          ></input>
                                        </div>
                                      </div>
                                      <div className="right">
                                        <i
                                          onClick={(e: any) =>
                                            e.target.parentNode.parentNode.remove()
                                          }
                                          style={{ color: "red" }}
                                          className="deleteNode ri-delete-bin-6-fill"
                                        ></i>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            <button
                              onClick={() => {
                                ele.child++;
                                b(!a);
                                console.log(ele.child);
                              }}
                              type="button"
                              className="submit"
                            >
                              Add a Person
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </>
                );
              })}
              <button
                onClick={() =>
                  setIncrementLooping3((pre: any) => [...pre, { child: 0 }])
                }
                type="button"
                style={{
                  display: "flex",
                  width: "max-content",
                  color: "white",
                  background: "#2db482",
                  padding: "12px 34px",
                  marginLeft: "auto",
                  alignItems: "center",
                  gap: "15px",
                  fontSize: "16px",
                  border: "none",
                  outline: "none",
                  borderRadius: "5px",
                }}
              >
                <AddIcon /> Add Credit
              </button>
            </div>
          </div>
          <div className="event">
            <div className="no">
              <div>4</div>
              <h2>Specification</h2>
            </div>
            <div className="foam foam2">
              <ul>
                <li>
                  <p>Project Type</p>
                  <div className="option">
                    <ul>
                      <li>
                        <input
                          checked={project?.categoryType?.includes("Animation")}
                          name="categoryType[]"
                          type="checkbox"
                          value="Animation"
                        ></input>
                        <p>Animation</p>
                      </li>
                      <li>
                        <input
                          checked={project?.categoryType?.includes(
                            "Documentary"
                          )}
                          name="categoryType[]"
                          type="checkbox"
                          value="Documentary"
                        ></input>
                        <p>Documentary</p>
                      </li>
                      <li>
                        <input
                          checked={project?.categoryType?.includes(
                            "Experimental"
                          )}
                          name="categoryType[]"
                          type="checkbox"
                          value="Experimental"
                        ></input>
                        <p>Experimental</p>
                      </li>
                      <li>
                        <input
                          checked={project?.categoryType?.includes("Feature")}
                          name="categoryType[]"
                          type="checkbox"
                          value="Feature"
                        ></input>
                        <p>Feature</p>
                      </li>
                      <li>
                        <input
                          checked={project?.categoryType?.includes(
                            "Music Video"
                          )}
                          name="categoryType[]"
                          type="checkbox"
                          value="Music Video"
                        ></input>
                        <p>Music Video</p>
                      </li>
                      <li>
                        <input
                          checked={project?.categoryType?.includes("Short")}
                          name="categoryType[]"
                          type="checkbox"
                          value="Short"
                        ></input>
                        <p>Short</p>
                      </li>
                      <li>
                        <input
                          checked={project?.categoryType?.includes("Students")}
                          name="categoryType[]"
                          type="checkbox"
                          value="Students"
                        ></input>
                        <p>Students</p>
                      </li>
                      <li>
                        <input
                          checked={project?.categoryType?.includes(
                            "Web / New media"
                          )}
                          name="categoryType[]"
                          type="checkbox"
                          value="Web / New media"
                        ></input>
                        <p>Web / New media</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <p>Genres</p>
                  <input
                    name="genres[]"
                    className="fixed_width"
                    placeholder="Enter Genres"
                    type="text"
                  ></input>
                </li>

                <li>
                  <p>Runtime</p>
                  <div
                    className="input-para-wrapper"
                    style={{ maxWidth: "600px" }}
                  >
                    <input
                      defaultValue={project?.runtime}
                      required={requiredField}
                      name="runtime"
                      className="fixed_width"
                      placeholder="Enter Project Runtime in Minutes "
                      type="number"
                    ></input>

                    <p className="para">Enter Your State</p>
                  </div>
                </li>
                <li>
                  <p>Completion Dates</p>
                  <div
                    onClick={() => setIsCompletionCalendarVisible(true)}
                    className="global-calender-div"
                  >
                    <input
                      value={completionCalendarValue}
                      placeholder={
                        project?.completiondate &&
                        moment(project?.completiondate).format("YYYY MM DD")
                      }
                    ></input>
                    <CalendarTodayIcon />
                  </div>
                </li>
                <li>
                  <p>Project Budget</p>
                  <div
                    className="input-para-wrapper"
                    style={{ maxWidth: "600px" }}
                  >
                    <input
                      defaultValue={project?.projectbugdget}
                      required={requiredField}
                      name="projectbugdget"
                      className="fixed_width"
                      placeholder="Enter Project Budget in INR"
                      type="text"
                    ></input>
                    <p className="para">Enter Your State</p>
                  </div>
                </li>
                <li>
                  <p>Country of Origin </p>
                  <div
                    className="input-para-wrapper"
                    style={{ maxWidth: "600px" }}
                  >
                    <div
                      style={{
                        maxWidth: "600px",
                        width: "100%",
                        border: "1px solid #999",
                        borderRadius: "10px",
                      }}
                    >
                      <SelectAndOptionHTMLTag
                        prop={setCountryValue2}
                        option={countryArray}
                      />
                    </div>
                    {requiredField && (
                      <p className="warning-para">Enter Country of Origin</p>
                    )}
                  </div>
                </li>
                <li>
                  <p>Country of filming </p>
                  <div
                    className="input-para-wrapper"
                    style={{ maxWidth: "600px" }}
                  >
                    <div
                      style={{
                        maxWidth: "600px",
                        width: "100%",
                        border: "1px solid #999",
                        borderRadius: "10px",
                      }}
                    >
                      <SelectAndOptionHTMLTag
                        prop={setCountryOriginValue2}
                        option={countryArray}
                      />
                    </div>
                    {requiredField && (
                      <p className="warning-para">Enter Country of Origin</p>
                    )}
                  </div>
                </li>
                <li>
                  <p>Language</p>
                  <div
                    className="input-para-wrapper"
                    style={{ maxWidth: "600px" }}
                  >
                    <input
                      defaultValue={project?.language}
                      required={requiredField}
                      name="language"
                      className="fixed_width"
                      placeholder="Enter Film Language"
                      type="text"
                    ></input>
                    <p className="para">Enter Your State</p>
                  </div>
                </li>
                <li>
                  <p>Shooting Format</p>
                  <div
                    className="input-para-wrapper"
                    style={{ maxWidth: "600px" }}
                  >
                    <input
                      defaultValue={project?.shootingFormat}
                      required={requiredField}
                      name="shootingFormat"
                      className="fixed_width"
                      placeholder="Digital, 35MM, Red, Etc.."
                      type="text"
                    ></input>
                    <p className="para">Enter Your State</p>
                  </div>
                </li>
                <li>
                  <p>Aspect Ratio</p>
                  <div
                    className="input-para-wrapper"
                    style={{ maxWidth: "600px" }}
                  >
                    <input
                      defaultValue={project?.aspectRatio}
                      required={requiredField}
                      name="aspectRatio"
                      className="fixed_width"
                      placeholder="16:9"
                      type="text"
                    ></input>
                    <p className="para">Enter Your State</p>
                  </div>
                </li>
                <li>
                  <p>Film Color</p>
                  <div
                    style={{
                      maxWidth: "600px",
                      width: "100%",
                      border: "1px solid #999",
                      borderRadius: "10px",
                    }}
                  >
                    <SelectOptionsApiValue
                      prop={setColorValue}
                      option={colorArray}
                      preValue={colorArray.indexOf(project?.filmColor)}
                    />
                  </div>
                </li>
                <li>
                  <p>Student Project</p>
                  <div
                    style={{
                      maxWidth: "600px",
                      width: "100%",
                      border: "1px solid #999",
                      borderRadius: "10px",
                    }}
                  >
                    <SelectOptionsApiValue
                      prop={setStudentProjectValue}
                      option={studentProjectArray}
                      preValue={project?.studentproject ? 1 : 2}
                    />
                  </div>
                </li>
                <li>
                  <p>First-time Filmmaker </p>
                  <div
                    style={{
                      maxWidth: "600px",
                      width: "100%",
                      border: "1px solid #999",
                      borderRadius: "10px",
                    }}
                  >
                    <SelectOptionsApiValue
                      prop={setFirstFilmMakerValue}
                      option={firstFilmMakerArray}
                      preValue={project?.firsttimefilmmaker ? 1 : 2}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="event">
            <div className="no">
              <div>5</div>
              <h2>Screening / Distribution</h2>
            </div>
            <div className="foam">
              <ul>
                <li>
                  <p className="title">Screening & Awards </p>
                  <div className="add" ref={parentNodeDirectorEvent5}>
                    {Array(incrementMainScrenning5)
                      .fill("")
                      .map((_, index: any) => {
                        return cloneElement(
                          <>
                            <div className="head+body">
                              <div className="head head_input">
                                <input
                                  defaultValue={
                                    project?.screening[index]?.event
                                  }
                                  name={`screening[${index}]event`}
                                  placeholder="Enter Event Title"
                                ></input>
                                <i className="deleteNode ri-delete-bin-6-line"></i>
                              </div>

                              <div className="body">
                                <ul className="short_ul">
                                  <li>
                                    <p>City</p>
                                    <input
                                      defaultValue={
                                        project?.screening[index]?.city
                                      }
                                      name={`screening[${index}]city`}
                                      placeholder="Enter Your City"
                                      type="text"
                                    ></input>
                                  </li>
                                  <li>
                                    <p>Country </p>
                                    <select
                                      defaultValue={
                                        project?.screening[index]?.country
                                      }
                                      name={`screening[${index}]country`}
                                      style={{
                                        outline: "none",
                                        width: "100%",
                                        padding: "13px",
                                        borderRadius: "10px",
                                        borderColor: "#999",
                                      }}
                                    >
                                      {countryArray.map((ele) => {
                                        return <option id={ele}>{ele}</option>;
                                      })}
                                    </select>
                                    {/* <SelectAndOptionHTMLTag prop={setDistributorValue5} option={DistributorArray}/> */}
                                  </li>
                                  <li>
                                    <p>Screening Date</p>
                                    <input
                                      defaultValue={moment(
                                        project?.screening[index]?.screeningdate
                                      ).format("YYYY-MM-DD")}
                                      name={`screening[${index}]screeningdate`}
                                      placeholder="Enter Screening Date"
                                      type="date"
                                    ></input>
                                  </li>
                                  <li>
                                    <p>Primier</p>
                                    <input
                                      defaultValue={
                                        project?.screening[index]?.premire
                                      }
                                      name={`screening[${index}]premire`}
                                      placeholder="Example: North Amarican Premier"
                                      type="text"
                                    ></input>
                                  </li>
                                  <li>
                                    <p>Award/Selection</p>
                                    <input
                                      defaultValue={
                                        project?.screening[index]?.award
                                      }
                                      name={`screening[${index}]award`}
                                      placeholder="Example: Official Selection"
                                      type="text"
                                    ></input>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </>
                        );
                      })}

                    <button
                      onClick={(e: any) =>
                        setIncrementMainScrenning5((count) => count + 1)
                      }
                      type="button"
                      className="submit_green"
                    >
                      <p>+</p> Add a Screening
                    </button>
                  </div>
                </li>
                <li>
                  <p className="title">Distribution Information </p>
                  <div className="add" ref={parentNodeWritersEvent5}>
                    {Array(incrementMainDistributor5)
                      .fill("")
                      .map((_, index: any) => {
                        return cloneElement(
                          <>
                            <div>
                              <div className="head head_input">
                                {/* <p style=>Distributor / Sales Agent</p> */}
                                <input
                                  defaultValue={
                                    project?.distributor[index]?.name
                                  }
                                  name={`distributor[${index}]name`}
                                  placeholder="Example: Netflix"
                                ></input>
                                <i className="deleteNode ri-delete-bin-6-line"></i>
                              </div>

                              <div className="body">
                                <ul className="short_ul">
                                  <li>
                                    <p>Distributor Type</p>
                                    <select
                                      defaultValue={
                                        project?.distributor[index]?.type
                                      }
                                      name={`distributor[${index}]type`}
                                      style={{
                                        outline: "none",
                                        width: "100%",
                                        padding: "13px",
                                        borderRadius: "10px",
                                        borderColor: "#999",
                                      }}
                                    >
                                      {DistributorArray.map((ele) => {
                                        return <option id={ele}>{ele}</option>;
                                      })}
                                    </select>
                                    {/* <SelectAndOptionHTMLTag
                                      prop={setDistributorValue5}
                                      option={DistributorArray}

                                    /> */}
                                  </li>
                                  <li>
                                    <p>Country </p>
                                    <select
                                      defaultValue={
                                        project?.distributor[index]?.country
                                      }
                                      name={`distributor[${index}]country`}
                                      style={{
                                        outline: "none",
                                        width: "100%",
                                        padding: "13px",
                                        borderRadius: "10px",
                                        borderColor: "#999",
                                      }}
                                    >
                                      {countryArray.map((ele) => {
                                        return <option id={ele}>{ele}</option>;
                                      })}
                                    </select>
                                    {/* <SelectAndOptionHTMLTag
                                      prop={setCountryValue5}
                                      option={countryArray}
                                    /> */}
                                  </li>
                                  <div className="media">
                                    <p>Media / Right</p>

                                    <ul>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("All Rights")}
                                          name={`distributor[${index}]media[]`}
                                          type="checkbox"
                                          value="All Rights"
                                        ></input>
                                        <p>All Rights</p>
                                      </li>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("Internet")}
                                          type="checkbox"
                                          name={`distributor[${index}]media[]`}
                                          value="Internet"
                                        ></input>
                                        <p>Internet</p>
                                      </li>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("Video on Demand")}
                                          type="checkbox"
                                          name={`distributor[${index}]media[]`}
                                          value="Video on Demand"
                                        ></input>
                                        <p>Video on Demand</p>
                                      </li>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("Pay per view")}
                                          type="checkbox"
                                          name={`distributor[${index}]media[]`}
                                          value="Pay per view"
                                        ></input>
                                        <p>Pay per view</p>
                                      </li>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("Theatrical")}
                                          type="checkbox"
                                          name={`distributor[${index}]media[]`}
                                          value="Theatrical"
                                        ></input>
                                        <p>Theatrical</p>
                                      </li>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("Video/Disc")}
                                          type="checkbox"
                                          name={`distributor[${index}]media[]`}
                                          value="Video/Disc"
                                        ></input>
                                        <p>Video/Disc</p>
                                      </li>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("Free Tv")}
                                          type="checkbox"
                                          name={`distributor[${index}]media[]`}
                                          value="Free Tv"
                                        ></input>
                                        <p>Free Tv</p>
                                      </li>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("Paid Tv")}
                                          type="checkbox"
                                          name={`distributor[${index}]media[]`}
                                          value="Paid Tv"
                                        ></input>
                                        <p>Paid Tv</p>
                                      </li>
                                      <li>
                                        <input
                                          checked={project?.distributor[
                                            index
                                          ]?.media?.includes("Console Device")}
                                          type="checkbox"
                                          name={`distributor[${index}]media[]`}
                                          value="Console Device"
                                        ></input>
                                        <p>Console Device</p>
                                      </li>
                                    </ul>
                                  </div>
                                </ul>
                              </div>
                            </div>
                          </>
                        );
                      })}

                    <button
                      onClick={() =>
                        setIncrementMainDistributor5((count) => count + 1)
                      }
                      type="button"
                      className="submit_green"
                    >
                      <p>+</p> Add a Distributor / Sales Agent
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <button type="submit" className="upate">
            Submit
          </button>
        </form>
      </ProjectEditWrapper>
    </>
  );
}

const ProjectEditWrapper = styled.div`
  & > form {
    width: 100vw;
    background-color: var(--background);
    position: relative;
    padding-bottom: 20px;
    & > .event {
      max-width: var(--maxwidth);
      width: 100vw;
      margin: auto;
      background-color: white;
      border-radius: 10px;
      margin-bottom: 10px;
      box-shadow: var(--shadow);
      @media screen and (max-width: 450px) {
        margin-left: 10px;
        margin-right: 10px;
        width: auto;
      }
      .media {
        width: 130%;
        margin-left: -20%;
        p {
          font-size: 16px;
          width: max-content !important;
        }
        input {
          width: 20px !important;
          height: 15px !important;
        }

        & > ul {
          width: 100%;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          & > li {
            width: 50%;
            justify-content: start;
            display: flex;
            align-items: center;
            gap: 10px;
            height: max-content;
          }
        }
      }

      .add {
        width: 100%;
        .head {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background-color: var(--theme);
          color: white;
          font-size: 14px;
          font-weight: 600;
          position: relative;
        }
        .head_input {
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          background-color: var(--theme);
          color: white;
          font-size: 14px;
          font-weight: 600;
          position: relative;
          input {
            height: 50px;
            border: 2px solid #ccc;
            width: 30%;
            border-radius: 10px;
            padding: 10px;
            ::placeholder {
              color: #111;
            }
          }
          & > i {
            font-size: 25px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            font-weight: 500;
          }
        }
        .body {
          border: 1px solid #ccc;
          padding: 10px;
          padding-right: 0;

          & > div {
            display: flex;
            padding-bottom: 10px;
            justify-content: space-between;
            & > .left {
              position: relative;
              display: flex;
              flex: 1;

              & > .full,
              & > .half {
                display: flex;
                flex-direction: column;
                width: 100%;

                & > label {
                  font-size: 14px;
                  color: #333;
                  font-weight: 600;
                  padding-bottom: 5px;
                }
                input {
                  width: 100%;
                  padding: 14px 8px;
                  border-radius: 10px;
                  border: 1px solid #999;
                  ::placeholder {
                    color: #333;
                    font-size: 14px;
                    font-weight: 500;
                  }
                  &:focus {
                    outline: 2px solid var(--theme);
                    border: none;
                  }
                }
                textarea {
                  width: 100%;
                  margin-bottom: 12px;
                  padding: 5px 10px;
                  border-radius: 10px;
                  border: 1px solid #999;
                  min-height: 140px;
                  ::placeholder {
                    color: #333;
                    font-size: 14px;
                    font-weight: 500;
                  }
                  &:focus {
                    outline: 2px solid var(--theme);
                    border: none;
                  }
                }

                & > .submit {
                  width: max-content;
                  align-self: center;
                  display: flex;
                  align-items: center;
                  padding: 20px 25px;
                  background-color: var(--theme);
                  height: 36px;
                  font-size: 14px;
                  line-height: 24px;
                  color: var(--heading1);
                  outline: none;
                  border: none;
                  font-weight: 600;
                  border-radius: 5px;
                  color: white;
                  text-decoration: none;
                }
              }

              & > .half {
                display: flex;
                flex-direction: column;
                width: 50%;
              }
              & > .first_half {
                padding-right: 5px;
              }
            }
            & > .tobottom {
              flex-direction: column;
              .label {
                padding: 8px 0;
              }
            }

            & > .right {
              width: 80px;
              display: flex;
              align-self: center;
              justify-content: center;
              font-size: 25px;
            }
          }
          & > .full_parent_div {
            flex-direction: column;
            padding-right: 10px;
          }
          & > .submit {
            width: max-content;
            padding: 8px 22px;
            align-items: center;
            display: flex;
            color: white;
            background-color: var(--theme);
            font-size: 14px;
            font-weight: 500;
            border: none;
            outline: none;
            border-radius: 5px;
            margin-left: auto;

            & > i {
              padding-right: 20px;
              font-size: 20px;
              font-weight: 700;
              color: white;
            }
          }
        }
        & > .submit {
          width: max-content;
          padding: 8px 22px;
          align-items: center;
          display: flex;
          color: white;
          background-color: var(--theme);
          font-size: 14px;
          font-weight: 500;
          border: none;
          outline: none;
          border-radius: 5px;
          margin-left: auto;
          margin-top: 10px;

          & > i {
            padding-right: 20px;
            font-size: 20px;
            font-weight: 700;
            color: white;
          }
        }
      }
      & > .no {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        & > div {
          padding: 12px 20px;
          border-radius: 50%;
          background-color: var(--theme);
          color: white;
          font-size: 20px;
          font-weight: 600;
        }
        & > h2 {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }
      }
      & > .foam {
        margin-left: auto;
        width: 88%;
        display: flex;
        align-self: flex-end;
        flex-direction: column;
        padding-left: 0px;
        border-radius: 010px;
        ul {
          list-style: none;
          & > li {
            display: flex;
            padding: 5px;

            & > p {
              padding-right: 15px;
              width: 200px;
              font-size: 14px;
              font-weight: 600;
              color: #111;
              text-align: right;
              white-space: nowrap;
            }
            & > .radio_title {
              margin-left: -40px;
            }
            input {
              width: 100%;
              height: 50px;
              border-radius: 10px;
              border: 1px solid #bbb;
              background-color: white;
              padding: 10px;
              ::placeholder {
                font-size: 16px;
                color: #333;
              }
            }
            & > .radio {
              & > div {
                display: flex;
                padding: 5px;
                align-items: center;
                gap: 20px;
                input {
                  height: 18px;
                  width: 18px;
                }
                & > p {
                  padding-left: 15px;
                  width: 200px;
                  font-size: 14px;
                  font-weight: 600;
                  color: #111;
                  white-space: nowrap;
                }
              }
            }
            & > .pic {
              display: flex;
              gap: 10px;
              & > .img {
                height: 150px;
                width: 170px;
                border: 1px solid var(--theme);
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                & > img {
                  height: 100%;
                  width: 100%;
                  object-fit: cover;
                }
              }
              & > .choose {
                display: flex;
                flex-direction: column;
                gap: 10px;
                & > p {
                  font-size: 14px;
                  font-weight: 5400;
                  color: #333;
                }
                & > input {
                  display: none;
                }
                & > label {
                  padding: 8px 22px;
                  background-color: var(--theme);
                  color: white;
                  font-weight: 600;
                  width: max-content;
                  border-radius: 5px;
                }
              }
            }
            textarea {
              width: 100%;
              height: 200px;
              border-radius: 10px;
              border: 1px solid #aaa;
              background-color: inherit;
              padding: 10px;
              ::placeholder {
                font-size: 16px;
                color: #333;
              }
            }
            & > .add {
              width: 100%;
              & > .head {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                background-color: var(--theme);
                color: white;
                font-size: 14px;
                font-weight: 600;
                position: relative;
              }
              & > .head_input {
                display: flex;
                justify-content: space-between;
                padding: 5px 10px;
                background-color: var(--theme);
                color: white;
                font-size: 14px;
                font-weight: 600;
                position: relative;
                input {
                  height: 50px;
                  border: 2px solid #ccc;
                  width: 35%;
                  border-radius: 10px;
                  padding: 10px;
                  ::placeholder {
                    color: #111;
                  }
                }
                & > i {
                  font-size: 25px;
                  padding: 0 10px;
                  display: flex;
                  align-items: center;
                  font-weight: 500;
                }
              }
              & > .body {
                border: 1px solid #ccc;
                padding: 10px;
                padding-right: 0;

                & > div {
                  display: flex;
                  padding-bottom: 10px;
                  justify-content: space-between;
                  & > .left {
                    position: relative;
                    display: flex;
                    flex: 1;

                    & > .full,
                    & > .half {
                      display: flex;
                      flex-direction: column;
                      width: 100%;

                      & > label {
                        font-size: 14px;
                        color: #333;
                        font-weight: 600;
                        padding-bottom: 5px;
                      }
                      input {
                        width: 100%;
                        padding: 14px 8px;
                        border-radius: 10px;
                        border: 1px solid #999;
                        ::placeholder {
                          color: #333;
                          font-size: 14px;
                          font-weight: 500;
                        }
                        &:focus {
                          outline: 2px solid var(--theme);
                          border: none;
                        }
                      }
                      textarea {
                        width: 100%;
                        margin-bottom: 12px;
                        padding: 5px 10px;
                        border-radius: 10px;
                        border: 1px solid #999;
                        min-height: 140px;
                        ::placeholder {
                          color: #333;
                          font-size: 14px;
                          font-weight: 500;
                        }
                        &:focus {
                          outline: 2px solid var(--theme);
                          border: none;
                        }
                      }

                      & > .submit {
                        width: max-content;
                        align-self: center;
                        display: flex;
                        align-items: center;
                        padding: 20px 25px;
                        background-color: var(--theme);
                        height: 36px;
                        font-size: 14px;
                        line-height: 24px;
                        color: var(--heading1);
                        outline: none;
                        border: none;
                        font-weight: 600;
                        border-radius: 5px;
                        color: white;
                        text-decoration: none;
                      }
                    }

                    & > .half {
                      display: flex;
                      flex-direction: column;
                      width: 50%;
                    }
                    & > .first_half {
                      padding-right: 5px;
                    }
                  }
                  & > .tobottom {
                    flex-direction: column;
                    .label {
                      padding: 8px 0;
                    }
                  }

                  & > .right {
                    width: 80px;
                    display: flex;
                    align-self: center;
                    justify-content: center;
                    font-size: 25px;
                  }
                }
                & > .full_parent_div {
                  flex-direction: column;
                  padding-right: 10px;
                }
                & > .submit {
                  width: max-content;
                  padding: 8px 22px;
                  align-items: center;
                  display: flex;
                  color: white;
                  background-color: var(--theme);
                  font-size: 14px;
                  font-weight: 500;
                  border: none;
                  outline: none;
                  border-radius: 5px;
                  margin-left: auto;

                  & > i {
                    padding-right: 20px;
                    font-size: 20px;
                    font-weight: 700;
                    color: white;
                  }
                }
              }
              & > .submit {
                width: max-content;
                padding: 8px 22px;
                align-items: center;
                display: flex;
                color: white;
                background-color: var(--theme);
                font-size: 14px;
                font-weight: 500;
                border: none;
                outline: none;
                border-radius: 5px;
                margin-left: auto;
                margin-top: 10px;

                & > i {
                  padding-right: 20px;
                  font-size: 20px;
                  font-weight: 700;
                  color: white;
                }
              }
            }
            & > .body {
              width: 100%;
              position: relative;
              & > .full,
              & > .half {
                display: flex;
                flex-direction: column;
                width: 100%;

                & > label {
                  font-size: 14px;
                  color: #111;
                  font-weight: 600;
                  padding-bottom: 8px;
                }
                input {
                  width: 100%;
                  margin-bottom: 12px;
                  padding: 14px 8px;
                  border-radius: 10px;
                  border: 1px solid #999;
                  ::placeholder {
                    color: #333;
                    font-size: 14px;
                    font-weight: 500;
                  }
                  &:focus {
                    outline: 2px solid var(--theme);
                    border: none;
                  }
                }
                textarea {
                  width: 100%;
                  margin-bottom: 12px;
                  padding: 5px 10px;
                  border-radius: 10px;
                  border: 1px solid #999;
                  min-height: 140px;
                  ::placeholder {
                    color: #333;
                    font-size: 14px;
                    font-weight: 500;
                  }
                  &:focus {
                    outline: 2px solid var(--theme);
                    border: none;
                  }
                }

                & > .submit {
                  width: max-content;
                  align-self: center;
                  display: flex;
                  align-items: center;
                  padding: 20px 25px;
                  background-color: var(--theme);
                  height: 36px;
                  font-size: 14px;
                  line-height: 24px;
                  color: var(--heading1);
                  outline: none;
                  border: none;
                  font-weight: 600;
                  border-radius: 5px;
                  color: white;
                  text-decoration: none;
                }
              }

              & > .half {
                display: flex;
                flex-direction: column;
                width: 50%;
              }
              & > .first_half {
                padding-right: 10px;
              }
            }

            .option {
              width: 100%;
              position: relative;
              padding: 15px 10px;
              & > ul {
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                gap: 20px;
                & > li {
                  width: 30%;
                  display: flex;
                  gap: 10px;
                  align-items: center;
                  input {
                    width: 20px;
                    transform: scale(1.3);
                  }
                  & > p {
                    font-size: 14px;
                    color: #111;
                    font-weight: 600;
                    text-align: left;
                  }
                }
              }
            }
            & > .fixed_width {
              max-width: 600px;
            }
          }
        }
        .short_ul {
          width: 70%;
          margin: auto;
        }
      }
      & > .foam2 {
        flex: 1;
        width: 80%;
        margin-left: auto !important ;
        margin-right: 0;
      }
    }

    & > .event3 {
      max-width: var(--maxwidth);
      width: 100vw;
      margin: auto;
      background-color: white;
      border-radius: 10px;
      margin-bottom: 10px;
      box-shadow: var(--shadow);
      position: relative;
      @media screen and (max-width: 450px) {
        margin-left: 10px;
        margin-right: 10px;
        width: auto;
      }
      .add {
        width: 100%;
        & > .head {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background-color: var(--theme);
          color: white;
          font-size: 14px;
          font-weight: 600;
          position: relative;
        }
        & > .head_input {
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          background-color: var(--theme);
          color: white;
          font-size: 14px;
          font-weight: 600;
          position: relative;
          input {
            height: 50px;
            border: 2px solid #ccc;
            width: 30%;
            border-radius: 10px;
            padding: 10px;
            ::placeholder {
              color: #111;
            }
          }
          & > i {
            font-size: 25px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            font-weight: 500;
          }
        }
      }
      & > .no {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        & > div {
          padding: 12px 20px;
          border-radius: 50%;
          background-color: var(--theme);
          color: white;
          font-size: 20px;
          font-weight: 600;
        }
        & > h2 {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }
      }
      & > .foam {
        margin: auto;
        width: 82%;
        display: flex;
        align-self: flex-end;
        flex-direction: column;
        padding-left: 0px;
        & > ul {
          list-style: none;
          border-radius: 10px;
          overflow: hidden;
          & > li {
            display: flex;
            padding-bottom: 20px;

            & > .add {
              width: 100%;

              & > .body {
                border: 1px solid #ccc;
                padding: 10px;
                padding-right: 0;

                & > div {
                  display: flex;
                  padding-bottom: 10px;
                  justify-content: space-between;
                  & > .left {
                    position: relative;
                    display: flex;
                    flex: 1;

                    & > .full,
                    & > .half {
                      display: flex;
                      flex-direction: column;
                      width: 100%;

                      & > label {
                        font-size: 14px;
                        color: #333;
                        font-weight: 600;
                        padding-bottom: 5px;
                      }
                      input {
                        width: 100%;
                        padding: 14px 8px;
                        border-radius: 10px;
                        margin-bottom: 20px;
                        border: 1px solid #999;
                        ::placeholder {
                          color: #333;
                          font-size: 14px;
                          font-weight: 500;
                        }
                        &:focus {
                          outline: 2px solid var(--theme);
                          border: none;
                        }
                      }
                    }

                    & > .half {
                      display: flex;
                      flex-direction: column;
                      width: 50%;
                    }
                    & > .first_half {
                      padding-right: 5px;
                    }
                  }
                  & > .tobottom {
                    flex-direction: column;
                    .label {
                      padding: 8px 0;
                    }
                  }

                  & > .right {
                    width: 80px;
                    display: flex;
                    align-self: center;
                    justify-content: center;
                    font-size: 25px;
                  }
                }
                & > .full_parent_div {
                  flex-direction: column;
                  padding-right: 10px;
                }
                & > .submit {
                  width: max-content;
                  padding: 8px 22px;
                  align-items: center;
                  display: flex;
                  color: white;
                  background-color: white;
                  font-size: 14px;
                  color: var(--theme);
                  font-weight: 500;
                  border: none;
                  outline: none;
                  border-radius: 5px;
                  margin-left: auto;
                }
              }
              .submit {
                width: max-content;
                padding: 8px 28px;
                align-items: center;
                display: flex;
                color: white;
                background-color: #2db482;
                font-size: 14px;
                font-weight: 500;
                border: none;
                outline: none;
                border-radius: 5px;
                margin-left: auto;
                margin-top: 10px;
                gap: 10px;
                & > p {
                  font-size: 22px;
                }

                & > i {
                  padding-right: 20px;
                  font-size: 20px;
                  font-weight: 700;
                  color: white;
                }
              }
            }
          }
        }
      }
    }

    & > .upate {
      width: max-content;
      padding: 8px 32px;
      align-items: center;
      display: flex;
      color: white;
      background-color: var(--theme);
      font-size: 14px;
      font-weight: 500;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px auto 00px auto;

      & > i {
        padding-right: 20px;
        font-size: 20px;
        font-weight: 700;
        color: white;
      }
    }

    .submit_green {
      width: max-content;
      padding: 8px 28px;
      align-items: center;
      display: flex;
      color: white;
      background-color: #2db482;
      font-size: 14px;
      font-weight: 500;
      border: none;
      outline: none;
      border-radius: 5px;
      margin-left: auto;
      margin-top: 10px;
      gap: 10px;
      & > p {
        font-size: 22px;
      }

      & > i {
        padding-right: 20px;
        font-size: 20px;
        font-weight: 700;
        color: white;
      }
    }
    .jFQGOK {
      border: 1px solid #ccc;
      border-radius: 10px;
    }
    .MuiFormControl-root {
      margin: 0 !important;
    }
    @media screen and (max-width: 900px) {
      .foam {
        width: 100% !important;
      }
    }
    @media screen and (max-width: 550px) {
      .foam li {
        flex-direction: column !important;
        p {
          text-align: left !important;
          margin-left: 0 !important;
          width: max-content !important;
          padding-right: 0 !important ;
          white-space: pre-wrap !important;
          width: auto !important;
          padding: 5px 0 !important;
        }
      }
      .option li {
        flex-direction: row !important;
      }
    }
  }
`;
