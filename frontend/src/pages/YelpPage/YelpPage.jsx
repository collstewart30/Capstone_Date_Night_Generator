import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import useAuth from "../../hooks/useAuth";
import YelpSaveForFuture from "../../components/YelpSaveForFuture/YelpSaveForFuture";

const YelpPage = () => {
  const [yelpData, setYelpData] = useState([]);
  const [user, token] = useAuth();
  const [location, setLocation] = useState();

  useEffect(() => {
    getYelpData();
  }, []);

  const searchYelpLocation = (searchTerm) => {
    setLocation(searchTerm);
    console.log("setLocation function called ", searchTerm);
    getYelpData(searchTerm);
  };

  // location parameter not pulling location from SearchBar

  const getYelpData = async (location) => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/yelp/yelp_api/`,
        {
          params: {
            location: location,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Yelp API");
      console.log(response.data.businesses);
      setYelpData(response.data.businesses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Search by city</h1>
      <SearchBar searchBarParent={searchYelpLocation} />
      <div className="grid-container">
        {yelpData &&
          yelpData.map((data) => (
            <div
              key={data.id}
              className="list-unstyled text-decoration-none"
              style={{ border: ".75px solid black", margin: ".5em" }}
            >
              <h2>{data.name}</h2>
              <p>Type: {data.categories[0].title}</p>
              <p>
                <img
                  id="ytplayer"
                  type="text/html"
                  width="160"
                  height="90"
                  src={data.image_url}
                  border="1px solid #555"
                />
              </p>
              <YelpSaveForFuture
                business_id={data.id}
                name={data.name}
                url={data.url}
                image_url={data.image_url}
                cuisine_type={data.categories[0].title}
                city={data.location.city}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default YelpPage;
