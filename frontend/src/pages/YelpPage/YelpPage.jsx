import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { npsKEY } from "../../localKey";

const YelpPage = () => {

    const[yelpData, setYelpData] = useState([]);

    useEffect(() => {
        getYelpData();
      }, []);
    
      const getYelpData = async () => {
        try {
          let response = await axios.get(`https://developer.nps.gov/api/v1/thingstodo?stateCode=PA%2CMD&api_key=${npsKEY}`
          );
          console.log("Yelp API");
          console.log(response);
          seNPSData(response);
        } catch (error) {
          console.log(error);
        }
      };

    return ( 
        <button></button>
    );
}
 
export default YelpPage;