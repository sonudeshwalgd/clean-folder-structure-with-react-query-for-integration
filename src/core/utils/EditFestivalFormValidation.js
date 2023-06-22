import {
  nameRegex,
  indianMobileRegex,
  emailRegex,
  websiteRegex,
} from "./regexes";
// ------------------------------------------------------------------------------

//This method is used to manage add signer form validation.
export const validateEditFestivalForm = (
  formData,
  eventOrganiserData,
  isSubmissionAddressDifferent,
  eventVenueFormFields,
  entryDeadlineFormFields
) => {
  const errors = {};
  console.log("formData::: ", formData);
  // console.log("isSubmissionAddressDifferent::: ", isSubmissionAddressDifferent);
  // console.log("eventVenueFormFields::: ", eventVenueFormFields);
  console.log("entryDeadlineFormFields::: ", entryDeadlineFormFields);

  const {
    event_name,
    year_running,
    event_description,
    award_prizes,
    rule_terms,
    website,
    email,
    phone,
    address,
    city,
    state,
    postalCode,
    country,
    facebook,
    instagram,
    twitter,
    oaddress,
    ocity,
    ostate,
    opostalCode,
    ocountry,
    opening_date,
    notification_date,
    event_date_from,
    event_date_to,
  } = formData;
  // --------------------------------------------------------------------------------------------------------------
  // Step 1st Form Validation
  if (event_name?.length === 0) errors.event_name = "Event name is required";
  else if (event_name?.length < 2)
    errors.event_name = "Event name cannot be less than 2 characters.";
  else if (event_name?.length > 40)
    errors.event_name = "Event name cannot be more than 40 characters.";

  if (year_running?.length === 0)
    errors.year_running = "Running Year is required";
  else if (year_running?.length < 4)
    errors.year_running = "Running Year cannot be less than 2 digits.";
  else if (year_running?.length > 4)
    errors.year_running = "Running cannot be more than 4 digits.";

  if (event_description?.length === 0)
    errors.event_description = "Event Description is required";
  else if (event_description?.length < 5)
    errors.event_description =
      "Event Description cannot be less than 5 characters.";
  else if (event_description?.length > 500)
    errors.event_description =
      "Event Description cannot be more than 500 characters.";

  if (award_prizes?.length === 0)
    errors.award_prizes = "Awards and Prizes value is required";
  else if (award_prizes?.length < 5)
    errors.award_prizes =
      "Awards and Prizes value cannot be less than 5 characters.";
  else if (award_prizes?.length > 500)
    errors.award_prizes =
      "Awards and Prizes value cannot be more than 500 characters.";

  if (rule_terms?.length === 0)
    errors.rule_terms = "Rules and Terms value is required";
  else if (rule_terms?.length < 5)
    errors.rule_terms =
      "Rules and Terms value cannot be less than 5 characters.";
  else if (rule_terms?.length > 500)
    errors.rule_terms =
      "Rules and Terms value cannot be more than 500 characters.";

  if (eventOrganiserData?.length > 0) {
    errors.eventOrganisers = eventOrganiserData.map((event) => {
      return {
        ...(event.name === "" && { name: "Event Name is required" }),
        ...(event.title === "" && { title: "Event Title is required" }),
      };
    });
  }
  // --------------------------------------------------------------------------------------------------------------
  // Step 2nd Form Validation

  if (website?.length > 0 && !websiteRegex?.test(website))
    errors.website = "Please enter valid website url";

  if (email?.length === 0 || !emailRegex?.test(email))
    errors.email = "Please enter valid email id ";

  if (phone?.length === 0 || !indianMobileRegex?.test(phone))
    errors.phone = "Please enter valid indian mobile number ";

  if (address?.length === 0) errors.address = "Address is required";
  else if (address?.length < 5)
    errors.address = "Address cannot be less than 5 characters.";
  else if (address?.length > 500)
    errors.address = "Address cannot contains than 500 characters.";

  if (city?.length === 0) errors.city = "City is required";
  else if (city?.length < 3)
    errors.city = "City value cannot be less than 3 characters.";
  else if (city?.length > 50)
    errors.city = "City cannot contain more than 50 characters.";

  if (state?.length === 0) errors.state = "State is required";
  else if (state?.length < 3)
    errors.state = "State value cannot be less than 3 characters.";
  else if (state?.length > 50)
    errors.state = "State cannot contains more than 50 characters.";

  if (postalCode?.length === 0) errors.postalCode = "Postal Code is required";
  else if (postalCode?.length < 6)
    errors.postalCode = "Postal code value cannot be less than 6 characters.";
  else if (postalCode?.length > 6)
    errors.postalCode = "Postal Code cannot contains more than 6 characters.";

  if (!country) errors.country = "Country is required";

  if (isSubmissionAddressDifferent) {
    if (oaddress?.length === 0) errors.oaddress = "Address is required";
    else if (oaddress?.length < 5)
      errors.oaddress = "Address cannot be less than 5 characters.";
    else if (oaddress?.length > 500)
      errors.oaddress = "Address cannot contains than 500 characters.";

    if (ocity?.length === 0) errors.ocity = "City is required";
    else if (ocity?.length < 3)
      errors.ocity = "City value cannot be less than 3 characters.";
    else if (ocity?.length > 50)
      errors.ocity = "City cannot contain more than 50 characters.";

    if (ostate?.length === 0) errors.ostate = "State is required";
    else if (ostate?.length < 3)
      errors.ostate = "State value cannot be less than 3 characters.";
    else if (ostate?.length > 50)
      errors.ostate = "State cannot contains more than 50 characters.";

    if (opostalCode?.length === 0)
      errors.opostalCode = "Postal Code is required";
    else if (opostalCode?.length < 6)
      errors.opostalCode =
        "Postal code value cannot be less than 6 characters.";
    else if (opostalCode?.length > 6)
      errors.opostalCode =
        "Postal Code cannot contains more than 6 characters.";

    if (!ocountry) errors.ocountry = "Country is required";
  }

  if (eventVenueFormFields?.length > 0) {
    errors.eventVenueFormFields = eventVenueFormFields.map((event) => {
      return {
        ...(event.venue_name === "" && {
          venue_name: "Event venue Name is required",
        }),
        ...(event.address === "" && {
          address: "Event venue Address is required",
        }),
        ...(event.city === "" && { city: "Event venue city is required" }),
        ...(event.state === "" && { state: "Event venue state is required" }),
        ...((event.postal_code === null || event.postal_code?.length !== 6) && {
          postal_code: "Valid Event Venue Postal code is required",
        }),
        ...(!event.country && { country: "Event venue country is required" }),
      };
    });
  }
  // --------------------------------------------------------------------------------------------------------------

  // Step 3rd Form Validation

  if (!opening_date) errors.opening_date = "Opening date is required";
  if (!notification_date)
    errors.notification_date = "Notification date is required";
  if (!event_date_from) errors.event_date_from = "Event from date is required";
  if (!event_date_to) errors.event_date_to = "Event to date is required";

  if (entryDeadlineFormFields?.length > 0) {
    errors.entryDeadlineFormFields = entryDeadlineFormFields.map((event) => {
      return {
        ...(event.deadline === "" && { deadline: "Deadline is required" }),
        ...(event.date === "" && { date: "Date is required" }),
      };
    });
  }

  // --------------------------------------------------------------------------------------------------------------

  console.log("Filmcity Errors::: ", errors);

  if (errors?.eventOrganisers?.length > 0) {
    const result = errors?.eventOrganisers.every(
      (ele) => Object.keys(ele).length === 0
    );
    console.log("result::: ", result);
    if (result) delete errors?.eventOrganisers;
  }

  if (errors?.eventVenueFormFields?.length > 0) {
    const result = errors?.eventVenueFormFields.every(
      (ele) => Object.keys(ele).length === 0
    );
    console.log("result:2:: ", result);
    if (result) delete errors?.eventVenueFormFields;
  }

  if (errors?.entryDeadlineFormFields?.length > 0) {
    const result = errors?.entryDeadlineFormFields.every(
      (ele) => Object.keys(ele).length === 0
    );
    console.log("result:3:: ", result);
    if (result) delete errors?.entryDeadlineFormFields;
  }

  console.log("Filmcity Errors:UPDATED:: ", errors);

  return errors;
};
// =============================================== THE END ===============================================
