import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { KEY } from "../../localKey";


// const TicketMasterPage = () => {

//     useEffect(() => {
//         getRelatedVideos();
//         getAllComments();
//       }, [videoId]);
    
//       const getTicketMasterData = async () => {
//         try {
//           let response = await axios.get(
//             `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&key=${KEY}&part=snippet&type=video&maxResults=5`
//           );
//           console.log("VideoPage - results from thumbnail click");
//           console.log(response.data.items);
//           setLikeVideoId(response.data.items);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//     return (  );
// }
 
// export default TicketMasterPage;