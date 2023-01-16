import React, { useState, useEffect } from "react";
import axios from "axios";
import { npsKEY } from "../../localKey";
import SearchBar from "../../components/SearchBar/SearchBar";
import NPSSaveForFuture from "../../components/NPSSaveForFuture/NPSSaveForFuture";
import useAuth from "../../hooks/useAuth";
import NPSLogo from "../../logo/NPSLogo.png";

const NPSPage = () => {
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
        `https://developer.nps.gov/api/v1/thingstodo?stateCode=${searchTerm}%2CMD&api_key=${npsKEY}&limit=12`
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
      <h1>NATIONAL PARK SERVICE</h1>
      <img src={NPSLogo} alt="NPS"/>
      <h2>Search by state abbreviation:</h2>
      <SearchBar searchBarParent={getNPSData} />
      <div className="grid-container">
        {NPSData[0] &&
          NPSData.map((data) => (
            <div
              key={data.id}
              className="list-unstyled text-decoration-none"
              style={{ border: ".75px solid black", margin: ".5em" }}
            >
              <h2>{data.title}</h2>
              <p>Location: {data.relatedParks[0].fullName}</p>
              <p>
                <img
                  id="ytplayer"
                  type="text/html"
                  width="160"
                  height="90"
                  src={data.images[0].url}
                  border="1px solid #555"
                />
              </p>
              <NPSSaveForFuture
                event_id={data.id}
                parkCode={data.relatedParks[0].parkCode}
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
    </div>
  );
};

export default NPSPage;
