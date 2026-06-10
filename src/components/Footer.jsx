import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-center md:justify-start items-center mb-6 md:mb-0">
            <BrainCircuit className="h-8 w-8 text-primary mr-2" />
            <div>
              <span className="font-bold text-xl tracking-tight text-textPrimary">InterviewAI</span>
              <p className="text-textMuted text-sm mt-1">Crack your dream tech job with AI.</p>
            </div>
          </div>
          
          <nav className="flex flex-wrap justify-center space-x-6">
            <Link to="/" className="text-textMuted hover:text-textPrimary text-sm transition-colors">Home</Link>
            <Link to="/about" className="text-textMuted hover:text-textPrimary text-sm transition-colors">About</Link>
            <Link to="/how-it-works" className="text-textMuted hover:text-textPrimary text-sm transition-colors">How It Works</Link>
            <Link to="/results" className="text-textMuted hover:text-textPrimary text-sm transition-colors">Results</Link>
            <a href="#" className="text-textMuted hover:text-textPrimary text-sm transition-colors">Privacy Policy</a>
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex justify-center">
          <p className="text-textMuted text-sm">
            &copy; {new Date().getFullYear()} InterviewAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
