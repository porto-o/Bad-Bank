import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../../context/auth.context";

const NavBar = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await logOut();
    navigate("/signin");
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <NavLink
              className="navbar-brand custom-brand"
              to={"/me"}
              title="Home"
            >
              Bad Bank
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    exact="true"
                    to={"/me"}
                    title="Home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    exact="true"
                    to={"deposit"}
                    title="Deposit"
                  >
                    Deposit
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    exact="true"
                    to={"withdraw"}
                    title="Withdraw"
                  >
                    Withdraw
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    exact="true"
                    to={"history"}
                    title="History"
                  >
                    History
                  </NavLink>
                </li>
                {/* Add the logout icon up to the right of the navbar*/}
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    exact="true"
                    to={"/signin"}
                    title="Sign Out"
                    onClick={signOut}
                  >
                    <IoIosLogOut />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>{" "}
        <div>
          <Outlet 
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
