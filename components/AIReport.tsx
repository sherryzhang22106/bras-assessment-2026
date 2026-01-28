
import React, { useEffect, useState } from 'react';
import { generateDeepReport, saveAssessment, generateSessionId, Part1Summary } from '../services/apiService';
import { UserScores, Option } from '../types';
import { getPrimaryType } from '../utils/scoring';

interface Props {
  scores: UserScores;
  answers: Record<number, Option>;
  cachedContent: string | null;
  accessCode: string;
  part: 'part1' | 'part2';
  part1Summary?: Part1Summary;
  onReportReady: (content: string, summary?: Part1Summary) => void;
  onClose: () => void;
}

// 上篇加载提示
const LOADING_MESSAGES_PART1 = [
  "正在解构过往情感契约...",
  "正在分析 TA 的防御机制...",
  "正在评估底层依恋模式冲突...",
  "正在剖析分手深层原因...",
  "正在解读对方心理状态...",
  "正在评估关系修复可能性..."
];

// 下篇加载提示
const LOADING_MESSAGES_PART2 = [
  "正在测算复联路径成功率...",
  "正在生成 30 天行动指南...",
  "正在整理深度复联话术...",
  "正在为您定制关系修复方案...",
  "正在制定阶段性行动计划...",
  "正在评估风险与红线..."
];

export const AIReport: React.FC<Props> = ({
  scores,
  answers,
  cachedContent,
  accessCode,
  part,
  part1Summary,
  onReportReady,
  onClose
}) => {
  const [report, setReport] = useState<string>(cachedContent || '');
  const [loading, setLoading] = useState(!cachedContent);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const hasSavedRef = React.useRef(false);

  const LOADING_MESSAGES = part === 'part1' ? LOADING_MESSAGES_PART1 : LOADING_MESSAGES_PART2;

  useEffect(() => {
    if (cachedContent) return;

    // 动态加载消息轮播
    const msgInterval = setInterval(() => {
      setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    const fetchReport = async () => {
      const type = getPrimaryType(scores);
      const text = await generateDeepReport(scores, answers, type, part, part1Summary);
      setReport(text);

      if (part === 'part1') {
        // 从上篇内容中提取摘要信息
        const summary: Part1Summary = {
          grade: scores.grade || '未知',
          probability: scores.probability || '未知',
          reasonType: scores.reasonType || type || '未知',
          mainAdvantages: extractAdvantages(text),
          mainDisadvantages: extractDisadvantages(text),
          partnerPsychology: extractPartnerPsychology(text)
        };
        onReportReady(text, summary);
      } else {
        onReportReady(text);
      }

      setLoading(false);
      clearInterval(msgInterval);

      // 上篇完成后保存数据，下篇完成后更新数据
      if (!hasSavedRef.current) {
        hasSavedRef.current = true;
        const sessionId = generateSessionId();
        try {
          await saveAssessment(sessionId, answers, scores, text, accessCode);
          console.log('✅ 测评数据已保存', { sessionId, accessCode, part });
        } catch (error) {
          console.error('⚠️ 保存测评数据失败:', error);
        }
      }
    };
    fetchReport();

    return () => clearInterval(msgInterval);
  }, [scores, answers, cachedContent, accessCode, part, part1Summary, onReportReady]);

  const formattedSections = report.split('\n\n').filter(p => p.trim() !== '');

  const partTitle = part === 'part1' ? 'AI 深度情感分析报告（上篇）' : 'AI 完整挽回行动方案（下篇）';
  const partSubtitle = part === 'part1' ? 'Emotional Analysis' : 'Action Plan';

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/30 backdrop-blur-sm flex justify-end">
      <div className="w-full md:w-3/4 lg:w-9/12 h-full bg-slate-50 shadow-2xl overflow-y-auto relative animate-in slide-in-from-right duration-500">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 z-50 flex items-center justify-between px-6 md:px-10 py-4">
           <div className="flex items-center space-x-3">
             <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             </div>
             <div>
               <h2 className="text-lg font-bold text-slate-900">{partTitle}</h2>
               <p className="text-[8px] text-slate-400 font-black tracking-widest uppercase">{partSubtitle}</p>
             </div>
           </div>
           <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-400 transition-all border border-slate-200"
           >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
           </button>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10 md:px-12">
           {loading ? (
             <div className="flex flex-col items-center justify-center h-[70vh] space-y-8">
               <div className="relative">
                 <div className="w-20 h-20 border-4 border-indigo-50 border-t-primary rounded-full animate-spin"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-10 h-10 bg-primary/10 rounded-full animate-pulse"></div>
                 </div>
               </div>
               <div className="text-center space-y-4">
                 <h3 className="text-xl font-bold text-slate-900 transition-all duration-500 animate-pulse">
                   {part === 'part1' ? '情感分析报告构建中...' : '行动方案生成中...'}
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
               </div>
             </div>
           ) : (
             <div className="space-y-12">
               {/* 顶部引言卡片 - 固定开头语 */}
               <div className="bg-orange-50/80 p-8 md:p-10 rounded-[2.5rem] border border-orange-100/50 shadow-sm relative overflow-hidden text-center">
                  <p className="text-orange-900/80 text-lg md:text-xl leading-[1.6] font-medium italic">
                    {part === 'part1'
                      ? '每一段感情，都是一次重新认识自我的契机。'
                      : '改变从行动开始，成长从此刻启程。'}
                  </p>
               </div>

               {/* 主体内容 */}
               <div className="space-y-10">
                 {formattedSections.map((section, idx) => {
                   const lines = section.split('\n');
                   const title = lines[0].length < 40 ? lines[0] : null;
                   const content = title ? lines.slice(1).join('\n') : section;
                   const isClosing = section.includes('亲爱的朋友');

                   if (isClosing) {
                     const highlightedText = content.split('请对自己好一点').map((partText, i, arr) => (
                       <React.Fragment key={i}>
                         {partText}
                         {i < arr.length - 1 && (
                           <span className="text-rose-500 font-black text-xl md:text-2xl underline decoration-rose-300 underline-offset-8 mx-1">
                             请对自己好一点
                           </span>
                         )}
                       </React.Fragment>
                     ));

                     return (
                        <div key={idx} className="space-y-6 mt-12">
                          {title && (
                            <div className="mb-4 flex items-center space-x-3">
                               <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                               <h4 className="text-lg font-black text-slate-900 tracking-tight">{title}</h4>
                            </div>
                          )}
                          <div className="p-10 md:p-14 bg-amber-50 rounded-[3rem] text-center border border-amber-100 relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent)] pointer-events-none"></div>
                            <div className="relative z-10">
                              <div className="text-amber-900/80 text-sm md:text-base leading-[1.8] whitespace-pre-wrap max-w-2xl mx-auto font-medium">
                                {highlightedText}
                              </div>
                            </div>
                          </div>
                        </div>
                     );
                   }

                   return (
                     <div key={idx} className="relative">
                        {title && (
                          <div className="mb-4 flex items-center space-x-3">
                             <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                             <h4 className="text-lg font-black text-slate-900 tracking-tight">{title}</h4>
                          </div>
                        )}
                        <div className={`text-slate-600 leading-[1.7] text-sm md:text-base whitespace-pre-wrap font-normal ${title ? 'bg-white p-0' : 'bg-slate-50/50 p-6 rounded-2xl'}`}>
                          {content}
                        </div>
                     </div>
                   );
                 })}
               </div>

               <div className="text-center py-12">
                  <div className="w-16 h-0.5 bg-slate-200 mx-auto mb-6"></div>
                  <p className="text-slate-300 text-[9px] font-black tracking-[0.4em] uppercase">
                    {part === 'part1' ? 'End of Part 1' : 'End of Analysis'}
                  </p>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// 从上篇内容中提取优势信息
function extractAdvantages(text: string): string {
  const match = text.match(/优势[^：:]*[：:]\s*([^。]+。)/);
  if (match) return match[1].slice(0, 100);
  // 尝试其他模式
  const altMatch = text.match(/你的优势[^：:]*[：:]\s*([^。]+。)/);
  if (altMatch) return altMatch[1].slice(0, 100);
  return '有一定的感情基础和挽回意愿';
}

// 从上篇内容中提取劣势信息
function extractDisadvantages(text: string): string {
  const match = text.match(/劣势[^：:]*[：:]\s*([^。]+。)/);
  if (match) return match[1].slice(0, 100);
  const altMatch = text.match(/你的劣势[^：:]*[：:]\s*([^。]+。)/);
  if (altMatch) return altMatch[1].slice(0, 100);
  return '需要改善沟通方式和情绪管理';
}

// 从上篇内容中提取对方心理状态
function extractPartnerPsychology(text: string): string {
  const match = text.match(/对方[^：:]*心理[^：:]*[：:]\s*([^。]+。)/);
  if (match) return match[1].slice(0, 100);
  const altMatch = text.match(/TA[^：:]*心理[^：:]*[：:]\s*([^。]+。)/);
  if (altMatch) return altMatch[1].slice(0, 100);
  return '处于观望和防御状态';
}
