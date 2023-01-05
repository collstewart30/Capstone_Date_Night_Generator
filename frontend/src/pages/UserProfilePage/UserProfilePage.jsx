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
import TMMarkComplete from "../../components/TMMarkComplete/TMMarkComplete";
import TMDisplaySaveForFuture from "../../components/TMDisplaySaveForFuture/TMDisplaySaveForFuture";
import YelpDisplaySaveForFuture from "../../components/YelpDisplaySaveForFuture/YelpDisplaySaveForFuture";
import EmailJS from "../../components/EmailJS/EmailJS";
import YelpMarkComplete from "../../components/YelpMarkComplete/YelpMarkComplete";
import NPSSaveCurrentNight from "../../components/NPSSaveCurrentNight/NPSSaveCurrentNight";
import TMSaveCurrentNight from "../../components/TMSaveCurrentNight/TMSaveCurrentNight";
import YelpSaveCurrentNight from "../../components/YelpSaveCurrentNight/YelpSaveCurrrentNight";

const UserProfilePage = (props) => {
  const { userid } = useParams();
  const [user, token] = useAuth();
  const [NPSSaveFuture, setNPSSaveFuture] = useState([]);
  const [NPSCurrentNight, setNPSCurrentNight] = useState([]);
  const [NPSCompleted, setNPSCompleted] = useState([]);
  const [userTMDetail, setUserTMDetail] = useState([]);
  const [userYelpDetail, setuserYelpDetail] = useState([]);
  const [NPSSaveForFuture, setNPSSaveForFuture] = useState([]);
  const [YelpSaveForFuture, setYelpSaveForFuture] = useState([]);

  useEffect(() => {
    fetchNPSSaveFuture();
    fetchNPSSaveCurrent();
    fetchNPSCompleted();
    fetchTicketmasterDetails();
    fetchYelpDetails();
    // fetchYelpSaveForFuture();
  }, []);

  const fetchNPSSaveFuture = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/nps/save_future/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setNPSSaveFuture(response.data);
      console.log("NPS saved for future: ", response.data);
      // fetchNPSSaveForFuture(userNPSDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNPSSaveCurrent = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/nps/save_current/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setNPSCurrentNight(response.data);
      console.log("NPS current date night", response.data);
      // fetchNPSSaveForFuture(userNPSDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNPSCompleted = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/nps/completed/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setNPSCompleted(response.data);
      console.log("NPS completed", response.data);
      // fetchNPSSaveForFuture(userNPSDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTicketmasterDetails = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/ticketmaster/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setUserTMDetail(response.data);
      console.log(response.data);
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
      // fetchYelpSaveForFuture(userYelpDetail);
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
      <h1>Hey, {user.first_name}!</h1>
      <h1>User ID # {user.id}</h1>
      {/* <h1>{user.username}!</h1> */}
      {/* <h2>Email your info:</h2> */}
      <EmailJS />

      <div className="grid-container">
        <div>
          <h2>Current Date Night:</h2>
          {NPSCurrentNight &&
            NPSCurrentNight.map((nps) => (
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
              </div>
            ))}
        </div>
      </div>

      <div className="grid-container">
        <div>
          <h2>Completed:</h2>
          {NPSCompleted &&
            NPSCompleted.map((nps) => (
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
              </div>
            ))}
        </div>
      </div>

      <h2>Saved for Future:</h2>
      <div className="grid-container">
        {NPSSaveFuture &&
          NPSSaveFuture.map((nps) => (
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
              <NPSSaveCurrentNight
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
            <div
              key={tm.event_id}
              style={{ border: ".75px solid black", margin: ".5em" }}
            >
              <h2>{tm.name}</h2>
              <p>Event Type: {tm.eventType}</p>
              <p>
                <img
                  id="ytplayer"
                  type="text/html"
                  width="160"
                  height="90"
                  src={tm.image}
                  border="1px solid #555"
                />
              </p>
              <TMMarkComplete
                event_id={tm.event_id}
                name={tm.name}
                url={tm.url}
                image={tm.image}
                eventType={tm.eventType}
                state={tm.state}
              />
              <TMSaveCurrentNight
                event_id={tm.event_id}
                name={tm.name}
                url={tm.url}
                image={tm.image}
                eventType={tm.eventType}
                state={tm.state}
              />
            </div>
          ))}
        {userYelpDetail &&
          userYelpDetail.map((yelp) => (
            <div
              key={yelp.id}
              style={{ border: ".75px solid black", margin: ".5em" }}
            >
              <h2>{yelp.name}</h2>
              <p>Cuisine: {yelp.cuisine_type}</p>
              <p>
                <img
                  id="ytplayer"
                  type="text/html"
                  width="160"
                  height="90"
                  src={yelp.image_url}
                  border="1px solid #555"
                />
              </p>
              <YelpMarkComplete
                business_id={yelp.business_id}
                name={yelp.name}
                url={yelp.url}
                image_url={yelp.image_url}
                cuisine_type={yelp.cuisine_type}
                city={yelp.city}
              />
              <YelpSaveCurrentNight
                business_id={yelp.business_id}
                name={yelp.name}
                url={yelp.url}
                image_url={yelp.image_url}
                cuisine_type={yelp.cuisine_type}
                city={yelp.city}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProfilePage;
