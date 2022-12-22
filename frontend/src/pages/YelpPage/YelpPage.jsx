import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import useAuth from "../../hooks/useAuth";
import YelpSaveForFuture from "../../components/YelpSaveForFuture/YelpSaveForFuture";

const YelpPage = () => {
  const [yelpData, setYelpData] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    getYelpData();
  }, []);

  const getYelpData = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/yelp/yelp_api/`,
        {
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
      <SearchBar searchBarParent={getYelpData} />
      {yelpData &&
        yelpData.map((data) => (
          <div key={data.id} className="list-unstyled text-decoration-none">
            <p>{data.name}</p>
            <p>Type: {data.categories[0].title}</p>
            <p>
              <img
                id="ytplayer"
                type="text/html"
                width="320"
                height="180"
                src={data.image_url}
                frameBorder="0"
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
  );
};

export default YelpPage;
