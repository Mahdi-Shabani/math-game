
import React from 'react';
import { ArrowRight, Map as MapIcon } from 'lucide-react';
import LevelNode from '../components/LevelNode';
import { Level } from '../types';

interface LevelMapProps {
  levels: Level[];
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

const LevelMap: React.FC<LevelMapProps> = ({ levels, onSelectLevel, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-900 overflow-y-auto pb-20 pt-10 px-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 px-2 sticky top-0 z-20 bg-slate-900/80 backdrop-blur-md py-4 rounded-b-2xl">
        <button 
          onClick={onBack}
          className="p-2 bg-slate-800 rounded-xl text-white hover:bg-slate-700"
        >
          <ArrowRight size={24} />
        </button>
        <div className="flex items-center gap-2">
          <MapIcon className="text-yellow-500" />
          <h2 className="text-xl font-bold text-white">نقشه سرزمین اعداد</h2>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Map Content */}
      <div className="max-w-md mx-auto relative flex flex-col items-center">
        {levels.map((level, index) => (
          <LevelNode 
            key={level.id} 
            level={level} 
            index={index} 
            isLast={index === levels.length - 1}
            onSelect={onSelectLevel} 
          />
        ))}
      </div>

      {/* Decorative side elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
      </div>
    </div>
  );
};

export default LevelMap;
