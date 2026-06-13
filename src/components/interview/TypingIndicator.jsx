import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex space-x-1.5 p-3 bg-card border border-border rounded-2xl rounded-tl-none w-16 justify-center items-center h-10 shadow-sm">
      <motion.div
        className="w-2 h-2 bg-textMuted rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-textMuted rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-textMuted rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
};

export default TypingIndicator;
