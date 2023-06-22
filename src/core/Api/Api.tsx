import axios from "axios";
import { useContext } from "react";
import ReactDOM from "react-dom/client";
import Result from "../commonComponents/Request result popup/Result";

// const aai=useContext(UserIdd)
// console.log(aai)

const commonRequestingPath = process.env.REACT_APP_API_REQUEST_PATH;

type propRegistration = {
  name: string | any;
  emailid: string | any;
  password: string | any;
  number: number | any;
  account: number | undefined | any;
};
type propContactUsMessage = {
  subject: string | any;
  body: string | any;
};
type propLogin = {
  emailid: string | any;
  password: string | any;
};
type propOTPSend = {
  emailid: string | any;
};
type propComposeMail = {
  subject: string | any;
  message: string | any;
  festivalid: string | any;
};
type propTypeListAllFestivals = {
  call_for_entry: number;
  categroy: Array<any>;
  country: string;
  country_type: string;
  entry_deadline: string;
  entry_deadline_type: string;
  entry_fees_max: number;
  entry_fees_min: number;
  event_date: string;
  event_date_type: string;
  event_type: Array<any>;
  fest_focus: Array<any>;
  page: number;
  perPage: number;
  runtime: number;
  search_terms: string;
  yrs_max: number;
  yrs_min: number;
};

type propOrganizerMarketing = {
  festivalid: string;
  subject: string;
  message: string;
  whatappno: string;
  email: string;
};
type propOrganizerSubmission = {
  category: string;
  endDate: string;
  festivalid: string | null;
  judge: string;
  searchText: string | undefined;
  startDate: string;
  submission: string;
};
type propChangePassword = {
  newpassword: string;
  oldpassword: string;
};
type propUpdateProfile = {
  name: string;
  mobileno: string;
};
type propOrganizerPayout = {
  accountno: string;
  bankname: string;
  branchname: string;
  holdername: string;
  ifsccode: string;
  payouttype: string;
  paypallink: string;
  userid: string | null;
};

type propDirectorMySubmission = {
  page: number;
  project: string;
  resPerPage: number;
  search_terms: string;
  status: string;
};
type propDirectorTransaction = {
  from: any;
  to: any;
};
type propUpdateCoverPic = {
  img: any;
};

const instance = axios.create({
  baseURL: "http://44.204.10.117:3000/api/v1/",
});

export const getListAllFestivals = (payload: propTypeListAllFestivals) => {
  return axios.post("user/festival", payload).then((res) => {
    return res.data;
  });
};

export const getListAllPlans = () => {
  return axios.get("user/plan").then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export const postRegistration = (data: propRegistration) => {
  return axios.post(`user/register`, data).then((res) => {
    localStorage.setItem("userId", res.data.user._id);
    localStorage.setItem("userToken", res.data.token);
    localStorage.setItem("userType", res.data.user.account);
    axios.defaults.headers.common["Authorization"] =
      `Bearer ` + `${res.data.token}`;
    return res.data;
  });
};
export const postLogin = (data: propLogin) => {
  return axios
    .post(`/user/login`, data)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userType", res.data.user.account);
      axios.defaults.headers.common["Authorization"] =
        `Bearer ` + `${res.data.token}`;
      return res.data;
    })
    .catch(() => {
      console.log("error");
    });
};

export const postForgotOTPSend = (data: propOTPSend) => {
  return axios.post(`user/forgototp`, data).then((res) => {
    return res.data;
  });
};
export const postContactUsMessage = (data: propContactUsMessage) => {
  return axios.post(`user/contactus`, data).then((res) => {
    return res.data;
  });
};
export const getOrganizerProfileDetails = () => {
  let userId = localStorage.getItem("userId");
  return axios.get(`organizer/${userId}/profile`).then((res) => res.data);
};
export const getBlueBatchDetails = () => {
  let userId = localStorage.getItem("userId");
  return axios.get(`organizer/${userId}/bluebadge`).then((res) => res.data);
};

export const getUserNotificationDetails = () => {
  let userId = localStorage.getItem("userId");
  return axios.get(`user/${userId}/notifications`).then((res) => res.data);
};
export const getUserNotificationDelete = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .delete(`user/${userId}/deleteNotification`, {
      data: data,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data);
};

//organizer start--------------------------------------------------
//organizer dashboard

export const getOrganizerDashboard = () => {
  let userId = localStorage.getItem("userId");
  let festivalId = localStorage.getItem("festivalId");

  return axios(`organizer/${userId}/dashboard?festivalid=${festivalId}`).then(
    (res) => {
      return res.data;
    }
  );
};
//organizer my festival

// patchChangeEventLogo
export const patchOrganizerChangeEventLogo = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .patch(`organizer/${userId}/changeeventlogo`, data)
    .then((res) => res.data);
};
//festival
export const getOrganizerFestival = () => {
  let userId = localStorage.getItem("userId");
  return axios(`organizer/${userId}/festival`).then((res) => {
    return res.data;
  });
};
export const getOrganizerFestivalUploadPhoto = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`organizer/${userId}/uploadphoto`, data).then((res) => {
    return res.data;
  });
};

export const patchOrganizerUpdateCoverPic = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`organizer/${userId}/changecover`, data).then((res) => {
    return res.data;
  });
};
export const deleteOrganizerPhotoDelete = (data: any) => {
  let userId = localStorage.getItem("userId");

  return axios
    .delete(`organizer/${userId}/deletephoto`, {
      data: data,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    });
};
// return axios.delete(`organizer/${userId}/deletephoto`,data,{headers:{"Content-type":"application/json; charset=UTF-8"}}).then((res) => {

// organizer marketing
export const postOrganizerMarketing = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .post(`organizer/${userId}/marketing`, data)
    .then((res) => res.data);
};
//organizer submission

export const getOrganizerSubmission = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.post(`organizer/${userId}/submission`, data).then((res) => {
    return res.data;
  });
};
export const patchOrganizerSubmissionJudgingStatus = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`organizer/${userId}/judgingstatus`, data).then((res) => {
    return res.data;
  });
};
export const patchOrganizerSubmissionSubmissionStatus = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .patch(`organizer/${userId}/submissionstatus`, data)
    .then((res) => {
      return res.data;
    });
};

export const getAllSeasonsDetails = () => {
  let userId = localStorage.getItem("userId");
  return axios.get(`organizer/${userId}/getAllSeasons`).then((res) => {
    // localStorage.setItem("festivalId",res.data._id)
    return res.data;
  });
};

//organizer

//manage email
export const getOrganizerManageComposeEmail = () => {
  let userId = localStorage.getItem("userId");
  let festivalId = localStorage.getItem("festivalId");

  return axios
    .get(`organizer/${userId}/composeemail?festivalid=${festivalId}`)
    .then((res) => {
      return res.data;
    });
};

export const postComposeMail = (data: propComposeMail) => {
  let userId = localStorage.getItem("userId");
  return axios
    .post(`organizer/${userId}/composeemail`, data)
    .then((res) => res.data);
};

//manage notification

export const patchOrganizerReviewManageNotificationPreference = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`organizer/${userId}/changenotipref`, data).then((res) => {
    return res.data;
  });
};
export const patchOrganizerReviewManageNotificationPreferenceData = (
  data: any
) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`organizer/${userId}/notipref`, data).then((res) => {
    return res.data;
  });
};

//manage confirm message

export const getOrganizerReviewsManageConfirmMessage = () => {
  let userId = localStorage.getItem("userId");
  let festivalId = localStorage.getItem("festivalId");
  return axios
    .get(`organizer/${userId}/confirmmessage?festivalid=${festivalId}`)
    .then((res) => {
      return res.data;
    });
};
export const patchOrganizerReviewManageConfirmMessage = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`organizer/${userId}/confirmmessage`, data).then((res) => {
    return res.data;
  });
};
// manage reviews

export const getOrganizerReviews = () => {
  let userId = localStorage.getItem("userId");
  let festivalId = localStorage.getItem("festivalId");

  return axios
    .get(`organizer/${userId}/review?festivalid=${festivalId}`)
    .then((res) => {
      return res.data;
    });
};

export const getOrganizerReviewsManageReviews = () => {
  let userId = localStorage.getItem("userId");
  let festivalId = localStorage.getItem("festivalId");
  return axios
    .get(`organizer/${userId}/review?festivalid=${festivalId}`)
    .then((res) => {
      return res.data;
    });
};
export const getOrganizerReviewsManageReviewsDelete = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .delete(`organizer/${userId}/review`, {
      data: data,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    });
};
export const postOrganizerFestival = (data: any) => {
  let userId = localStorage.getItem("userId");
  let festivalId = localStorage.getItem("festivalId");
  return axios
    .post(`organizer/${userId}/festival?festival=${festivalId}`, data)
    .then((res) => {
      return res.data;
    });
};

//organizer setting
export const patchOrganizerUpdateProfile = (data: propUpdateProfile) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`organizer/${userId}/updateProfile`, data).then((res) => {
    return res.data;
  });
};
export const patchOrganizerPayout = (data: propOrganizerPayout) => {
  let userId = localStorage.getItem("userId");
  return axios.post(`organizer/${userId}/account`, data).then((res) => {
    return res.data;
  });
};
export const getChangePassword = (data: propChangePassword) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`organizer/${userId}/changePassword`, data).then((res) => {
    return res.data;
  });
};
export const getOrganizerTransaction = (range: any) => {
  let userId = localStorage.getItem("userId");
  let festivalId = localStorage.getItem("festivalId");

  return axios
    .get(
      `organizer/${userId}/transactions?from=${range.startDate}&to=${range.endDate}&festivalid=${festivalId}`
    )
    .then((res) => {
      return res.data;
    });
};

//director dashboard
export const getDirectorDashboard = () => {
  let userId = localStorage.getItem("userId");
  return axios.get(`director/${userId}/dashboard`).then((res) => {
    return res.data;
  });
};

export const getDirectorProfile = () => {
  let userId = localStorage.getItem("userId");
  return axios.get(`director/${userId}/profile`).then((res) => {
    return res.data;
  });
};

//director my submission
export const getDirectorMySubmission = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.post(`director/${userId}/mysubmission`, data).then((res) => {
    return res.data;
  });
};
//director my setting
export const getDirectorTransaction = () => {
  let userId = localStorage.getItem("userId");
  return axios
    .get(`director/${userId}/transactions?from=2022-12-05&to=2023-01-05`)
    .then((res) => {
      return res.data;
    });
};

export const patchDirectorUpdateProfile = (data: propUpdateProfile) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`director/${userId}/updateProfile`, data).then((res) => {
    return res.data;
  });
};
export const patchDirectorUpdateProfilePicture = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .patch(`director/${userId}/updateProfilePicture`, data)
    .then((res) => {
      return res.data;
    });
};

//director my project
export const getDirectorMyProject = () => {
  let userId = localStorage.getItem("userId");
  return axios.get(`director/${userId}/project`).then((res) => {
    return res.data;
  });
};
export const deleteDirectorProject = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .delete(`director/${userId}/deleteProject`, {
      data: data,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    });
};
//editdetail >>add project
export const postDirectorProject = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .post(`director/${userId}/project`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};
//director view project
export const deleteDirectorProjectViewNews = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .delete(`director/${userId}/article`, {
      data: data,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    });
};
export const patchDirectorProjectViewNews = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`director/${userId}/article`, data).then((res) => {
    return res.data;
  });
};
export const patchDirectorProjectViewBio = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`director/${userId}/directorbio`, data).then((res) => {
    return res.data;
  });
};
export const patchDirectorProjectViewWatchVideo = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`director/${userId}/videolink`, data).then((res) => {
    return res.data;
  });
};

export const patchDirectorProjectViewWatchTrailer = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`director/${userId}/trailer`, data).then((res) => {
    return res.data;
  });
};
export const patchDirectorProjectPoster = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`director/${userId}/poster`, data).then((res) => {
    return res.data;
  });
};
export const patchDirectorImage = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios
    .patch(`director/${userId}/directorheadshot`, data)
    .then((res) => {
      return res.data;
    });
};
export const patchDirectorStillPhoto = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`director/${userId}/stillphoto`, data).then((res) => {
    return res.data;
  });
};
export const patchDirectorFileUpload = (data: any) => {
  let userId = localStorage.getItem("userId");
  return axios.patch(`director/${userId}/fileattachment`, data).then((res) => {
    return res.data;
  });
};

//test deleteable
// export const test = () => {
//   let userId = localStorage.getItem("userId");
//   return axios.get(`director/${userId}/project/:id=63b27ee5e95d682d6c036d84`).then((res) => {
//     console.log(res.data);
//     return res.data;
//   });
// };
// console.log("testinmg");
// test()
// getDirectorMyProject()

export default instance;

// const {data } = useQuery(["ListAllPlans"] ,getListAllPlans,{
//     onSuccess:(response)=>{
//         console.log(response);
//     },
//     onError:( error)=> {
//         console.error(error)
//     }
// })

// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

// const aa{
//   namw:"sdfsdf",
//    sdfsd=() => {

//   }
// }

// let text = new Text({
//   name : 'shubham',
//   email : 'shubham@gmail.com',

// })

// console.log(text?.name);
