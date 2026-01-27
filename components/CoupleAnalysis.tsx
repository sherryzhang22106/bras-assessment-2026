import React, { useState } from 'react';
import { AttachmentType } from '../types';

interface Props {
  userType: AttachmentType;
  onBack: () => void;
}

const typeMap: Record<AttachmentType, string> = {
  'Secure': '安全型',
  'Anxious': '焦虑型',
  'Avoidant': '回避型',
  'Fearful': '恐惧型'
};

const getMatrixData = (user: AttachmentType, partner: AttachmentType) => {
  const matrix: Record<string, Record<string, { score: string, label: string, desc: string }>> = {
    'Secure': {
      'Secure': { score: '85-95', label: '理想组合', desc: '双向奔赴的稳定基石。' },
      'Anxious': { score: '65-75', label: '稳定但需注意', desc: '安全方的宽容可以治愈焦虑。' },
      'Avoidant': { score: '55-65', label: '可行但具挑战', desc: '需要安全方更多的耐心引导。' },
      'Fearful': { score: '45-55', label: '需要努力', desc: '需要建立深度信任。' }
    },
    'Anxious': {
      'Secure': { score: '65-75', label: '稳定但需注意', desc: '安全方的稳健能降低你的焦虑。' },
      'Anxious': { score: '35-45', label: '高冲突风险', desc: '双重焦虑可能导致情绪过载。' },
      'Avoidant': { score: '20-30', label: '追逃循环 ⚠️', desc: '最经典的困境组合。' },
      'Fearful': { score: '25-35', label: '混乱组合', desc: '情绪张力极大，容易内耗。' }
    },
    'Avoidant': {
      'Secure': { score: '55-65', label: '可行但具挑战', desc: '安全方需提供足够的空间。' },
      'Anxious': { score: '20-30', label: '追逃循环 ⚠️', desc: '你的逃避会加剧TA的追逐。' },
      'Avoidant': { score: '50-60', label: '平行关系', desc: '相安无事但深度连接不足。' },
      'Fearful': { score: '30-40', label: '复杂组合', desc: '情感边界容易发生激烈碰撞。' }
    },
    'Fearful': {
      'Secure': { score: '45-55', label: '需要努力', desc: '需要长期的稳定来修复创伤。' },
      'Anxious': { score: '25-35', label: '混乱组合', desc: '双方都极度缺乏安全感。' },
      'Avoidant': { score: '30-40', label: '复杂组合', desc: '情感需求与边界的反复撕扯。' },
      'Fearful': { score: '15-25', label: '极不稳定 ⚠️', desc: '建议寻求专业心理支持。' }
    }
  };
  return matrix[user][partner];
};

export const CoupleAnalysis: React.FC<Props> = ({ userType, onBack }) => {
  const [partnerType, setPartnerType] = useState<AttachmentType | null>(null);

  const result = partnerType ? getMatrixData(userType, partnerType) : null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-8 flex items-center text-slate-400 hover:text-slate-600 font-semibold group">
           <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
           返回报告
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-800">配对互动模式分析</h2>
            <p className="text-slate-500 mt-2">选择伴侣的依恋类型，解锁你们的互动密码</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {(['Secure', 'Anxious', 'Avoidant', 'Fearful'] as AttachmentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setPartnerType(type)}
                className={`px-8 py-4 rounded-2xl border-2 font-bold transition-all ${partnerType === type ? 'border-primary bg-indigo-50 text-primary scale-105 shadow-md' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
              >
                {typeMap[type]}
              </button>
            ))}
          </div>

          {result && partnerType && (
            <div className="animate-fade-in space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                <div>
                  <div className="text-sm uppercase font-bold text-slate-400 mb-2">你的类型</div>
                  <div className="text-2xl font-bold text-slate-800">{typeMap[userType]}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-serif font-bold text-primary mb-2">{result.score}</div>
                  <div className="px-4 py-1 bg-indigo-100 text-primary text-xs font-bold rounded-full uppercase tracking-widest">{result.label}</div>
                </div>
                <div>
                  <div className="text-sm uppercase font-bold text-slate-400 mb-2">伴侣类型</div>
                  <div className="text-2xl font-bold text-slate-800">{typeMap[partnerType]}</div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="mr-3">🔄</span> 关系动力解析
                </h3>
                <div className="text-slate-600 leading-relaxed text-lg">
                  <p>{result.desc}</p>
                  {userType === 'Anxious' && partnerType === 'Avoidant' && (
                    <p className="mt-4 text-slate-700">你们之间存在典型的“追逃循环”模式。当其中一方寻求亲密时，另一方会感到窒息并后退，这反过来加剧了追求方的焦虑，形成了一个消耗性的闭环。</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border-2 border-indigo-50 p-6 rounded-2xl">
                  <h4 className="font-bold text-slate-800 mb-3">✨ 你们的优势</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• 相互吸引的张力较强</li>
                    <li>• 存在互补的成长空间</li>
                    <li>• 只要觉察模式，改善潜力巨大</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-pink-50 p-6 rounded-2xl">
                  <h4 className="font-bold text-slate-800 mb-3">⚠️ 相处预警</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• 沟通风格不匹配可能导致冷战</li>
                    <li>• 情感需求的表达存在错位</li>
                    <li>• 需要警惕自尊心的相互伤害</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center p-6 border-t border-slate-100">
                <p className="text-slate-400 text-sm">💡 建议将此报告分享给伴侣，共同探讨改进方案。</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
