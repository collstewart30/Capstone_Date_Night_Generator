import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const YelptoBackend = (props) => {
  const [user, token] = useAuth();

  const [saveCurrent, setSaveCurrent] = useState("False");
  const [saveFuture, setSaveFuture] = useState("False");
  const [completed, setCompleted] = useState("False");
  const [isFavorite, setIsFavorite] = useState("False");

  let business_id = props.business_id;
  let name = props.name;
  let url = props.url;
  let image_url = props.image_url;
  let cuisine_type = props.cuisine_type;
  let city = props.city;

  const saveForFuture = async (post) => {
    try {
      let response = await axios.post(`http://127.0.0.1:8000/api/yelp/`, post, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data.data);
      setSaveFuture("True");
    } catch (error) {
      console.log(error.response);
    }
  };

  // URL first in axios. POST and PUT: request body data

  function handleSubmit(event) {
    event.preventDefault();
    let saveForFutureYelpData = {
      user: user.id,
      business_id: business_id,
      name: name,
      url: url,
      image_url: image_url,
      cuisine_type: cuisine_type,
      city: city,
      saveCurrent: saveCurrent,
      saveFuture: saveFuture,
      completed: completed,
      isFavorite: isFavorite,
    };
    setSaveFuture(saveForFutureYelpData);
    console.log("Yelp Save For Future Updated");
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

export default YelptoBackend;
