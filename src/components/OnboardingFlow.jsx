import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const goals = [
  "Get a new job",
  "Crack a dream company interview",
  "Improve my interview skills",
  "Practice for upcoming interview",
  "Build confidence in communication"
];

const topics = ["DSA", "System Design", "HR", "Behavioral", "Frontend", "Backend", "Full Stack"];
const experienceLevels = ["Fresher", "1–3 years", "3–5 years", "5+ years"];
const languages = ["English", "Hindi", "Other"];

const OnboardingFlow = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  const toggleGoal = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleStartInterview = () => {
    onClose();
    // In a real app, this would navigate to the interview session.
    // For now, we can route to home or a dummy session route.
    navigate('/');
    alert("Starting interview session...");
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <motion.div 
        className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress Header */}
        <div className="px-8 pt-8 pb-4 border-b border-border bg-card">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium text-textMuted uppercase tracking-wider">Step {step} of 3</div>
            <button onClick={onClose} className="text-textMuted hover:text-textPrimary">✕</button>
          </div>
          <div className="w-full bg-background h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">What is your current goal?</h2>
                  <p className="text-textMuted">Select all that apply to help us tailor your experience.</p>
                </div>
                <div className="space-y-3">
                  {goals.map((goal) => {
                    const isSelected = selectedGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`w-full text-left px-6 py-4 rounded-xl border transition-all flex items-center justify-between ${
                          isSelected 
                            ? 'bg-primary/10 border-primary text-textPrimary' 
                            : 'bg-background border-border text-textMuted hover:border-textMuted'
                        }`}
                      >
                        <span className="font-medium">{goal}</span>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-primary border-primary text-white' : 'border-border'
                        }`}>
                          {isSelected && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">Tell us about your interview interest</h2>
                  <p className="text-textMuted">This helps the AI set the right difficulty and focus.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-textPrimary">Preferred Interview Topic</h3>
                  <div className="flex flex-wrap gap-3">
                    {topics.map(topic => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          selectedTopic === topic
                            ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(79,142,247,0.4)]'
                            : 'bg-background border-border text-textMuted hover:border-textMuted'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-textPrimary">Experience Level</h3>
                  <div className="flex flex-wrap gap-3">
                    {experienceLevels.map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedExperience(level)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          selectedExperience === level
                            ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(79,142,247,0.4)]'
                            : 'bg-background border-border text-textMuted hover:border-textMuted'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-textPrimary">Preferred Language</h3>
                  <div className="flex flex-wrap gap-3">
                    {languages.map(lang => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          selectedLanguage === lang
                            ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(79,142,247,0.4)]'
                            : 'bg-background border-border text-textMuted hover:border-textMuted'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-center pt-8"
              >
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <Check className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-3xl font-bold mb-4">You're all set!</h2>
                <p className="text-textMuted text-lg mb-8 max-w-md mx-auto">
                  We've configured your AI interviewer for a <span className="text-primary font-semibold">{selectedExperience || "Fresher"}</span> level <span className="text-primary font-semibold">{selectedTopic || "DSA"}</span> interview in <span className="text-primary font-semibold">{selectedLanguage || "English"}</span>.
                </p>
                <div className="bg-background border border-border p-6 rounded-xl text-left max-w-sm mx-auto">
                  <h4 className="font-semibold mb-2 text-textPrimary">Your Goal:</h4>
                  <p className="text-sm text-textMuted">
                    {selectedGoals.length > 0 ? selectedGoals.join(", ") : "Ace the interview"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-border bg-card flex items-center justify-between">
          {step > 1 ? (
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 text-textMuted hover:text-textPrimary font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div></div> // Empty div to keep 'Continue' button on the right
          )}
          
          {step < 3 ? (
            <button 
              onClick={nextStep}
              disabled={step === 1 && selectedGoals.length === 0}
              className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary text-white px-6 py-3 rounded-md font-semibold transition-all shadow-[0_0_15px_rgba(79,142,247,0.3)] flex items-center gap-2 ml-auto"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleStartInterview}
              className="bg-success hover:bg-green-600 text-white px-8 py-3 rounded-md font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-2 ml-auto"
            >
              Start Interview
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingFlow;
