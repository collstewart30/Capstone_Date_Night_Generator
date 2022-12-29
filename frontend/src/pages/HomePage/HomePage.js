import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [user, token] = useAuth();
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication

  return (
    <div className="container">
      <h1>Welcome, {user.username}!</h1>
      <p>
          <Link to={`/user/${user.id}`} style={{ textDecoration: "none", color: "orange" }}>
            <b>Profile</b>
          </Link>
        </p>
      <h2>Choose from the below options to start planning your date night!</h2>
      <p><Link to="/ticketmaster">Ticketmaster</Link></p>
      <p><Link to="/nps">NPS</Link></p>
      <p><Link to="/yelp">Yelp</Link></p>
    </div>
  );
};


export default HomePage;
