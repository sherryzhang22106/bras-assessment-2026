
import { QUESTIONS } from '../constants';
import { UserScores, Option, ReconciliationGrade, AttachmentType } from '../types';

export const calculateScores = (answers: Record<number, Option>): UserScores => {
  const sections = {
    base: 0,
    reason: 0,
    status: 0,
    conditions: 0,
    deep: 0
  };

  // 1. 分段累加得分
  Object.entries(answers).forEach(([idStr, option]) => {
    const id = parseInt(idStr);
    if (id <= 10) sections.base += option.score;
    else if (id <= 23) sections.reason += option.score;
    else if (id <= 35) sections.status += option.score;
    else if (id <= 45) sections.conditions += option.score;
    else if (id <= 50) sections.deep += option.score;
  });

  const rawTotal = sections.base + sections.reason + sections.status + sections.conditions + sections.deep;

  // 2. 标准化计算 (0-100)
  // 公式：最终得分 = (实际得分 + 10) / 115.5 × 100
  let standardized = ((rawTotal + 10) / 115.5) * 100;
  standardized = Math.max(0, Math.min(100, standardized));

  // 3. 原因类型修正 (基于Q11)
  const q11Answer = answers[11]?.label;
  let reasonType = "未知";
  if (q11Answer === 'A' || q11Answer === 'C' || q11Answer === 'K' || q11Answer === 'D') {
    standardized += 4; // 容易挽回的类型修正
  } else if (q11Answer === 'B' || q11Answer === 'G' || q11Answer === 'I') {
    standardized -= 5; // 难挽回的类型修正
  }
  standardized = Math.max(0, Math.min(100, standardized));

  // 4. 等级判定
  let grade: ReconciliationGrade = 'E';
  let probability = "<10%";
  if (standardized >= 75) {
    grade = 'A';
    probability = "75-90%";
  } else if (standardized >= 55) {
    grade = 'B';
    probability = "50-75%";
  } else if (standardized >= 35) {
    grade = 'C';
    probability = "25-50%";
  } else if (standardized >= 20) {
    grade = 'D';
    probability = "10-25%";
  }

  // 5. 态度等级判定 (基于第三部分得分)
  let attitudeLevel = "决裂型";
  if (sections.status >= 20) attitudeLevel = "挽留型";
  else if (sections.status >= 12) attitudeLevel = "观望型";
  else if (sections.status >= 5) attitudeLevel = "抗拒型";

  return {
    total: rawTotal,
    standardized: Math.round(standardized),
    grade,
    sections,
    probability,
    reasonType: answers[11]?.text || "未指定",
    attitudeLevel
  };
};

// 推导用户在依恋矩阵中的大致类型
// 这里使用一个简单的映射：高分→更安全，低分→更不安全
export const getPrimaryType = (scores: UserScores): AttachmentType => {
  const g = scores.grade;
  if (g === 'A' || g === 'B') return 'Secure';
  if (g === 'C') return 'Anxious';
  if (g === 'D') return 'Avoidant';
  return 'Fearful';
};
