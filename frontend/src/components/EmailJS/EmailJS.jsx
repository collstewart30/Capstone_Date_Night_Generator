import emailjs from "emailjs-com";
import useAuth from "../../hooks/useAuth";
import "./EmailJS.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const EmailJS = (props) => {
  const [user, token] = useAuth();
  const [NPSCurrentNight, setNPSCurrentNight] = useState([]);
  const [TMCurrentNight, setTMCurrentNight] = useState([]);
  const [YelpCurrentNight, setYelpCurrentNight] = useState([]);

  useEffect(() => {
    fetchNPSCurrent();
    fetchTMCurrent();
    fetchYelpCurrent();
  }, []);

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

  const templateParams = {
    subject: "Your date night itinerary inside",
    name: `${user.first_name}`,
    message: [[NPSCurrentNight],[TMCurrentNight],[YelpCurrentNight]]
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_xyg31q3",
        "template_8wng7ul",
        templateParams,
        "rNS8dDRzazPcQrmwr"
      ) // API key: 'rNS8dDRzazPcQrmwr'
      .then(
        (result) => {
          console.log(result.text);
          console.log(`${user.first_name}`);
        },
        (error) => {
          console.log(error.text);
        }
      );
    //   e.target.reset()   // youtube tutorial has e.target instead of form.current.
  };

  return (
    <div>
      <div className="container">
        <button className="email-button" onClick={sendEmail}>
          Email Your Current Date Night's Itinerary
        </button>
      </div>
    </div>
  );
};

export default EmailJS;
