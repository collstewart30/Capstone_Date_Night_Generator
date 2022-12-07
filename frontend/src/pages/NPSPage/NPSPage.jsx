import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { npsKEY } from "../../localKey";

const NPSPage = () => {

    const[NPSData, setNPSData] = useState([]);

    useEffect(() => {
        getNPSData();
      }, []);
    
      const getNPSData = async () => {
        try {
          let response = await axios.get(`https://developer.nps.gov/api/v1/thingstodo?stateCode=PA%2CMD&api_key=${npsKEY}`
          );
          console.log("NPS API");
          console.log(response.data.data);
          setNPSData(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };

    return ( 
        <button></button>
    );
}
 
export default NPSPage;