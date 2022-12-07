import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import { tickemasterKEY } from "../../localKey";
import { Link } from "react-router-dom";

const HomePage = () => {
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

  return (
    // <Link to={`/ticketmaster`}>Click for Ticketmaster</Link>
    // <Link to={`/nps`}>Click for NPS</Link>
    <Link to={`/yelp`}>Click for Yelp</Link>
  );
};


export default HomePage;
