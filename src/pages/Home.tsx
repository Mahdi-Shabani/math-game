
import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Play, Trophy } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
  onShowLeaderboard: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onShowLeaderboard }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px] -z-10"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 rounded-full blur-[100px] -z-10"
      />

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sword size={64} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          </motion.div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 mb-2 drop-shadow-lg" style={{ fontFamily: 'system-ui' }}>
          Math Quest
        </h1>
        <p className="text-xl text-purple-200 font-medium tracking-widest uppercase">
          سرزمین جادویی اعداد
        </p>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 w-full max-w-xs"
      >
        <button
          onClick={onStart}
          className="w-full group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl font-bold text-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
        >
          <Play fill="currentColor" />
          شروع ماجراجویی
        </button>

        <button
          onClick={onShowLeaderboard}
          className="w-full px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3"
        >
          <Trophy className="text-yellow-400" />
          جدول قهرمانان
        </button>
      </motion.div>

      <footer className="absolute bottom-8 text-white/40 text-sm">
        آماده‌ای تا قهرمان ریاضی بشی؟
      </footer>
    </div>
  );
};

export default Home;
