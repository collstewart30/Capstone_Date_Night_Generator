// use views files to filter by each saved type
// button to change from "save for future" to "mark favorite," "save for current night," "mark complete"

// routes - user id in url

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import NPSDisplaySaveForFuture from "../../components/NPSDisplaySaveForFuture/NPSDisplaySaveForFuture";
import NPSMarkComplete from "../../components/NPSMarkComplete/NPSMarkComplete";
import TMDisplaySaveForFuture from "../../components/TMDisplaySaveForFuture/TMDisplaySaveForFuture";
import YelpDisplaySaveForFuture from "../../components/YelpDisplaySaveForFuture/YelpDisplaySaveForFuture";
import EmailJS from "../../components/EmailJS/EmailJS"


const UserProfilePage = (props) => {
  const { userid } = useParams();
  const [user, token] = useAuth();
  const [userNPSDetail, setUserNPSDetail] = useState([]);
  const [userTMDetail, setUserTMDetail] = useState([]);
  const [userYelpDetail, setuserYelpDetail] = useState([]);
  const [NPSSaveForFuture, setNPSSaveForFuture] = useState([]);
  const [YelpSaveForFuture, setYelpSaveForFuture] = useState([]);

  useEffect(() => {
    // fetchNPSDetails();
    // fetchNPSSaveForFuture();
    // fetchTicketmasterDetails();
    fetchYelpDetails();
    // fetchYelpSaveForFuture();
  }, [userid]);

  const fetchNPSDetails = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/nps/`, {
        headers: { Authorization: "Bearer " + token },
      });
      setUserNPSDetail(response.data);
      console.log("NPS user ALL data: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

const fetchNPSSaveForFuture = async () => {
  try {
    let saveForFuture = userNPSDetail.filter((save) => {
      if(save.saveFuture.includes("True")){
        console.log(saveForFuture);
        setNPSSaveForFuture(saveForFuture)
      }
    })
  } catch (error) {
    console.log(error);
  }
}


// need to filter for saveForFuture = "True". other backend api calls are pulling all saved info per user.
  // function fetchNPSSaveForFuture (){
  //   let saveForFuture = userNPSDetail.filter(function(save){
  //     if(save.saveFuture.includes("True")){
  //       return true
  //     }
  //   })
  //   console.log("NPS user set save for future: ", saveForFuture)
  //   setNPSSaveForFuture(saveForFuture)
  // }

  const fetchTicketmasterDetails = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/ticketmaster/`, {
        headers: { Authorization: "Bearer " + token },
      });
      setUserTMDetail(response.data);
      console.log("Ticketmaster user save for future: ",response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchYelpDetails = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/yelp/`, {
        headers: { Authorization: "Bearer " + token },
      });
      setuserYelpDetail(response.data);
      console.log("Yelp user ALL data: ",response.data);
      fetchYelpSaveForFuture();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYelpSaveForFuture = () => {
    try {
    let saveForFuture = userYelpDetail.filter((save) => {
      if(save.saveFuture.includes("True")){
        return true
      }
    })
    console.log("Yelp user set save for future: ", saveForFuture)
    setYelpSaveForFuture(saveForFuture);
  } catch(error){
    console.log(error);
  }}

  return (
    <div className="container">
      <h1>Welcome, {user.first_name}!</h1>
      {/* <h1>{user.username}!</h1> */}
      {/* <h2>Email your info:</h2> */}
      <EmailJS />
      <h2>Here are your favorites:</h2>
      {NPSSaveForFuture &&
        NPSSaveForFuture.map((nps) => (
          <div>
          <NPSDisplaySaveForFuture key={nps.id.event_id} nps={nps}/>
          <NPSMarkComplete />
          </div>
        ))
        }
        {userTMDetail &&
          userTMDetail.map((tm) => (
            <div>
              <TMDisplaySaveForFuture key={tm.event_id} tm={tm}/>
            </div>
          ))          
        }
        {YelpSaveForFuture &&
          YelpSaveForFuture.map((yelp) => (
            <div>
              <YelpDisplaySaveForFuture key={yelp.id} yelp={yelp}/>
            </div>
          ))     
        }
    </div>
  );
};

export default UserProfilePage;


  /* // <div key={nps.id.id}>
        //   <li>{nps.title}</li>
        //   <li>{nps.description}</li>
        //   <li>{nps.type}</li>
        // </div>) */

