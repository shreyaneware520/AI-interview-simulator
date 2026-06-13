import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Results from './pages/Results';
import InterviewSession from './pages/InterviewSession';

function AppContent() {
  const location = useLocation();
  const isInterview = location.pathname === '/interview';

  return (
    <div className="flex flex-col min-h-screen">
      {!isInterview && <Navbar />}
      <main className={`flex-grow ${isInterview ? 'h-screen overflow-hidden' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/results" element={<Results />} />
          <Route path="/interview" element={<InterviewSession />} />
        </Routes>
      </main>
      {!isInterview && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
