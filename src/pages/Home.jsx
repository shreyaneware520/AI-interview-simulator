import { motion } from 'framer-motion';
import { ArrowRight, Bot, BarChart3, FileBadge, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AuthModal from '../components/AuthModal';
import OnboardingFlow from '../components/OnboardingFlow';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } }
};

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 via-background to-background"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <motion.div 
              className="lg:col-span-6 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                Ace Your Next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Tech Interview
                </span>
              </h1>
              <p className="text-xl text-textMuted mb-8 max-w-2xl mx-auto lg:mx-0">
                Practice with an AI interviewer that thinks, evaluates, and coaches like a real Google engineer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-md font-semibold text-lg transition-all shadow-[0_0_20px_rgba(79,142,247,0.4)] flex items-center justify-center gap-2"
                >
                  Start Free Interview <ArrowRight className="w-5 h-5" />
                </button>
                <Link to="/how-it-works" className="bg-transparent border border-border hover:border-textMuted text-textPrimary px-8 py-4 rounded-md font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" /> See How It Works
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-6 mt-16 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-2xl relative">
                <div className="bg-background border-b border-border px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 font-mono text-xs text-textMuted">interview-session.tsx</div>
                </div>
                <div className="p-6 font-mono text-sm text-textMuted h-80 overflow-hidden relative flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Bot className="w-6 h-6 text-primary shrink-0" />
                    <div className="bg-background border border-border p-3 rounded-lg rounded-tl-none text-textPrimary">
                      Can you write a function to find the two sum in an array? We want O(n) time complexity.
                    </div>
                  </div>
                  <div className="flex gap-4 flex-row-reverse">
                    <div className="w-6 h-6 rounded-full bg-blue-500 shrink-0"></div>
                    <div className="bg-primary/20 border border-primary/30 p-3 rounded-lg rounded-tr-none text-textPrimary">
                      Sure, I can use a hash map to store the complements.
                      <pre className="mt-2 text-xs text-blue-300">
{`function twoSum(nums, target) {
  const map = new Map();
  for (let i=0; i<nums.length; i++) {
    // ...
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-textMuted">Interviews Conducted</div>
            </div>
            <div className="md:border-x md:border-border">
              <div className="text-4xl font-bold text-success mb-2">95%</div>
              <div className="text-textMuted">User Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-textMuted">DSA Questions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-textMuted text-lg max-w-2xl mx-auto">Practice perfectly with tools designed to simulate real interview pressure and provide actionable feedback.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: <Bot className="w-8 h-8 text-primary" />, title: "AI-Generated Questions", desc: "Adaptive questions based on difficulty. Never get the exact same interview twice." },
              { icon: <BarChart3 className="w-8 h-8 text-primary" />, title: "Smart Evaluation", desc: "Instant feedback on logic, complexity & code quality right after you finish." },
              { icon: <FileBadge className="w-8 h-8 text-primary" />, title: "Detailed Reports", desc: "Get a comprehensive performance score with targeted improvement tips." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-colors">
                <div className="bg-background w-16 h-16 rounded-lg flex items-center justify-center mb-6 border border-border">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-textMuted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-16 text-center">Loved by developers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Software Engineer @ Meta", quote: "The feedback on time complexity was spot on. It felt exactly like my actual Meta interview." },
              { name: "David K.", role: "Frontend Dev @ Vercel", quote: "I was bombing my interviews because of nerves. Practicing with InterviewAI gave me the confidence I needed." },
              { name: "Priya M.", role: "New Grad", quote: "The hints the AI gives when you're stuck are perfect. Not too revealing, just enough to get you thinking." }
            ].map((t, i) => (
              <div key={i} className="bg-background border border-border p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-textMuted">{t.role}</div>
                  </div>
                </div>
                <p className="text-textMuted italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to crack your dream job?</h2>
          <p className="text-xl text-textMuted mb-10">Stop failing interviews because of lack of practice. Start your first session today.</p>
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-primary hover:bg-blue-600 text-white px-10 py-5 rounded-md font-bold text-xl transition-all shadow-[0_0_30px_rgba(79,142,247,0.5)]"
          >
            Start Interview Now
          </button>
        </div>
      </section>
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => { setIsAuthModalOpen(false); setIsOnboardingOpen(true); }}
      />

      {/* Onboarding Flow */}
      <OnboardingFlow 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
      />
    </div>
  );
};

export default Home;
