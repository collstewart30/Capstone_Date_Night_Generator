import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { yelpKEY } from "../../localKey";
import SearchBar from "../../components/SearchBar/SearchBar";

const YelpPage = () => {

    const[yelpData, setYelpData] = useState([]);

    useEffect(() => {
        getYelpData();
      }, []);
    
      const getYelpData = async (city = "Baltimore") => {
        try {
          let response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurant&location=${city}`,{
            headers: {
                Authorization: `Bearer ${yelpKEY}`
            },
          }
          );
          console.log("Yelp API");
          console.log(response);
          setYelpData(response.data.businesses);
        } catch (error) {
          console.log(error);
        }
      };

    return ( 
      <div>
      <h1>Search by city</h1>
      <SearchBar searchBarParent={getYelpData} />
      {yelpData &&
        yelpData.map((data) => (
          <div key={data.id} className="list-unstyled text-decoration-none">
            <li>{data.name}</li>
            <li>{data.categories.title}</li>
            <li>
              <img
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                src={data.images_url}
                frameBorder="0"
              />
            </li>
          </div>
        ))}
    </div>
  );
}
 
export default YelpPage;