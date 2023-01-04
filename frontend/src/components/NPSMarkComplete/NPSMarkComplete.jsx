import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const NPSMarkComplete = (props) => {
  const [user, token] = useAuth();

  const [saveCurrent, setSaveCurrent] = useState("False");
  const [saveFuture, setSaveFuture] = useState("True");
  const [completed, setCompleted] = useState("True");
  const [isFavorite, setIsFavorite] = useState("False");

  let event_id = props.event_id;
  let parkCode = props.parkCode;
  let title = props.title;
  let url = props.url;
  let image_url = props.image_url;
  let park_name = props.park_name;
  let state = props.state;
  let description = props.description;
  let type = props.type;

  // URL first in axios. POST and PUT: request body data

  const markComplete = async (post) => {
    // console.log(event_id)
    // debugger
    try {
      let response = await axios.put(`http://127.0.0.1:8000/api/nps/${event_id}/`, post, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log('markComplete function')
      console.log(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log('mark complete clicked')
    let markCompleteData = {
      user: user.id,
      event_id: event_id,
      parkCode: parkCode,
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
    console.log(markCompleteData);
    markComplete(markCompleteData);
  };

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

export default NPSMarkComplete;
