import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-4 right-4">
              <button 
                onClick={onClose}
                className="text-textMuted hover:text-textPrimary bg-background/50 hover:bg-border rounded-full p-2 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">Create your account</h2>
              <p className="text-textMuted text-sm mb-6">Start your first free interview session today.</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1" htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-background border border-border rounded-md px-4 py-2 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1" htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-background border border-border rounded-md px-4 py-2 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1" htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="w-full bg-background border border-border rounded-md px-4 py-2 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md mt-6 transition-colors shadow-[0_0_15px_rgba(79,142,247,0.3)]"
                >
                  Sign Up & Start
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
