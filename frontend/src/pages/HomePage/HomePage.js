import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import { tickemasterKEY } from "../../localKey";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    getTicketmasterResults();
  }, [token]);

  const getTicketmasterResults = async (searchTerm = "MD") => {
    try {
      let response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tickemasterKEY}&size=10&stateCode=${searchTerm}`
      );
      setEventsData(response.data._embedded.events);
      console.log("Ticketmaster API data:", response.data._embedded.events);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      {/* <h1>Home Page for {user.username}!</h1> */}
      <button onClick={getTicketmasterResults}>Press for Tickemaster suggestion</button>
      <div>
        {eventsData &&
          eventsData.map((event) => (
            <p key={event.id}>
              {event.name}
              {event.images.url}
              {event.classifications.name}
              <li>
                <img
                  id="ytplayer"
                  type="text/html"
                  width="160"
                  height="90"
                  src={event.images[0].url}
                  frameBorder="0"
                />
              </li>
            </p>
          ))}
      </div>
    </div>
  );
};

// this is set up to show all the users' cars in their database when they log in
//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setCars(response.data);
//       } catch (error) {
//         console.log(error.response.data);
//       }
//     };
//     fetchCars();
//   }, [token]);
//   return (
//     <div className="container">
//       <h1>Home Page for {user.username}!</h1>
//       {cars &&
//         cars.map((car) => (
//           <p key={car.id}>
//             {car.year} {car.model} {car.make}
//           </p>
//         ))}
//     </div>
//   );
// };

export default HomePage;
