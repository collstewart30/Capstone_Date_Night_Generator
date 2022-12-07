import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { token } from "../../localKey";

const YelpPage = () => {

    const[yelpData, setYelpData] = useState([]);
    const[location, setLocation] = useState('Baltimore');

    useEffect(() => {
        getYelpData();
      }, []);
    
      const getYelpData = async () => {
        try {
          let response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurant&location=${location}`,{
            headers: {
                Authorization: "Bearer " + token,
            },
          }
          );
          console.log("Yelp API");
          console.log(response);
          setYelpData(response);
        } catch (error) {
          console.log(error);
        }
      };

    return ( 
        <button></button>
    );
}
 
export default YelpPage;