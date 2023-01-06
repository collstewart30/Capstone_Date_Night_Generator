import "./UserProfilePage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import NPSMarkComplete from "../../components/NPSMarkComplete/NPSMarkComplete";
import TMMarkComplete from "../../components/TMMarkComplete/TMMarkComplete";
import EmailJS from "../../components/EmailJS/EmailJS";
import YelpMarkComplete from "../../components/YelpMarkComplete/YelpMarkComplete";
import NPSSaveCurrentNight from "../../components/NPSSaveCurrentNight/NPSSaveCurrentNight";
import TMSaveCurrentNight from "../../components/TMSaveCurrentNight/TMSaveCurrentNight";
import YelpSaveCurrentNight from "../../components/YelpSaveCurrentNight/YelpSaveCurrrentNight";

const UserProfilePage = (props) => {
  const [user, token] = useAuth();
  const [NPSSaveFuture, setNPSSaveFuture] = useState([]);
  const [NPSCurrentNight, setNPSCurrentNight] = useState([]);
  const [NPSCompleted, setNPSCompleted] = useState([]);
  const [TMSaveFuture, setTMSaveFuture] = useState([]);
  const [TMCurrentNight, setTMCurrentNight] = useState([]);
  const [TMCompleted, setTMCompleted] = useState([]);
  const [YelpSaveFuture, setYelpSaveFuture] = useState([]);
  const [YelpCurrentNight, setYelpCurrentNight] = useState([]);
  const [YelpCompleted, setYelpCompleted] = useState([]);

  useEffect(() => {
    fetchNPSSaveFuture();
    fetchTMSaveFuture();
    fetchYelpSaveFuture();
    fetchNPSCurrent();
    fetchTMCurrent();
    fetchYelpCurrent();
    fetchNPSCompleted();
    fetchTMCompleted();
    fetchYelpCompleted();
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
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTMSaveFuture = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/ticketmaster/save_future/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setTMSaveFuture(response.data);
      console.log("Ticketmaster saved for future: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYelpSaveFuture = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/yelp/save_future/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setYelpSaveFuture(response.data);
      console.log("Yelp saved for future: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNPSCurrent = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/nps/save_current/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setNPSCurrentNight(response.data);
      console.log("NPS current date night", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTMCurrent = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/ticketmaster/save_current/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setTMCurrentNight(response.data);
      console.log("TM current date night", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYelpCurrent = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/yelp/save_current/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setYelpCurrentNight(response.data);
      console.log("Yelp current date night", response.data);
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
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTMCompleted = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/ticketmaster/completed/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setTMCompleted(response.data);
      console.log("TM completed", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYelpCompleted = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/yelp/completed/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setYelpCompleted(response.data);
      console.log("Yelp completed", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>{user.first_name}'s Profile</h1>
      <div>
        {NPSCurrentNight &&
        NPSCurrentNight.map((nps) => (
          <EmailJS
          nps_event_id={nps.event_id}
          nps_parkCode={nps.parkCode}
          nps_title={nps.title}
          nps_url={nps.url}
          nps_image_url={nps.image_url}
          nps_park_name={nps.park_name}
          nps_state={nps.state}
          nps_description={nps.description}
          nps_type={nps.type}/>
        ))};
        {TMCurrentNight &&
        TMCurrentNight.map((tm) => (
          <EmailJS
          tm_event_id={tm.event_id}
          tm_name={tm.name}
          tm_url={tm.url}
          tm_image={tm.image}
          tm_eventType={tm.eventType}
          tm_state={tm.state}
          />
        ))};
        {YelpCurrentNight &&
        YelpCurrentNight.map((yelp) => (
          <EmailJS 
          yelp_business_id={yelp.business_id}
          yelp_name={yelp.name}
          yelp_url={yelp.url}
          yelp_image_url={yelp.image_url}
          yelp_cuisine_type={yelp.cuisine_type}
          yelp_city={yelp.city}
          />
        ))}
      </div>
      

      <div className="container">
        <h2 className="profile-heading">
          Current Date Night:
        </h2>
        <div className="grid-container">
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

          {TMCurrentNight &&
            TMCurrentNight.map((tm) => (
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
              </div>
            ))}

          {YelpCurrentNight &&
            YelpCurrentNight.map((yelp) => (
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
              </div>
            ))}
        </div>
      </div>

      <div className="container">
        <h2 className="profile-heading">
          Future Dates:
        </h2>
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
          {TMSaveFuture &&
            TMSaveFuture.map((tm) => (
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
          {YelpSaveFuture &&
            YelpSaveFuture.map((yelp) => (
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
      <div>
        <h2 className="profile-heading">
          Completed Dates:
        </h2>
        <div className="grid-container">
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
          {TMCompleted &&
            TMCompleted.map((tm) => (
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
              </div>
            ))}
          {YelpCompleted &&
            YelpCompleted.map((yelp) => (
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
