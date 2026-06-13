import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, TerminalSquare, Trophy, ChevronRight, Menu } from 'lucide-react';

import ChatBubble from '../components/interview/ChatBubble';
import TypingIndicator from '../components/interview/TypingIndicator';
import Editor from '@monaco-editor/react';
import PhaseResults from '../components/interview/PhaseResults';

import { introQuestions, topicQuestions, codingQuestions, getRandomItems } from '../data/questionBank';
import { evaluateAnswer } from '../utils/evaluator';

const phasesList = [
  { id: 'intro', label: 'Introduction' },
  { id: 'topic', label: 'Technical Questions' },
  { id: 'bonus', label: 'Bonus Round' },
  { id: 'coding', label: 'Coding Challenge' },
  { id: 'results', label: 'Analysis' }
];

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topic = 'Default', experience = 'Fresher', language = 'English' } = location.state || {};

  // -- Data Queues --
  const [introQs] = useState(() => getRandomItems(introQuestions, 2));
  const [topicQs] = useState(() => {
    const pool = topicQuestions[topic] || topicQuestions['Default'];
    const easys = pool.filter(q => q.difficulty === 'Easy');
    const mediums = pool.filter(q => q.difficulty === 'Medium');
    const hards = pool.filter(q => q.difficulty === 'Hard');
    return [
      ...getRandomItems(easys.length > 0 ? easys : pool, 2),
      ...getRandomItems(mediums.length > 0 ? mediums : pool, 3),
      ...getRandomItems(hards.length > 0 ? hards : pool, 2)
    ];
  });
  const [bonusQs] = useState(() => {
    const pool = topicQuestions[topic] || topicQuestions['Default'];
    const hards = pool.filter(q => q.difficulty === 'Hard');
    return getRandomItems(hards.length >= 3 ? hards : pool, 3);
  });
  const [codingQ] = useState(() => getRandomItems(codingQuestions, 1)[0]);

  // -- State Machine --
  const [phase, setPhase] = useState('intro'); // intro, topic, bonus, coding_prompt, coding, results
  const [qIndex, setQIndex] = useState(0);
  const [topicScore, setTopicScore] = useState(0);

  // -- Chat UI State --
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [codeText, setCodeText] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Ref for auto-scrolling
  const messagesEndRef = useRef(null);

  // Track raw evaluation results for the final dashboard
  const [evalResults, setEvalResults] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Push initial message
  useEffect(() => {
    const startInterview = async () => {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1500));
      
      setMessages([
        { id: Date.now(), type: 'system', content: `Phase 1: Introduction` },
        { id: Date.now()+1, role: 'ai', type: 'text', content: introQs[0].text, keywords: [] }
      ]);
      setIsTyping(false);
    };
    startInterview();
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');

    // 1. Add User Message
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', type: 'text', content: userText }]);
    setIsTyping(true);

    // Simulated network delay
    await new Promise(r => setTimeout(r, 1500));

    // 2. Evaluate previous answer
    const currentQueue = phase === 'intro' ? introQs : phase === 'topic' ? topicQs : bonusQs;
    const currentQuestion = currentQueue[qIndex];
    
    const evaluation = evaluateAnswer(userText, currentQuestion.expectedKeywords || []);
    
    // Save to global results
    setEvalResults(prev => [...prev, {
      phase: phase,
      question: currentQuestion.text,
      userAnswer: userText,
      evaluation: evaluation
    }]);

    if (phase === 'topic') setTopicScore(prev => prev + evaluation.score);

    // Show evaluation feedback in chat for non-intro phases
    if (phase !== 'intro') {
      setMessages(prev => [...prev, { id: Date.now(), role: 'ai', type: 'evaluation', content: evaluation, score: evaluation.score }]);
      await new Promise(r => setTimeout(r, 1000));
    }

    // 3. Move to next question or phase
    let nextPhase = phase;
    let nextIndex = qIndex + 1;

    if (nextIndex >= currentQueue.length) {
      // Transition Phase
      if (phase === 'intro') {
        nextPhase = 'topic';
        nextIndex = 0;
        setMessages(prev => [...prev, { id: Date.now(), type: 'system', content: `Phase 2: Technical Questions` }]);
      } else if (phase === 'topic') {
        const avgScore = (topicScore + evaluation.score) / topicQs.length;
        if (avgScore >= 8) {
          nextPhase = 'bonus';
          nextIndex = 0;
          setMessages(prev => [...prev, { id: Date.now(), type: 'system', content: `Phase 3: Bonus Round (High Score!)` }]);
        } else {
          nextPhase = 'coding_prompt';
        }
      } else if (phase === 'bonus') {
        nextPhase = 'coding_prompt';
      }
    }

    setPhase(nextPhase);
    setQIndex(nextIndex);

    // 4. Send next question
    await new Promise(r => setTimeout(r, 800));

    if (nextPhase === 'coding_prompt') {
      setMessages(prev => [...prev, 
        { id: Date.now(), type: 'system', content: `Phase 4: Coding Challenge` },
        { id: Date.now()+1, role: 'ai', type: 'text', content: "Would you like to attempt a coding challenge? (Type 'yes' or 'no')" }
      ]);
    } else if (nextPhase === 'intro' || nextPhase === 'topic' || nextPhase === 'bonus') {
      const nextQueue = nextPhase === 'intro' ? introQs : nextPhase === 'topic' ? topicQs : bonusQs;
      setMessages(prev => [...prev, { id: Date.now(), role: 'ai', type: 'text', content: nextQueue[nextIndex].text, keywords: nextQueue[nextIndex].expectedKeywords }]);
    }
    
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Special handler for coding prompt
  useEffect(() => {
    const handleCodingPrompt = async () => {
      const lastMsg = messages[messages.length - 1];
      if (phase === 'coding_prompt' && lastMsg?.role === 'user' && !isTyping) {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1000));
        
        const ans = lastMsg.content.toLowerCase();
        if (ans.includes('yes') || ans.includes('sure') || ans.includes('ok')) {
          setPhase('coding');
          setCodeText(codingQ.initialCode);
          setMessages(prev => [...prev, { id: Date.now(), role: 'ai', type: 'text', content: `Great! The problem is: **${codingQ.title}**. The code editor is now open on the right panel.` }]);
        } else {
          setPhase('results');
        }
        setIsTyping(false);
      }
    };
    handleCodingPrompt();
  }, [messages, phase, isTyping, codingQ]);

  const submitCode = async () => {
    setIsTyping(true);
    // Simulate analyzing code
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', type: 'text', content: "[Submitted Code via Editor]" }]);
    
    await new Promise(r => setTimeout(r, 2000));
    
    const evaluation = evaluateAnswer(codeText, codingQ.expectedKeywords);
    setEvalResults(prev => [...prev, {
      phase: 'coding',
      question: codingQ.title,
      userAnswer: codeText,
      evaluation: evaluation
    }]);

    setMessages(prev => [...prev, { id: Date.now(), role: 'ai', type: 'evaluation', content: evaluation, score: evaluation.score }]);
    
    await new Promise(r => setTimeout(r, 1500));
    setPhase('results');
    setIsTyping(false);
  };

  // --- Render Results Phase Full Screen ---
  if (phase === 'results') {
    return (
      <div className="min-h-screen bg-background pt-16 overflow-y-auto">
        <PhaseResults results={evalResults} topic={topic} experience={experience} language={language} />
      </div>
    );
  }

  // --- Render Chat Interface ---
  return (
    <div className="h-screen w-full bg-background flex pt-16 overflow-hidden">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden absolute top-20 left-4 z-50 p-2 bg-card border border-border rounded-md text-textPrimary shadow-md"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Left Sidebar (Phases) */}
      <div className={`fixed md:relative z-40 h-full w-64 bg-card border-r border-border shrink-0 transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6">
          <div className="text-sm font-bold text-textMuted uppercase tracking-wider mb-6">Interview Progress</div>
          <div className="space-y-4">
            {phasesList.map((p, i) => {
              const activeIndex = phasesList.findIndex(ph => ph.id === (phase === 'coding_prompt' ? 'coding' : phase));
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              
              return (
                <div key={p.id} className={`flex items-center gap-3 ${isActive ? 'text-primary font-bold' : isPast ? 'text-success' : 'text-textMuted'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                    isActive ? 'bg-primary/20 border-primary text-primary' :
                    isPast ? 'bg-success/20 border-success text-success' : 'border-border bg-background'
                  }`}>
                    {isPast ? '✓' : i + 1}
                  </div>
                  <span className="text-sm">{p.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-background border border-border rounded-xl p-4">
            <div className="text-xs text-textMuted uppercase font-bold mb-2">Context</div>
            <div className="text-sm text-textPrimary font-semibold">{topic}</div>
            <div className="text-sm text-textMuted">{experience} • {language}</div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Sticky Header */}
        <div className="absolute top-0 w-full bg-background/80 backdrop-blur-md border-b border-border p-4 z-10 flex justify-between items-center shadow-sm">
          <div className="font-bold text-textPrimary ml-12 md:ml-0">
            {phase === 'intro' ? 'Introduction' : 
             phase === 'topic' ? 'Technical Questions' : 
             phase === 'bonus' ? 'Bonus Round' : 'Coding Challenge'}
          </div>
          <div className="text-sm text-textMuted bg-card px-3 py-1 rounded-full border border-border">
            {phase === 'intro' ? `Q ${qIndex + 1} of ${introQs.length}` :
             phase === 'topic' ? `Q ${qIndex + 1} of ${topicQs.length}` :
             phase === 'bonus' ? `Q ${qIndex + 1} of ${bonusQs.length}` :
             'Code Editor Active'}
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 pb-32">
          <div className="max-w-3xl mx-auto w-full">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-6 flex gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0 shadow-sm">
                    <img src="/logo.svg" className="w-5 h-5 opacity-80" alt="AI" onError={(e) => { e.target.style.display='none'; }}/>
                  </div>
                  <TypingIndicator />
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </AnimatePresence>
          </div>
        </div>

        {/* Fixed Bottom Input Bar */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-background via-background to-transparent pt-10 pb-6 px-4 md:px-8">
          <div className="max-w-3xl mx-auto relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping || phase === 'coding'}
              placeholder={
                phase === 'coding' ? "Use the code editor on the right..." :
                isTyping ? "AI is thinking..." : "Type your answer... (Shift + Enter for new line)"
              }
              className="w-full bg-card border border-border rounded-2xl py-4 pl-4 pr-16 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xl resize-none min-h-[60px] max-h-[200px]"
              rows="1"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !inputText.trim() || phase === 'coding'}
              className="absolute right-2 bottom-2 p-3 bg-primary text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary transition-colors shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center text-xs text-textMuted mt-3">
            AI Interview Simulator evaluates length, context, and keywords.
          </div>
        </div>
      </div>

      {/* Right Split Pane: Code Editor */}
      <AnimatePresence>
        {phase === 'coding' && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '40%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full border-l border-border bg-background flex flex-col shrink-0 overflow-hidden shadow-2xl z-20"
          >
            <div className="bg-card border-b border-border p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-textPrimary font-bold">
                <TerminalSquare className="w-5 h-5 text-primary" /> Code Editor
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="p-4 bg-background border-b border-border overflow-y-auto max-h-[30%]">
              <h3 className="font-bold text-lg mb-2">{codingQ.title}</h3>
              <p className="text-textMuted text-sm whitespace-pre-wrap">{codingQ.description}</p>
            </div>

            <div className="flex-1 bg-[#1e1e1e] relative">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={codeText}
                onChange={(v) => setCodeText(v)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: { top: 16 }
                }}
              />
            </div>
            
            <div className="bg-card border-t border-border p-4 flex justify-end">
              <button 
                onClick={submitCode}
                disabled={isTyping}
                className="bg-success text-white px-6 py-2 rounded-md font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                Submit Solution <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default InterviewSession;
