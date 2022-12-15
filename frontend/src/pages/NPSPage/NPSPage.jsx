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


  const [event_id, setEvent_id] = useState("");
  const [park_id, setPark_id] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image_url, setImage_url] = useState("");
  const [park_name, setPark_name] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [saveCurrent, setSaveCurrent] = useState("False");
  const [saveFuture, setSaveFuture] = useState("False");
  const [completed, setCompleted] = useState("False");
  const [isFavorite, setIsFavorite] = useState("False");


    let markCompleteNPSData = {
      user: user.id,
      event_id: event_id,
      park_id: park_id,
      title: title,
      url: url,
      image_url: image_url,
      park_name: park_name,
      state: state,
      description: description,
      type: type,
      saveCurrent: saveCurrent,
      saveFuture: saveFuture,
      completed: completed,
      isFavorite: isFavorite,
  };

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


  // const markComplete = (NPSData) => {
  //     setEvent_id(response.data.data.id);
  //     // setPark_id(response.data.data.);
  //     setTitle(response.data.data.title);
  //     setUrl(response.data.data.url);
  //     setImage_url(response.data.data.images.url);
  //     setPark_name(response.data.data.relatedParks.fullName);
  //     setState(response.data.data.relatedParks.states);
  //     setDescription(response.data.data.shortDescription);
  // };
  
  
  return (
    <div>
      <h1>Search by state</h1>
      <SearchBar searchBarParent={getNPSData} />
      {NPSData[0] &&
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
            {/* <NPStoBackend markComplete={setEvent_id(data.id)} />      */}
          </div>
        ))}
    </div>
  );
};

export default NPSPage;
