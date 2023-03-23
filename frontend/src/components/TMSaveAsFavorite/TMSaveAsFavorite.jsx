import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TMSaveAsFavorite = (props) => {
  const [user, token] = useAuth();

  const [saveCurrent, setSaveCurrent] = useState("False");
  const [saveFuture, setSaveFuture] = useState("False");
  const [completed, setCompleted] = useState("False");
  const [isFavorite, setIsFavorite] = useState("True");

  let event_id = props.event_id;
  let name = props.name;
  let url = props.url;
  let image = props.image;
  let eventType = props.eventType;
  let state = props.state;

  // URL first in axios. POST and PUT: request body data

  function refreshPage() {
    window.location.reload(false);
  }

  const saveFavorite = async (post) => {
    // console.log(event_id);
    // debugger
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/ticketmaster/${event_id}/`,
        post,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      // console.log(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    let saveFavoriteData = {
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
    // console.log("TM Favorite: ",saveFavoriteData);
    saveFavorite(saveFavoriteData);
    refreshPage();
  }

  return (
    <button
      type="submit"
      className="button"
      style={{ margin: "1em" }}
      onClick={handleSubmit}
    >
      Save as Favorite
    </button>
  );
};

export default TMSaveAsFavorite;
