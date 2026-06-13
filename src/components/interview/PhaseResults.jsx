import { motion } from 'framer-motion';
import { Trophy, CheckCircle, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PhaseResults = ({ results, topic, experience, language }) => {
  const navigate = useNavigate();

  // Calculate overall score
  const totalScore = results.reduce((acc, curr) => acc + (curr.evaluation?.score || 0), 0);
  const maxScore = results.length * 10;
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Calculate Phase breakdown
  const phaseBreakdown = {
    intro: results.filter(r => r.phase === 'intro'),
    topic: results.filter(r => r.phase === 'topic'),
    bonus: results.filter(r => r.phase === 'bonus'),
    coding: results.filter(r => r.phase === 'coding'),
  };

  const getPhaseAverage = (arr) => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((acc, curr) => acc + (curr.evaluation?.score || 0), 0);
    return Math.round((sum / (arr.length * 10)) * 100);
  };

  // Determine Rating
  let rating = "Beginner";
  if (percentage >= 80) rating = "Advanced";
  else if (percentage >= 50) rating = "Intermediate";

  return (
    <div className="max-w-4xl mx-auto pt-6 pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Interview Analysis</h1>
        <p className="text-textMuted text-lg">
          {experience} Level • {topic} • {language}
        </p>
      </div>

      {/* Hero Score Card */}
      <section className="bg-card border border-border rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e1e1e" strokeWidth="10" />
              <motion.circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke={percentage >= 80 ? "#22c55e" : percentage >= 50 ? "#eab308" : "#ef4444"} 
                strokeWidth="10" 
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * (percentage / 100)) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-textPrimary">{percentage}%</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              {rating} Level <Trophy className="w-8 h-8 text-yellow-500" />
            </h2>
            <p className="text-textMuted text-lg max-w-md">
              {percentage >= 80 
                ? "Outstanding performance! You're ready for top-tier interviews." 
                : percentage >= 50 
                ? "Solid grasp of fundamentals. Brush up on advanced concepts." 
                : "You need more practice. Focus on core concepts and clarity."}
            </p>
          </div>
        </div>
      </section>

      {/* Phase Breakdown */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Phase Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Intro', data: phaseBreakdown.intro, color: 'bg-blue-500' },
            { label: 'Technical', data: phaseBreakdown.topic, color: 'bg-purple-500' },
            { label: 'Bonus', data: phaseBreakdown.bonus, color: 'bg-orange-500' },
            { label: 'Coding', data: phaseBreakdown.coding, color: 'bg-green-500' },
          ].map((phase, i) => (
            <div key={i} className={`bg-card border border-border p-5 rounded-xl ${phase.data.length === 0 ? 'opacity-50' : ''}`}>
              <div className="text-sm text-textMuted mb-2">{phase.label}</div>
              <div className="text-2xl font-bold mb-3">
                {phase.data.length > 0 ? `${getPhaseAverage(phase.data)}%` : 'N/A'}
              </div>
              <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${phase.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: phase.data.length > 0 ? `${getPhaseAverage(phase.data)}%` : 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Question Review */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Detailed Review</h3>
        <div className="space-y-6">
          {results.map((res, i) => (
            <div key={i} className="bg-background border border-border rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-bold pr-4">{i + 1}. {res.question}</h4>
                <div className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  res.evaluation.score >= 8 ? 'bg-success/20 text-success border border-success/30' : 
                  res.evaluation.score >= 5 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 
                  'bg-red-500/20 text-red-500 border border-red-500/30'
                }`}>
                  {res.evaluation.score} / 10
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs font-bold text-textMuted uppercase mb-1">Your Answer:</div>
                <div className="bg-card border border-border p-4 rounded-lg text-sm text-textPrimary whitespace-pre-wrap font-mono">
                  {res.userAnswer}
                </div>
              </div>

              <div className={`p-4 rounded-lg text-sm flex gap-3 items-start ${
                res.evaluation.score >= 8 ? 'bg-success/10 border border-success/20' : 
                'bg-yellow-500/10 border border-yellow-500/20'
              }`}>
                {res.evaluation.score >= 8 ? <CheckCircle className="w-5 h-5 text-success shrink-0" /> : <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />}
                <div>
                  <div className="font-bold mb-1">{res.evaluation.verdict}</div>
                  <div className="text-textMuted">{res.evaluation.feedback}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 border-t border-border">
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-md font-bold transition-all shadow-[0_0_15px_rgba(79,142,247,0.3)] flex items-center justify-center gap-2"
        >
          Retake Interview <ArrowRight className="w-5 h-5" />
        </button>
        <button 
          onClick={() => navigate('/')}
          className="bg-transparent border border-border hover:border-textMuted text-textPrimary px-8 py-4 rounded-md font-bold transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default PhaseResults;
