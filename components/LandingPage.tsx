
import React from 'react';
import { DIMENSION_DESCRIPTIONS } from '../constants';

const DimensionIcon = ({ index }: { index: number }) => {
  const icons = [
    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
  ];
  return icons[index] || null;
};

export const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary/20">
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white shadow-sm border border-slate-200 rounded-full mb-8">
            <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
            <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">情感修复路径深度扫描评估</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8">
            解析你的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">分手挽回成功概率</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
            分手后的迷茫往往源于认知的盲区。通过 50 道深度评估，多维度分析关系死结，为你提供科学的复联路径与修复方案。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-primary text-white text-lg font-bold rounded-2xl shadow-[0_20px_50px_rgba(107,92,231,0.3)] hover:bg-indigo-600 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              开始挽回可能性评估
            </button>
            <div className="flex items-center -space-x-3">
              {[11, 12, 13, 14].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
              ))}
              <span className="pl-6 text-sm font-medium text-slate-400">已有 8.5k+ 用户获得重生指引</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">全方位的修复价值扫描</h2>
            <p className="text-lg text-slate-500">从关系基础到当下互动，全维度透视复联的关键节点。</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {DIMENSION_DESCRIPTIONS.map((dim, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-all">
                  <DimensionIcon index={idx} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{dim.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">B</div>
            <span className="text-xl font-bold text-slate-900">BetterMe Space Station</span>
          </div>
          <p className="text-slate-400 text-sm">本测评为情感修复辅助工具，建议结合专业心理咨询进行决策。</p>
        </div>
      </footer>
    </div>
  );
};
