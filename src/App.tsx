import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import RankingScreen from "./screens/RankingScreen";
import IstraziScreen from "./screens/IstraziScreen";
import CourtBookingScreen from "./screens/CourtBookingScreen";
import FindMatchScreen from "./screens/FindMatchScreen";
import VenueDetailsScreen from "./screens/VenueDetailsScreen"; // ADD THIS LINE
import BottomNavigation from "./components/BottomNavigation";

// Placeholder screens
function TurniriScreen() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center pb-20">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          🏆 Turniri & Lige
        </h1>
        <p className="text-gray-600">
          Tournaments & Leagues screen coming soon...
        </p>
      </div>
    </div>
  );
}

function PorukeScreen() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center pb-20">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">💬 Poruke</h1>
        <p className="text-gray-600">Messages screen coming soon...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/istrazi" element={<IstraziScreen />} />
          <Route path="/turniri" element={<TurniriScreen />} />
          <Route path="/ranking" element={<RankingScreen />} />
          <Route path="/poruke" element={<PorukeScreen />} />
          <Route path="/court-booking" element={<CourtBookingScreen />} />
          <Route path="/find-match" element={<FindMatchScreen />} />
          <Route
            path="/court-details/:venueId"
            element={<VenueDetailsScreen />}
          />{" "}
          {/* ADD THIS LINE */}
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
