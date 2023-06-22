import React, { useState, useEffect, useLayoutEffect } from "react";
import { HomeWrapper } from "./styled";
import { Link } from "react-router-dom";
import person from "../../../../assets/images/homepage/person.svg";
import mouse from "../../../../assets/images/homepage/mouse.svg";
import right from "../../../../assets/images/homepage/right.jpg";
import left from "../../../../assets/images/homepage/left.jpg";
import movie from "../../../../assets/images/multi/movie.svg";
import sphere from "../../../../assets/images/multi/sphere.svg";

const HomeContainer = () => {
  const [activeCard, setActiveCard] = useState("SupportCard");

  const isActiveCard = (card: string) => {
    setActiveCard(card);
  };

  // useEffect(() => {
  //   console.log("1")
  //   return () => {
  //     console.log("2")
  //   }
  // }, [])

  return (
    <>
      <img id="imgtest_right" src={movie}></img>
      <img id="imgtest_left" src={sphere}></img>
      <HomeWrapper>
        <div>
          <div className="head">
            <div className="text">
              <h1>Submission Platform</h1>
              <h5 className="zIndex2">
                Here you can see various film festivals around the world
                <br></br> Now you can submit your film to any film festival in
                the world.
              </h5>
              <Link className="link zIndex2" to={"/"}>
                <button className="zIndex2">
                  <i className="ri-play-circle-line"></i>
                  View Festivals
                </button>
              </Link>
            </div>
            <div className="img">
              <img src={person}></img>
            </div>
          </div>
          <div className="mouse">
            <div className="mouse">
              <img src={mouse}></img>
              <h5>Scroll down</h5>
            </div>
          </div>
          <div className="benifits">
            <div>
              <h1>Why Film Makers Choose Us</h1>
              <h5>Following are the benefits by using film festivals</h5>
            </div>
          </div>
          <div className="benifit_card">
            <div>
              <div
                className={`card ${
                  activeCard == "SupportCard" ? "active_card" : ""
                }`}
                onMouseEnter={() => {
                  isActiveCard("SupportCard");
                }}
              >
                <h2>24/7 Support</h2>
                <h5>
                  If you have any Query/ complaint about any film festival you
                  can contact us.
                </h5>
              </div>
              <div
                className={`card ${activeCard == "joinCard" && "active_card"}`}
                onMouseEnter={() => {
                  isActiveCard("joinCard");
                }}
              >
                <h2>Join from anywhere</h2>
                <h5>
                  You can record your film in various film festivals around the
                  world from single place even if.
                </h5>
              </div>
              <div
                className={`card ${
                  activeCard == "chargesCard" ? "active_card" : ""
                }`}
                onMouseEnter={() => {
                  isActiveCard("chargesCard");
                }}
              >
                <h2>Minimum Charges</h2>
                <h5>We gives you most of our services free.</h5>
              </div>
            </div>
          </div>
          <div className="gallery">
            <div className="grid">
              <div className="item item1">
                <div>
                  <h1>Create Magic</h1>
                  <h5>
                    Easily discover and enter thousands of the world top's film
                    festivals
                  </h5>
                </div>
              </div>
              <div className="item item2">
                <img src={right}></img>
              </div>
              <div className="item item3">
                <img src={left}></img>
              </div>
            </div>
          </div>
        </div>
      </HomeWrapper>
    </>
  );
};

export default HomeContainer;
