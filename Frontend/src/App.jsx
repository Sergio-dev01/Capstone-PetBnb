import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import WelcomePage from "./components/WelcomePage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import UserPage from "./components/UserPage";
import LocationPage from "./components/LocationPage";
import BookingPage from "./components/BookingPage";
import HostBookingsPage from "./components/HostBookingPage";
import AddLocationPage from "./components/AddLocationPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users/me" element={<UserPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/host/bookings" element={<HostBookingsPage />} />
          <Route path="/locations/add" element={<AddLocationPage />} />
          <Route path="*" element={<div>Pagina non trovata</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
