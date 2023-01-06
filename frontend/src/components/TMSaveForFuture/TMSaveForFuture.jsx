import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TMSaveForFuture = (props) => {
  const [user, token] = useAuth();

  const [saveCurrent, setSaveCurrent] = useState("False");
  const [saveFuture, setSaveFuture] = useState("True");
  const [completed, setCompleted] = useState("False");
  const [isFavorite, setIsFavorite] = useState("False");

  let event_id = props.event_id;
  let name = props.name;
  let url = props.url;
  let image = props.image;
  let eventType = props.eventType;
  let state = props.state;

  const saveForFuture = async (post) => {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/ticketmaster/`,
        post,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(response.data.data);
      setSaveFuture("True");
    } catch (error) {
      console.log(error.response);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    let saveForFutureTicketmasterData = {
      user: user.id,
      event_id: event_id,
      name: name,
      url: url,
      image: image,
      eventType: eventType,
      state: state,
      saveCurrent: saveCurrent,
      saveFuture: saveFuture,
      completed: completed,
      isFavorite: isFavorite,
    };
    saveForFuture(saveForFutureTicketmasterData);
    console.log("Ticketmaster Save for Future Updated");
  }

  return (
    <button
      type="submit"
      className="button"
      style={{ margin: "1em" }}
      onClick={handleSubmit}
    >
      Save for Future
    </button>
  );
};

export default TMSaveForFuture;
