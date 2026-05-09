
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Star, XCircle } from 'lucide-react';
import { Level } from '../types';
import { useGameLogic } from '../hooks/useGameLogic';

interface GameArenaProps {
  level: Level;
  onFinish: (score: number, success: boolean) => void;
}

const GameArena: React.FC<GameArenaProps> = ({ level, onFinish }) => {
  const { question, score, lives, timeLeft, checkAnswer } = useGameLogic(level, onFinish);
  const [isShaking, setIsShaking] = useState(false);

  const handleAnswer = (opt: number) => {
    if (opt !== question.answer) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    checkAnswer(opt);
  };

  const isGoalReached = score >= level.targetScore;

  return (
    <div className="min-h-screen bg-indigo-950 text-white p-6 flex flex-col items-center relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent)]" />
      
      {/* Top Navigation */}
      <div className="w-full max-w-md flex items-center justify-between mb-8 z-20">
        <button 
          onClick={() => onFinish(score, false)}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-colors group"
        >
          <XCircle size={24} className="group-hover:text-red-400" />
        </button>
        <div className="text-xs font-bold bg-indigo-500/30 px-4 py-2 rounded-full border border-indigo-400/30">
          {level.title}
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* HUD - Heads Up Display */}
      <div className="w-full max-w-md grid grid-cols-3 gap-3 mb-12 z-10">
        <div className="flex items-center justify-center gap-2 bg-black/30 px-4 py-3 rounded-[1.5rem] backdrop-blur-sm border border-white/10">
          <Clock className="text-cyan-400" size={18} />
          <span className={`font-mono text-lg ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {timeLeft}s
          </span>
        </div>
        
        <div className="flex items-center justify-center gap-1 bg-black/30 px-4 py-3 rounded-[1.5rem] backdrop-blur-sm border border-white/10">
          {[...Array(3)].map((_, i) => (
            <Heart 
              key={i} 
              size={18} 
              fill={i < lives ? "#ef4444" : "none"} 
              className={i < lives ? "text-red-500" : "text-slate-600"} 
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 bg-black/30 px-4 py-3 rounded-[1.5rem] backdrop-blur-sm border border-white/10">
          <Star className={isGoalReached ? "text-yellow-400 animate-bounce" : "text-yellow-400"} size={18} fill="#facc15" />
          <span className={`font-bold text-lg ${isGoalReached ? 'text-yellow-400' : 'text-white'}`}>
            {score}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md h-3 bg-slate-800 rounded-full mb-16 overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ 
            width: `${Math.min((score / level.targetScore) * 100, 100)}%`,
            backgroundColor: isGoalReached ? "#facc15" : "#6366f1",
            boxShadow: isGoalReached ? "0 0 15px #facc15" : "none"
          }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.text}
          initial={{ y: 20, opacity: 0 }}
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : { y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className={`bg-white/10 backdrop-blur-lg border ${isShaking ? 'border-red-500' : isGoalReached ? 'border-yellow-400/50' : 'border-white/20'} p-12 rounded-[3rem] w-full max-w-sm flex flex-col items-center shadow-2xl relative transition-colors`}
        >
          <motion.div 
            animate={isGoalReached ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border-2 whitespace-nowrap shadow-lg ${
              isGoalReached 
                ? 'bg-yellow-500 border-yellow-400 text-slate-900' 
                : 'bg-indigo-600 border-indigo-400 text-white'
            }`}
          >
            {isGoalReached ? "آفرین! چالش حل شد! 🎉" : level.challengeGoal}
          </motion.div>
          <h2 className="text-6xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200">
            {question.text}
          </h2>
          <div className="h-1 w-24 bg-indigo-500/30 rounded-full mb-8" />
        </motion.div>
      </AnimatePresence>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-12 z-10">
        {question.options.map((opt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(opt)}
            className="h-24 bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-indigo-400 rounded-[2rem] text-3xl font-bold transition-colors"
          >
            {opt}
          </motion.button>
        ))}
      </div>

    </div>
  );
};

export default GameArena;
