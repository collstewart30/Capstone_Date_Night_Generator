import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TMDelete = (props) => {
  const [user, token] = useAuth();

  let event_id = props.event_id;

  function refreshPage() {
    window.location.reload(false);
  }

  const deleteDate = async () => {
    console.log(event_id);
    // debugger
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/ticketmaster/${event_id}/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    deleteDate();
    refreshPage();
  }

  return (
    <button
      type="submit"
      className="button"
      style={{ margin: "1em" }}
      onClick={handleSubmit}
    >
      Delete
    </button>
  );
};

export default TMDelete;
