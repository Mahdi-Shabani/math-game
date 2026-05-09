
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, User, Calendar, MapPin } from 'lucide-react';
import { ScoreEntry } from '../types';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [scores, setScores] = React.useState<ScoreEntry[]>([]);

  React.useEffect(() => {
    const savedScores = localStorage.getItem('math_quest_scores');
    if (savedScores) {
      const parsed = JSON.parse(savedScores) as ScoreEntry[];
      setScores(parsed.sort((a, b) => b.score - a.score).slice(0, 5));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-md flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
        >
          <ArrowRight size={24} />
        </button>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          تالار قهرمانان
        </h2>
        <div className="w-10" />
      </div>

      <div className="w-full max-w-md space-y-4">
        {scores.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/10">
            <Trophy size={48} className="mx-auto text-slate-700 mb-4" />
            <p className="text-slate-500">هنوز رکوردی ثبت نشده است!</p>
            <p className="text-sm text-slate-600">اولین قهرمان این سرزمین باش.</p>
          </div>
        ) : (
          scores.map((entry, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className={`relative overflow-hidden p-5 rounded-3xl border flex items-center justify-between ${
                index === 0 
                  ? 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.1)]' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  index === 0 ? 'bg-yellow-500 text-slate-900' : 
                  index === 1 ? 'bg-slate-300 text-slate-900' : 
                  index === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User size={14} className="text-slate-400" />
                    <span className="font-bold">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {entry.levelName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {entry.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-yellow-500">{entry.score}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">امتیاز</div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <button
        onClick={onBack}
        className="mt-12 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-medium transition-colors border border-white/5"
      >
        برگشت به خانه
      </button>
    </div>
  );
};

export default Leaderboard;
