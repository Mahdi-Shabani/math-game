
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Star } from 'lucide-react';
import { Level } from '../types';

interface LevelNodeProps {
  level: Level;
  index: number;
  isLast: boolean;
  onSelect: (level: Level) => void;
}

const LevelNode: React.FC<LevelNodeProps> = ({ level, index, isLast, onSelect }) => {
  const isLocked = !level.unlocked;
  
  // Alternating positions for a path effect
  const xOffset = index % 2 === 0 ? '20%' : '-20%';

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex flex-col items-center mb-16"
      style={{ left: xOffset }}
    >
      <button
        disabled={isLocked}
        onClick={() => onSelect(level)}
        className={`
          relative w-24 h-24 rounded-3xl flex items-center justify-center transform transition-all
          ${isLocked 
            ? 'bg-slate-700 cursor-not-allowed grayscale' 
            : 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]'
          }
        `}
      >
        {isLocked ? (
          <Lock className="text-slate-400" size={32} />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-white">{level.id}</span>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3].map((s) => (
                <Star key={s} size={12} fill="white" className="text-white" />
              ))}
            </div>
          </div>
        )}
        
        {/* Floating effect for active level */}
        {!isLocked && (
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-12"
          >
            <div className="bg-white text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
              بزن بریم!
            </div>
            <div className="w-2 h-2 bg-white rotate-45 mx-auto -mt-1 shadow-lg" />
          </motion.div>
        )}
      </button>

      <div className="mt-3 text-center">
        <h3 className={`font-bold ${isLocked ? 'text-slate-500' : 'text-white'}`}>
          {level.title}
        </h3>
        <p className="text-[10px] text-slate-400 max-w-[120px] leading-tight">
          {level.description}
        </p>
      </div>

      {/* Path Line connecting nodes (pseudo-element style) */}
      {!isLast && (
        <div className={`absolute -bottom-16 w-1 h-16 bg-gradient-to-b from-white/20 to-transparent -z-10`} />
      )}
    </motion.div>
  );
};

export default LevelNode;
