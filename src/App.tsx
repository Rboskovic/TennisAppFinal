import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import RankingScreen from "./screens/RankingScreen";
import IstraziScreen from "./screens/IstraziScreen";
import CourtBookingScreen from "./screens/CourtBookingScreen";
import FindMatchScreen from "./screens/FindMatchScreen";
import VenueDetailsScreen from "./screens/VenueDetailsScreen";
import TurniriScreen from "./screens/TurniriScreen";
import TournamentDetailsScreen from "./screens/TournamentDetailsScreen";
import BottomNavigation from "./components/BottomNavigation";
import PorukeScreen from "./screens/PorukeScreen";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/istrazi" element={<IstraziScreen />} />
          <Route path="/turniri" element={<TurniriScreen />} />
          <Route path="/tournament/:id" element={<TournamentDetailsScreen />} />
          <Route path="/ranking" element={<RankingScreen />} />
          <Route path="/poruke" element={<PorukeScreen />} />
          <Route path="/court-booking" element={<CourtBookingScreen />} />
          <Route path="/find-match" element={<FindMatchScreen />} />
          <Route
            path="/court-details/:venueId"
            element={<VenueDetailsScreen />}
          />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
