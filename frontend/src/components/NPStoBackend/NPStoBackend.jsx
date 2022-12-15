import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const NPStoBackend = (props) => {
  const [user, token] = useAuth();

  // const [event_id, setEvent_id] = useState("");
  // const [park_id, setPark_id] = useState("");
  // const [title, setTitle] = useState("");
  // const [url, setUrl] = useState("");
  // const [image_url, setImage_url] = useState("");
  // const [park_name, setPark_name] = useState("");
  // const [state, setState] = useState("");
  // const [description, setDescription] = useState("");
  // const [type, setType] = useState("");
  // const [saveCurrent, setSaveCurrent] = useState("False");
  // const [saveFuture, setSaveFuture] = useState("False");
  const [completed, setCompleted] = useState("False");
  // const [isFavorite, setIsFavorite] = useState("False");

  // let eventId = props.event_id;

  // let markCompleteNPSData = {
  //   user: user.id,
  //   event_id: even_id,
  //   park_id: park_id,
  //   title: title,
  //   url: url,
  //   image_url: image_url,
  //   park_name: park_name,
  //   state: state,
  //   description: description,
  //   type: type,
  //   saveCurrent: saveCurrent,
  //   saveFuture: saveFuture,
    // completed: completed,
  //   isFavorite: isFavorite,
  // };

  // URL first in axios. POST and PUT: request body data

  const markComplete = async () => {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/nps/`,
        
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("NPS backend markComplete updated");
      console.log(response.data.data);
      setCompleted("True")
    } catch (error) {
      console.log(error.response);
    }
  };


  function handleSubmit(event) {
    event.preventDefault();
    markComplete();
    console.log("updated NPS markComplete");
    // props.markComplete();
  }

// where video starts

  return (
    <button
      type="submit"
      className="button"
      style={{ margin: "1em" }}
      onClick={handleSubmit}
    >
      Mark Complete

    </button>
  );
};

export default NPStoBackend;
