import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { getOrganizerFestival, postOrganizerFestival } from "../../Api/Api";
import CalenderPopup from "../DatePicker/CalenderPopup";
import SelectAndOptionHTMLTag from "../SelectAndOptionHTMLTag/SelectOptions";

//content
import review1 from "./../../../assets/images/organizer dashboard/review1.jpeg";
// var eventDescription=""

const Region = ["Inside", "Outside"];

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
  const { data, refetch: myFestivalRefetch } = useQuery(
    "Organizer-Festival",
    getOrganizerFestival,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {},
    }
  );
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

  const test = () => {
    let eventOrganizer: any = [];

    addOrganizerParent.current?.childNodes.forEach((ele: any) => {
      if (ele.getElementsByClassName("dontPick")[0]) {
        eventOrganizer.push({
          name: ele.getElementsByClassName("eventName")[0]?.value,
          title: ele.getElementsByClassName("eventTitle ")[0]?.value,
        });
      }
    });
    // console.log(eventOrganizer);

    let eventVenue: any = [];
    addVenueParent.current?.childNodes.forEach((ele: any) => {
      if (ele.getElementsByClassName("dontPick")[0]) {
        eventVenue.push({
          bridge: ele.getElementsByClassName("titleTwo")[0]?.value,
          address: ele.getElementsByClassName("AddressTwo ")[0]?.value,
          city: ele.getElementsByClassName("CityTwo")[0]?.value,
          state: ele.getElementsByClassName("StateTwo")[0]?.value,
          postal: ele.getElementsByClassName("PostalTwo ")[0]?.value,
          country: ele.getElementsByClassName("CountryTwo ")[0]?.value,
        });
      }
    });
    // console.log(eventVenue);

    let eventDeadline: any = [];
    addDeadlineParent.current?.childNodes.forEach((ele: any) => {
      if (ele.getElementsByClassName("dontPick")[0]) {
        eventDeadline.push({
          deadline: ele.getElementsByClassName("deadlineThree")[0]?.value,
          date: ele.getElementsByClassName("dateThree ")[0]?.value,
        });
      }
    });
    // console.log(eventDeadline);

    let addCategory: any = [];
    addCategoryParent.current?.childNodes.forEach((ele: any) => {
      if (ele.getElementsByClassName("dontPick")[0]) {
        addCategory.push({
          name: ele.getElementsByClassName("bridgeFour")[0]?.value,
          description: ele.getElementsByClassName("categoryFour ")[0]?.value,
          deadline: [
            {
              description:
                ele.getElementsByClassName("deadlineNameFour ")[0]?.value,
              stdFour: ele.getElementsByClassName("stdFour ")[0]?.value,
              studentFour: ele.getElementsByClassName("studentFour ")[0]?.value,
              goldFour: ele.getElementsByClassName("goldFour ")[0]?.value,
              silverFour: ele.getElementsByClassName("silverFour ")[0]?.value,
            },
          ],
          projectType: ele.getElementsByClassName("select-country ")[0]?.value,
          runtime: ele.getElementsByClassName("runtime")[0]?.value,
          haspassword: ele.getElementsByClassName("password")[0]?.value,
          password: ele.getElementsByClassName("enter-password")[0]?.value,
          student_project:
            ele.getElementsByClassName("Student-Project")[0]?.value,
          project_origin:
            ele.getElementsByClassName("select-country")[1]?.value,
        });
      }
    });
    //  console.log(addCategory);

    const categorySearchArray: any = [];
    categorySearch.current.childNodes.forEach((ele: any) => {
      if (ele.childNodes[0].checked)
        return categorySearchArray.push(ele.childNodes[0].value);
    });

    const festivalFocusSearchArray: any = [];
    festivalFocus.current.childNodes.forEach((ele: any) => {
      if (ele.childNodes[0].checked)
        return festivalFocusSearchArray.push(ele.childNodes[0].value);
    });

    const searchTerm: any = [];
    addTagParent.current?.childNodes.forEach((ele: any, index, arr) => {
      if (index !== 0 && index < arr.length - 1) {
        return searchTerm.push(ele.childNodes[0].innerText);
      }
    });

    let formData = new FormData();

    festivalPost(formData);
  };

  const eventLogoHandler = () => {
    eventLogo.current.src = URL.createObjectURL(oneField4.current.files[0]);
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
  const [entryDeadlineDateValue, setOpeningDateValue] = useState<any>();
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

      <button
        onClick={test}
        style={{
          zIndex: "10",
          position: "fixed",
          top: "50%",
          left: "50%",
          padding: "10px",
          background: "blue",
        }}
      >
        click to test
      </button>
      <EditDetailWrapper>
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
                  defaultValue={data?.event_name}
                  ref={oneField1}
                  placeholder="E"
                  type="text"
                ></input>
              </li>
              <li>
                <p className="radio_title">Event Type</p>
                <div className="radio">
                  <div>
                    <input
                      ref={oneField2}
                      id="radio"
                      name="type"
                      type="radio"
                    ></input>
                    <p>Feature Film Festival</p>
                  </div>
                  <div>
                    <input
                      ref={oneField3}
                      id="radio2"
                      name="type"
                      type="radio"
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
                        "http://3.89.138.204:3000/uploads/" + data?.event_logo
                      }
                    />
                  </div>
                  <div className="choose">
                    <p>
                      Upload a square image to represent your event . It must be
                      330px by 330px
                    </p>
                    <input
                      type="file"
                      ref={oneField4}
                      onChange={eventLogoHandler}
                      id="choose_file"
                    ></input>
                    <label htmlFor="choose_file">Choose File</label>
                  </div>
                </div>
              </li>
              <li>
                <p>Year Running</p>
                <input ref={oneField5} placeholder="1" type="text"></input>
              </li>
              <li>
                <p>Event Description</p>
                <textarea
                  ref={oneField6}
                  placeholder="We enjoyed more than 🌟100🌟 international films, networking cocktails, masterclasses, panels and Q&A's.📽.

                                        Welcome to IMDb qualifying NEW YORK INDIE SHORTS AWARDS, TOP 30 most popular and 100 best reviewed festivals.

                                        Our main goal is to find talented filmmakers from all around the world who stand out for having something to communicate through art and help them promote their work.
                                        Some of our former contestants include Iggy Pop, Pauline Chalamet, Julie Pacino, Kevin Bacon, Oscar nominees Jude Law, Brenda Blethyn, Golden Globe winner Kyra Sedgwick and a new wave of talented directors like Student Academy Award Winners Akanksha Cruczynski, De’Onna “Tree” Young, Curry Sicong Tian, Pilar Garcia-Fernandezesma, Kristen Hwang, Murad Abu Eisheh, Simon Denda, Tribeca winning award director Peter Sluszka and so many more.

                                        You can submit your film in any of the Main Competitions and automatically your film will be considered for all Technical & Performance Categories with no extra cost and participate for Cash Prizes up to USD 6000 per year.
                                        You don’t need to pay any additional category fee! Just submit your film in any of the Main Competitions where you feel your project fits better.

                                        OFFICIAL SELECTION
                                        Once you submit your film, our international screeners team will watch and review your project. Quarterly, the highest scored films will become finalists and automatically will join the Official Selection with +100 films to be screened at our live event.
                                        The entire Official Selection films will receive the festival laurel. At the end of the live event we will announce all Main Competitions and Technical & Performance winners chosen by our industry jury.
                                        Winners will receive the corresponding Certificate of Achievement and Laurel.
                                        Moreover, we will announce the winner of the AUDIENCE CHOICE AWARD who will receive a cash prize.

                                        SEMIFINALISTS
                                        In addition, each quarter the festival will distinguish a selection of films as semifinalists. All semifinalist projects will be invited to be part of our online event and will receive the corresponding laurel.
                                        All films at our Online Event will participate for cash prizes and 3 Wild Card Invitations to the Live Event at the Cinépolis Chelsea, NY."
                ></textarea>
              </li>
              <li>
                <p>Awards & Prizes</p>
                <textarea ref={oneField7} placeholder="Message"></textarea>
              </li>
              <li>
                <p>Rules & Terms</p>
                <textarea ref={oneField8} placeholder="Message"></textarea>
              </li>
              <li>
                <p>Event Organizer</p>
                <div className="add">
                  <div className="head">
                    <p>Name</p>
                    <p>Title</p>
                    <p>Action</p>
                  </div>
                  <div className="body" ref={addOrganizerParent}>
                    <div ref={addOrganizerSection}>
                      <div className="left dontPick">
                        <div className="half first_half">
                          <label className="label-sm" htmlFor="email">
                            Name
                          </label>
                          <input
                            id="email"
                            className="eventName"
                            placeholder="Enter  Email id "
                          ></input>
                        </div>
                        <div className="half">
                          <label className="label-sm" htmlFor="mobile">
                            Name
                          </label>
                          <input
                            id="mobile"
                            className="eventTitle"
                            placeholder="Enter  Mobile No "
                          ></input>
                        </div>
                        <button className="delete-mb deleteNode">Delete</button>
                      </div>
                      <div className="right delete-lg deleteNode">
                        <i className="ri-delete-bin-6-fill"></i>
                      </div>
                    </div>

                    <button
                      className="submit"
                      onClick={(e: any) => {
                        appendNode(
                          e,
                          addOrganizerParent.current,
                          addOrganizerSection.current
                        );
                      }}
                    >
                      Add Organizer
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
                    <label htmlFor="name">Website</label>
                    <input
                      id="name"
                      ref={website}
                      placeholder="Enter your name "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="name">Email</label>
                    <input
                      id="name"
                      ref={email}
                      placeholder="Enter your name "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="name">Phone</label>
                    <input
                      id="name"
                      ref={phone}
                      placeholder="Enter your name "
                    ></input>
                  </div>

                  <div className="full">
                    <label htmlFor="name">Address</label>
                    <textarea
                      id="name"
                      ref={address}
                      placeholder="Enter your name "
                    ></textarea>
                  </div>
                  <div className="full">
                    <label htmlFor="name">City</label>
                    <input
                      id="name"
                      ref={city}
                      placeholder="Enter your name "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="name">State</label>
                    <input
                      id="name"
                      ref={state}
                      placeholder="Enter your name "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="name">Postal Code</label>
                    <input
                      id="name"
                      ref={postalCode}
                      placeholder="Enter your name "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="name">Country</label>
                    <SelectAndOptionHTMLTag
                      prop={regionNameHandler}
                      option={Region}
                    />
                  </div>
                </div>
              </li>
              <li>
                <p>Social Media</p>
                <div className="body">
                  <div className="full">
                    <label htmlFor="name">Facebook</label>
                    <input
                      id="name"
                      ref={facebook}
                      placeholder="Enter your name "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="name">Instagram</label>
                    <input
                      id="name"
                      ref={instagram}
                      placeholder="Enter your name "
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="name">Twitter</label>
                    <input
                      id="name"
                      ref={twitter}
                      placeholder="Enter your name "
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
                    ></input>
                    <p>My festival has a different submission address</p>
                  </div>
                </div>
              </li>
              {hasSameAddress && (
                <>
                  <li>
                    <p></p>
                    <div className="body">
                      <div className="full">
                        <label htmlFor="name">Address</label>
                        <textarea
                          id="name"
                          ref={oAddress}
                          placeholder="Enter your name "
                        ></textarea>
                      </div>
                      <div className="full">
                        <label htmlFor="name">City</label>
                        <input
                          id="name"
                          ref={oCity}
                          placeholder="Enter your name "
                        ></input>
                      </div>
                      <div className="full">
                        <label htmlFor="name">State</label>
                        <input
                          id="name"
                          ref={oState}
                          placeholder="Enter your name "
                        ></input>
                      </div>
                      <div className="full">
                        <label htmlFor="name">Postal</label>
                        <input
                          id="name"
                          ref={oPostal}
                          placeholder="Enter your name "
                        ></input>
                      </div>
                      <div className="full">
                        <label htmlFor="name" ref={twitter}>
                          State
                        </label>
                        <SelectAndOptionHTMLTag
                          prop={secondaryCountryHandler}
                          option={Region}
                        />
                      </div>
                    </div>
                  </li>
                </>
              )}
              <li>
                <p>Event Venue</p>
                <div className="add" ref={addVenueParent}>
                  <div ref={addVenueSection}>
                    <div className="head dontPick head_input">
                      <input
                        className="titleTwo"
                        id="titleTwo"
                        placeholder="Bridge Event"
                      ></input>
                      <i className="ri-delete-bin-6-line deleteNode"></i>
                    </div>
                    <div className="body">
                      <div className="full_parent_div">
                        <div className="left tobottom">
                          <div className="full">
                            <label htmlFor="AddressTwo" className="label">
                              Address
                            </label>
                            <textarea
                              id="AddressTwo"
                              className="AddressTwo"
                              placeholder="Nirmal Nagar Ausa "
                            ></textarea>
                          </div>
                          <div className="full">
                            <label htmlFor="CityTwo" className="label">
                              City
                            </label>
                            <input
                              id="CityTwo"
                              className="CityTwo"
                              placeholder="Ausa "
                            ></input>
                          </div>
                          <div className="full">
                            <label htmlFor="StateTwo" className="label">
                              State
                            </label>
                            <input
                              id="StateTwo"
                              className="StateTwo"
                              placeholder="Maharsatra "
                            ></input>
                          </div>
                          <div className="full">
                            <label htmlFor="PostalTwo" className="label">
                              Postal Code
                            </label>
                            <input
                              id="PostalTwo"
                              className="PostalTwo"
                              placeholder="413520 "
                            ></input>
                          </div>
                          <div className="full">
                            <label htmlFor="CountryTwo" className="label">
                              Country
                            </label>
                            <select className="select-country CountryTwo">
                              {Region?.map((ele: any) => {
                                return <option id={ele}>{ele}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="submit"
                    onClick={(e: any) => {
                      appendNode(
                        e,
                        addVenueParent.current,
                        addVenueSection.current
                      );
                    }}
                  >
                    Add Another venue
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="event">
          <div className="no">
            <div>3</div>
            <h2>Dates & Deadlines</h2>
          </div>
          <div className="foam">
            <ul>
              <li>
                <p>Opening date</p>
                <input
                  onClick={() => setIsCalendarDeadlineVisible(true)}
                  type="date"
                ></input>
              </li>
              <li>
                <p>Entry Deadline</p>
                <div className="add">
                  <div className="head">
                    <p>Deadline</p>
                    <p>Date</p>
                    <p>Action</p>
                  </div>
                  <div className="body" ref={addDeadlineParent}>
                    <div ref={addDeadlineSection}>
                      <div className="left dontPick">
                        <div className="half first_half">
                          <input
                            className="deadlineThree"
                            id="email"
                            placeholder="First Deadline "
                          ></input>
                        </div>
                        <div className="half">
                          <input className="dateThree" type="date"></input>
                        </div>
                        <button className="delete-mb deleteNode">Delete</button>
                      </div>
                      <div className="right delete-lg deleteNode">
                        <i
                          style={{ color: "red" }}
                          className="ri-delete-bin-6-fill"
                        ></i>
                      </div>
                    </div>

                    <button
                      className="submit"
                      onClick={(e: any) => {
                        appendNode(
                          e,
                          addDeadlineParent.current,
                          addDeadlineSection.current
                        );
                      }}
                    >
                      Add Deadline
                    </button>
                  </div>
                </div>
              </li>

              <li>
                <p>Notification Date</p>
                <input
                  onClick={() => setIsNotificationDateVisible(true)}
                  type="date"
                ></input>
              </li>

              <li>
                <p>Event Dates</p>

                <div className="sec3">
                  <div className="half first_half">
                    <input
                      onClick={() => setIsEventDateStartVisible(true)}
                      id="email"
                      placeholder="Enter  Email id "
                    ></input>
                  </div>
                  <p>To</p>
                  <div className="half">
                    <input
                      onClick={() => setIsEventDateEndVisible(true)}
                      id="mobile"
                      placeholder="Enter  Mobile No "
                    ></input>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="event2">
          <div className="no">
            <div>4</div>
            <h2>Categories & Entry Fees</h2>
          </div>
          <div className="foam">
            <ul>
              <li>
                <p className="title">Event Organizer</p>
                <div className="add" ref={addCategoryParent}>
                  <div ref={addCategorySection}>
                    <div className="head dontPick head_input">
                      <input
                        className="bridgeFour"
                        placeholder="Bridge Event"
                      ></input>
                      <i className="ri-delete-bin-6-line deleteNode"></i>
                    </div>
                    <div className="body">
                      <div className="full_parent_div">
                        <div className="left tobottom">
                          <div className="full">
                            <textarea
                              className="categoryFour"
                              id="name"
                              placeholder="Enter your name "
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
                                    placeholder="Subject"
                                    type="text"
                                  ></input>
                                </li>
                                <li>
                                  <p>Event Name</p>
                                  <input
                                    className="studentFour"
                                    placeholder="Subject"
                                    type="text"
                                  ></input>
                                </li>
                                <li>
                                  <p>Event Name</p>
                                  <input
                                    className="goldFour"
                                    placeholder="Subject"
                                    type="text"
                                  ></input>
                                </li>
                                <li>
                                  <p>Event Name</p>
                                  <input
                                    className="silverFour"
                                    placeholder="Subject"
                                    type="text"
                                  ></input>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* <div className="deadline" >
                                                    <div className="left">
                                                        <p className="green">First Deadline</p>
                                                    </div>
                                                    <div className="right">
                                                        <div>
                                                            <ul>
                                                                <li >
                                                                    <p>Event Name</p>
                                                                    <input placeholder="Subject" type="text"></input>
                                                                </li>
                                                                <li >
                                                                    <p>Event Name</p>
                                                                    <input placeholder="Subject" type="text"></input>
                                                                </li>
                                                                <li >
                                                                    <p>Event Name</p>
                                                                    <input placeholder="Subject" type="text"></input>
                                                                </li>
                                                                <li >
                                                                    <p>Event Name</p>
                                                                    <input placeholder="Subject" type="text"></input>
                                                                </li>
                                                    
                                                            </ul>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="deadline" >
                                                    <div className="left">
                                                        <p className="green">First Deadline</p>
                                                    </div>
                                                    <div className="right">
                                                        <div>
                                                            <ul>
                                                                <li >
                                                                    <p>Event Name</p>
                                                                    <input placeholder="Subject" type="text"></input>
                                                                </li>
                                                                <li >
                                                                    <p>Event Name</p>
                                                                    <input placeholder="Subject" type="text"></input>
                                                                </li>
                                                                <li >
                                                                    <p>Event Name</p>
                                                                    <input placeholder="Subject" type="text"></input>
                                                                </li>
                                                                <li >
                                                                    <p>Event Name</p>
                                                                    <input placeholder="Subject" type="text"></input>
                                                                </li>
                                                    
                                                            </ul>

                                                        </div>

                                                    </div>
                                                </div> */}
                        <p className="yellow">
                          Submission to this category must meet the criteria to
                          submit (optional)
                        </p>
                        <div className="middle">
                          <ul>
                            <li>
                              <p>Project Type</p>
                              <select className="select-country CountryTwo">
                                {Region?.map((ele: any) => {
                                  return <option id={ele}>{ele}</option>;
                                })}
                              </select>
                            </li>
                            <li>
                              <p>Runtime</p>
                              <input
                                className="runtime"
                                placeholder="Subject"
                                type="text"
                              ></input>
                            </li>
                            <li>
                              <p className="p_left">Password</p>
                              <div className="radio">
                                <div>
                                  <input
                                    className="password"
                                    id="radio"
                                    type="checkbox"
                                  ></input>
                                  <p>
                                    My festival has a different submission
                                    address
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li>
                              <p className="p_left">Password</p>
                              <div className="radio">
                                <div>
                                  <input
                                    className="password enter-password"
                                    id="radio"
                                    type="text"
                                  ></input>
                                  <p>
                                    My festival has a different submission
                                    address
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li>
                              <p className="p_left">Student Project</p>
                              <div className="radio">
                                <div>
                                  <input
                                    className="Student-Project"
                                    id="radio"
                                    type="checkbox"
                                  ></input>
                                  <p>
                                    My festival has a different submission
                                    address
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li>
                              <p>Project Origin</p>
                              <select className="select-country CountryTwo">
                                {Region?.map((ele: any) => {
                                  return <option id={ele}>{ele}</option>;
                                })}
                              </select>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="submit"
                    onClick={(e: any) => {
                      appendNode(
                        e,
                        addCategoryParent.current,
                        addCategorySection.current
                      );
                    }}
                  >
                    Add Category
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
                      <input value="Animation" type="checkbox"></input>
                      <p>Animation</p>
                    </li>
                    <li>
                      <input value="Documentary" type="checkbox"></input>
                      <p>Documentary</p>
                    </li>
                    <li>
                      <input value="Experimental" type="checkbox"></input>
                      <p>Experimental</p>
                    </li>
                    <li>
                      <input value="Feature" type="checkbox"></input>
                      <p>Feature</p>
                    </li>
                    <li>
                      <input value="Music Video" type="checkbox"></input>
                      <p>Music Video</p>
                    </li>
                    <li>
                      <input value="Short" type="checkbox"></input>
                      <p>Short</p>
                    </li>
                    <li>
                      <input value="Student" type="checkbox"></input>
                      <p>Student</p>
                    </li>
                    <li>
                      <input value="Web / New Media" type="checkbox"></input>
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
                      <input value="Action / Adventure" type="checkbox"></input>
                      <p>Action / Adventure</p>
                    </li>
                    <li>
                      <input value="Children" type="checkbox"></input>
                      <p>Children</p>
                    </li>
                    <li>
                      <input value="Comedy" type="checkbox"></input>
                      <p>Comedy</p>
                    </li>
                    <li>
                      <input value="Dance" type="checkbox"></input>
                      <p>Dance</p>
                    </li>
                    <li>
                      <input value="Horror" type="checkbox"></input>
                      <p>Horror</p>
                    </li>
                    <li>
                      <input value="Human Rights" type="checkbox"></input>
                      <p>Human Rights</p>
                    </li>
                    <li>
                      <input value="Religious" type="checkbox"></input>
                      <p>Religious</p>
                    </li>
                    <li>
                      <input
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
                    <button className="deleteNode">x</button>
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
                <p>Event Dates</p>
                <div style={{ maxWidth: "600px", width: "100%" }}>
                  <SelectAndOptionHTMLTag
                    prop={listingHandler}
                    option={Region}
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

const EditDetailWrapper = styled.div`
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
  .option > ul {
    /* flex-direction: column; */
  }
`;
