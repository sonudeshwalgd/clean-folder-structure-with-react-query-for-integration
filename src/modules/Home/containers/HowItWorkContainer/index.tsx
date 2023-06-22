import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Body } from "./styled";
//content
import banner from "./../../../../assets/images/howitworks/banner.svg";
import movie from "./../../../../assets/images/multi/movie.svg";
import sphere from "./../../../../assets/images/multi/sphere.svg";
import film_img from "./../../../../assets/images/multi/Film_Strip.svg";
import { useQuery } from "react-query";
import { getListAllPlans } from "../../../../core/Api/Api";

type RenderActiveType<key> = {
  Film: React.ReactElement;
  Organizer: React.ReactElement;
  Benefits: React.ReactElement;
};

export default function HowItWorks() {
  const [renderSelector, setRenderSelector] = useState<string>("Film");

  const handleChangeActive = (value: string): void => {
    setRenderSelector(value);
  };

  const renderActive = (): React.ReactElement => {
    switch (renderSelector) {
      case "Film":
        return <FilmComponent />;
      case "Organizer":
        return <OrganiserComponent />;
      case "Benefits":
        return <BenefitComponent />;
      default:
        return <FilmComponent />;
    }
  };

  return (
    <>
      <img id="imgtest_right" className="tohide" src={movie}></img>
      <img id="imgtest_right2" src={film_img}></img>
      <img id="imgtest_left" src={sphere}></img>
      <Body>
        <div>
          <div className="heading">
            <img src={banner}></img>
            <h1>Simple and Easy</h1>
            <h1>Submission Platform</h1>
          </div>
          <div className="selector">
            <div>
              <ul>
                <li
                  className={` ${
                    renderSelector === "Film" && "active_button "
                  }`}
                  onClick={() => {
                    handleChangeActive("Film");
                  }}
                >
                  Film Maker
                </li>
                <li
                  className={`${
                    renderSelector === "Organizer" && "active_button "
                  }`}
                  onClick={() => handleChangeActive("Organizer")}
                >
                  Organizer
                </li>
                <li
                  className={`${
                    renderSelector === "Benefits" && "active_button "
                  }`}
                  onClick={() => handleChangeActive("Benefits")}
                >
                  Benefits
                </li>
              </ul>
            </div>
          </div>
          <div className="scale">{renderActive()}</div>
        </div>
      </Body>
    </>
  );
}

const FilmComponent = () => {
  const [activeCard, setActiveCard] = useState("SupportCard");

  const isActiveCard = (card: string) => {
    setActiveCard(card);
  };
  return (
    <>
      <div className="organizer">
        <h1>Benefits of Film Maker</h1>
        <ol>
          <li>
            1) You can avoid being cheated , and the resposibility of your film
            will be with the film festival company
          </li>
          <li>
            2) Here you will see film and short film festivals going on it
            different part of world
          </li>
          <li>3) You can record your film in various film festivals</li>
          <li>
            4) If you have any complaint about any film festival, you can
            contact us directly
          </li>
          <li>
            5) You will not be charged any extra fee for the Film Festival
            Company while submitting the film except the entry fee charged by
            the festivals.
          </li>
        </ol>
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
                If you have any Query/ complaint about any film festival you can
                contact us
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
                world from single place even if
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
      </div>
    </>
  );
};

const OrganiserComponent = () => {
  const [activeCard, setActiveCard] = useState("SupportCard");

  const isActiveCard = (card: string) => {
    setActiveCard(card);
  };
  return (
    <div className="film_maker">
      <h1>Benefits of Organizer</h1>
      <ol>
        <li>1) You will not be charged any fees , participation</li>
        <li>
          2) Promotion advertisement of festivals will be done free of cost
          through our company
        </li>
        <li>
          3)Addmision fees collected by the company for your festivals will be
          transferred free of cost , no additional charger for this{" "}
        </li>
        <li>
          4) Our company will always help to promote your festivals so that more
          submission come to your festivals{" "}
        </li>
      </ol>
      <div className="benifits">
        <div>
          <h1>Why organizer Choose Us</h1>
          <h5>Following are the benefits by using film festivals</h5>
        </div>
      </div>
      <div className="benifit_card">
        <div>
          <div
            className={`card ${activeCard == "feeCard" ? "active_card" : ""}`}
            onMouseEnter={() => {
              isActiveCard("feeCard");
            }}
          >
            <h2>Fees</h2>
            <h5>We will not charge for anything</h5>
          </div>
          <div
            className={`card ${
              activeCard == "marketingCard" ? "active_card" : ""
            }`}
            onMouseEnter={() => {
              isActiveCard("marketingCard");
            }}
          >
            <h2>Marketing</h2>
            <h5>
              promotion/advertisement will be done free of cost through website
            </h5>
          </div>
          <div
            className={`card ${
              activeCard == "withdrawalCard" ? "active_card" : ""
            }`}
            onMouseEnter={() => {
              isActiveCard("withdrawalCard");
            }}
          >
            <h2>Immediate Withdrawal</h2>
            <h5>
              Entry fees collected by the company fo yur festivals will be
              transferred immediate on working days
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

const BenefitComponent = () => {
  const [activeCard, setActiveCard] = useState("SupportCard");

  const isActiveCard = (card: string) => {
    setActiveCard(card);
  };
  const { data } = useQuery("listPlan", getListAllPlans);

  return (
    <div className="benefits_simple ">
      <ol>
        <li className="heading">
          {" "}
          Let us know what are the benefits of being a member of a film festival
          company ?
        </li>
        <li>
          We strive to provide you with as many free features as possible, You
          can become a free member here without paying any additional fees, for
          which we do not charge any charges from you.
        </li>
        <li className="inside">
          Email marketing is free and you will not be charged for it.
        </li>
        <li className="inside">
          The promotion of your festival will be done free of cost through the
          company, for which no charges will be levied.
        </li>
        <li className="inside">
          You will be notified by email of the films submitted to your festival
          in the form of notifications
        </li>

        <li className="heading2">We are providing a special service for you</li>
        <li>
          {" "}
          If you want a Blue Badge for the Festival Profile, you can get a Blue
          Badge by clicking on the link below.You will have to pay more for this
        </li>

        <li className=" heading2">
          You can take advantage of the following Blue tick verified badge
          services
        </li>
      </ol>
      <div className="benifits ">
        <div></div>
      </div>
      {data?.map((ele: any) => {
        return (
          <div className="benifit_card card benifit_card_left ">
            <div>
              <div className="card2 card ">
                <h1>{ele?.name} </h1>
                <h3>₹ {ele?.price} /-</h3>
                <h4>{ele?.month} Months</h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
