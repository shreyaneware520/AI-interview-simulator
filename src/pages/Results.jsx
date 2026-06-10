import { motion } from 'framer-motion';
import { Calendar, User, Code2, AlertTriangle, CheckCircle, Lightbulb, RefreshCw, Trophy } from 'lucide-react';

const Results = () => {
  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="pt-16 pb-10 border-b border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Interview Report</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-textPrimary bg-background border border-border px-4 py-2 rounded-full text-sm font-medium">
              <User className="w-4 h-4 text-primary" /> Rahul Sharma
            </div>
            <div className="flex items-center gap-2 text-textPrimary bg-background border border-border px-4 py-2 rounded-full text-sm font-medium">
              <Code2 className="w-4 h-4 text-primary" /> Medium | JavaScript | 3 Questions
            </div>
            <div className="flex items-center gap-2 text-textPrimary bg-background border border-border px-4 py-2 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4 text-primary" /> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pt-12 space-y-12">
        {/* Overall Score */}
        <section className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
          <div className="relative w-40 h-40 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e1e1e" strokeWidth="10" />
              <motion.circle 
                cx="50" cy="50" r="45" 
                fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * 0.75) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-textPrimary">7.5</span>
              <span className="text-sm text-textMuted">/ 10</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">Good Performance <Trophy className="w-6 h-6 text-yellow-500" /></h2>
            <p className="text-textMuted text-lg">You demonstrated a solid understanding of core algorithms. With a bit more focus on edge cases and communication, you'll be hitting the top tier.</p>
          </div>
        </section>

        {/* Score Breakdown */}
        <section>
          <h3 className="text-xl font-bold mb-6">Score Breakdown</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Problem Solving", score: 8, color: "bg-blue-500" },
              { label: "Code Quality", score: 7, color: "bg-purple-500" },
              { label: "Communication", score: 7, color: "bg-orange-500" }
            ].map((metric, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-xl">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-semibold text-textMuted">{metric.label}</span>
                  <span className="text-2xl font-bold">{metric.score}<span className="text-sm text-textMuted font-normal">/10</span></span>
                </div>
                <div className="w-full bg-background h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${metric.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.score / 10) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 * i }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Question-by-Question */}
        <section>
          <h3 className="text-xl font-bold mb-6">Detailed Feedback</h3>
          <div className="space-y-6">
            {[
              { 
                title: "1. Two Sum (Easy)", 
                approach: "Used a Hash Map to store complements.", 
                verdict: "Optimal O(n) time and space complexity. You identified the right data structure immediately.", 
                tags: [{ text: "Correct Logic", type: "success" }, { text: "O(n) Complexity", type: "success" }] 
              },
              { 
                title: "2. Valid Parentheses (Easy)", 
                approach: "Used an Array as a Stack to push open brackets and pop on close brackets.", 
                verdict: "Good use of the Stack pattern. However, you forgot to check if the stack was empty at the end before returning true.", 
                tags: [{ text: "Missed Edge Case", type: "warning" }, { text: "Good Pattern", type: "success" }] 
              },
              { 
                title: "3. Merge Intervals (Medium)", 
                approach: "Sorted the array by start time, then merged overlapping intervals.", 
                verdict: "The sorting logic was correct O(n log n). The merging loop had a small off-by-one error initially but you caught it during a dry run.", 
                tags: [{ text: "Self-Corrected Bug", type: "warning" }, { text: "Optimal Sorting", type: "success" }] 
              }
            ].map((q, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-6">
                <h4 className="text-lg font-bold mb-3">{q.title}</h4>
                <div className="text-sm text-textMuted mb-4"><span className="font-semibold text-textPrimary">Your approach:</span> {q.approach}</div>
                <div className="bg-card border border-border p-4 rounded-lg mb-4 text-sm text-textPrimary">
                  <span className="font-bold block mb-1">AI Verdict:</span>
                  {q.verdict}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {q.tags.map((tag, j) => (
                    <span key={j} className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${tag.type === 'success' ? 'bg-success/10 text-success border border-success/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                      {tag.type === 'success' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Improvement Tips */}
        <section>
          <div className="bg-card border border-border border-l-4 border-l-primary p-6 rounded-r-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" /> Key Takeaways & Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-textPrimary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                <span><strong>Practice more on edge cases:</strong> Always consider empty arrays, null inputs, and extreme values before writing the core logic.</span>
              </li>
              <li className="flex gap-3 text-textPrimary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                <span><strong>Verbalize Complexity:</strong> Try to state your intended Time and Space complexity <em>before</em> you start coding.</span>
              </li>
              <li className="flex gap-3 text-textPrimary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                <span><strong>Dry Runs:</strong> You caught a bug doing a dry run in Q3! Make it a habit to dry run every piece of code with a small sample input.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-8 text-center border-t border-border">
          <h3 className="text-2xl font-bold mb-6">Want to improve your score?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-md font-bold transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(79,142,247,0.3)]">
              <RefreshCw className="w-5 h-5" /> Retake Interview
            </button>
            <button className="bg-transparent border border-border hover:border-textMuted text-textPrimary px-8 py-4 rounded-md font-bold transition-colors flex items-center justify-center gap-2">
              Try Hard Mode
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Results;
