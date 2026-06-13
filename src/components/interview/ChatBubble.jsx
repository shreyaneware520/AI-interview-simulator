import { motion } from 'framer-motion';
import { Bot, User, CheckCircle, AlertTriangle } from 'lucide-react';

const ChatBubble = ({ message }) => {
  const isAI = message.role === 'ai';

  if (message.type === 'system') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center my-6"
      >
        <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
          {message.content}
        </div>
      </motion.div>
    );
  }

  if (message.type === 'evaluation') {
    const isGood = message.score >= 8;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex gap-4 mb-6 max-w-3xl"
      >
        <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div className={`p-4 rounded-xl text-sm flex gap-3 items-start border shadow-sm ${
          isGood ? 'bg-success/5 border-success/20' : 'bg-yellow-500/5 border-yellow-500/20'
        }`}>
          {isGood ? <CheckCircle className="w-5 h-5 text-success shrink-0" /> : <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />}
          <div>
            <div className="font-bold mb-1">{message.content.verdict}</div>
            <div className="text-textMuted">{message.content.feedback}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, x: isAI ? -10 : 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      className={`flex gap-4 mb-6 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
        isAI ? 'bg-card border border-border' : 'bg-primary text-white font-bold text-sm'
      }`}>
        {isAI ? <Bot className="w-5 h-5 text-primary" /> : 'U'}
      </div>
      
      <div className={`p-4 rounded-2xl max-w-2xl text-[15px] leading-relaxed shadow-sm ${
        isAI 
          ? 'bg-card border border-border rounded-tl-none text-textPrimary' 
          : 'bg-primary text-white rounded-tr-none'
      }`}>
        {message.content}
      </div>
    </motion.div>
  );
};

export default ChatBubble;
