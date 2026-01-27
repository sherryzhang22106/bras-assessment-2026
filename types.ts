
export type ReconciliationGrade = 'A' | 'B' | 'C' | 'D' | 'E';

// Fix: Define AttachmentType which was missing but imported in App.tsx and CoupleAnalysis.tsx
export type AttachmentType = 'Secure' | 'Anxious' | 'Avoidant' | 'Fearful';

export interface Option {
  label: string;
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  module: string;
  dimension: string;
  options: Option[];
  isMulti?: boolean;
}

export interface UserScores {
  total: number; // 原始分
  standardized: number; // 100分制标准化得分
  grade: ReconciliationGrade;
  sections: {
    base: number;      // 关系基础
    reason: number;    // 分手原因
    status: number;    // 当前状态
    conditions: number;// 挽回条件
    deep: number;      // 深度评估
  };
  probability: string;
  reasonType: string;
  attitudeLevel: string;
}

export type AppStep = 'LANDING' | 'ACCESS_CODE' | 'DISCLAIMER' | 'ASSESSMENT' | 'REPORT';
