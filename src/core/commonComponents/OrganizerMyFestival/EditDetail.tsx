import moment from "moment";
import React, { cloneElement, useEffect, useRef, useState } from "react";
import { getOrganizerFestival, postOrganizerFestival } from "../../Api/Api";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { countryArray } from "../../utils/countryList";
import CalenderPopup from "../DatePicker/CalenderPopup";
import SelectAndOptionHTMLTag from "../SelectAndOptionHTMLTag/SelectOptions";
//content
import review1 from "./../../../assets/images/organizer dashboard/review1.jpeg";
// var eventDescription=""

const Region = ["Inside", "Outside"];
const listingVisibility = ["Public", "Non-Public"];

export default function EditDetail() {
  const addOrganizerSection = useRef<HTMLDivElement | any>(null);
  const addOrganizerParent = useRef<HTMLDivElement>(null);
  const addVenueSection = useRef<HTMLDivElement>(null);
  const addVenueParent = useRef<HTMLDivElement>(null);
  const addDeadlineParent = useRef<HTMLDivElement>(null);
  const addDeadlineSection = useRef<HTMLDivElement>(null);
  const addCategoryParent = useRef<HTMLDivElement>(null);
  const addCategorySection = useRef<HTMLDivElement>(null);
  const addTagParent = useRef<HTMLDivElement>(null);
  const addTagSection = useRef<HTMLDivElement>(null);

  const eventLogo = useRef<any>(null);
  const imgLogo = useRef<any>();

  const oneField1 = useRef<any>();
  const oneField2 = useRef<any>();
  const oneField3 = useRef<any>();
  const oneField4 = useRef<any>();
  const oneField5 = useRef<any>();
  const oneField6 = useRef<any>();
  const oneField7 = useRef<any>();
  const oneField8 = useRef<any>();

  const rule_terms = useRef<any>();
  const address = useRef<any>();
  const city = useRef<any>();
  const country = useRef<any>();
  const email = useRef<any>();
  const phone = useRef<any>();
  const postalCode = useRef<any>();
  const state = useRef<any>();
  const website = useRef<any>();
  const addressSame = useRef<any>();
  const facebook = useRef<any>();
  const twitter = useRef<any>();
  const instagram = useRef<any>();

  const categorySearch = useRef<any>();
  const festivalFocus = useRef<any>();

  const oAddress = useRef<any>();
  const oCity = useRef<any>();
  const oState = useRef<any>();
  const oPostal = useRef<any>();

  const inputTag = useRef<HTMLInputElement>(null);

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
  const appendTag = (e: any, parentNode: any, ChildNode: any) => {
    var insertBeforeNde = e.target;
    var newClonedNode: any = ChildNode.cloneNode(true);
    newClonedNode.querySelectorAll(".deleteNode").forEach((element: any) => {
      element.addEventListener("click", (e: any) => {
        newClonedNode.remove();
      });
    });
    if (e.key == "Enter") {
      newClonedNode.querySelector(".pasteHtml").innerText =
        insertBeforeNde.value;
      parentNode?.insertBefore(newClonedNode, insertBeforeNde);
      e.target.value = "";
    }
  };
  //my festival logo
  // const { data, refetch: myFestivalRefetch } = useQuery(
  //   "Organizer-Festival",
  //   getOrganizerFestival,
  //   {
  //     refetchOnWindowFocus: false,
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //     onError: (error) => {},
  //   }
  // );
  //my festival post
  const { mutate: festivalPost } = useMutation(
    "Organizer-Festival",
    postOrganizerFestival,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {},
    }
  );

  const eventLogoHandler = () => {
    console.log("image change");
    eventLogo.current.src = URL.createObjectURL(imgLogo.current.files[0]);
  };

  const [regionName, setRegionName] = useState<any>("");
  const regionNameHandler = (value: any) => {
    setRegionName(value);
  };
  const [listing, setListing] = useState<any>("");
  const listingHandler = (value: any) => {
    setListing(value);
  };

  const [eventVenueCountry, setEventVenueCountry] = useState<any>("");
  const eventVenueCountryHandler = (value: any) => {
    setEventVenueCountry(value);
  };

  const [isCalendarDeadlineVisible, setIsCalendarDeadlineVisible] =
    useState<boolean>(false);
  const [openingDateValue, setOpeningDateValue] = useState<any>();
  const handleDeadlineCalendarVisibility = () => {
    setIsCalendarDeadlineVisible(false);
  };
  const setOpeningDateValueHandler = (value: any) => {
    setOpeningDateValue(value);
  };

  const [isNotificationDateVisible, setIsNotificationDateVisible] =
    useState<boolean>(false);
  const [notificationDateValue, setNotificationDateValue] = useState<any>();

  const handleNotificationDateVisibility = () => {
    setIsNotificationDateVisible(false);
  };

  const setNotificationDateDateValueHandler = (value: any) => {
    setNotificationDateValue(value);
  };

  const [isEventDateStartVisible, setIsEventDateStartVisible] =
    useState<boolean>(false);
  const [eventDateStartValue, setEventDateStartValue] = useState<any>();
  const handleEventDateStartVisibility = () => {
    setIsEventDateStartVisible(false);
  };
  const setEventDateStartDateValueHandler = (value: any) => {
    setEventDateStartValue(value);
  };

  const [isEventDateEndVisible, setIsEventDateEndVisible] =
    useState<boolean>(false);
  const [eventDateEndValue, setEventDateEndValue] = useState<any>();
  const handleEventDateEndVisibility = () => {
    setIsEventDateEndVisible(false);
  };
  const setEventDateEndDateValueHandler = (value: any) => {
    setEventDateEndValue(value);
  };

  const [hasSameAddress, setHasSameAddress] = useState<any>();
  const hasSameAddressHandler = () => {
    setHasSameAddress(addressSame.current.checked);
  };
  const [secondaryCountry, setSecondaryCountry] = useState<any>();
  const secondaryCountryHandler = (value: any) => {
    setSecondaryCountry(value);
  };

  //new

  const [eventOrganizer, setEventOrganizer] = useState<number>(1);
  const [eventVenue, setEventVenue] = useState<number>(1);
  const [entryDeadline, setEntryDeadline] = useState<number>(1);
  const [category, setCategory] = useState<number>(1);
  const [a, b] = useState<boolean>(true);

  /* *************************************************************************************** */

  // This method is used to submit edit festival form data
  const submittingData = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    console.log("formProps::::::::::: ", formProps);

    let newObj: any = {};
    for (let x in formProps) {
      newObj[x] = formProps[x];
    }
    console.log("newObj::: ", newObj);

    // Removing below type of event_organizer data and other index based data
    /*
    "event_organizer[0]name": "Shubham Singh",
    "event_organizer[0]title": "7579043857",
    "event_organizer[1]name": "Anshul",
    "event_organizer[1]title": "7845120147",
    */
    for (let x in newObj) {
      if (
        !x.includes("event_organizer[") &&
        !x.includes("event_venue[") &&
        !x.includes("entry_deadline[") &&
        !x.includes("category[")
      ) {
        newObj[x] = newObj[x];
      }
    }
    newObj = {
      ...newObj,
      event_organizer: eventOrganiserFormFields,
      event_venue: eventVenueFormFields,
      entry_deadline: entryDeadlineFormFields,
      category: categoryAndFeesFormFields,
      img: imgLogo?.current?.files[0],
    };
    console.log("newObj:::updated data ", newObj);

    const updatedFormData = new FormData();
    updatedFormData.append("query", JSON.stringify(newObj));
    festivalPost(updatedFormData);
  };
  /* *************************************************************************************** */

  // -------------------------------------------------------------------------
  // Handling Event Dynamic Form fields
  // ----------------------------------

  const addButtonStyle = {
    backgroundColor: "#1877F2",
    fontSize: "14px",
    fontWeight: 500,
    border: "none",
    outline: "none",
    borderRadius: "5px",
    marginLeft: "auto",
    color: "white",
    padding: "8px 22px",
  };

  const [eventOrganiserFormFields, setEventOrganiserFormFields] = useState<any>(
    [{ name: "", title: "" }]
  );

  const [eventVenueFormFields, setEventVenueFormFields] = useState<any>([
    {
      venue_name: "",
      address: "",
      city: "",
      state: "",
      postal_code: null,
      country: "",
    },
  ]);

  const [entryDeadlineFormFields, setEntryDeadlineFormFields] = useState<any>([
    { deadline: "", date: "" },
  ]);

  const [categoryAndFeesFormFields, setCategoryAndFeesFormFields] =
    useState<any>([
      {
        name: "",
        description: "",
        deadline: [
          {
            name: "",
            standard_fee: null,
            student_fees: null,
            gold_fees: null,
            silver_fees: null,
          },
        ],
        projectType: "",
        runtime: null,
        haspassword: false,
        password: "",
        student_project: false,
        project_origin: "",
      },
    ]);

  const handleEventDynamicFormData = (
    event: any,
    index: number,
    comesFrom: string,
    hasAnyAdditionalField: boolean = false
  ) => {
    console.log("[event.target.name]::: ", event.target.name);
    console.log("event.target.value::: ", event.target.value);
    console.log("comes from:::::::: ", comesFrom);
    console.log("index:::::::: ", index);

    if (comesFrom === "eventOrganiser") {
      let data = [...eventOrganiserFormFields];
      data[index][event.target.name] = event.target.value;
      setEventOrganiserFormFields(data);
    } else if (comesFrom === "eventVenue") {
      let data = [...eventVenueFormFields];
      data[index][event.target.name] = event.target.value;
      setEventVenueFormFields(data);
    } else if (comesFrom === "entryDeadline") {
      let data = [...entryDeadlineFormFields];
      data[index][event.target.name] = event.target.value;
      setEntryDeadlineFormFields(data);
    } else if (comesFrom === "eventCategory") {
      let data = [...categoryAndFeesFormFields];
      if (hasAnyAdditionalField)
        data[index]["deadline"][0][event.target.name] = event.target.value;
      else data[index][event.target.name] = event.target.value;

      setCategoryAndFeesFormFields(data);
    }
  };

  const addDynamicEventFields = (e: any, comesFrom: string) => {
    e.preventDefault();
    if (comesFrom === "eventOrganiser") {
      let object = {
        name: "",
        title: "",
      };
      setEventOrganiserFormFields([...eventOrganiserFormFields, object]);
    } else if (comesFrom === "eventVenue") {
      let object = {
        venue_name: "",
        address: "",
        city: "",
        state: "",
        postal_code: null,
        country: "",
      };
      setEventVenueFormFields([...eventVenueFormFields, object]);
    } else if (comesFrom === "entryDeadline") {
      let object = { deadline: "", date: "" };
      setEntryDeadlineFormFields([...entryDeadlineFormFields, object]);
    } else if (comesFrom === "eventCategory") {
      let object = {
        name: "",
        description: "",
        deadline: [
          {
            name: "",
            standard_fee: null,
            student_fees: null,
            gold_fees: null,
            silver_fees: null,
          },
        ],
        projectType: "",
        runtime: null,
        haspassword: false,
        password: "",
        student_project: false,
        project_origin: "",
      };
      setCategoryAndFeesFormFields([...categoryAndFeesFormFields, object]);
    }
  };

  const removeEventFields = (e: any, index: number, comesFrom: string) => {
    e.preventDefault();
    if (comesFrom === "eventOrganiser") {
      let data = [...eventOrganiserFormFields];
      data.splice(index, 1);
      setEventOrganiserFormFields(data);
    } else if (comesFrom === "eventVenue") {
      let data = [...eventVenueFormFields];
      data.splice(index, 1);
      setEventVenueFormFields(data);
    } else if (comesFrom === "entryDeadline") {
      let data = [...entryDeadlineFormFields];
      data.splice(index, 1);
      setEntryDeadlineFormFields(data);
    } else if (comesFrom === "eventCategory") {
      let data = [...categoryAndFeesFormFields];
      data.splice(index, 1);
      setCategoryAndFeesFormFields(data);
    }
  };

  useEffect(() => {
    if (eventOrganiserFormFields) {
      console.log("eventOrganiserFormFields::: ", eventOrganiserFormFields);
    }
    if (eventVenueFormFields) {
      console.log("eventVenueFormFields::: ", eventVenueFormFields);
    }
    if (entryDeadlineFormFields) {
      console.log("entryDeadlineFormFields::: ", entryDeadlineFormFields);
    }
    if (categoryAndFeesFormFields) {
      console.log("categoryAndFeesFormFields::: ", categoryAndFeesFormFields);
    }
  }, [
    eventOrganiserFormFields,
    eventVenueFormFields,
    entryDeadlineFormFields,
    categoryAndFeesFormFields,
  ]);

  // -------------------------------------------------------------------------

  return (
    <>
      {isCalendarDeadlineVisible && (
        <CalenderPopup
          handlePopUpVisibility={handleDeadlineCalendarVisibility}
          valueProp={setOpeningDateValueHandler}
        />
      )}
      {isNotificationDateVisible && (
        <CalenderPopup
          handlePopUpVisibility={handleNotificationDateVisibility}
          valueProp={setNotificationDateDateValueHandler}
        />
      )}
      {isEventDateStartVisible && (
        <CalenderPopup
          handlePopUpVisibility={handleEventDateStartVisibility}
          valueProp={setEventDateStartDateValueHandler}
        />
      )}
      {isEventDateEndVisible && (
        <CalenderPopup
          handlePopUpVisibility={handleEventDateEndVisibility}
          valueProp={setEventDateEndDateValueHandler}
        />
      )}
      {/* *************************************************************************************** */}
      <EditDetailWrapper onSubmit={(e: any) => submittingData(e)}>
        <div className="event">
          <div className="no">
            <div>1</div>
            <h2>Event Details</h2>
          </div>
          <div className="foam">
            <ul>
              <li>
                <p>Event Name</p>
                <input
                  name="event_name"
                  // defaultValue={data?.event_name}
                  ref={oneField1}
                  placeholder="Enter Event Name"
                  type="text"
                ></input>
              </li>
              <li>
                <p className="radio_title">Event Type</p>
                <div className="radio">
                  <div>
                    <input
                      name="event_type"
                      id="radio"
                      type="radio"
                      value="Feature Film Festival"
                    ></input>
                    <p>Feature Film Festival</p>
                  </div>
                  <div>
                    <input
                      name="event_type"
                      id="radio2"
                      type="radio"
                      value="Short Film Festival"
                    ></input>
                    <p>Short Film Festival</p>
                  </div>
                </div>
              </li>
              <li>
                <p>Logo</p>
                <div className="pic">
                  <div className="img">
                    <img
                      ref={eventLogo}
                      src={
                        // "http://3.89.138.204:3000/uploads/" + data?.event_logo
                        ""
                      }
                      alt="logo"
                    />
                  </div>
                  <div className="choose">
                    <p>
                      Upload a square image to represent your event . It must be
                      330px by 330px
                    </p>
                    <input
                      type="file"
                      ref={imgLogo}
                      onChange={eventLogoHandler}
                      id="choose_file"
                    ></input>
                    <label htmlFor="choose_file">Choose File</label>
                  </div>
                </div>
              </li>
              <li>
                <p>Year Running</p>
                <input
                  name="year_running"
                  type="text"
                  placeholder="Enter Year running"
                ></input>
              </li>
              <li>
                <p>Event Description</p>
                <textarea
                  name="event_description"
                  ref={oneField6}
                  placeholder="Enter Event Description"
                ></textarea>
              </li>
              <li>
                <p>Awards & Prizes</p>
                <textarea
                  name="award_prizes"
                  placeholder="Award and prizes"
                ></textarea>
              </li>
              <li>
                <p>Rules & Terms</p>
                <textarea
                  name="rule_terms"
                  placeholder="Rules and Terms and Conditions"
                ></textarea>
              </li>
              <li>
                <p>Event Organizer</p>
                <div className="add">
                  <div className="head">
                    <p>Name</p>
                    <p>Title</p>
                    <p>Action</p>
                  </div>

                  <div className="body">
                    {eventOrganiserFormFields.map(
                      (form: any, index: number) => {
                        return (
                          <div key={index}>
                            <div className="left dontPick">
                              <div className="half first_half">
                                <label className="label-sm" htmlFor="name">
                                  Name
                                </label>
                                <input
                                  id="name"
                                  className="eventName"
                                  name="name"
                                  placeholder="Please enter name"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventOrganiser"
                                    )
                                  }
                                  value={form.name}
                                ></input>
                              </div>
                              <div className="half">
                                <label className="label-sm" htmlFor="title">
                                  Title
                                </label>
                                <input
                                  name="title"
                                  id="title"
                                  className="eventTitle"
                                  placeholder="Please enter Title"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventOrganiser"
                                    )
                                  }
                                  value={form.title}
                                ></input>
                              </div>
                            </div>
                            {eventOrganiserFormFields?.length > 1 && (
                              <>
                                <div className="right delete-lg deleteNode">
                                  <i
                                    onClick={(event) =>
                                      removeEventFields(
                                        event,
                                        index,
                                        "eventOrganiser"
                                      )
                                    }
                                    className="ri-delete-bin-6-fill"
                                  ></i>
                                </div>
                              </>
                            )}

                            <button
                              type="button"
                              className="submit"
                              onClick={(event) =>
                                addDynamicEventFields(event, "eventOrganiser")
                              }
                              style={addButtonStyle}
                            >
                              Add Organizer
                            </button>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* *************************************************************************************** */}

        <div className="event">
          <div className="no">
            <div>2</div>
            <h2>Contact & Venue Information</h2>
          </div>
          <div className="foam">
            <ul>
              <li>
                <p>Contact Information</p>
                <div className="body">
                  <div className="full">
                    <label htmlFor="website">Website</label>
                    <input
                      name="website"
                      id="website"
                      placeholder="Enter your website name "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      id="email"
                      placeholder="Enter your email address "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="phone">Phone</label>
                    <input
                      name="phone"
                      id="phone"
                      type="number"
                      placeholder="Enter your phone number "
                    ></input>
                  </div>

                  <div className="full">
                    <label htmlFor="address">Address</label>
                    <textarea
                      name="address"
                      id="address"
                      placeholder="Enter your address "
                    ></textarea>
                  </div>
                  <div className="full">
                    <label htmlFor="city">City</label>
                    <input
                      name="city"
                      id="city"
                      placeholder="Enter your city "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="state">State</label>
                    <input
                      name="state"
                      id="state"
                      placeholder="Enter your state "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      name="postalCode"
                      id="postalCode"
                      ref={postalCode}
                      type="number"
                      placeholder="Enter your postal code "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="name">Country</label>
                    <SelectAndOptionHTMLTag
                      prop={regionNameHandler}
                      option={countryArray}
                    />
                  </div>
                </div>
              </li>
              <li>
                <p>Social Media</p>
                <div className="body">
                  <div className="full">
                    <label htmlFor="facebook">Facebook</label>
                    <input
                      name="facebook"
                      id="facebook"
                      placeholder="Enter your facebook id/url "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="instagram">Instagram</label>
                    <input
                      name="instagram"
                      id="name"
                      placeholder="Enter your Instagram id/url "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                      name="twitter"
                      id="twitter"
                      placeholder="Enter your Twitter id/url "
                    ></input>
                  </div>
                </div>
              </li>
              <li>
                <p className="radio_title">Submission address</p>
                <div className="radio">
                  <div>
                    <input
                      ref={addressSame}
                      onChange={hasSameAddressHandler}
                      id="radio"
                      type="checkbox"
                      value={addressSame?.current?.checked ? "true" : "false"}
                    ></input>
                    <p>My festival has a different submission address</p>
                  </div>
                </div>
              </li>
              <>
                <li style={{ display: hasSameAddress ? "flex" : "none" }}>
                  <p></p>
                  <div className="body">
                    <div className="full">
                      <label htmlFor="oaddress">Address</label>
                      <textarea
                        name="oaddress"
                        id="oaddress"
                        ref={oAddress}
                        placeholder="Enter your address "
                      ></textarea>
                    </div>
                    <div className="full">
                      <label htmlFor="ocity">City</label>
                      <input
                        name="ocity"
                        id="ocity"
                        ref={oCity}
                        placeholder="Enter your city "
                      ></input>
                    </div>
                    <div className="full">
                      <label htmlFor="ostate">State</label>
                      <input
                        id="ostate"
                        name="ostate"
                        ref={oState}
                        placeholder="Enter your state "
                      ></input>
                    </div>
                    <div className="full">
                      <label htmlFor="opostalCode">Postal</label>
                      <input
                        name="opostalCode"
                        id="opostalCode"
                        ref={oPostal}
                        placeholder="Enter your postal code "
                        type="number"
                      ></input>
                    </div>
                    <div className="full">
                      <label htmlFor="name" ref={twitter}>
                        Country
                      </label>
                      <SelectAndOptionHTMLTag
                        prop={secondaryCountryHandler}
                        option={Region}
                      />
                    </div>
                  </div>
                </li>
              </>
              <li>
                <p>Event Venue</p>

                <div className="add">
                  {eventVenueFormFields.map((form: any, index: number) => {
                    return (
                      <div key={index}>
                        <div className="head dontPick head_input">
                          <input
                            name="venue_name"
                            className="titleTwo"
                            placeholder="Enter Event Venue Name"
                            onChange={(event) =>
                              handleEventDynamicFormData(
                                event,
                                index,
                                "eventVenue"
                              )
                            }
                            value={form.venue_name}
                          ></input>

                          {eventVenueFormFields?.length > 1 && (
                            <i
                              onClick={(event) =>
                                removeEventFields(event, index, "eventVenue")
                              }
                              className="ri-delete-bin-6-line deleteNode"
                            ></i>
                          )}
                        </div>
                        <div className="body">
                          <div className="full_parent_div">
                            <div className="left tobottom">
                              <div className="full">
                                <label htmlFor="AddressTwo" className="label">
                                  Address
                                </label>
                                <textarea
                                  name="address"
                                  id="AddressTwo"
                                  className="AddressTwo"
                                  placeholder="Enter Event Venue Address"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventVenue"
                                    )
                                  }
                                  value={form.address}
                                ></textarea>
                              </div>

                              <div className="full">
                                <label htmlFor="CityTwo" className="label">
                                  City
                                </label>
                                <input
                                  name="city"
                                  id="CityTwo"
                                  className="CityTwo"
                                  placeholder="Enter your city name"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventVenue"
                                    )
                                  }
                                  value={form.city}
                                ></input>
                              </div>
                              <div className="full">
                                <label htmlFor="StateTwo" className="label">
                                  State
                                </label>
                                <input
                                  name="state"
                                  id="StateTwo"
                                  className="StateTwo"
                                  placeholder="Enter your state name"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventVenue"
                                    )
                                  }
                                  value={form.state}
                                ></input>
                              </div>
                              <div className="full">
                                <label
                                  htmlFor="PostalTwo"
                                  className="label"
                                  placeholder="Enter postal code"
                                >
                                  Postal Code
                                </label>
                                <input
                                  name="postal_code"
                                  id="PostalTwo"
                                  className="PostalTwo"
                                  placeholder="413520 "
                                  type="number"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventVenue"
                                    )
                                  }
                                  value={form.postal_code}
                                ></input>
                              </div>
                              <div className="full">
                                <label htmlFor="CountryTwo" className="label">
                                  Country
                                </label>
                                <select
                                  name="country"
                                  className="select-country CountryTwo"
                                  value={form.country}
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventVenue"
                                    )
                                  }
                                >
                                  {Region?.map((ele: any, i: number) => {
                                    return (
                                      <option key={i} id={ele}>
                                        {ele}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    className="submit"
                    onClick={(event) =>
                      addDynamicEventFields(event, "eventVenue")
                    }
                    style={addButtonStyle}
                  >
                    Add Another venue
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* *************************************************************************************** */}
        <div className="event">
          <div className="no">
            <div>3</div>
            <h2>Dates & Deadlines</h2>
          </div>
          <div className="foam">
            <ul>
              <li>
                <p>Opening date</p>

                {/* <input
                  name="opening_date"
                  value={moment(openingDateValue).format("YYYY-MM-DD")}
                  onClick={() => setIsCalendarDeadlineVisible(true)}
                  type="date"
                  placeholder="Enter Opening date "
                ></input> */}
                <input type="date" name="opening_date" />
              </li>
              <li>
                <p>Entry Deadline</p>
                <div className="add">
                  <div className="head">
                    <p>Deadline</p>
                    <p>Date</p>
                    <p>Action</p>
                  </div>
                  <div className="body">
                    {entryDeadlineFormFields.map((form: any, index: number) => {
                      return (
                        <div key={index}>
                          <div className="left dontPick">
                            <div className="half first_half">
                              <input
                                name="deadline"
                                className="deadlineThree"
                                placeholder={`Deadline Number ${index + 1}`}
                                onChange={(event) =>
                                  handleEventDynamicFormData(
                                    event,
                                    index,
                                    "entryDeadline"
                                  )
                                }
                                value={form.deadline}
                              ></input>
                            </div>
                            <div className="half">
                              <input
                                name="date"
                                className="dateThree"
                                type="date"
                                onChange={(event) =>
                                  handleEventDynamicFormData(
                                    event,
                                    index,
                                    "entryDeadline"
                                  )
                                }
                                value={form.date}
                              />
                            </div>
                          </div>
                          <div className="right delete-lg deleteNode">
                            {entryDeadlineFormFields?.length > 1 && (
                              <i
                                onClick={(event) =>
                                  removeEventFields(
                                    event,
                                    index,
                                    "entryDeadline"
                                  )
                                }
                                style={{ color: "red" }}
                                className="ri-delete-bin-6-fill"
                              ></i>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      className="submit"
                      onClick={(event) =>
                        addDynamicEventFields(event, "entryDeadline")
                      }
                      style={addButtonStyle}
                    >
                      Add Deadline
                    </button>
                  </div>
                </div>
              </li>

              <li>
                <p>Notification Date</p>
                {/* <input
                  name="notification_date"
                  value={moment(notificationDateValue).format("YYYY-MM-DD")}
                  onClick={() => setIsNotificationDateVisible(true)}
                  type="date"
                  placeholder="Enter Notification date "
                ></input> */}
                <input type="date" name="notification_date" />
              </li>

              <li>
                <p>Event Dates</p>

                <div className="sec3">
                  <div className="half first_half">
                    {/* <input
                      name="event_date_from"
                      value={eventDateStartValue}
                      onClick={() => setIsEventDateStartVisible(true)}
                      placeholder="Enter Event from date "
                    ></input> */}
                    <input type="date" name="event_date_from" />
                  </div>
                  <p>To</p>
                  <div className="half">
                    {/* <input
                      name="event_date_to"
                      value={eventDateEndValue}
                      onClick={() => setIsEventDateEndVisible(true)}
                      placeholder="Enter Event to date "
                    ></input> */}
                    <input type="date" name="event_date_to" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* ****************************************************************************************** */}
        <div className="event2">
          <div className="no">
            <div>4</div>
            <h2>Categories & Entry Fees</h2>
          </div>
          <div className="foam">
            <ul>
              <li>
                <p className="title">Event Organizer</p>
                <div className="add">
                  {categoryAndFeesFormFields.map((form: any, index: number) => {
                    return (
                      <div key={index}>
                        <div className="head dontPick head_input">
                          <input
                            name="name"
                            className="bridgeFour"
                            placeholder="Please Enter Category name"
                            onChange={(event) =>
                              handleEventDynamicFormData(
                                event,
                                index,
                                "eventCategory"
                              )
                            }
                            value={form.name}
                          ></input>

                          {categoryAndFeesFormFields?.length > 1 && (
                            <i
                              onClick={(event) =>
                                removeEventFields(event, index, "eventCategory")
                              }
                              className="ri-delete-bin-6-line deleteNode"
                            ></i>
                          )}
                        </div>
                        <div className="body">
                          <div className="full_parent_div">
                            <div className="left tobottom">
                              <div className="full">
                                <textarea
                                  name="description"
                                  className="categoryFour"
                                  id="name"
                                  placeholder="Please Enter Category Description"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventCategory"
                                    )
                                  }
                                  value={form.description}
                                ></textarea>
                              </div>
                            </div>
                            <div className="line">
                              <p className="blue">Deadline</p>
                              <p className="blue">Fees</p>
                            </div>
                            <div className="deadline">
                              <div className="left">
                                <p className="deadlineNameFour green">
                                  First Deadline
                                </p>
                              </div>
                              <div className="right">
                                <div>
                                  <ul>
                                    <li>
                                      <p>Event Name</p>
                                      <input
                                        className="stdFour"
                                        placeholder="Enter Event Deadline Name"
                                        type="text"
                                        name="name"
                                        onChange={(event) =>
                                          handleEventDynamicFormData(
                                            event,
                                            index,
                                            "eventCategory",
                                            true
                                          )
                                        }
                                        value={form.deadline[0].name}
                                      ></input>
                                    </li>
                                    <li>
                                      <p>Std.Fees</p>
                                      <input
                                        className="studentFour"
                                        placeholder="Standard Fee"
                                        type="number"
                                        name={`standard_fee`}
                                        onChange={(event) =>
                                          handleEventDynamicFormData(
                                            event,
                                            index,
                                            "eventCategory",
                                            true
                                          )
                                        }
                                        value={form.deadline[0].standard_fee}
                                      ></input>
                                    </li>
                                    <li>
                                      <p>Student Fees</p>
                                      <input
                                        className="studentFour"
                                        placeholder="Standard Fee"
                                        type="number"
                                        name="student_fees"
                                        onChange={(event) =>
                                          handleEventDynamicFormData(
                                            event,
                                            index,
                                            "eventCategory",
                                            true
                                          )
                                        }
                                        value={form.deadline[0].student_fees}
                                      ></input>
                                    </li>
                                    <li>
                                      <p>Gold Fees</p>
                                      <input
                                        name="gold_fees"
                                        className="goldFour"
                                        placeholder="Subject"
                                        type="number"
                                        onChange={(event) =>
                                          handleEventDynamicFormData(
                                            event,
                                            index,
                                            "eventCategory",
                                            true
                                          )
                                        }
                                        value={form.deadline[0].gold_fees}
                                      ></input>
                                    </li>
                                    <li>
                                      <p>Silver Fees</p>
                                      <input
                                        name="silver_fees"
                                        className="silverFour"
                                        placeholder="Subject"
                                        type="number"
                                        onChange={(event) =>
                                          handleEventDynamicFormData(
                                            event,
                                            index,
                                            "eventCategory",
                                            true
                                          )
                                        }
                                        value={form.deadline[0].silver_fees}
                                      ></input>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <p className="yellow">
                              Submission to this category must meet the criteria
                              to submit (optional)
                            </p>
                            <div className="middle">
                              <ul>
                                <li>
                                  <p>Project Type</p>
                                  <select
                                    name="projectType"
                                    className="select-country CountryTwo"
                                    onChange={(event) =>
                                      handleEventDynamicFormData(
                                        event,
                                        index,
                                        "eventCategory"
                                      )
                                    }
                                    value={form.projectType}
                                  >
                                    {Region?.map((ele: any, i: number) => {
                                      return (
                                        <option id={ele} key={i}>
                                          {ele}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </li>
                                <li>
                                  <p>Runtime</p>
                                  <input
                                    name="runtime"
                                    className="runtime"
                                    placeholder="Subject"
                                    type="number"
                                    onChange={(event) =>
                                      handleEventDynamicFormData(
                                        event,
                                        index,
                                        "eventCategory"
                                      )
                                    }
                                    value={form.runtime}
                                  ></input>
                                </li>
                                <li>
                                  <p className="p_left">Password</p>
                                  <div className="radio">
                                    <div>
                                      <input
                                        name="haspassword"
                                        className="password"
                                        id="radio"
                                        type="checkbox"
                                        onChange={(event) =>
                                          handleEventDynamicFormData(
                                            event,
                                            index,
                                            "eventCategory"
                                          )
                                        }
                                        value={form.haspassword}
                                      ></input>

                                      <p>
                                        Require Submitters to enter a password
                                        for this category
                                      </p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <p>Password</p>
                                  <input
                                    name="password"
                                    className="password enter-password"
                                    id="radio"
                                    type="text"
                                    onChange={(event) =>
                                      handleEventDynamicFormData(
                                        event,
                                        index,
                                        "eventCategory"
                                      )
                                    }
                                    value={form.password}
                                  ></input>
                                </li>
                                <li>
                                  <p className="p_left">Student Project</p>
                                  <div className="radio">
                                    <div>
                                      <input
                                        name="student_project"
                                        className="Student-Project"
                                        id="radio"
                                        type="checkbox"
                                        onChange={(event) =>
                                          handleEventDynamicFormData(
                                            event,
                                            index,
                                            "eventCategory"
                                          )
                                        }
                                        value={form.student_project}
                                      ></input>
                                      <p>
                                        Only Student Project Submitted to this
                                        category
                                      </p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <p>Project Origin</p>
                                  <select
                                    name="project_origin"
                                    className="select-country CountryTwo"
                                    onChange={(event) =>
                                      handleEventDynamicFormData(
                                        event,
                                        index,
                                        "eventCategory"
                                      )
                                    }
                                    value={form.project_origin}
                                  >
                                    {Region?.map((ele: any, i: number) => {
                                      return (
                                        <option key={i} id={ele}>
                                          {ele}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    className="submit"
                    onClick={(event) =>
                      addDynamicEventFields(event, "eventCategory")
                    }
                    style={addButtonStyle}
                  >
                    Add Category
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* ****************************************************************************************** */}
        <div className="event">
          <div className="no">
            <div>5</div>
            <h2>Additional Settings</h2>
          </div>
          <div className="foam foam2">
            <ul>
              <li>
                <p>Category Search</p>
                <div className="option">
                  <ul ref={categorySearch}>
                    <li>
                      <input
                        value="Animation"
                        name="category_search[]"
                        type="checkbox"
                      ></input>
                      <p>Animation</p>
                    </li>
                    <li>
                      <input
                        name="category_search[]"
                        value="Documentary"
                        type="checkbox"
                      ></input>
                      <p>Documentary</p>
                    </li>
                    <li>
                      <input
                        name="category_search[]"
                        value="Experimental"
                        type="checkbox"
                      ></input>
                      <p>Experimental</p>
                    </li>
                    <li>
                      <input
                        name="category_search[]"
                        value="Feature"
                        type="checkbox"
                      ></input>
                      <p>Feature</p>
                    </li>
                    <li>
                      <input
                        name="category_search[]"
                        value="Music Video"
                        type="checkbox"
                      ></input>
                      <p>Music Video</p>
                    </li>
                    <li>
                      <input
                        name="category_search[]"
                        value="Short"
                        type="checkbox"
                      ></input>
                      <p>Short</p>
                    </li>
                    <li>
                      <input
                        name="category_search[]"
                        value="Student"
                        type="checkbox"
                      ></input>
                      <p>Student</p>
                    </li>
                    <li>
                      <input
                        name="category_search[]"
                        value="Web / New Media"
                        type="checkbox"
                      ></input>
                      <p>Web / New Media</p>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <p>Festival Focus</p>
                <div className="option">
                  <ul ref={festivalFocus}>
                    <li>
                      <input
                        name="festival_focus[]"
                        value="Action / Adventure"
                        type="checkbox"
                      ></input>
                      <p>Action / Adventure</p>
                    </li>
                    <li>
                      <input
                        name="festival_focus[]"
                        value="Children"
                        type="checkbox"
                      ></input>
                      <p>Children</p>
                    </li>
                    <li>
                      <input
                        name="festival_focus[]"
                        value="Comedy"
                        type="checkbox"
                      ></input>
                      <p>Comedy</p>
                    </li>
                    <li>
                      <input
                        name="festival_focus[]"
                        value="Dance"
                        type="checkbox"
                      ></input>
                      <p>Dance</p>
                    </li>
                    <li>
                      <input
                        name="festival_focus[]"
                        value="Horror"
                        type="checkbox"
                      ></input>
                      <p>Horror</p>
                    </li>
                    <li>
                      <input
                        name="festival_focus[]"
                        value="Human Rights"
                        type="checkbox"
                      ></input>
                      <p>Human Rights</p>
                    </li>
                    <li>
                      <input
                        name="festival_focus[]"
                        value="Religious"
                        type="checkbox"
                      ></input>
                      <p>Religious</p>
                    </li>
                    <li>
                      <input
                        name="festival_focus[]"
                        value="Sci / Fantasy / Thriller"
                        type="checkbox"
                      ></input>
                      <p>Sci / Fantasy / Thriller</p>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <p>Search Terms</p>
                <div className="inputTags" ref={addTagParent}>
                  <div ref={addTagSection}>
                    <p className="pasteHtml">Enter</p>
                    <button type="button" className="deleteNode">
                      x
                    </button>
                  </div>
                  <input
                    ref={inputTag}
                    className="fixed_width"
                    onKeyDown={(e: any) => {
                      appendTag(e, addTagParent.current, addTagSection.current);
                    }}
                    type="text"
                  ></input>
                </div>
              </li>

              <li>
                <p>Listing visibility</p>
                <div style={{ maxWidth: "600px", width: "100%" }}>
                  <SelectAndOptionHTMLTag
                    prop={listingHandler}
                    option={listingVisibility}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button className="update">Update</button>
      </EditDetailWrapper>
    </>
  );
}

const EditDetailWrapper = styled.form`
  width: 100vw;
  background-color: var(--background);
  position: relative;
  padding-bottom: 20px;
  .select-country {
    height: 48px;
    border-radius: 10px;
    padding: 0 8px;
    width: 100%;
  }

  & > .event {
    max-width: var(--maxwidth2);
    width: 100vw;
    margin: auto;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: var(--shadow);
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
      width: 62%;
      display: flex;
      align-self: flex-end;
      flex-direction: column;
      padding-left: 0px;
      & > ul {
        list-style: none;
        & > li {
          display: flex;
          padding: 10px;

          & > p {
            margin-right: 50px;
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
          & > input {
            width: 100%;
            height: 50px;
            border-radius: 10px;
            border: 1px solid #bbb;
            background-color: inherit;
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
              & > input {
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
              height: 120px;
              max-width: 250px;
              border: 1px solid var(--theme);
              border-radius: 10px;
              overflow: hidden;
              position: relative;
              min-width: 120px;
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
          & > textarea {
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
              & > input {
                height: 50px;
                border: 2px solid #ccc;
                width: 100%;
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
                    & > input {
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
                    & > textarea {
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
              & > input {
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
              & > textarea {
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
          & > .sec3 {
            width: 100%;
            display: flex;
            & > .full,
            & > .half {
              display: flex;
              flex-direction: column;
              width: 100%;

              & > label {
                font-size: 14px;
                color: #999;
                font-weight: 400;
                padding-bottom: 5px;
              }
              & > input {
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
              & > textarea {
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
            & > p {
              font-size: 14px;
              font-weight: 600;
              color: #111;
              padding: 15px 8px 0 0;
              display: flex;
              /* align-items: center; */
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
          & > .option {
            width: 100%;
            border: 1px solid #ddd;
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
                & > input {
                  transform: scale(1.3);
                }
                & > p {
                  font-size: 14px;
                  color: #111;
                  font-weight: 600;
                }
              }
            }
          }
          .fixed_width {
            max-width: 600px;
          }
          & > .inputTags {
            width: 100%;
            height: 50px;
            border-radius: 10px;
            border: 1px solid #bbb;
            background-color: inherit;
            padding: 10px;
            max-width: 600px;
            display: flex;
            gap: 10px;
            overflow: auto;
            ::-webkit-scrollbar {
              height: 2px;
              background-color: #ccc;
            }
            ::-webkit-scrollbar-thumb {
              background-color: grey;
            }
            & > div {
              background-color: #64b5f6;
              border-radius: 10px;

              display: flex;
              gap: 10px;
              padding: 0px 8px;
              width: max-content;
              align-items: center;
              :nth-child(1) {
                border: 1px solid red;
                display: none;
              }
              button {
                font-size: 16px;
                font-weight: 600;
                border-radius: 50%;
                display: flex;
                height: 20px;
                width: 20px;
                padding-bottom: 2px;
                border: none;
                outline: none;
                align-items: center;
                justify-content: center;
                background-color: #0d47a1;
                color: #64b5f6;
              }
              p {
                color: black;
                font-size: 14px;
                font-weight: 600;
              }
            }
            & > input {
              border: none;
              outline: none;
              height: 100%;
              ::placeholder {
                font-size: 16px;
                color: #333;
              }
            }
          }
        }
      }
    }
    & > .foam2 {
      flex: 1;
      width: 80%;
      margin-left: auto !important ;
      margin-right: 0;
    }
  }
  & > .event2 {
    max-width: var(--maxwidth2);
    width: 100vw;
    margin: auto;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: var(--shadow);
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
      width: 70%;
      display: flex;
      align-self: flex-end;
      flex-direction: column;
      padding-left: 0px;
      & > ul {
        list-style: none;
        & > li {
          display: flex;
          padding: 10px;
          p {
            margin-right: 50px;
          }

          p.title {
            padding-right: 15px;
            width: 200px;
            font-size: 14px;
            font-weight: 600;
            color: #111;
            text-align: right;
            white-space: nowrap;
          }
          p.black {
            font-size: 14px;
            font-weight: 600;
            text-align: right;
            white-space: nowrap;
            color: #111;
          }
          p.blue {
            font-size: 14px;
            font-weight: 600;
            text-align: right;
            white-space: nowrap;

            color: var(--theme);
          }
          p.green {
            font-size: 14px;
            font-weight: 600;
            text-align: right;
            white-space: nowrap;
            color: green;
          }
          p.yellow {
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            color: #111;
            color: yellow;
          }
          & > .radio_title {
            margin-left: -40px;
          }
          & > input {
            width: 100%;
            height: 50px;
            border-radius: 10px;
            border: 1px solid #bbb;
            background-color: inherit;
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
              & > input {
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
          & > textarea {
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
              & > input {
                height: 50px;
                border: 2px solid #ccc;
                width: 100%;
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
                    & > input {
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
                    & > textarea {
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
              & > input {
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
              & > textarea {
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
          .line {
            height: 40px;
            background-color: #dae8fe;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            align-items: center;
            margin-bottom: 10px;
          }
          .deadline {
            padding: 5px;
            border: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            & > .left {
            }
            & > .right {
              width: 300px;
              align-items: flex-end;
              display: flex;
              & > div {
                width: max-content;
                margin-left: auto;
                & > ul {
                  list-style: none;
                  & > li {
                    display: flex;
                    padding: 2px;

                    & > p {
                      padding-right: 15px;
                      width: 200px;
                      font-size: 14px;
                      font-weight: 600;
                      color: #111;
                      text-align: right;
                      white-space: nowrap;
                      padding-top: 8px;
                    }

                    & > input {
                      width: 100%;
                      height: 40px;
                      border-radius: 10px;
                      border: 1px solid #bbb;
                      background-color: inherit;
                      padding: 10px;
                      ::placeholder {
                        font-size: 14px;
                        color: #111;
                      }
                    }
                  }
                }
              }
            }
          }
          .middle {
            max-width: 500px;
            margin: auto;
            & > ul {
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
                  padding-top: 8px;
                }

                & > input {
                  width: 100%;
                  height: 40px;
                  border-radius: 10px;
                  border: 1px solid #bbb;
                  background-color: inherit;
                  padding: 10px;
                  ::placeholder {
                    font-size: 14px;
                    color: #111;
                  }
                }
                & > .p_left {
                  margin-left: -70px;
                }
                & > .radio {
                  & > div {
                    display: flex;
                    padding: 5px;
                    & > input {
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
              }
            }
          }

          & > .sec3 {
            width: 100%;
            display: flex;
            & > .full,
            & > .half {
              display: flex;
              flex-direction: column;
              width: 100%;

              & > label {
                font-size: 14px;
                color: #999;
                font-weight: 400;
                padding-bottom: 5px;
              }
              & > input {
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
              & > textarea {
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
            & > p {
              font-size: 14px;
              font-weight: 600;
              color: #111;
              padding: 15px 8px 0 0;
              display: flex;
              /* align-items: center; */
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
        }
      }
    }
  }

  & > .update {
    width: max-content;
    padding: 8px 62px;
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
  .option > ul p {
    padding-bottom: 0 !important;
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
        padding-bottom: 12px;
      }
    }
    .option li {
      flex-direction: row !important;
    }
  }

  .delete-mb {
    display: none;
    padding: 6px 36px;
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: red;
    color: white;
    font-size: 16px;
    font-weight: 500;
    align-items: center;
    width: max-content;
  }
  .label-sm {
    display: none;
  }

  @media screen and (max-width: 550px) {
    .delete-mb {
      display: flex;
    }
    .delete-lg {
      display: none !important;
    }
    .label-sm {
      display: flex;
    }
    .add .head {
      display: none !important;
    }
    .add .head_input {
      display: flex !important;
    }
    .body > div .left {
      flex-direction: column !important;
      gap: 8px;
      .half {
        padding: 0 !important;
        width: 100% !important;
      }
    }
    .deadline {
      flex-direction: column !important;
      input {
        width: 100% !important;
      }
    }
    .deadline > .right {
      width: 100% !important;
    }
    .deadline > .right > div {
      margin-left: 0 !important;
      width: 100% !important;
    }
    .sec3 {
      flex-direction: column;
      .half {
        width: 100% !important;
      }
      p {
        padding: 12px 0 !important;
        text-align: center !important;
        width: max-content !important;
        display: flex !important;
        justify-content: center !important;
      }
    }
  }
  .option > ul {
    /* flex-direction: column; */
  }
`;
