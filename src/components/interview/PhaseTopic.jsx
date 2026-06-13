import { useState, useEffect } from 'react';
import { topicQuestions, getRandomItems } from '../../data/questionBank';
import { evaluateAnswer } from '../../utils/evaluator';
import { motion, AnimatePresence } from 'framer-motion';

const PhaseTopic = ({ topic, isBonus, onComplete, onAnswerSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [accumulatedScore, setAccumulatedScore] = useState(0);

  useEffect(() => {
    // Fallback to Default if topic not found
    const pool = topicQuestions[topic] || topicQuestions['Default'];
    
    let selected = [];
    if (isBonus) {
      // Pick 3 hard questions for bonus
      const hards = pool.filter(q => q.difficulty === 'Hard');
      selected = getRandomItems(hards.length >= 3 ? hards : pool, 3);
    } else {
      // Pick 2 Easy, 3 Medium, 2 Hard = 7 questions
      const easys = pool.filter(q => q.difficulty === 'Easy');
      const mediums = pool.filter(q => q.difficulty === 'Medium');
      const hards = pool.filter(q => q.difficulty === 'Hard');
      
      selected = [
        ...getRandomItems(easys.length > 0 ? easys : pool, 2),
        ...getRandomItems(mediums.length > 0 ? mediums : pool, 3),
        ...getRandomItems(hards.length > 0 ? hards : pool, 2)
      ];
    }
    setQuestions(selected);
  }, [topic, isBonus]);

  const currentQ = questions[currentIndex];

  const handleNext = () => {
    const result = evaluateAnswer(answer, currentQ.expectedKeywords);
    setAccumulatedScore(prev => prev + result.score);
    
    onAnswerSubmit({
      phase: isBonus ? 'bonus' : 'topic',
      question: currentQ.text,
      userAnswer: answer,
      evaluation: result,
      difficulty: currentQ.difficulty
    });

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
    } else {
      const avgScore = (accumulatedScore + result.score) / questions.length;
      onComplete(avgScore);
    }
  };

  if (!questions.length) return null;

  return (
    <div className="max-w-3xl mx-auto pt-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">
            {isBonus ? "Bonus Round 🚀" : "Technical Questions"}
          </h1>
          <p className="text-textMuted mt-1">
            {isBonus ? "You crushed it! Let's push a little further..." : "Let's test your core knowledge."}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-textMuted uppercase tracking-wider mb-2">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="w-32 bg-background h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card border border-border p-8 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              currentQ.difficulty === 'Easy' ? 'bg-success/20 text-success border border-success/30' :
              currentQ.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
              'bg-red-500/20 text-red-500 border border-red-500/30'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>
          <h2 className="text-xl font-medium mb-6 leading-relaxed">{currentQ.text}</h2>
          
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Explain your thought process..."
            className="w-full h-48 bg-background border border-border rounded-xl p-4 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none mb-6 font-mono text-sm"
          />
          
          <div className="flex justify-end">
            <button 
              onClick={handleNext}
              disabled={answer.trim().length === 0}
              className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary text-white px-8 py-3 rounded-md font-semibold transition-all shadow-[0_0_15px_rgba(79,142,247,0.3)]"
            >
              {currentIndex + 1 === questions.length ? 'Submit Phase' : 'Next Question'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PhaseTopic;
