import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import { tickemasterKEY } from "../../localKey";
import { Navigate, Link } from "react-router-dom";

import TicketMasterPage from "../TicketmasterPage/TicketMasterPage";
import EmailJS from "../../components/EmailJS/EmailJS";
import AuthContext from "../../context/AuthContext";

const HomePage = () => {
  const [user, token] = useAuth();
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  // const [user, token] = useAuth();
  // const [eventsData, setEventsData] = useState([]);

  // useEffect(() => {
  //   console.log('useEffect')
  //   getTicketmasterResults();
  // }, [token]);

  // const getTicketmasterResults = async (searchTerm = "MD") => {
  //   try {
  //     let response = await axios.get(
  //       `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tickemasterKEY}&size=10&stateCode=${searchTerm}`
  //     );
  //     setEventsData(response.data._embedded.events);
  //     console.log("Ticketmaster API data:", response.data._embedded.events);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  {/* <button onClick={() => Navigate("/ticketmaster")}>Ticketmaster</button>
  <button onClick={() => Navigate("/nps")}>NPS</button>
  <button onClick={() => Navigate("/yelp")}>Yelp</button> */}

  return (
    <div className="container">
      <h1>Welcome, {user.username}!</h1>
      <h2>Choose from the below options to start planning your date night!</h2>
      <p><Link to="/ticketmaster">Ticketmaster</Link></p>
      <p><Link to="/nps">NPS</Link></p>
      <p><Link to="/yelp">Yelp</Link></p>
      {/* <EmailJS /> */}
    </div>
  );
};


export default HomePage;
