
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { Option } from '../types';

interface Props {
  onComplete: (answers: Record<number, Option>) => void;
}

export const Questionnaire: React.FC<Props> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('asa_answers');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed);
      const answeredIds = Object.keys(parsed).map(Number);
      if (answeredIds.length < QUESTIONS.length) {
        const nextIdx = QUESTIONS.findIndex(q => !answeredIds.includes(q.id));
        if (nextIdx !== -1) setCurrentIdx(nextIdx);
      } else {
        setCurrentIdx(QUESTIONS.length - 1);
      }
    }
  }, []);

  const handleSelect = (option: Option) => {
    if (animating) return;
    const question = QUESTIONS[currentIdx];
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);
    localStorage.setItem('asa_answers', JSON.stringify(newAnswers));

    if (currentIdx < QUESTIONS.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIdx(prev => prev + 1);
        setAnimating(false);
      }, 200);
    } else {
      setAnimating(true);
      setTimeout(() => {
        onComplete(newAnswers);
      }, 400);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIdx(prev => prev - 1);
        setAnimating(false);
      }, 200);
    }
  };

  const question = QUESTIONS[currentIdx];
  if (!question) return null; // 安全检查

  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-6 md:py-12 px-4 relative overflow-hidden text-sm">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-xl mb-6 relative z-10">
        <div className="flex justify-between items-end text-[9px] font-bold text-slate-400 mb-2.5 px-1">
          <div className="flex flex-col">
            <span className="text-primary/60 uppercase tracking-[0.2em] mb-0.5">Assessment Phase</span>
            <span className="text-slate-700 text-[11px] tracking-tight flex items-center">
              <span className="w-1 h-1 rounded-full bg-primary mr-1.5"></span>
              {question.module}
            </span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-slate-400 uppercase tracking-[0.2em] mb-0.5">Progress</span>
             <span className="text-slate-700 text-[11px] font-mono tracking-tighter">
                {currentIdx + 1} <span className="text-slate-300">/</span> {QUESTIONS.length}
             </span>
          </div>
        </div>
        <div className="h-1 w-full bg-slate-200/50 rounded-full overflow-hidden border border-slate-100">
          <div 
            className="h-full bg-gradient-to-r from-primary to-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className={`w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-[2rem] border border-white/80 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.04)] p-6 md:p-8 transition-all duration-400 relative z-10 ${animating ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'}`}>
        <div className="relative">
          <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-[8px] font-black uppercase tracking-[0.2em] rounded-md mb-3 border border-primary/10">
            Scanning Relationship
          </span>
          <h2 className="text-lg font-bold text-slate-900 mb-6 leading-snug tracking-tight">
            {question.text}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {question.options.map((opt, idx) => {
            const isSelected = answers[question.id]?.text === opt.text;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all duration-200 flex items-center group
                  ${isSelected 
                    ? 'border-primary bg-primary/5 text-primary shadow-md shadow-primary/5' 
                    : 'border-transparent bg-slate-50 hover:bg-white hover:border-slate-200 text-slate-600'
                  }`}
              >
                <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-xs font-bold mr-4 transition-all
                  ${isSelected ? 'bg-primary text-white shadow-sm' : 'bg-white text-slate-300 group-hover:text-primary group-hover:bg-primary/5'}
                `}>
                  {opt.label}
                </div>
                <span className="flex-1 text-sm font-semibold tracking-tight">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center border-t border-slate-100 pt-6">
          <button 
            onClick={handleBack}
            disabled={currentIdx === 0}
            className="text-slate-400 hover:text-primary font-bold text-xs disabled:opacity-0 flex items-center transition-all px-3 py-1.5 hover:bg-slate-50 rounded-lg group"
          >
            <svg className="w-3.5 h-3.5 mr-1 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
            上一题
          </button>
          
          <div className="flex items-center space-x-1.5">
            <span className="text-[8px] font-black text-slate-300 tracking-[0.2em] uppercase">
              BetterMe Analysis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
