import { useState } from 'react';
import { introQuestions, getRandomItems } from '../../data/questionBank';
import { evaluateAnswer } from '../../utils/evaluator';
import { motion, AnimatePresence } from 'framer-motion';

const PhaseIntro = ({ onComplete, onAnswerSubmit }) => {
  const [questions] = useState(() => getRandomItems(introQuestions, 2));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  const currentQ = questions[currentIndex];

  const handleNext = () => {
    // Evaluate and submit
    const result = evaluateAnswer(answer, []); // Intro questions don't have strict keywords
    onAnswerSubmit({
      phase: 'intro',
      question: currentQ.text,
      userAnswer: answer,
      evaluation: result
    });

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-card border border-border p-8 rounded-2xl shadow-xl"
        >
          <div className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Warm-up {currentIndex + 1} of {questions.length}</div>
          <h2 className="text-2xl font-bold mb-6">{currentQ.text}</h2>
          
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here... (Feel free to be conversational)"
            className="w-full h-48 bg-background border border-border rounded-xl p-4 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none mb-6"
          />
          
          <div className="flex justify-end">
            <button 
              onClick={handleNext}
              disabled={answer.trim().length === 0}
              className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary text-white px-8 py-3 rounded-md font-semibold transition-all shadow-[0_0_15px_rgba(79,142,247,0.3)]"
            >
              Next Question
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PhaseIntro;
