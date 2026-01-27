
import React, { useState } from 'react';

export const Disclaimer: React.FC<{ onAgree: () => void; onDecline: () => void }> = ({ onAgree, onDecline }) => {
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [agreed3, setAgreed3] = useState(false);

  const canProceed = agreed1 && agreed2 && agreed3;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8">
      <div className="bg-white max-w-2xl w-full rounded-[3rem] shadow-2xl shadow-slate-200/50 p-8 md:p-14 relative overflow-hidden border border-slate-100">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-10">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">测评声明（请务必阅读）</h2>
          </div>

          <div className="space-y-8 mb-12">
            <section>
              <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                这是什么测评？
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-emerald-500 mr-2 font-bold">✅</span> 评估工具，帮您理性分析挽回可能性
                </div>
                <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-emerald-500 mr-2 font-bold">✅</span> 提供个性化挽回策略和成长建议
                </div>
                <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-rose-500 mr-2 font-bold">❌</span> 不保证100%成功，成功率是概率而非承诺
                </div>
                <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-rose-500 mr-2 font-bold">❌</span> 不是PUA教程，不鼓励纠缠和操控
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                我们的原则
              </h3>
              <ul className="space-y-2 text-sm text-slate-500 pl-4">
                <li className="list-disc">尊重对方意愿，不鼓励违背意愿的行为</li>
                <li className="list-disc">如关系有暴力等严重问题，会建议离开</li>
                <li className="list-disc">诚实客观，不会为收费给虚假希望</li>
                <li className="list-disc">如挽回可能性极低，会直接告知</li>
              </ul>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-indigo-50/30 p-6 rounded-[2rem] border border-indigo-100/50">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">准确性说明</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">请诚实作答！隐瞒关键信息会导致评估失准。测评基于当前状态，对方态度可能变化。每段关系都独特，评估只能给出概率参考。</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">隐私保护</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">🔒 数据加密存储，严格保密，不会泄露。</p>
              </div>
            </div>

            <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 flex items-start space-x-3">
              <span className="text-lg">🚨</span>
              <p className="text-[11px] text-rose-800 font-medium leading-relaxed">
                <strong>特殊情况：</strong> 如有暴力、严重心理问题，请先寻求专业帮助。本测评无法处理极端危机干预。
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <label className="flex items-center p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
              <input type="checkbox" checked={agreed1} onChange={e => setAgreed1(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary mr-4" />
              <span className="text-sm font-semibold text-slate-700">我已年满18周岁</span>
            </label>
            <label className="flex items-center p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
              <input type="checkbox" checked={agreed2} onChange={e => setAgreed2(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary mr-4" />
              <span className="text-sm font-semibold text-slate-700">我已阅读并同意以上条款</span>
            </label>
            <label className="flex items-center p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
              <input type="checkbox" checked={agreed3} onChange={e => setAgreed3(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary mr-4" />
              <span className="text-sm font-semibold text-slate-700">我承诺诚实作答</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onAgree}
              disabled={!canProceed}
              className={`flex-1 font-bold py-5 px-6 rounded-[1.5rem] transition-all shadow-lg ${canProceed ? 'bg-primary text-white shadow-primary/20 hover:-translate-y-0.5 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
            >
              准备好了，进入测评
            </button>
            <button 
              onClick={onDecline}
              className="px-8 py-5 bg-slate-50 text-slate-400 font-bold rounded-[1.5rem] hover:bg-slate-100 transition-all"
            >
              暂不测评
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
