import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Bot, MessageSquare, BarChart, ChevronDown } from 'lucide-react';

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "Is this free to use?", a: "We offer a generous free tier that includes 5 mock interviews per month. Premium users get unlimited access and detailed historical analytics." },
    { q: "What kind of questions are asked?", a: "We have a curated database of 200+ Data Structures and Algorithms questions frequently asked at top tech companies like Google, Meta, and Amazon." },
    { q: "How is my answer evaluated?", a: "The AI evaluates your response based on three pillars: Problem Solving (logic & approach), Code Quality (readability, bugs), and Communication (how well you explain your thought process)." },
    { q: "Can I practice multiple times?", a: "Yes! In fact, we encourage it. You can retake the same question or ask the AI for a completely new set of questions." },
    { q: "What languages are supported?", a: "Currently, the AI can evaluate code in Python, JavaScript, TypeScript, Java, C++, and Go." }
  ];

  return (
    <div className="w-full pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">From Zero to Offer-Ready in 4 Steps</h1>
        <p className="text-xl text-textMuted">Here's exactly how an InterviewAI session works.</p>
      </section>

      {/* Timeline Section */}
      <section className="py-12 max-w-3xl mx-auto px-4">
        <div className="relative border-l-2 border-border ml-6 md:ml-0 md:left-1/2 md:-translate-x-1/2 space-y-16">
          
          {[
            { step: 1, icon: <Settings className="w-6 h-6 text-primary" />, title: "Set Your Preferences", desc: "Choose difficulty (Easy / Medium / Hard), select your coding language, and enter your name to personalize the session." },
            { step: 2, icon: <Bot className="w-6 h-6 text-primary" />, title: "Meet Your AI Interviewer", desc: "The AI greets you and confirms your setup. It feels exactly like a real Zoom interview, translated into a seamless text-based format." },
            { step: 3, icon: <MessageSquare className="w-6 h-6 text-primary" />, title: "Answer DSA Questions", desc: "The AI presents one question at a time. You type your approach and code in the chat. The AI evaluates your logic, complexity, and asks follow-up questions if you miss edge cases." },
            { step: 4, icon: <BarChart className="w-6 h-6 text-primary" />, title: "Get Your Report", desc: "After completing the questions, instantly receive your full performance report. See your scores for Problem Solving, Code Quality, and Communication." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex items-center justify-between md:justify-normal md:w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Marker */}
              <div className="absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 bg-background border-2 border-primary w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(79,142,247,0.3)]">
                {item.icon}
              </div>
              
              <div className="ml-12 md:ml-0 w-full md:w-[45%] bg-card border border-border p-6 rounded-xl">
                <div className="text-primary font-bold text-sm mb-2 uppercase tracking-wider">Step {item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-textMuted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">See it in action</h2>
          <p className="text-textMuted">Real interview. Real feedback. Zero judgment.</p>
        </div>
        <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-background border-b border-border px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs font-mono text-textMuted text-center flex-grow pr-10">app.interviewai.dev/session</div>
          </div>
          <div className="p-1 md:p-8 bg-[#0a0a0a]">
            {/* Fake Chat UI */}
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div className="bg-card border border-border p-4 rounded-2xl rounded-tl-none">
                  <p className="text-sm md:text-base">Hi! I'm your interviewer today. Let's start with a Medium difficulty question. Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target. You may assume each input would have exactly one solution.</p>
                </div>
              </div>
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold">U</div>
                <div className="bg-primary/10 border border-primary/30 p-4 rounded-2xl rounded-tr-none">
                  <p className="text-sm md:text-base mb-3">I'll use a Hash Map to store the numbers I've seen so far. For each number, I check if <code>target - num</code> exists in the map. If it does, I found my pair.</p>
                  <pre className="bg-background p-3 rounded-md text-xs text-blue-300 overflow-x-auto">
{`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-lg bg-card overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-textMuted transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4 text-textMuted"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
