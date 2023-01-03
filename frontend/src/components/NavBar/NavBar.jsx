import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import logo from "../../logo/logo.png";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="logo"/>
      <ul className="nav">
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Home</b>
          </Link>
        </li>
        <li className="brand">
          <Link
            to="/user/:userid"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Profile</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>LOGOUT</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
