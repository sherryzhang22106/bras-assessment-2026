import { UserScores, Option } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// 上篇摘要信息（用于下篇生成）
export interface Part1Summary {
  grade: string;
  probability: string;
  reasonType: string;
  mainAdvantages: string;
  mainDisadvantages: string;
  partnerPsychology: string;
}

/**
 * 验证访问码
 */
export const verifyAccessCode = async (code: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-access-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('访问码验证失败:', error);
    return false;
  }
};

/**
 * 生成 AI 深度报告（通过后端代理调用 DeepSeek API）
 * @param part - 报告部分：'part1' 上篇（情感分析）或 'part2' 下篇（行动方案）
 * @param part1Summary - 下篇生成时需要的上篇摘要信息
 */
export const generateDeepReport = async (
  scores: UserScores,
  answers: Record<number, Option>,
  primaryType: string,
  part: 'part1' | 'part2' = 'part1',
  part1Summary?: Part1Summary
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scores, answers, primaryType, part, part1Summary })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '生成报告失败');
    }

    const data = await response.json();
    return data.report;
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    return '由于分析请求过于庞大，生成深度报告时遇到一点小麻烦。请您参考基础评估结果，或稍后尝试重新生成。';
  }
};

/**
 * 流式生成 AI 深度报告
 * @param onChunk - 每次收到新内容时的回调
 * @param onComplete - 生成完成时的回调
 * @param onError - 发生错误时的回调
 */
export const generateDeepReportStream = async (
  scores: UserScores,
  answers: Record<number, Option>,
  primaryType: string,
  part: 'part1' | 'part2' = 'part1',
  part1Summary: Part1Summary | undefined,
  onChunk: (content: string) => void,
  onComplete: (fullContent: string) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scores, answers, primaryType, part, part1Summary, stream: true })
    });

    if (!response.ok) {
      throw new Error('生成报告失败');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    if (reader) {
      let completed = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                onError(parsed.error);
                return;
              }
              if (parsed.done) {
                completed = true;
                onComplete(parsed.fullContent || fullContent);
                return;
              }
              if (parsed.content) {
                fullContent += parsed.content;
                onChunk(parsed.content);
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }
      // 兜底：如果流结束但没有收到 done 信号，也要完成
      if (!completed && fullContent) {
        onComplete(fullContent);
      }
    }
  } catch (error) {
    console.error('Stream API Error:', error);
    onError('由于分析请求过于庞大，生成深度报告时遇到一点小麻烦。请您参考基础评估结果，或稍后尝试重新生成。');
  }
};

/**
 * 保存测评记录
 */
export const saveAssessment = async (
  sessionId: string,
  answers: Record<number, Option>,
  scores: UserScores,
  aiReport?: string,
  accessCode?: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/save-assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, answers, scores, aiReport, accessCode })
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('保存测评记录失败:', error);
    return false;
  }
};

/**
 * 获取历史记录
 */
export const getAssessmentHistory = async (sessionId: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessment-history/${sessionId}`);
    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error('获取历史记录失败:', error);
    return [];
  }
};

/**
 * 导出 PDF 报告
 */
export const exportPDF = async (
  scores: UserScores,
  answers: Record<number, Option>,
  aiReport: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/export-pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scores, answers, aiReport })
    });
    
    if (!response.ok) throw new Error('导出失败');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `挽回报告-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('导出 PDF 失败:', error);
    return false;
  }
};

/**
 * 生成唯一会话 ID
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
