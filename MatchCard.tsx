
import React from 'react';
import { ROLE_ICONS } from './constants.tsx';

interface MatchCardProps {
  role: string;
  percentage: number;
  difficulty: "Easy" | "Medium" | "Hard";
  reasoning: string;
  isSelected: boolean;
  onSelect: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ role, percentage, difficulty, reasoning, isSelected, onSelect }) => {
  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'Easy': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Medium': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'Hard': return 'text-red-400 border-red-500/30 bg-red-500/10';
      default: return 'text-slate-400 border-slate-700 bg-slate-800';
    }
  };

  const getProgressColor = (p: number) => {
    if (p >= 80) return 'bg-emerald-500';
    if (p >= 50) return 'bg-blue-500';
    return 'bg-amber-500';
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-xl border transition-all duration-300 text-left group overflow-hidden relative
        ${isSelected 
          ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
          : 'bg-slate-800/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800/60'
        }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'}`}>
            {ROLE_ICONS[role] || <div className="w-5 h-5" />}
          </div>
          <div>
            <span className="font-bold text-slate-100 block">{role}</span>
            <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border inline-block mt-0.5 ${getDifficultyColor(difficulty)}`}>
              {difficulty} Transition
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-lg font-black ${isSelected ? 'text-blue-400' : 'text-slate-500'}`}>
            {percentage}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${getProgressColor(percentage)}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {isSelected && (
          <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-700/50 pt-3 animate-in fade-in duration-500">
            {reasoning}
          </p>
        )}
      </div>
    </button>
  );
};

export default MatchCard;
