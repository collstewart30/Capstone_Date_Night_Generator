import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [user, token] = useAuth();
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication

  return (
    <div className="container">
      <h1>Welcome, {user.first_name}!</h1>
      <h2>Choose from the below options to start planning your date night:</h2>
      <div>
        <p>
          <Link to="/ticketmaster" className="Link">Ticketmaster</Link>
        </p>
        <p>
          <Link to="/nps" className="Link">NPS</Link>
        </p>
        <p>
          <Link to="/yelp" className="Link">Yelp</Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
