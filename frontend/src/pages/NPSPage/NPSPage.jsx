import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { npsKEY } from "../../localKey";
import SearchBar from "../../components/SearchBar/SearchBar";
import NPStoBackend from "../../components/NPStoBackend/NPStoBackend";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const NPSPage = (props) => {
  const [NPSData, setNPSData] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getNPSData();
    }
    return () => (mounted = false);
  }, []);

  const getNPSData = async (searchTerm = "MD") => {
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

  // RELATED PARKS[] : will pull the park/event/hike if you enter one state in list of all it's related states

  return (
    <div className="container">
      <h1>Search by state</h1>
      <SearchBar searchBarParent={getNPSData} />
      {NPSData[0] &&
        NPSData.map((data) => (
          <div key={data.id} className="list-unstyled text-decoration-none">
            <p>{data.title}</p>
            <p>{data.shortDescription}</p>
            <p>{data.relatedParks[0].fullName}</p>
            <p>{data.activities[0].name}</p>
            <p>
              <img
                id="ytplayer"
                type="text/html"
                width="320"
                height="180"
                src={data.images[0].url}
                frameBorder="0"
              />
            </p>
            <NPStoBackend
              event_id={data.id}
              parkCode={data.relatedParks.parkCode}
              title={data.title}
              url={data.url}
              image_url={data.images[0].url}
              park_name={data.relatedParks[0].fullName}
              state={data.relatedParks[0].states}
              description={data.shortDescription}
              type={data.activities[0].name}
            />
          </div>
        ))}
    </div>
  );
};

export default NPSPage;
