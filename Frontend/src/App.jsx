import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";

import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import UserPage from "./components/UserPage";
import LocationPage from "./components/LocationPage";
import BookingPage from "./components/BookingPage";
import HostBookingsPage from "./components/HostBookingPage";
import AddLocationPage from "./components/AddLocationPage";
import LocationDetailPage from "./components/LocationDetailPage";
import HostLocationsPage from "./components/HostLocationsPage";
import WelcomePage from "./components/WelcomePage";
import Logout from "./components/Logout";
import MyFooter from "./components/MyFooter";
import NotFoundPage from "./components/NotFoundPage";

// Sulle pagine di accesso il footer toglierebbe attenzione al form
const NO_FOOTER = ["/login", "/register"];

function AppShell() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/users/me" element={<UserPage />} />
              <Route path="/locations" element={<LocationPage />} />
              <Route path="/bookings" element={<BookingPage />} />
              <Route path="/host/bookings" element={<HostBookingsPage />} />
              <Route path="/locations/add" element={<AddLocationPage />} />
              <Route path="/locations/:id" element={<LocationDetailPage />} />
              <Route path="/host/locations" element={<HostLocationsPage />} />

              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {!NO_FOOTER.includes(location.pathname) && <MyFooter />}
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <AppShell />
        <Toaster
          position="top-center"
          offset={88}
          toastOptions={{
            classNames: {
              toast: "!rounded-2xl !border-cocoa/10 !font-sans !shadow-lift",
              title: "!font-semibold !text-cocoa",
              description: "!text-cocoa-soft",
              actionButton: "!rounded-full !bg-cocoa !px-3 !font-semibold",
            },
          }}
        />
      </Router>
    </MotionConfig>
  );
}

export default App;
