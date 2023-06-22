import React from "react";
import { Profile } from "./Styled";
import moment from "moment";

import { Link } from "react-router-dom";
import {
  getOrganizerProfileDetails,
  getUserNotificationDetails,
} from "../../../../core/Api/Api";
import { useQuery } from "react-query";

export default function UserProfile() {
  const { data } = useQuery(
    ["organizerDashboardProfile"],
    getOrganizerProfileDetails,
    {
      onSuccess: (response) => {
        console.log(response?.createdAt);
      },
      onError: (error) => {
        console.error(error);
      },
      refetchOnWindowFocus: false,
    }
  );

  //   const {data:notification } = useQuery(["ListAllPlans  "] ,getUserNotificationDetails,{
  //     onSuccess:(response)=>{
  //         console.log(response);
  //     },
  //     onError:( error)=> {
  //         console.error(error)
  //     }
  // })

  return (
    <>
      <Profile>
        <div>
          <img src={"http://3.89.138.204:3000/uploads/" + data?.imgurl}></img>
          <div>
            <h1>
              {data?.dataName}
              <p>
                Member since {moment(data?.createdAt).format("DD MMMM YYYY")}
              </p>
            </h1>
            <div className="space"></div>
            <Link className="link" to="/organizer/my-festival">
              <i className="ri-settings-3-fill"></i>
              <p>Manage Festivals</p>
            </Link>
            <Link className="link" to="/organizer/setting">
              <i className="ri-equalizer-fill"></i>
              <p>Account Setting</p>
            </Link>
          </div>
        </div>
      </Profile>
    </>
  );
}
