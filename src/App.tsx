import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/matches" element={<div>Matches Screen</div>} />
          <Route path="/bookings" element={<div>Bookings Screen</div>} />
          <Route path="/leaderboard" element={<div>Leaderboard Screen</div>} />
          <Route path="/trainings" element={<div>Trainings Screen</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
