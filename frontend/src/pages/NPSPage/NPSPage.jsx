import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { npsKEY } from "../../localKey";
import SearchBar from "../../components/SearchBar/SearchBar";
import NPStoBackend from "../../components/NPStoBackend/NPStoBackend";



const NPSPage = () => {
  const [NPSData, setNPSData] = useState([]);

  useEffect(() => {
    getNPSData();
  }, []);

  const getNPSData = async (searchTerm = 'MD') => {
    try {
      let response = await axios.get(
        `https://developer.nps.gov/api/v1/thingstodo?stateCode=${searchTerm}%2CMD&api_key=${npsKEY}&limit=5`
      );
      console.log("NPS API");
      console.log(response.data.data);
      setNPSData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div>
      <h1>Search by state</h1>
      <SearchBar searchBarParent={getNPSData} />
      {NPSData &&
        NPSData.map((data) => (
          <div key={data.id} className="list-unstyled text-decoration-none">
            <li>{data.title}</li>
            <li>{data.shortDescription}</li>
            <li>
              <img
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                src={data.images.url}
                frameBorder="0"
              />
            </li>
            
            <NPStoBackend markCompleteParent={setNPSData} />
          </div>
        ))}
    </div>
  );
};

export default NPSPage;
