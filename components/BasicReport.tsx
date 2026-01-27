
import React, { useMemo, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { UserScores, Option } from '../types';

interface Props {
  scores: UserScores;
  answers: Record<number, Option>;
  onGenerateAI: () => void;
  showAIReport: boolean;
  aiReportContent: string | null;
  aiReportLoading: boolean;
}

export const BasicReport: React.FC<Props> = ({ scores, onGenerateAI, showAIReport, aiReportContent, aiReportLoading }) => {
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  const LOADING_MESSAGES = [
    "正在解构过往情感契约...",
    "正在分析 TA 的防御机制...",
    "正在测算复联路径成功率...",
    "正在生成 30 天行动指南...",
    "正在整理深度复联话术...",
    "正在评估底层依恋模式冲突...",
    "正在为您定制关系修复方案..."
  ];

  React.useEffect(() => {
    if (!aiReportLoading) return;
    const msgInterval = setInterval(() => {
      setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(msgInterval);
  }, [aiReportLoading]);

  const translateGrade = (grade: string) => {
    switch (grade) {
      case 'A': return '挽回成功率极高 (A级)';
      case 'B': return '挽回成功率良好 (B级)';
      case 'C': return '挑战性挽回 (C级)';
      case 'D': return '挽回希望渺茫 (D级)';
      case 'E': return '建议专注自我 (E级)';
      default: return '未知';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return '#10B981';
      case 'B': return '#6366F1';
      case 'C': return '#F59E0B';
      default: return '#EF4444';
    }
  };

  const getAdviceSummary = (grade: string) => {
    switch (grade) {
      case 'A': return "感情基础深厚，对方仍有留恋。保持冷静，按部就班地修复沟通渠道即可。";
      case 'B': return "存在一定的沟通障碍或误会，但核心价值依然匹配。需要科学的二次吸引策略。";
      case 'C': return "关系受损严重，对方防御心理较强。需要较长的断联期来重塑个人价值。";
      default: return "目前状态极其被动，强行挽回可能适得其反。建议先进行深度的自我心理重建。";
    }
  };

  const renderStars = (score: number, max: number) => {
    const ratio = score / max;
    const starCount = Math.round(ratio * 5);
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < starCount ? "★" : "☆";
    }
    return stars;
  };

  const radarData = [
    { subject: '关系基础', A: scores.sections.base, fullMark: 22 },
    { subject: '分手原因', A: scores.sections.reason, fullMark: 24 },
    { subject: '当前状态', A: scores.sections.status, fullMark: 25 },
    { subject: '挽回条件', A: scores.sections.conditions, fullMark: 27 },
    { subject: '深度评估', A: scores.sections.deep, fullMark: 7.5 },
  ];

  const handleBackToHome = () => {
    // 返回主页 - 刷新页面回到开始状态
    window.location.href = '/';
  };

  const handleDownloadPDF = async () => {
    try {
      // 使用 html2pdf 库导出当前页面
      const element = document.getElementById('full-report');
      if (!element) return;
      
      // 动态导入 html2pdf
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt = {
        margin: [15, 10, 15, 10], // 上右下左边距
        filename: `分手挽回测评报告_${scores.standardized}分.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'li', 'tr']
        }
      };
      
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF导出失败:', error);
      alert('PDF导出功能需要安装，暂时使用打印功能代替');
      window.print();
    }
  };

  const SectionIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'base': return <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
      case 'reason': return <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.724 2.17a2 2 0 00.12 1.62l1.318 2.025a2 2 0 002.392.748l2.368-.947a2 2 0 001.129-1.39l.711-2.133a2 2 0 00-.945-2.31zM6.5 18a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM12 2C6.477 2 2 6.477 2 12c0 1.04.16 2.05.45 3l.05.15A10 10 0 1012 2z" /></svg>;
      case 'status': return <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.344 6.51c5.961-5.962 15.351-5.962 21.312 0" /></svg>;
      case 'conditions': return <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
      case 'deep': return <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>;
      case 'target': return <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div id="full-report" className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700"
             style={{ background: `linear-gradient(135deg, ${getGradeColor(scores.grade)}, ${getGradeColor(scores.grade)}dd)` }}>
          <div className="p-10 text-center text-white space-y-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight opacity-95">
              {translateGrade(scores.grade)}
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-7xl md:text-9xl font-black tracking-tighter">{scores.standardized}</span>
              <span className="text-2xl md:text-3xl font-bold mt-6 opacity-80">分</span>
            </div>
            <div className="max-w-2xl mx-auto py-5 px-8 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20">
              <p className="text-base md:text-lg font-bold leading-relaxed italic">
                “{getAdviceSummary(scores.grade)}”
              </p>
            </div>
          </div>
        </div>

        {/* 核心指标与雷达图 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl p-8 border border-slate-100 flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center">
                  <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
                  挽回潜力分布图
                </h3>
             </div>
             <div className="flex-grow min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#f1f5f9" strokeWidth={2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 800 }} />
                    <Radar name="Scoring" dataKey="A" stroke={getGradeColor(scores.grade)} fill={getGradeColor(scores.grade)} fillOpacity={0.15} strokeWidth={3} />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex items-center justify-between group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <SectionIcon type="target" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">挽回成功率</p>
                <p className="text-2xl font-black text-slate-800">{scores.probability}</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex items-center justify-between group">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <SectionIcon type="status" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">对方当前态度</p>
                <p className="text-2xl font-black text-slate-800">{scores.attitudeLevel}</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex items-center justify-between group">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <SectionIcon type="reason" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">核心分手原因</p>
                <p className="text-lg font-black text-slate-800 leading-tight max-w-[140px]">{scores.reasonType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 维度得分详情面板 */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
              分维度评估分析报告
            </h3>
            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Multi-Dimension Scoring</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: '关系基础', score: scores.sections.base, max: 22, color: 'bg-emerald-500', type: 'base' },
              { label: '分手原因', score: scores.sections.reason, max: 24, color: 'bg-indigo-500', type: 'reason' },
              { label: '当前状态', score: scores.sections.status, max: 25, color: 'bg-sky-500', type: 'status' },
              { label: '挽回条件', score: scores.sections.conditions, max: 27, color: 'bg-amber-500', type: 'conditions' },
              { label: '深度评估', score: scores.sections.deep, max: 7.5, color: 'bg-rose-500', type: 'deep' }
            ].map((dim, i) => (
              <div key={i} className="group bg-slate-50/70 p-7 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <SectionIcon type={dim.type} />
                      </div>
                      <span className="text-sm font-black text-slate-700 tracking-tight">{dim.label}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[10px] font-black text-primary px-2 py-0.5 bg-primary/5 rounded-md">{dim.score.toFixed(1)} / {dim.max}</span>
                   </div>
                </div>
                <div className="flex flex-col space-y-3">
                   <div className="flex justify-between items-center">
                      <div className="text-lg tracking-widest text-primary/80 font-serif">{renderStars(dim.score, dim.max)}</div>
                      <span className="text-xs font-bold text-slate-400">{Math.round((dim.score/dim.max)*100)}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                      <div className={`h-full ${dim.color} transition-all duration-1000 ease-out shadow-sm`} style={{ width: `${(dim.score/dim.max)*100}%` }}></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Action CTA - 只在未生成时显示 */}
        {!showAIReport && !aiReportLoading && (
          <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100 flex flex-col md:flex-row items-center gap-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 mb-2">生成AI深度分析报告</h3>
              <p className="text-slate-500 leading-relaxed text-xs">基于 50 个维度的底层数据推演，为您生成 8000+ 字的定制报告。包含 30 天复联清单、逐字话术模板以及对方心理侧写。</p>
            </div>
            <button 
              onClick={onGenerateAI}
              className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:bg-indigo-600 transition-all flex-shrink-0"
            >
              开始分析
            </button>
          </div>
        )}

        {/* AI报告加载状态 */}
        {aiReportLoading && (
          <div className="bg-white rounded-[2.5rem] shadow-xl p-16 border border-slate-100">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-50 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-slate-900 transition-all duration-500 animate-pulse">
                  报告深度构建中...
                </h3>
                <p className="text-slate-500 text-sm font-medium h-6 flex items-center justify-center">
                  <span key={loadingMsgIdx} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                    {LOADING_MESSAGES[loadingMsgIdx]}
                  </span>
                </p>
                <div className="pt-4 flex justify-center space-x-1.5">
                  {LOADING_MESSAGES.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === loadingMsgIdx ? 'bg-primary w-4' : 'bg-slate-200'}`} 
                    />
                  ))}
                </div>
                <div className="pt-6 px-6 py-4 bg-amber-50 rounded-2xl border border-amber-200 max-w-md mx-auto">
                  <p className="text-amber-700 text-sm font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    AI报告生成预计需要1-2分钟，请勿关闭页面
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI深度报告内容 - 嵌入展示 */}
        {showAIReport && aiReportContent && !aiReportLoading && (
          <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">AI 深度定制报告</h3>
                  <p className="text-[8px] text-slate-400 font-black tracking-widest uppercase">Action Plan</p>
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              {/* 顶部引言卡片 */}
              <div className="bg-orange-50/80 p-8 md:p-10 rounded-[2.5rem] border border-orange-100/50 shadow-sm mb-10 text-center">
                <p className="text-orange-900/80 text-lg md:text-xl leading-[1.6] font-medium italic mb-0">
                  每一段感情，都是一次重新认识自我的契机。
                </p>
              </div>

              {/* AI报告内容 */}
              <div className="space-y-10">
                {aiReportContent.split('\n\n').filter(p => p.trim() !== '').map((section, idx) => {
                  const lines = section.split('\n');
                  const title = lines[0].length < 40 ? lines[0] : null;
                  const content = title ? lines.slice(1).join('\n') : section;
                  const isClosing = section.includes('亲爱的朋友');
                  
                  if (isClosing) {
                    // 将"亲爱的朋友："和"你好。"之间的内容作为一个整体处理
                    const highlightedText = content.split('请对自己好一点').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-rose-500 font-black text-xl md:text-2xl underline decoration-rose-300 underline-offset-8 mx-1">
                            请对自己好一点
                          </span>
                        )}
                      </React.Fragment>
                    ));

                    return (
                      <div key={idx} className="relative" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                        <div className="text-slate-600 leading-[1.7] text-sm md:text-base whitespace-pre-wrap font-normal bg-white p-0">
                          {highlightedText}
                        </div>
                      </div>
                    );
                  }

                  // 将长内容按段落分割，每段独立避免分页断开
                  const paragraphs = content.split('\n').filter(p => p.trim());

                  return (
                    <div key={idx} className="relative" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                      {title && (
                        <div className="mb-4 flex items-center space-x-3" style={{ pageBreakAfter: 'avoid', breakAfter: 'avoid' }}>
                          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                          <h4 className="text-lg font-black text-slate-900 tracking-tight">{title}</h4>
                        </div>
                      )}
                      <div className={`text-slate-600 leading-[1.7] text-sm md:text-base font-normal ${title ? 'bg-white p-0' : 'bg-slate-50/50 p-6 rounded-2xl'}`}>
                        {paragraphs.map((para, pIdx) => (
                          <p key={pIdx} className="mb-4 last:mb-0" style={{ pageBreakInside: 'avoid', breakInside: 'avoid', orphans: 3, widows: 3 }}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center py-12">
                <div className="w-16 h-0.5 bg-slate-200 mx-auto mb-6"></div>
                <p className="text-slate-300 text-[9px] font-black tracking-[0.4em] uppercase mb-0">End of Analysis</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
           <button onClick={handleBackToHome} className="px-10 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm text-sm">
              返回主页
           </button>
           <button onClick={handleDownloadPDF} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl text-sm">
              下载PDF报告
           </button>
        </div>
      </div>
    </div>
  );
};
