import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, GraduationCap, Briefcase, Rocket } from 'lucide-react';

const About = () => {
  return (
    <div className="w-full pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Why InterviewAI Exists</h1>
        <p className="text-xl text-textMuted leading-relaxed">
          We noticed a pattern: brilliant candidates failing technical interviews not because they lacked knowledge, but because they lacked practice under pressure. InterviewAI was built to bridge that gap.
        </p>
      </section>

      {/* Problem vs Solution */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Problem */}
          <div className="bg-card/50 border border-border p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-red-400 flex items-center gap-2">
              <XCircle className="w-6 h-6" /> The Problem
            </h2>
            <ul className="space-y-4">
              {[
                "Mock interviews with humans are expensive ($150+/hr)",
                "Hard to find a reliable practice partner",
                "No instant, objective feedback on your code",
                "Generic YouTube tutorials don't simulate real pressure"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-textMuted">
                  <XCircle className="w-5 h-5 text-red-500/70 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <h2 className="text-2xl font-bold mb-6 text-success flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> Our Solution
            </h2>
            <ul className="space-y-4 relative z-10">
              {[
                "AI interviewer available 24/7 on demand",
                "Real DSA questions categorized by difficulty",
                "Instant, objective answer evaluation",
                "Detailed performance report after every session"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-textPrimary">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Who Is This For?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-6 rounded-xl text-center hover:border-primary/50 transition-colors">
            <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Students</h3>
            <p className="text-textMuted">Preparing for campus placements and looking to crack their first internship or entry-level role.</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl text-center hover:border-primary/50 transition-colors">
            <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Professionals</h3>
            <p className="text-textMuted">Switching jobs to top-tier tech companies and needing to brush up on DSA under time constraints.</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl text-center hover:border-primary/50 transition-colors">
            <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Self-Taught Devs</h3>
            <p className="text-textMuted">Entering the industry without a traditional CS background, looking to build confidence in algorithms.</p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-card border border-primary/30 p-10 rounded-2xl text-center shadow-[0_0_30px_rgba(79,142,247,0.1)]">
          <p className="text-2xl font-medium leading-relaxed italic text-textPrimary">
            "Our mission is to make quality interview preparation accessible to every developer, anywhere in the world."
          </p>
        </div>
      </section>

      {/* Built With */}
      <section className="py-12 text-center">
        <h3 className="text-textMuted uppercase tracking-wider text-sm font-bold mb-8">Built with cutting-edge technology</h3>
        <div className="flex justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-bold flex items-center gap-2"><span className="text-primary">Claude</span> AI</div>
          <div className="text-xl font-bold flex items-center gap-2"><span className="text-blue-400">React</span></div>
          <div className="text-xl font-bold flex items-center gap-2"><span className="text-teal-400">Tailwind</span> CSS</div>
        </div>
      </section>
    </div>
  );
};

export default About;
