import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import "../index.css";
import defaultProfilePhoto from "../assets/octocat.png";

export default function NavBar() {
  const { activeUser } = useContext(DataContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand custom-brand" to={"/"} title="Home">
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
                  exact={'true'}
                  to={"/"}
                  title="Home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to={"/deposit"}
                  title="Deposit"
                >
                  Deposit
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to={"/withdraw"}
                  title="Withdraw"
                >
                  Withdraw
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to={"/create-account"}
                  title="Create account"
                >
                  Create account
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to={"/all-data"}
                  title="All Data"
                >
                  All Data
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="https://www.youtube.com/watch?v=yuZo2GxhzM0"
                  title="How to use it? (Spanish)"
                  target="_blank"
                >
                  How to use it? (Spanish)
                </NavLink>
              </li>
            </ul>
          </div>
          {activeUser && (
            <div className="profile-photo-container">
              <p className="greeting">Hola, {activeUser.name}</p>
              <img
                src={
                  activeUser.photo
                    ? URL.createObjectURL(activeUser.photo)
                    : defaultProfilePhoto
                }
                alt={activeUser.name}
                className="profile-photo-navbar"
              />
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
