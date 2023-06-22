import { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getOrganizerFestival, postOrganizerFestival } from "../../Api/Api";
import { useMutation, useQuery } from "react-query";
import { countriesList } from "../../utils/countryList";
import MultiValueClearableInput from "./MultiValueClearableField";
import { validateEditFestivalForm } from "../../utils/EditFestivalFormValidation";

// -------------------------------------------------------------------------------------
const UpdatedEditDetails = () => {
  const navigate = useNavigate();

  const addMore_ButtonStyle = {
    backgroundColor: "#1877F2",
    fontSize: "14px",
    fontWeight: 500,
    border: "none",
    outline: "none",
    borderRadius: "5px",
    color: "white",
    padding: "8px 22px",
    marginRight: "10px",
  };

  const formErrorMsg = {
    fontSize: "14px",
    color: "red",
    width: "83%",
    display: "flex",
    justifyContent: "space-evenly",
  };

  // Component's Local useRefs variables
  // ====================================

  const addressSame = useRef<any>(false);
  const imgLogo = useRef<any>();
  const eventName = useRef<any>();
  const eventLogo = useRef<any>();
  const yearRunning = useRef<any>();
  const eventDescription = useRef<any>();
  const eventAwardPrizes = useRef<any>();
  const eventRulesAndRegulations = useRef<any>();
  const contactWebsite = useRef<any>();
  const contactEmail = useRef<any>();
  const contactNumber = useRef<any>();
  const contactAddress = useRef<any>();
  const contactCity = useRef<any>();
  const contactState = useRef<any>();
  const contactPostalCode = useRef<any>();
  const facebook = useRef<any>();
  const instagram = useRef<any>();
  const twitter = useRef<any>();
  const otherAddress = useRef<any>();
  const otherCity = useRef<any>();
  const otherState = useRef<any>();
  const otherPostalCode = useRef<any>();
  const openingDate = useRef<any>();
  const notificationDate = useRef<any>();
  const eventFromDate = useRef<any>();
  const eventToDate = useRef<any>();

  useEffect(() => {
    console.log("eventLogo::: ", eventLogo);
    console.log("imgLogo::: ", imgLogo);
  }, [eventLogo, imgLogo]);

  // Component's Local States
  // ========================
  const Region = ["Inside", "Outside"];
  const listingVisibility = ["Public", "Non-Public"];
  const [isSubmissionAddressDifferent, setIsSubmissionAddressDifferent] =
    useState<boolean>(false);
  const [editFestivalFormData, setEditFestivalFormData] = useState<any>({});
  const [searchTermsValues, setSearchTermValues] = useState<any>([]);
  const [categorySearchValues, setCategorySearchvalues] = useState<any>([
    { value: "Animation", checked: false },
    { value: "Documentary", checked: false },
    { value: "Experimental", checked: false },
    { value: "Feature", checked: false },
    { value: "Music Video", checked: false },
    { value: "Short", checked: false },
    { value: "Student", checked: false },
    { value: "Web / New Media", checked: false },
  ]);
  const [festivalFocusValues, setFestivalFocusValues] = useState<any>([
    { value: "Action / Adventure", checked: false },
    { value: "Children", checked: false },
    { value: "Comedy", checked: false },
    { value: "Dance", checked: false },
    { value: "Horror", checked: false },
    { value: "Human Rights", checked: false },
    { value: "Religious", checked: false },
    { value: "Sci-fi / Fantasy / Thriller", checked: false },
  ]);
  const [eventTypeSelected, setEventTypeSelected] = useState<any>(
    "Feature Film Festivals"
  );

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
  const [selectedSearchTermsValues, setSelectedSearchTermsValues] =
    useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [otherSelectedCountry, setOtherSelectedCountry] = useState<any>("");
  // ----------------------- Form Validation -----------------------
  const [formErrors, setFormErrors] = useState<any>({}); // Used to store form errors.
  const [isFormSubmit, setIsFormSubmit] = useState<boolean>(false);
  const [completeFormData, setCompleteFormData] = useState<any>({});

  // -------------------- Data Fetching/Posting From API - Section Start Here--------------------
  // Fetch Festival Details for form prefilling
  const { data, refetch: myFestivalRefetch } = useQuery(
    "Organizer-Festival",
    getOrganizerFestival,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data) setEditFestivalFormData(data);
      },
      onError: (error) => {},
    }
  );

  // Edit Festival API Calling Method
  const { mutate: festivalPost } = useMutation(
    "Organizer-Festival",
    postOrganizerFestival,
    {
      onSuccess: (data) => {
        alert("Details Updated Successfully");
        navigate("/organizer/dashboard");
      },
      onError: (error) => {},
    }
  );
  // -------------------- Data Fetching/Posting From API - Section End Here --------------------

  // Multiple Checkboxes Selection -- Code Start
  const handleMultipleCheckboxesSelection = (event: any, comesFrom: string) => {
    const isChecked = event.target.checked;
    const checkboxValue = event.target.value;
    const data =
      comesFrom === "categorySearch"
        ? [...categorySearchValues]
        : [...festivalFocusValues];

    if (isChecked) {
      data.map((ele: any) => {
        if (ele.value === checkboxValue) ele.checked = true;
        return ele;
      });
      comesFrom === "categorySearch"
        ? setCategorySearchvalues(data)
        : setFestivalFocusValues(data);
    } else {
      data.map((ele: any) => {
        if (ele.value === checkboxValue) ele.checked = false;
        return ele;
      });
      comesFrom === "categorySearch"
        ? setCategorySearchvalues(data)
        : setFestivalFocusValues(data);
    }
  };
  // Multiple Checkboxes Selection -- Code Finish

  const eventLogoHandler: any = () =>
    (eventLogo.current.src = URL.createObjectURL(imgLogo.current.files[0]));

  // ----------------- Edit Festival Form Prefilling -- Code Start -----------------
  useEffect(() => {
    if (editFestivalFormData) {
      console.log("editFestivalFormData::: ", editFestivalFormData);
      eventName.current.value = editFestivalFormData.event_name || ""; // Set Event name value
      setEventTypeSelected(editFestivalFormData.event_type); // Set Event type radio button value
      yearRunning.current.value = editFestivalFormData.year_running || ""; // Set Year Running Value
      eventDescription.current.value =
        editFestivalFormData.event_description || ""; // Set Event Description value
      eventAwardPrizes.current.value = editFestivalFormData.award_prizes || ""; // Set Event Awards and Prizes Value
      eventRulesAndRegulations.current.value =
        editFestivalFormData.rule_terms || ""; // Set Event Rules value

      // Set Event Organiser Form Fields
      if (editFestivalFormData?.event_organizer?.length > 0)
        setEventOrganiserFormFields(editFestivalFormData?.event_organizer);

      // Set Event Venue Form Fields
      if (editFestivalFormData?.event_venue?.length > 0)
        setEventVenueFormFields(editFestivalFormData?.event_venue);

      // Set Entry Deadline Form Fields
      if (editFestivalFormData?.entry_deadline?.length > 0) {
        const updatedData = editFestivalFormData?.entry_deadline.map(
          (ele: any) => {
            return {
              deadline: ele?.deadline,
              date: ele?.date.toString().slice(0, 10),
            };
          }
        );
        setEntryDeadlineFormFields(updatedData);
      }
      // Set Event Category and Fees Form Fields
      if (editFestivalFormData?.category?.length > 0)
        setCategoryAndFeesFormFields(editFestivalFormData?.category);
    }
    if (editFestivalFormData?.search_terms?.length > 0) {
      setSelectedSearchTermsValues(editFestivalFormData?.search_terms);
    }

    contactWebsite.current.value = editFestivalFormData.website || "";
    contactEmail.current.value = editFestivalFormData.email || "";
    contactNumber.current.value = editFestivalFormData.phone || "";
    contactAddress.current.value = editFestivalFormData.address || "";
    contactCity.current.value = editFestivalFormData.city || "";
    contactState.current.value = editFestivalFormData.state || "";
    contactPostalCode.current.value = editFestivalFormData.postalCode || "";
    facebook.current.value = editFestivalFormData.facebook || "";
    instagram.current.value = editFestivalFormData.instagram || "";
    twitter.current.value = editFestivalFormData.twitter || "";
    otherAddress.current.value = editFestivalFormData.oaddress || "";
    otherCity.current.value = editFestivalFormData.ocity || "";
    otherState.current.value = editFestivalFormData.ostate || "";
    otherPostalCode.current.value = editFestivalFormData.opostalCode || "";
    openingDate.current.value = editFestivalFormData.opening_date
      ? editFestivalFormData.opening_date?.toString().slice(0, 10)
      : "";
    notificationDate.current.value = editFestivalFormData.notification_date
      ? editFestivalFormData.notification_date?.toString().slice(0, 10)
      : "";
    eventFromDate.current.value = editFestivalFormData.event_date_from
      ? editFestivalFormData.event_date_from?.toString().slice(0, 10)
      : "";
    eventToDate.current.value = editFestivalFormData.event_date_to
      ? editFestivalFormData.event_date_to?.toString().slice(0, 10)
      : "";
    setIsSubmissionAddressDifferent(editFestivalFormData.addressSame);

    if (editFestivalFormData?.country)
      setSelectedCountry(editFestivalFormData?.country);

    if (editFestivalFormData?.ocountry)
      setOtherSelectedCountry(editFestivalFormData.ocountry);

    if (editFestivalFormData?.category_search?.length > 0) {
      const data = [...categorySearchValues];
      data.map((ele: any) => {
        if (editFestivalFormData?.category_search.includes(ele.value))
          ele.checked = true;
        return ele;
      });
      setCategorySearchvalues(data);
    }

    if (editFestivalFormData?.festival_focus?.length > 0) {
      const data = [...festivalFocusValues];
      data.map((ele: any) => {
        if (editFestivalFormData?.festival_focus.includes(ele.value))
          ele.checked = true;
        return ele;
      });
      setFestivalFocusValues(data);
    }
  }, [editFestivalFormData]);

  // Handling Dynamic Form fields -- Code Start
  // ------------------------------------------

  const handleEventDynamicFormData = (
    event: any,
    index: number,
    comesFrom: string,
    hasAnyAdditionalField: boolean = false
  ) => {
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

  const receiveSearchTermValues = useCallback(
    (values: any) => values && setSearchTermValues(values),
    [searchTermsValues]
  );
  // Handling Dynamic Form fields -- Code Finish
  // =========================================================================

  // ----------------- Edit Festival Form Prefilling -- Code Finish -----------------

  // This method is used to collect edit festival form data and call edit festival api
  const submittingData = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log("formProps:: ", formProps);
    let updatedFormDataForApi: any = {};
    for (let x in formProps) {
      updatedFormDataForApi[x] = formProps[x];
    }
    for (let x in updatedFormDataForApi) {
      if (
        !x.includes("event_organizer[") &&
        !x.includes("event_venue[") &&
        !x.includes("entry_deadline[") &&
        !x.includes("category[") &&
        !x.includes("img[")
      ) {
        updatedFormDataForApi[x] = updatedFormDataForApi[x];
      }
    }
    console.log("imgLogo.current.files[0]::: ", imgLogo.current.files[0]);
    if (!isSubmissionAddressDifferent) {
      updatedFormDataForApi["oaddress"] = "";
      updatedFormDataForApi["ocity"] = "";
      updatedFormDataForApi["ostate"] = "";
      updatedFormDataForApi["ocountry"] = "";
      updatedFormDataForApi["opostalCode"] = "";
    }
    updatedFormDataForApi = {
      ...updatedFormDataForApi,
      event_organizer: eventOrganiserFormFields,
      event_venue: eventVenueFormFields,
      entry_deadline: entryDeadlineFormFields,
      category: categoryAndFeesFormFields,
      category_search: categorySearchValues
        .filter((ele: any) => ele.checked)
        .map((ele: any) => ele.value),
      festival_focus: festivalFocusValues
        .filter((ele: any) => ele.checked)
        .map((ele: any) => ele.value),
      search_terms: searchTermsValues,
      country: selectedCountry,
      addressSame: isSubmissionAddressDifferent,
      ocountry: otherSelectedCountry,
    };

    delete updatedFormDataForApi.img;
    setCompleteFormData(updatedFormDataForApi);
    setFormErrors(
      validateEditFestivalForm(
        updatedFormDataForApi,
        eventOrganiserFormFields,
        isSubmissionAddressDifferent,
        eventVenueFormFields,
        entryDeadlineFormFields
      )
    );
    setIsFormSubmit(true);
  };

  // -------------------------------------------------------------------------
  // This code is used to revalidate form errors once user changed any field values.
  useEffect(() => {
    if (isFormSubmit) {
      setFormErrors(
        validateEditFestivalForm(
          completeFormData,
          eventOrganiserFormFields,
          isSubmissionAddressDifferent,
          eventVenueFormFields,
          entryDeadlineFormFields
        )
      );
    }
  }, [
    completeFormData,
    eventOrganiserFormFields,
    isSubmissionAddressDifferent,
    eventVenueFormFields,
    entryDeadlineFormFields,
  ]);

  // This code is used to revalidate form errors once user changed any field values.
  // useEffect(() => {
  //   isFormSubmit &&
  //     setFormErrors(
  //       validateEditFestivalForm(
  //         completeFormData,
  //         eventOrganiserFormFields,
  //         isSubmissionAddressDifferent,
  //         eventVenueFormFields
  //       )
  //     );
  // }, [completeFormData]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isFormSubmit) {
      console.log("Edit FestivalForm Data::: ", completeFormData);
      const updatedFormData = new FormData();

      updatedFormData.append("query", JSON.stringify(completeFormData));
      imgLogo.current.files[0] &&
        updatedFormData.append(
          "img",
          imgLogo.current.files[0],
          imgLogo.current.files[0] ? imgLogo.current.files[0] : "image.png"
        );

      festivalPost(updatedFormData);
    } else {
      // window.scrollTo(0, 0);
    }
  }, [formErrors]);

  useEffect(() => {
    console.log("formErrors::: ", formErrors);
  }, [formErrors]);

  useEffect(() => {
    console.log("completeFormData::: ", completeFormData);
  }, [completeFormData]);

  // useEffect(() => {
  //   if (isFormSubmit) {
  //     setFormErrors(
  //       validateEditFestivalForm(
  //         completeFormData,
  //         eventOrganiserFormFields,
  //         isSubmissionAddressDifferent,
  //         eventVenueFormFields
  //       )
  //     );
  //   }
  // }, [isSubmissionAddressDifferent]);

  // useEffect(() => {
  //   console.log(
  //     "isSubmissionAddressDifferent::: SHUBHAM SINGH::::: ",
  //     isSubmissionAddressDifferent
  //   );
  // }, [isSubmissionAddressDifferent]);
  // =========================================================================
  return (
    <>
      <EditDetailWrapper onSubmit={(e: any) => submittingData(e)}>
        {/* ***************************** Form Step 01st ********************************** */}

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
                  placeholder="Enter Event Name"
                  type="text"
                  ref={eventName}
                  onChange={(e) =>
                    setCompleteFormData({
                      ...completeFormData,
                      event_name: eventName.current.value,
                    })
                  }
                  style={formErrors?.event_name && { border: "1px solid red" }}
                ></input>
              </li>
              {formErrors?.event_name && (
                <p style={formErrorMsg}>{formErrors.event_name}</p>
              )}
              <li>
                <p className="radio_title">Event Type</p>
                <div className="radio">
                  <div>
                    <input
                      name="event_type"
                      id="radio"
                      type="radio"
                      value="Feature Film Festivals"
                      checked={eventTypeSelected
                        ?.toString()
                        .includes("Feature Film")}
                      onChange={(event) =>
                        setEventTypeSelected(event?.target.value)
                      }
                    ></input>
                    <p>Feature Film Festival</p>
                  </div>
                  <div>
                    <input
                      name="event_type"
                      id="radio2"
                      type="radio"
                      value="Short Film Festivals"
                      checked={eventTypeSelected
                        ?.toString()
                        .includes("Short Film")}
                      onChange={(event) =>
                        setEventTypeSelected(event?.target.value)
                      }
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
                        editFestivalFormData?.event_logo
                          ? "http://3.89.138.204:3000/uploads/" +
                            editFestivalFormData?.event_logo
                          : ""
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
                    {isFormSubmit && !eventLogo.current.src && (
                      <p style={formErrorMsg}>Event Logo is required</p>
                    )}
                    <label htmlFor="choose_file">Choose File</label>
                  </div>
                </div>
              </li>
              <li>
                <p>Year Running</p>
                <input
                  name="year_running"
                  type="number"
                  placeholder="Enter Year Running"
                  ref={yearRunning}
                  onChange={(e) =>
                    setCompleteFormData({
                      ...completeFormData,
                      year_running: yearRunning.current.value,
                    })
                  }
                  style={formErrors?.event_name && { border: "1px solid red" }}
                ></input>
              </li>
              {formErrors?.year_running && (
                <p style={formErrorMsg}>{formErrors.year_running}</p>
              )}
              <li>
                <p>Event Description</p>
                <textarea
                  name="event_description"
                  placeholder="Tell what is special about your festival"
                  ref={eventDescription}
                  onChange={(e) =>
                    setCompleteFormData({
                      ...completeFormData,
                      event_description: eventDescription.current.value,
                    })
                  }
                  style={
                    formErrors?.event_description && { border: "1px solid red" }
                  }
                ></textarea>
              </li>
              {formErrors?.event_description && (
                <p style={formErrorMsg}>{formErrors.event_description}</p>
              )}
              <li>
                <p>Awards & Prizes</p>
                <textarea
                  name="award_prizes"
                  placeholder="List all awards, prizes your festival present to its winner."
                  ref={eventAwardPrizes}
                  onChange={(e) =>
                    setCompleteFormData({
                      ...completeFormData,
                      award_prizes: eventAwardPrizes.current.value,
                    })
                  }
                  style={
                    formErrors?.award_prizes && { border: "1px solid red" }
                  }
                ></textarea>
              </li>
              {formErrors?.award_prizes && (
                <p style={formErrorMsg}>{formErrors.award_prizes}</p>
              )}
              <li>
                <p>Rules & Terms</p>
                <textarea
                  name="rule_terms"
                  placeholder="List all General Rules along with Terms and conditions of entry to which all director must agree."
                  ref={eventRulesAndRegulations}
                  onChange={(e) =>
                    setCompleteFormData({
                      ...completeFormData,
                      rule_terms: eventRulesAndRegulations.current.value,
                    })
                  }
                  style={formErrors?.rule_terms && { border: "1px solid red" }}
                ></textarea>
              </li>
              {formErrors?.rule_terms && (
                <p style={formErrorMsg}>{formErrors.rule_terms}</p>
              )}
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
                                  placeholder="Enter Organiser Name"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventOrganiser"
                                    )
                                  }
                                  value={form.name}
                                ></input>
                                {formErrors?.eventOrganisers?.length > 0 &&
                                  formErrors?.eventOrganisers[index]?.name ===
                                    "Event Name is required" && (
                                    <p style={formErrorMsg}>
                                      Event Name is required
                                    </p>
                                  )}
                              </div>
                              <div className="half">
                                <label className="label-sm" htmlFor="title">
                                  Title
                                </label>
                                <input
                                  name="title"
                                  id="title"
                                  className="eventTitle"
                                  placeholder="Enter Title"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventOrganiser"
                                    )
                                  }
                                  value={form.title}
                                ></input>
                                {formErrors?.eventOrganisers?.length > 0 &&
                                  formErrors?.eventOrganisers[index]?.title ===
                                    "Event Title is required" && (
                                    <p style={formErrorMsg}>
                                      Event Title is required
                                    </p>
                                  )}
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
                          </div>
                        );
                      }
                    )}
                    <button
                      type="button"
                      className="submit"
                      onClick={(event) =>
                        addDynamicEventFields(event, "eventOrganiser")
                      }
                      style={addMore_ButtonStyle}
                    >
                      Add Organizer
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* ***************************** Form Step 02nd ********************************** */}

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
                      placeholder="Enter your website name"
                      ref={contactWebsite}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          website: contactWebsite.current.value,
                        })
                      }
                      style={formErrors?.website && { border: "1px solid red" }}
                    ></input>
                    {formErrors?.website && (
                      <p style={formErrorMsg}>{formErrors.website}</p>
                    )}
                  </div>
                  <div className="full">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      id="email"
                      placeholder="Enter your email address"
                      ref={contactEmail}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          email: contactEmail.current.value,
                        })
                      }
                      style={formErrors?.email && { border: "1px solid red" }}
                    ></input>
                    {formErrors?.email && (
                      <p style={formErrorMsg}>{formErrors.email}</p>
                    )}
                  </div>
                  <div className="full">
                    <label htmlFor="phone">Phone</label>
                    <input
                      name="phone"
                      id="phone"
                      type="number"
                      placeholder="Enter your phone number"
                      ref={contactNumber}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          phone: contactNumber.current.value,
                        })
                      }
                      style={formErrors?.phone && { border: "1px solid red" }}
                    ></input>
                    {formErrors?.phone && (
                      <p style={formErrorMsg}>{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="full">
                    <label htmlFor="address">Address</label>
                    <textarea
                      name="address"
                      id="address"
                      placeholder="Enter your address"
                      ref={contactAddress}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          address: contactAddress.current.value,
                        })
                      }
                      style={formErrors?.address && { border: "1px solid red" }}
                    ></textarea>
                    {formErrors?.address && (
                      <p style={formErrorMsg}>{formErrors.address}</p>
                    )}
                  </div>
                  <div className="full">
                    <label htmlFor="city">City</label>
                    <input
                      name="city"
                      id="city"
                      placeholder="Enter your city"
                      ref={contactCity}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          city: contactCity.current.value,
                        })
                      }
                      style={formErrors?.city && { border: "1px solid red" }}
                    ></input>
                    {formErrors?.city && (
                      <p style={formErrorMsg}>{formErrors.city}</p>
                    )}
                  </div>
                  <div className="full">
                    <label htmlFor="state">State</label>
                    <input
                      name="state"
                      id="state"
                      placeholder="Enter your state"
                      ref={contactState}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          state: contactState.current.value,
                        })
                      }
                      style={formErrors?.state && { border: "1px solid red" }}
                    ></input>
                    {formErrors?.state && (
                      <p style={formErrorMsg}>{formErrors.state}</p>
                    )}
                  </div>
                  <div className="full">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      name="postalCode"
                      id="postalCode"
                      type="number"
                      placeholder="Enter your postal code"
                      ref={contactPostalCode}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          postalCode: contactPostalCode.current.value,
                        })
                      }
                      style={
                        formErrors?.postalCode && { border: "1px solid red" }
                      }
                    ></input>
                    {formErrors?.postalCode && (
                      <p style={formErrorMsg}>{formErrors.postalCode}</p>
                    )}
                  </div>

                  <div className="full">
                    <label htmlFor="name">Country</label>

                    <select
                      name="country"
                      className="select-country CountryTwo"
                      value={selectedCountry}
                      defaultValue={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setCompleteFormData({
                          ...completeFormData,
                          country: e.target.value,
                        });
                      }}
                      style={formErrors?.country && { border: "1px solid red" }}
                    >
                      <option value="">Please select country</option>

                      {countriesList?.map((country: any, i: number) => {
                        return (
                          <option key={i} value={country?.label}>
                            {country?.label}
                          </option>
                        );
                      })}
                    </select>
                    {formErrors?.country && (
                      <p style={formErrorMsg}>{formErrors.country}</p>
                    )}
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
                      placeholder="Enter your facebook id/url"
                      ref={facebook}
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="instagram">Instagram</label>
                    <input
                      name="instagram"
                      id="name"
                      placeholder="Enter your Instagram id/url"
                      ref={instagram}
                    ></input>
                  </div>
                  <div className="full">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                      name="twitter"
                      id="twitter"
                      placeholder="Enter your Twitter id/url"
                      ref={twitter}
                    ></input>
                  </div>
                </div>
              </li>
              <li>
                <p className="radio_title">Submission address</p>
                <div className="radio">
                  <div>
                    <input
                      onChange={() =>
                        setIsSubmissionAddressDifferent(
                          !isSubmissionAddressDifferent
                        )
                      }
                      type="checkbox"
                      checked={isSubmissionAddressDifferent}
                    ></input>
                    <p>My festival has a different submission address</p>
                  </div>
                </div>
              </li>
              <>
                <li
                  style={{
                    display: isSubmissionAddressDifferent ? "flex" : "none",
                  }}
                >
                  <p></p>
                  <div className="body">
                    <div className="full">
                      <label htmlFor="oaddress">Address</label>
                      <textarea
                        name="oaddress"
                        id="oaddress"
                        placeholder="Enter your address"
                        ref={otherAddress}
                        onChange={(e) =>
                          setCompleteFormData({
                            ...completeFormData,
                            oaddress: otherAddress.current.value,
                          })
                        }
                        style={
                          formErrors?.oaddress && { border: "1px solid red" }
                        }
                      ></textarea>
                      {formErrors?.oaddress && (
                        <p style={formErrorMsg}>{formErrors.oaddress}</p>
                      )}
                    </div>
                    <div className="full">
                      <label htmlFor="ocity">City</label>
                      <input
                        name="ocity"
                        id="ocity"
                        placeholder="Enter your city"
                        ref={otherCity}
                        onChange={(e) =>
                          setCompleteFormData({
                            ...completeFormData,
                            ocity: otherCity.current.value,
                          })
                        }
                        style={formErrors?.ocity && { border: "1px solid red" }}
                      ></input>
                      {formErrors?.ocity && (
                        <p style={formErrorMsg}>{formErrors.ocity}</p>
                      )}
                    </div>
                    <div className="full">
                      <label htmlFor="ostate">State</label>
                      <input
                        id="ostate"
                        name="ostate"
                        placeholder="Enter your state"
                        ref={otherState}
                        onChange={(e) =>
                          setCompleteFormData({
                            ...completeFormData,
                            ostate: otherState.current.value,
                          })
                        }
                        style={
                          formErrors?.ostate && { border: "1px solid red" }
                        }
                      ></input>
                      {formErrors?.ostate && (
                        <p style={formErrorMsg}>{formErrors.ostate}</p>
                      )}
                    </div>
                    <div className="full">
                      <label htmlFor="opostalCode">Postal</label>
                      <input
                        name="opostalCode"
                        id="opostalCode"
                        type="number"
                        placeholder="Enter your postal code"
                        ref={otherPostalCode}
                        onChange={(e) =>
                          setCompleteFormData({
                            ...completeFormData,
                            opostalCode: otherPostalCode.current.value,
                          })
                        }
                        style={
                          formErrors?.opostalCode && { border: "1px solid red" }
                        }
                      ></input>
                      {formErrors?.opostalCode && (
                        <p style={formErrorMsg}>{formErrors.opostalCode}</p>
                      )}
                    </div>
                    <div className="full">
                      <label htmlFor="name">Country</label>

                      <select
                        name="ocountry"
                        className="select-country CountryTwo"
                        value={otherSelectedCountry}
                        onChange={(e) => {
                          setOtherSelectedCountry(e.target.value);
                          setCompleteFormData({
                            ...completeFormData,
                            ocountry: e.target.value,
                          });
                        }}
                        defaultValue={otherSelectedCountry}
                        style={
                          formErrors?.ocountry && { border: "1px solid red" }
                        }
                      >
                        <option value="">Please select country</option>

                        {countriesList?.map((country: any, i: number) => {
                          return (
                            <>
                              <option key={i} value={country?.label}>
                                {country?.label}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {formErrors?.ocountry && (
                        <p style={formErrorMsg}>{formErrors.ocountry}</p>
                      )}
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
                        {formErrors?.eventVenueFormFields?.length > 0 &&
                          formErrors?.eventVenueFormFields[index]
                            ?.venue_name === "Event venue Name is required" && (
                            <>
                              <p style={formErrorMsg}>
                                Event venue Name is required
                              </p>
                              <br />
                            </>
                          )}
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
                                {formErrors?.eventVenueFormFields?.length > 0 &&
                                  formErrors?.eventVenueFormFields[index]
                                    ?.address ===
                                    "Event venue Address is required" && (
                                    <p style={formErrorMsg}>
                                      Event venue Address is required
                                    </p>
                                  )}
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
                                {formErrors?.eventVenueFormFields?.length > 0 &&
                                  formErrors?.eventVenueFormFields[index]
                                    ?.city ===
                                    "Event venue city is required" && (
                                    <p style={formErrorMsg}>
                                      Event venue city is required
                                    </p>
                                  )}
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
                                {formErrors?.eventVenueFormFields?.length > 0 &&
                                  formErrors?.eventVenueFormFields[index]
                                    ?.state ===
                                    "Event venue state is required" && (
                                    <p style={formErrorMsg}>
                                      Event venue state is required
                                    </p>
                                  )}
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
                                {formErrors?.eventVenueFormFields?.length > 0 &&
                                  formErrors?.eventVenueFormFields[index]
                                    ?.postal_code ===
                                    "Valid Event Venue Postal code is required" && (
                                    <p style={formErrorMsg}>
                                      Valid Event Venue Postal code is required
                                    </p>
                                  )}
                              </div>

                              <div className="full">
                                <label htmlFor="name">Country</label>

                                <select
                                  name="country"
                                  className="select-country CountryTwo"
                                  onChange={(event) =>
                                    handleEventDynamicFormData(
                                      event,
                                      index,
                                      "eventVenue"
                                    )
                                  }
                                  defaultValue={form?.country}
                                >
                                  <option value="">
                                    Please select country
                                  </option>

                                  {countriesList?.map(
                                    (country: any, i: number) => {
                                      return (
                                        <option key={i} value={country?.label}>
                                          {country?.label}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                                {formErrors?.eventVenueFormFields?.length > 0 &&
                                  formErrors?.eventVenueFormFields[index]
                                    ?.country ===
                                    "Event venue country is required" && (
                                    <p style={formErrorMsg}>
                                      Event venue country is required
                                    </p>
                                  )}
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
                    style={addMore_ButtonStyle}
                  >
                    Add Another venue
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* ***************************** Form Step 03rd ********************************** */}
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
                  type="date"
                  name="opening_date"
                  ref={openingDate}
                  onChange={(e) =>
                    setCompleteFormData({
                      ...completeFormData,
                      opening_date: openingDate.current.value,
                    })
                  }
                  style={
                    formErrors?.opening_date && { border: "1px solid red" }
                  }
                />
              </li>
              {formErrors?.opening_date && (
                <p style={formErrorMsg}>{formErrors.opening_date}</p>
              )}
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
                              {formErrors?.entryDeadlineFormFields?.length >
                                0 &&
                                formErrors?.entryDeadlineFormFields[index]
                                  ?.deadline === "Deadline is required" && (
                                  <p style={formErrorMsg}>
                                    Deadline is required
                                  </p>
                                )}
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
                              {formErrors?.entryDeadlineFormFields?.length >
                                0 &&
                                formErrors?.entryDeadlineFormFields[index]
                                  ?.date === "Date is required" && (
                                  <p style={formErrorMsg}>Date is required</p>
                                )}
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
                      style={addMore_ButtonStyle}
                    >
                      Add Deadline
                    </button>
                  </div>
                </div>
              </li>

              <li>
                <p>Notification Date</p>
                <input
                  type="date"
                  name="notification_date"
                  ref={notificationDate}
                  onChange={(e) =>
                    setCompleteFormData({
                      ...completeFormData,
                      notification_date: notificationDate.current.value,
                    })
                  }
                  style={
                    formErrors?.notification_date && { border: "1px solid red" }
                  }
                />
              </li>
              {formErrors?.notification_date && (
                <p style={formErrorMsg}>{formErrors.notification_date}</p>
              )}

              <li>
                <p>Event Dates</p>

                <div className="sec3">
                  <div className="half first_half">
                    <input
                      type="date"
                      name="event_date_from"
                      ref={eventFromDate}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          event_date_from: eventFromDate.current.value,
                        })
                      }
                      style={
                        formErrors?.event_date_from && {
                          border: "1px solid red",
                        }
                      }
                    />
                  </div>
                  {formErrors?.event_date_from && (
                    <p style={formErrorMsg}>{formErrors.event_date_from}</p>
                  )}
                  <p>To</p>
                  <div className="half">
                    <input
                      type="date"
                      name="event_date_to"
                      ref={eventToDate}
                      onChange={(e) =>
                        setCompleteFormData({
                          ...completeFormData,
                          event_date_to: eventToDate.current.value,
                        })
                      }
                      style={
                        formErrors?.event_date_to && { border: "1px solid red" }
                      }
                    />
                  </div>
                  &nbsp; &nbsp;
                  {formErrors?.event_date_to && (
                    <p style={formErrorMsg}>{formErrors.event_date_to}</p>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* ***************************** Form Step 04th ********************************** */}
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
                                        placeholder="Event Deadline Name"
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
                                        placeholder="Student Fee"
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
                                        placeholder="Gold fee"
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
                                        placeholder="Silver fee"
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
                                    placeholder="Runtime"
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
                                    // value={form.project_origin}
                                    defaultValue={form?.project_origin}
                                  >
                                    <option value="">
                                      Please select country
                                    </option>

                                    {countriesList?.map(
                                      (country: any, i: number) => {
                                        return (
                                          <option
                                            key={i}
                                            value={country?.label}
                                          >
                                            {country?.label}
                                          </option>
                                        );
                                      }
                                    )}
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
                    style={addMore_ButtonStyle}
                  >
                    Add Category
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* ***************************** Form Step 05th ********************************** */}
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
                  <ul>
                    {categorySearchValues?.length > 0 &&
                      categorySearchValues.map((ele: any, i: number) => {
                        return (
                          <li key={i}>
                            <input
                              value={ele.value}
                              name="category_search"
                              type="checkbox"
                              checked={ele.checked}
                              onChange={(event) =>
                                handleMultipleCheckboxesSelection(
                                  event,
                                  "categorySearch"
                                )
                              }
                            ></input>
                            <label>
                              <p>{ele?.value ? ele?.value : ""}</p>
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </li>
              <li>
                <p>Festival Focus</p>
                <div className="option">
                  <ul>
                    {festivalFocusValues?.length > 0 &&
                      festivalFocusValues.map((ele: any, i: number) => {
                        return (
                          <li key={i}>
                            <input
                              value={ele.value}
                              name="festival_focus"
                              type="checkbox"
                              checked={ele.checked}
                              onChange={(event) =>
                                handleMultipleCheckboxesSelection(
                                  event,
                                  "festivalFocus"
                                )
                              }
                            ></input>
                            <label>
                              <p>{ele?.value ? ele?.value : ""}</p>
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </li>

              <li>
                <p>Search Terms</p>
                <div style={{ maxWidth: "600px", width: "95%" }}>
                  <MultiValueClearableInput
                    receiveData={receiveSearchTermValues}
                    placeholder="Enter Search Terms for your festival"
                    selectedValues={selectedSearchTermsValues}
                  />
                </div>
              </li>

              <li>
                <p>Listing visibility</p>
                <div style={{ maxWidth: "600px", width: "95%" }}>
                  <select
                    name="listing_visibility"
                    className="select-country CountryTwo"
                  >
                    {listingVisibility?.map((ele: any, i: number) => {
                      return (
                        <option key={i} value={ele}>
                          {ele}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button className="update">Update</button>
      </EditDetailWrapper>
    </>
  );
};

export default UpdatedEditDetails;
// ===================================== CSS SECTION -- START =================================
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

// ===================================== CSS SECTION -- FINISH =================================
