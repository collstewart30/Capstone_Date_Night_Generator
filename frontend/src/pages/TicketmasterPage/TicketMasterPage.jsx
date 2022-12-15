import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tickemasterKEY } from "../../localKey";
import SearchBar from "../../components/SearchBar/SearchBar";

const TicketMasterPage = () => {
  const [ticketmasterData, setTicketmasterData] = useState([]);

  useEffect(() => {
    getTicketMasterData();
  }, []);

  const getTicketMasterData = async (searchTerm = "MD") => {
    try {
      let response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tickemasterKEY}&size=5&stateCode=${searchTerm}`
      );
      console.log("Ticketmaster API");
      console.log(response.data._embedded.events);
      setTicketmasterData(response.data._embedded.events);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Search by state abbreviation:</h1>
      <SearchBar searchBarParent={getTicketMasterData} />
      {ticketmasterData &&
        ticketmasterData.map((data) => (
          <div key={data.id} className="list-unstyled text-decoration-none">
            <p>{data.name}</p>
            <p>Location: {data._embedded.venues[0].name}</p>
            <p>
              <img
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                src={data.images[0].url}
                frameBorder="0"
              />
            </p>
          </div>
        ))}
    </div>
  );
};

export default TicketMasterPage;
