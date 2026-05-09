
import React from 'react';
import { motion } from 'framer-motion';
import { Star, RotateCcw, ArrowLeft, FastForward } from 'lucide-react';

interface GameResultProps {
  success: boolean;
  score: number;
  targetScore: number;
  onRetry: () => void;
  onBackToMap: () => void;
  onNextLevel?: () => void;
  hasMoreLevels: boolean;
  nextChallengePreview?: string;
}

const GameResult: React.FC<GameResultProps> = ({ 
  success, score, targetScore, onRetry, onBackToMap, onNextLevel, hasMoreLevels, nextChallengePreview 
}) => {
  const stars = success ? (score >= targetScore + 5 ? 3 : score >= targetScore + 2 ? 2 : 1) : 0;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white overflow-hidden relative">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-800 border-2 border-white/10 rounded-[3rem] p-10 w-full max-w-sm flex flex-col items-center shadow-2xl z-10"
      >
        <h2 className={`text-4xl font-black mb-8 ${success ? 'text-yellow-400' : 'text-red-500'}`}>
          {success ? 'پیروزی!' : 'تلاش دوباره'}
        </h2>

        {/* Stars */}
        <div className="flex gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 + s * 0.1, type: 'spring' }}
            >
              <Star 
                size={60} 
                fill={s <= stars ? "#facc15" : "none"} 
                className={s <= stars ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "text-slate-700"} 
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="text-slate-400 mb-1">امتیاز نهایی</p>
          <p className="text-5xl font-bold">{score}</p>
        </div>

        {success && nextChallengePreview && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl text-center"
          >
            <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-1">چالش بعدی شما</p>
            <p className="text-sm text-indigo-100 italic">"{nextChallengePreview}"</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4 w-full">
          {success && hasMoreLevels && onNextLevel && (
            <button
              onClick={onNextLevel}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
            >
              <FastForward />
              مرحله بعدی
            </button>
          )}
          
          <button
            onClick={onRetry}
            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            تکرار مجدد
          </button>

          <button
            onClick={onBackToMap}
            className="w-full py-4 text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            بازگشت به نقشه
          </button>
        </div>
      </motion.div>

      {/* Decorative Background */}
      {success && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Simple confetti-like particles could be added here */}
        </motion.div>
      )}
    </div>
  );
};

export default GameResult;
