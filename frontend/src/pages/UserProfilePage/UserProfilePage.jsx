// use views files to filter by each saved type
// button to change from "save for future" to "mark favorite," "save for current night," "mark complete"

// routes - user id in url

import "./UserProfilePage.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import NPSDisplaySaveForFuture from "../../components/NPSDisplaySaveForFuture/NPSDisplaySaveForFuture";
import NPSMarkComplete from "../../components/NPSMarkComplete/NPSMarkComplete";
import TMDisplaySaveForFuture from "../../components/TMDisplaySaveForFuture/TMDisplaySaveForFuture";
import YelpDisplaySaveForFuture from "../../components/YelpDisplaySaveForFuture/YelpDisplaySaveForFuture";
import EmailJS from "../../components/EmailJS/EmailJS";

const UserProfilePage = (props) => {
  const { userid } = useParams();
  const [user, token] = useAuth();
  const [userNPSDetail, setUserNPSDetail] = useState([]);
  const [userTMDetail, setUserTMDetail] = useState([]);
  const [userYelpDetail, setuserYelpDetail] = useState([]);
  const [NPSSaveForFuture, setNPSSaveForFuture] = useState([]);
  const [YelpSaveForFuture, setYelpSaveForFuture] = useState([]);

  useEffect(() => {
    fetchNPSDetails();
    fetchNPSSaveForFuture();
    // fetchTicketmasterDetails();
    // fetchYelpDetails();
    // fetchYelpSaveForFuture();
  }, []);

  const fetchNPSDetails = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/nps/`, {
        headers: { Authorization: "Bearer " + token },
      });
      setUserNPSDetail(response.data);
      console.log("NPS user ALL data: ", response.data);
      fetchNPSSaveForFuture(userNPSDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNPSSaveForFuture = async () => {
    try {
      let saveForFuture = userNPSDetail.filter((save) => {
        if (save.saveFuture.includes("True")) {
          console.log(saveForFuture);
          setNPSSaveForFuture(saveForFuture);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // need to filter for saveForFuture = "True". other backend api calls are pulling all saved info per user.
  // function fetchNPSSaveForFuture (){
  //   let saveForFuture = userNPSDetail.filter(function(save){
  //     if(save.saveFuture.includes("True")){
  //       return true
  //     }
  //   })
  //   console.log("NPS user set save for future: ", saveForFuture)
  //   setNPSSaveForFuture(saveForFuture)
  // }

  const fetchTicketmasterDetails = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/ticketmaster/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setUserTMDetail(response.data);
      console.log("Ticketmaster user save for future: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYelpDetails = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/yelp/`, {
        headers: { Authorization: "Bearer " + token },
      });
      setuserYelpDetail(response.data);
      console.log("Yelp user ALL data: ", response.data);
      fetchYelpSaveForFuture(userYelpDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYelpSaveForFuture = () => {
    try {
      let saveForFuture = userYelpDetail.filter((save) => {
        if (save.saveFuture.includes("True")) {
          return true;
        }
      });
      console.log("Yelp user set save for future: ", saveForFuture);
      setYelpSaveForFuture(saveForFuture);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome, {user.first_name}!</h1>
      <h1>User ID # {user.id}</h1>
      {/* <h1>{user.username}!</h1> */}
      {/* <h2>Email your info:</h2> */}
      <EmailJS />
      <h2>Here are your favorites:</h2>
      <div className="grid-container">
        {NPSSaveForFuture &&
          NPSSaveForFuture.map((nps) => (
            <div
              key={nps.event_id}
              style={{ border: ".75px solid black", margin: ".5em" }}
            >
              <NPSDisplaySaveForFuture nps={nps} />
            </div>
          ))}
        {userNPSDetail &&
          userNPSDetail.map((nps) => (
            <div
              key={nps.event_id}
              style={{ border: ".75px solid black", margin: ".5em" }}
            >
              <h2>{nps.title}</h2>
              <p>Location: {nps.park_name}</p>
              <p>
                <img
                  id="ytplayer"
                  type="text/html"
                  width="160"
                  height="90"
                  src={nps.image_url}
                  border="1px solid #555"
                />
              </p>
              <NPSMarkComplete
                event_id={nps.event_id}
                parkCode={nps.parkCode}
                title={nps.title}
                url={nps.url}
                image_url={nps.image_url}
                park_name={nps.park_name}
                state={nps.state}
                description={nps.description}
                type={nps.type}
              />
            </div>
          ))}
        {userTMDetail &&
          userTMDetail.map((tm) => (
            <div style={{ border: ".75px solid black", margin: ".5em" }}>
              <TMDisplaySaveForFuture key={tm.event_id} tm={tm} />
            </div>
          ))}
        {YelpSaveForFuture &&
          YelpSaveForFuture.map((yelp) => (
            <div style={{ border: ".75px solid black", margin: ".5em" }}>
              <YelpDisplaySaveForFuture key={yelp.id} yelp={yelp} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProfilePage;

