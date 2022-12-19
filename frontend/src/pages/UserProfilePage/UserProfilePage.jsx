// use views files to filter by each saved type
// button to change from "save for future" to "mark favorite," "save for current night," "mark complete"

// routes - user id in url


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const UserProfilePage = (props) => {

  const [user, token] = useAuth();

  useEffect(() =>{

  },[user])

  return (
    <div>
      <h1>Welcome, {user.first_name}!</h1>
      <h2>Here are your favorites:</h2>
    </div>
  );
};

export default UserProfilePage;
