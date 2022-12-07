import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tickemasterKEY } from "../../localKey";


const TicketMasterPage = () => {

    const[ticketmasterData, setTicketmasterData] = useState([]);
    const[searchTerm, setSearchTerm] = useState('MD');

    useEffect(() => {
        getTicketMasterData();
      }, []);
    
      const getTicketMasterData = async () => {
        try {
          let response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tickemasterKEY}&size=5&stateCode=${searchTerm}`
          );
          console.log("Ticketmaster API");
          console.log(response.data._embedded.events);
          setTicketmasterData(response.data._embedded.events);
        } catch (error) {
          console.log(error);
        }
      };

    return ( 
        <button></button>
    );
}
 
export default TicketMasterPage;