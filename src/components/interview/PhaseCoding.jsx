import { useState, useEffect } from 'react';
import { codingQuestions, getRandomItems } from '../../data/questionBank';
import { evaluateAnswer } from '../../utils/evaluator';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Code2, Play } from 'lucide-react';

const PhaseCoding = ({ onComplete, onAnswerSubmit }) => {
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = getRandomItems(codingQuestions, 1)[0];
    setQuestion(q);
    setCode(q.initialCode);
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate analyzing code
    setTimeout(() => {
      const result = evaluateAnswer(code, question.expectedKeywords);
      onAnswerSubmit({
        phase: 'coding',
        question: question.title,
        userAnswer: code,
        evaluation: result,
        difficulty: question.difficulty
      });
      onComplete();
    }, 1500);
  };

  if (!question) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] mt-4">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Code2 className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-textPrimary">Coding Challenge</h1>
      </div>
      
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Panel: Description */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-1/3 bg-card border border-border rounded-xl p-6 overflow-y-auto flex flex-col shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              question.difficulty === 'Easy' ? 'bg-success/20 text-success border border-success/30' :
              question.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
              'bg-red-500/20 text-red-500 border border-red-500/30'
            }`}>
              {question.difficulty}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
          <div className="text-textMuted whitespace-pre-wrap leading-relaxed text-sm">
            {question.description}
          </div>
        </motion.div>

        {/* Right Panel: Editor */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-2/3 bg-background border border-border rounded-xl overflow-hidden flex flex-col shadow-lg"
        >
          <div className="bg-card border-b border-border px-4 py-3 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs font-mono text-textMuted">main.js</div>
          </div>
          
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          <div className="bg-card border-t border-border p-4 flex justify-between items-center">
            <div className="text-xs text-textMuted">Console: Ready</div>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-md font-semibold transition-all shadow-[0_0_15px_rgba(79,142,247,0.3)] flex items-center gap-2"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Evaluating...</span>
              ) : (
                <><Play className="w-4 h-4 fill-current" /> Run & Submit</>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhaseCoding;
