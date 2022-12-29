// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TicketMasterPage from "./pages/TicketmasterPage/TicketMasterPage";
import NPSPage from "./pages/NPSPage/NPSPage";
import YelpPage from "./pages/YelpPage/YelpPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ticketmaster" element={<TicketMasterPage />} />
        <Route path="/nps" element={<NPSPage />} />
        <Route path="/yelp" element={<YelpPage />} />
        <Route path="/user/:userid" element={<UserProfilePage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
