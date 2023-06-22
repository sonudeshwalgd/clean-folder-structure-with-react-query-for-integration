import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Result404 from "../Request result popup/Result404";

type LayoutWrapperPropsType = {
  children: React.ReactNode;
};

export const LayoutWrapper = ({ children }: LayoutWrapperPropsType) => {
  const [showResult, setShowResult] = useState<Boolean>(false);

  const isResultVisibleHandler = () => {
    setShowResult(false);
  };

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status == 401) {
        setShowResult(true);
      }
      return Promise.reject(error);
    }
  );

  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !axios.defaults.headers.common.Authorization &&
      pathname !== "/how-it-works" &&
      pathname !== "/view-festivals" &&
      pathname !== "/contact-us" &&
      pathname !== "/contact-us"
    ) {
      navigate("/home");
    }
  }, [pathname]);

  return (
    <>
      <div>{children}</div>
      {showResult && (
        <Result404
          showResult={isResultVisibleHandler}
          state="Error"
          description="Authorization Failed"
        />
      )}
    </>
  );
};

export const aaa = () => {
  return;
};
