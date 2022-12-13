import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { npsKEY } from "../../localKey";
import SearchBar from "../../components/SearchBar/SearchBar";
import NPStoBackend from "../../components/NPStoBackend/NPStoBackend";



const NPSPage = (props) => {
  const [NPSData, setNPSData] = useState([]);

  useEffect(() => {
    let mounted = true;
    if(mounted){
      getNPSData();
    }
    return () => mounted = false;
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
            <p>{data.title}</p>
            <p>{data.shortDescription}</p>
            <p>
              <img
                id="ytplayer"
                type="text/html"
                width="320"
                height="180"
                src={data.images.url}
                frameBorder="0"
              />
            </p>
            <NPStoBackend markComplete={NPSData} />     
          </div>
        ))}
    </div>
  );
};

export default NPSPage;
