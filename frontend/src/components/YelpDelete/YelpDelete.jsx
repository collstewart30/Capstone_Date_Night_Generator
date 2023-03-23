import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const YelpDelete = (props) => {
  const [user, token] = useAuth();

  let business_id = props.business_id;

  const deleteDate = async () => {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/yelp/${business_id}/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      // console.log(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    deleteDate();
    refreshPage();
  }

  return (
    <button
      type="submit"
      className="buttondelete"
      style={{ margin: "1em" }}
      onClick={handleSubmit}
    >
      Delete
    </button>
  );
};

export default YelpDelete;
