import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import PhaseIntro from '../components/interview/PhaseIntro';
import PhaseTopic from '../components/interview/PhaseTopic';
import PhaseCoding from '../components/interview/PhaseCoding';
import PhaseResults from '../components/interview/PhaseResults';

const phases = ['intro', 'topic', 'bonus', 'coding_prompt', 'coding', 'results'];
const phaseLabels = {
  'intro': 'Introduction',
  'topic': 'Topic Questions',
  'bonus': 'Bonus Round',
  'coding_prompt': 'Coding Challenge',
  'coding': 'Coding Challenge',
  'results': 'Result Analysis'
};

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topic = 'Default', experience = 'Fresher', language = 'English' } = location.state || {};

  const [currentPhase, setCurrentPhase] = useState('intro');
  const [sessionResults, setSessionResults] = useState([]); // Array of evaluated question objects
  
  // Guard against direct navigation without state
  useEffect(() => {
    if (!location.state) {
      // For development, we allow it, or could navigate back. Let's provide defaults.
    }
  }, [location.state]);

  const advancePhase = (nextPhase) => {
    setCurrentPhase(nextPhase);
  };

  const handleResultSubmit = (resultObj) => {
    setSessionResults(prev => [...prev, resultObj]);
  };

  const currentPhaseIndex = phases.indexOf(currentPhase);
  const displayPhases = ['intro', 'topic', 'bonus', 'coding', 'results'];
  const activeDisplayIndex = displayPhases.indexOf(currentPhase === 'coding_prompt' ? 'coding' : currentPhase);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      {/* Top Phase Indicator */}
      <div className="bg-card border-b border-border py-4 sticky top-16 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-textPrimary font-semibold">{phaseLabels[currentPhase]}</span>
            <span className="text-textMuted text-sm">{activeDisplayIndex + 1} / {displayPhases.length}</span>
          </div>
          <div className="flex gap-2 h-2 w-full rounded-full overflow-hidden bg-background">
            {displayPhases.map((p, i) => (
              <div 
                key={p} 
                className={`h-full flex-1 rounded-full transition-colors duration-500 ${
                  i < activeDisplayIndex ? 'bg-success' : i === activeDisplayIndex ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative max-w-5xl mx-auto w-full px-4 py-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <PhaseIntro onComplete={() => advancePhase('topic')} onAnswerSubmit={handleResultSubmit} />
            </motion.div>
          )}

          {currentPhase === 'topic' && (
            <motion.div key="topic" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <PhaseTopic 
                topic={topic} 
                isBonus={false} 
                onComplete={(score) => advancePhase(score > 8 ? 'bonus' : 'coding_prompt')} 
                onAnswerSubmit={handleResultSubmit} 
              />
            </motion.div>
          )}

          {currentPhase === 'bonus' && (
            <motion.div key="bonus" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -50 }}>
              <PhaseTopic 
                topic={topic} 
                isBonus={true} 
                onComplete={() => advancePhase('coding_prompt')} 
                onAnswerSubmit={handleResultSubmit} 
              />
            </motion.div>
          )}

          {currentPhase === 'coding_prompt' && (
            <motion.div key="coding_prompt" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-20">
              <h2 className="text-3xl font-bold mb-4">Would you like to attempt a coding question?</h2>
              <p className="text-textMuted mb-8">This is optional but highly recommended to demonstrate your practical skills.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => advancePhase('coding')} className="bg-primary text-white px-8 py-3 rounded-md font-bold shadow-[0_0_15px_rgba(79,142,247,0.3)] hover:bg-blue-600 transition-colors">Yes, let's code</button>
                <button onClick={() => advancePhase('results')} className="border border-border text-textMuted hover:text-textPrimary hover:border-textMuted px-8 py-3 rounded-md font-bold transition-colors">Skip to Results</button>
              </div>
            </motion.div>
          )}

          {currentPhase === 'coding' && (
            <motion.div key="coding" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="h-full">
              <PhaseCoding onComplete={() => advancePhase('results')} onAnswerSubmit={handleResultSubmit} />
            </motion.div>
          )}

          {currentPhase === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <PhaseResults results={sessionResults} topic={topic} experience={experience} language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InterviewSession;
