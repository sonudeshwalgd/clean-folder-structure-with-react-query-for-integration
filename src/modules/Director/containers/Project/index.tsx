import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

//content
import calender from "./../../../../assets/images/organizer dashboard/calender.svg";
import add from "./../../../../assets/images/organizer dashboard/plus.svg";
import faculties1 from "../../../../assets/images/college_list/faculties1.jpg";
import caleder from "./../../../../assets/images/organizer dashboard/caleder.svg";
import privacy from "./../../../../assets/images/organizer dashboard/Privacy.svg";
import delete_img from "./../../../../assets/images/organizer dashboard/delete.svg";
import eye from "./../../../../assets/images/organizer dashboard/preview.svg";
import calesearchinger from "./../../../../assets/images/organizer dashboard/searching.svg";
import card_img from "./../../../../assets/images/organizer dashboard/card_img.svg";
import edit from "./../../../../assets/images/organizer dashboard/edit.svg";
import project from "./../../../../assets/images/organizer dashboard/Project File.svg";
import DeletePopup from "./DeletePopup";
import {
  deleteDirectorProject,
  getDirectorMyProject,
} from "../../../../core/Api/Api";
import { useMutation, useQuery } from "react-query";
// import DeletePopup from './DeletePopup'
// popuplefthere

export default function DirectorProject() {
  const navigate = useNavigate();
  let id = useRef<any>();

  const [remove, setRemove] = useState(false);
  const handleToggleDeletePopup = () => {
    setRemove(false);
  };

  const { data, refetch } = useQuery(
    "directorMyProject",
    getDirectorMyProject,
    {
      onSuccess: (res) => {
        console.log("project");
      },
      onError: (err) => {},
    }
  );

  const { mutate } = useMutation(
    "deleteDirectorProject",
    deleteDirectorProject,
    {
      onSuccess: (ele) => {
        refetch();
      },
    }
  );

  let promise;
  const isApiDispatch = new Promise((resolve, reject) => {
    promise = resolve;
  });

  isApiDispatch.then(() => {
    const payload = {
      id: id.current,
    };
    mutate(payload);
  });

  return (
    <>
      {remove && (
        <DeletePopup
          promiseProp={promise}
          togglePopup={handleToggleDeletePopup}
        ></DeletePopup>
      )}
      <ProjectBodyWrapper>
        <div>
          <SubmissionEvents>
            <div>
              <div className="drop">
                <h1 className="h1_with_right">
                  My Project (0)
                  <div className="flex"></div>
                  <button
                    onClick={() => {
                      navigate("/director/my-project/details-edit", {
                        state: { addProject: true },
                      });
                    }}
                  >
                    <img src={add} />
                    Add a project
                  </button>
                </h1>
                {!data?.length && (
                  <div className="content">
                    <div>
                      <img src={caleder}></img>
                      <h1>No Project Found</h1>
                      <p>Try uploading some project</p>
                      <button
                        onClick={() => {
                          navigate("/director/my-project/details-edit", {
                            state: { addProject: true },
                          });
                        }}
                      >
                        <img src={add} />
                        Add a project
                      </button>
                    </div>
                  </div>
                )}

                <div className="card_added">
                  {data?.map((ele: any) => {
                    return (
                      <Card id={ele._id} className="Review_card">
                        <div className="link">
                          <div className="left">
                            <img
                              className="pic"
                              src={
                                "http://3.89.138.204:3000/uploads/" +
                                ele.posterimage
                              }
                            ></img>
                          </div>
                          <div className="middle">
                            <h5>{ele?.projectTitle}</h5>

                            <h4>
                              {ele?.categoryType?.map((ele: any) => {
                                return ele + " , ";
                              })}
                            </h4>

                            <div className="button">
                              <button
                                className="like"
                                onClick={() => {
                                  localStorage.setItem("projectId", ele._id);
                                  navigate("details-edit", {
                                    state: { data: ele, exButton: "preview" },
                                  });
                                }}
                              >
                                <img src={eye}></img>
                                Preview
                              </button>
                              <button
                                onClick={() => {
                                  id.current = ele._id;
                                  setRemove(true);
                                }}
                                className="delete"
                              >
                                <img src={delete_img}></img>
                                Delete
                              </button>
                              <button
                                className="edit"
                                onClick={() => {
                                  localStorage.setItem("projectId", ele._id);
                                  navigate("details-edit", {
                                    state: { data: ele, exButton: "edit" },
                                  });
                                }}
                              >
                                <img src={edit}></img>
                                Edit
                              </button>
                            </div>
                          </div>
                          <div className="right">
                            <div className="button2">
                              <button className="edit">
                                <img src={edit}></img>
                                Edit
                              </button>
                              <button className="like">
                                <img src={eye}></img>
                                Preview
                              </button>
                              <button
                                onClick={() => {
                                  id.current = ele._id;
                                  setRemove(true);
                                }}
                                className="delete"
                              >
                                <img src={delete_img}></img>
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </SubmissionEvents>
        </div>
      </ProjectBodyWrapper>
    </>
  );
}

const ProjectBodyWrapper = styled.div`
  background-color: var(--background);
  & > div {
    margin: auto;
    max-width: var(--maxwidth);
    width: 100vw;
    background-color: white;
  }
  .card_added {
    width: 100%;
    padding: 20px;
  }
`;

const SubmissionEvents = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 5px 1px;
  margin-bottom: 20px;
  min-height: 600px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    & > .drop {
      & > .h1_with_right {
        font-size: 18px;
        color: #333;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 500;
        display: flex;
        align-items: center;
        font-weight: 700;
        & > .flex {
          flex: 1;
        }
        & > button {
          padding: 8px 20px;
          border-radius: 5px;
          font-size: 14px;
          float: right;
          font-weight: 600;
          background-color: var(--theme);
          color: white;
          display: flex;
          align-items: center;
          border: none;
          outline: none;
          margin: 10px auto;
          justify-content: center;
          & > img {
            margin-right: 10px;
            height: 15px;
          }
        }

        & > p {
          font-size: 14px;
          float: right;
          font-weight: 600;
        }
        & > button {
          padding: 8px 20px;
          border-radius: 5px;
          margin-left: 10px;
          float: right;
          font-weight: 600;
        }
      }
      & > .content {
        & > div {
          padding-top: 20px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          & > img {
            width: 90%;
            object-fit: cover;
            margin: auto;
            max-width: 250px;
          }
          & > h1 {
            font-size: 18px;
            color: #111;
            margin: auto;
            padding: 15px;
            font-weight: 700;
          }
          & > p {
            color: #666;
            text-align: center;
            padding-bottom: 5px;
            font-size: 14px;
          }
          & > button {
            padding: 8px 20px;
            border-radius: 5px;
            font-size: 16px;
            float: right;
            font-weight: 600;
            background-color: var(--theme);
            color: white;
            display: flex;
            align-items: center;
            border: none;
            outline: none;
            margin: 10px auto;
            justify-content: center;
            & > img {
              margin-right: 10px;
              height: 20px;
            }
          }
        }
      }
    }
  }
`;

const Card = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  & > .link {
    width: 100%;
    margin: auto;
    background-color: white;
    border: 1px solid #ccc;
    padding: 15px;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    flex-wrap: wrap;
    & > .left {
      width: 130px;
      @media screen and (max-width: 600px) {
        height: 130px;
        img {
          height: 130px !important;
          object-fit: cover;
        }
      }
      & > img {
        width: 130px;
        height: 170px;
        border-radius: 10px;
      }
    }
    & > .middle {
      padding: 0 18px 10px 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 15px;
      width: calc(100% - 130px);
      @media screen and (max-width: 600px) {
        gap: 5px;
      }
      & > h5 {
        font-size: 18px;
        font-weight: 700;
        color: #2a2a2a;
      }

      & > h4 {
        font-weight: 400;
        padding: 5px 0 5px 0;
        color: #555;
        font-size: 14px;
      }

      & > .button {
        width: 100%;
        display: flex;
        row-gap: 10px;
        flex-wrap: wrap;

        @media screen and (max-width: 600px) {
          display: none !important;
          img {
            display: none;
          }
        }
        & > button {
          padding: 6px 22px;
          outline: none;
          border: none;
          color: white;
          border-radius: 5px;
          margin-right: 15px;
          background-color: #169179;
          font-size: 15px;
          line-height: 150%;
          font-weight: 600;
          letter-spacing: -1px;
          gap: 10px;
          display: flex;
          align-items: center;
        }
        & > .delete {
          background-color: #d90000;
        }
        & > .edit {
          background-color: white;
          color: #555;
          border: 1px solid #555;
        }
      }
    }
    & > .right {
      display: none;
      padding-top: 10px;
      .button2 {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      button {
        padding: 6px 22px;
        outline: none;
        border: none;
        color: white;
        border-radius: 5px;
        background-color: #169179;
        font-size: 15px;
        line-height: 150%;
        font-weight: 600;
        letter-spacing: -1px;
        gap: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(50% - 5px);
      }
      .delete {
        background-color: #d90000;
        width: 100%;
      }
      .edit {
        background-color: white;
        color: #555;
        border: 1px solid #555;
      }
      @media screen and (max-width: 600px) {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
    @media screen and (max-width: 600px) {
      justify-content: center;
    }
  }
`;
