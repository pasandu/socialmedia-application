import React from "react";
import { FiSearch, FiBell, FiSettings, FiMessageSquare, FiEdit, FiActivity, FiClipboard, FiUsers, FiUser,FiLogOut } from "react-icons/fi"; // Import the icons from react-icons
import { Link } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <div>
      <div className="App shadow p-3">
        <div className="sidebar open">
          <div className="sidebar-header" style={{ marginTop: "-89px" }}></div>
          <ul className="nav-links p-1" style={{ marginTop: "90px" }}>

            <Link to="/create-post">
            <li>
              <button  type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px",marginLeft:"10px" }}>
                <div>
                <FiEdit style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}>Creat Post</span>
                </div>
              </button>
            </li>
            </Link>

            <li>
              <button type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px" ,marginLeft:"10px"}}>
                <div>
                <FiActivity style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}>Workout Status</span>
                </div>
              </button>
            </li>

            <li>
              <button type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px" ,marginLeft:"10px"}}>
                <div>
                <FiClipboard style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}> Workout Plan</span>
                </div>
              </button>
            </li>

            <li>
              <button type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px" ,marginLeft:"10px"}}>
                <div>
                <FiClipboard style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}>Meal Plan</span>
                </div>
              </button>
            </li>

            <li>
              <button type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px" ,marginLeft:"10px"}}>
                <div>
                <FiUsers style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}>Friends</span>
                </div>
              </button>
            </li>

            <li>
              <button type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px" ,marginLeft:"10px"}}>
                <div>
                <FiBell style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}>Notifications</span>
                </div>
              </button>
            </li>
          
          <Link to="/user-profile">
            <li>
              <button type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px" ,marginLeft:"10px"}}>
                <div>
                <FiUser style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}>View Profile</span>
                </div>
              </button>
            </li>
            </Link>

            <li>
              <button type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px",marginLeft:"10px" }}>
                <div>
                <FiSettings style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}>Settings</span>
                </div>
              </button>
            </li>

            <li>
              <button type="button" className="btn btn-primary d-flex mb-2" style={{ width: "210px",marginLeft:"10px" }}>
                <div>
                <FiLogOut style={{ marginRight: "5px" }} />
                </div>
                <div className="" style={{marginLeft:"20px"}}> 
                <span style={{marginRight:"30px"}}>Sign Out</span>
                </div>
              </button>
            </li>

          </ul>
        </div>

        <div className="main-content">
          <nav className="navbar fixed-top d-flex ">
            <Link to="/home" style={{color:"inherit",textDecoration:"none" }}>
            <div>
            <h2 className="p-2 mt-2" style={{ marginLeft: "50px" }}>Shape Shift</h2>
            </div>
            </Link>

            <div className="d-flex  mb-4" style={{marginLeft:"250px" , marginTop:"-50px"}}>
              <div
                className=""
                style={{ marginRight: "700px", width: "300px" }}
              >
                <div className="d-flex mt-1">
                  <input className="form-control" placeholder="search.." style={{width:"700px"}}></input>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginLeft: "10px" }}
                  >
                    <FiSearch />
                  </button>{" "}
                </div>
              </div>

              <div className="d-flex">
                <div className="">
                  <button
                    type="button"
                    className="btn btn-primary "
                    style={{
                      marginRight: "20px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                    }}
                  >
                    <FiMessageSquare />
                  </button>{" "}
                </div>

                <div className="">
                  <button
                    type="button"
                    className="btn btn-primary "
                    style={{
                      marginRight: "20px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                    }}
                  >
                    <FiSettings />
                  </button>{" "}
                </div>

                <div className="" style={{ marginRight: "20px" }}>
                  <button
                    type="button"
                    className="btn btn-primary "
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                    }}
                  >
                    <FiBell />
                  </button>{" "}
                </div>

                <div>
                  <img
                    src="./images/img1.jpg"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
