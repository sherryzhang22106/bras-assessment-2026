import { UserScores, Option } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
 */
export const generateDeepReport = async (
  scores: UserScores, 
  answers: Record<number, Option>,
  primaryType: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scores, answers, primaryType })
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
