import React, { useState, useEffect } from "react";
import axios from "axios";
import { tickemasterKEY } from "../../localKey";
import SearchBar from "../../components/SearchBar/SearchBar";
import TMSaveForFuture from "../../components/TMSaveForFuture/TMSaveForFuture";
import "./TicketMasterPage.css";

const TicketMasterPage = () => {
  const [ticketmasterData, setTicketmasterData] = useState([]);

  useEffect(() => {
    getTicketMasterData();
  }, []);

  const getTicketMasterData = async (searchTerm = "MD") => {
    try {
      let response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tickemasterKEY}&size=12&stateCode=${searchTerm}`
      );
      console.log("Ticketmaster API");
      console.log(response.data._embedded.events);
      setTicketmasterData(response.data._embedded.events);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Search by state abbreviation:</h1>
      <SearchBar searchBarParent={getTicketMasterData} />
      <div className="grid-container">
        {ticketmasterData &&
          ticketmasterData.map((data) => (
            <div
              key={data.id}              
              style={{ border: ".75px solid black", margin: ".5em" }}
            >
              <h2 className="heading">{data.name}</h2>
              <p className="heading">
                Location: {data._embedded.venues[0].name}
              </p>
              <p>
                <img
                  id="ytplayer"
                  type="text/html"
                  width="320"
                  height="180"
                  src={data.images[0].url}
                  border="1px solid #555"
                />
              </p>
              <TMSaveForFuture
                event_id={data.id}
                name={data.name}
                url={data.url}
                image={data.images[0].url}
                eventType={data.classifications[0].genre.name}
                state={data._embedded.venues[0].state.name}
              />
            </div>
          ))}
        ;
      </div>
      ;
    </div>
  );
};

export default TicketMasterPage;
