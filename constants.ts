
import { Question } from './types';

export const ACCESS_CODE = "TEST2025";

export const QUESTIONS: Question[] = [
  // --- 第一部分：关系基础评估 (Q1-Q10) ---
  {
    id: 1,
    module: "关系基础评估",
    dimension: "恋爱时长",
    text: "1. 你们的恋爱关系持续了多久？",
    options: [
      { label: 'A', text: "3个月以内", score: 0.5 },
      { label: 'B', text: "3-6个月", score: 1 },
      { label: 'C', text: "6个月-1年", score: 1.5 },
      { label: 'D', text: "1-2年", score: 2 },
      { label: 'E', text: "2年以上", score: 2.5 }
    ]
  },
  {
    id: 2,
    module: "关系基础评估",
    dimension: "分手时长",
    text: "2. 分手距今多长时间？",
    options: [
      { label: 'A', text: "1周以内", score: 1.5 },
      { label: 'B', text: "1-2周", score: 2.5 },
      { label: 'C', text: "2周-1个月", score: 2 },
      { label: 'D', text: "1-3个月", score: 1.5 },
      { label: 'E', text: "3个月以上", score: 0.5 }
    ]
  },
  {
    id: 3,
    module: "关系基础评估",
    dimension: "关系质量",
    text: "3. 恋爱期间你们的关系质量如何？",
    options: [
      { label: 'A', text: "经常争吵，矛盾不断", score: 0.5 },
      { label: 'B', text: "偶有矛盾，但能解决", score: 1.5 },
      { label: 'C', text: "关系稳定，相处融洽", score: 2.5 },
      { label: 'D', text: "非常甜蜜，几乎无矛盾", score: 2 }
    ]
  },
  {
    id: 4,
    module: "关系基础评估",
    dimension: "分手频次",
    text: "4. 分手前是否有过分分合合的经历？",
    options: [
      { label: 'A', text: "首次分手", score: 2.5 },
      { label: 'B', text: "第2次分手", score: 1.5 },
      { label: 'C', text: "第3次分手", score: 0.5 },
      { label: 'D', text: "3次以上", score: 0 }
    ]
  },
  {
    id: 5,
    module: "关系基础评估",
    dimension: "情感连接",
    text: "5. 恋爱期间，你们是否建立了深度情感连接？",
    options: [
      { label: 'A', text: "见过双方父母/重要朋友", score: 2.5 },
      { label: 'B', text: "有共同生活经历（旅行/同居等）", score: 2 },
      { label: 'C', text: "主要是线上交流或浅层约会", score: 1 },
      { label: 'D', text: "关系一直比较表面", score: 0.5 }
    ]
  },
  {
    id: 6,
    module: "关系基础评估",
    dimension: "对方投入",
    text: "6. 对方在恋爱中的投入程度如何？",
    options: [
      { label: 'A', text: "非常用心，付出很多", score: 2.5 },
      { label: 'B', text: "比较投入，有真实感情", score: 2 },
      { label: 'C', text: "投入一般，若即若离", score: 1 },
      { label: 'D', text: "投入较少，你付出更多", score: 0.5 }
    ]
  },
  {
    id: 7,
    module: "关系基础评估",
    dimension: "目标一致性",
    text: "7. 你们的价值观和人生规划是否一致？",
    options: [
      { label: 'A', text: "高度一致，目标相似", score: 2.5 },
      { label: 'B', text: "基本一致，有共同话题", score: 2 },
      { label: 'C', text: "存在一些差异", score: 1 },
      { label: 'D', text: "差异较大，经常因此争执", score: 0 }
    ]
  },
  {
    id: 8,
    module: "关系基础评估",
    dimension: "冲突处理",
    text: "8. 恋爱期间，你们如何处理矛盾？",
    options: [
      { label: 'A', text: "冷静沟通，共同解决", score: 2.5 },
      { label: 'B', text: "虽有争吵但最终能和解", score: 1.5 },
      { label: 'C', text: "经常冷战或逃避问题", score: 0.5 },
      { label: 'D', text: "激烈争吵，互相指责", score: 0 }
    ]
  },
  {
    id: 9,
    module: "关系基础评估",
    dimension: "分手态度",
    text: "9. 分手时对方的态度如何？",
    options: [
      { label: 'A', text: "犹豫挣扎，表现出不舍", score: 2.5 },
      { label: 'B', text: "理性平静，但有情绪波动", score: 1.5 },
      { label: 'C', text: "坚决果断，态度坚定", score: 0.5 },
      { label: 'D', text: "态度恶劣，充满怨恨", score: 0 }
    ]
  },
  {
    id: 10,
    module: "关系基础评估",
    dimension: "社交支持",
    text: "10. 你们之间是否存在外部支持系统？",
    options: [
      { label: 'A', text: "双方家人朋友都支持这段关系", score: 2.5 },
      { label: 'B', text: "至少一方的社交圈支持", score: 1.5 },
      { label: 'C', text: "外界态度中立", score: 1 },
      { label: 'D', text: "外界反对或有负面影响", score: 0 }
    ]
  },

  // --- 第二部分：分手原因分析 (Q11-Q23) ---
  {
    id: 11,
    module: "分手原因分析",
    dimension: "核心死结",
    text: "11. 以下哪项最接近你们分手的主要原因？",
    options: [
      { label: 'A', text: "沟通问题（相互不理解）", score: 2 },
      { label: 'B', text: "信任问题（怀疑/欺骗）", score: 0.5 },
      { label: 'C', text: "异地/聚少离多", score: 2 },
      { label: 'D', text: "家庭/外界压力", score: 1.5 },
      { label: 'E', text: "性格不合", score: 1 },
      { label: 'F', text: "生活习惯差异", score: 1 },
      { label: 'G', text: "价值观冲突", score: 0.5 },
      { label: 'H', text: "经济问题", score: 1 },
      { label: 'I', text: "第三者介入", score: 0 },
      { label: 'J', text: "个人成长需求差异", score: 1 },
      { label: 'K', text: "情感需求未被满足", score: 1.5 },
      { label: 'L', text: "突发事件/外部变故", score: 1 },
      { label: 'M', text: "对方感觉不到爱/激情消退", score: 1.5 }
    ]
  },
  {
    id: 12,
    module: "分手原因分析",
    dimension: "理由清晰度",
    text: "12. 对方是否明确表达过具体的分手理由？",
    options: [
      { label: 'A', text: "有明确清晰的理由", score: 2 },
      { label: 'B', text: "理由模糊（'感觉不对''不合适'）", score: 1 },
      { label: 'C', text: "拒绝沟通，没有解释", score: 0 }
    ]
  },
  {
    id: 13,
    module: "分手原因分析",
    dimension: "可改性",
    text: "13. 在你看来，分手原因是否可以改变/解决？",
    options: [
      { label: 'A', text: "完全可以通过努力改变", score: 2 },
      { label: 'B', text: "部分可以改变", score: 1.5 },
      { label: 'C', text: "很难改变，涉及根本问题", score: 0.5 },
      { label: 'D', text: "完全无法改变（客观因素）", score: 0 }
    ]
  },
  {
    id: 14,
    module: "分手原因分析",
    dimension: "原则问题",
    text: "14. 是否存在原则性问题？",
    options: [
      { label: 'A', text: "不存在", score: 2 },
      { label: 'B', text: "存在轻微原则问题", score: 1 },
      { label: 'C', text: "存在严重原则问题（出轨/暴力/欺骗）", score: 0 }
    ]
  },
  {
    id: 15,
    module: "分手原因分析",
    dimension: "冷淡期",
    text: "15. 分手前是否有过明显的感情降温期？",
    options: [
      { label: 'A', text: "没有，分手很突然", score: 1.5 },
      { label: 'B', text: "有1-2周的冷淡期", score: 2 },
      { label: 'C', text: "有1个月左右的降温期", score: 1 },
      { label: 'D', text: "长期感情淡漠（半年以上）", score: 0.5 }
    ]
  },
  {
    id: 16,
    module: "分手原因分析",
    dimension: "自身问题",
    text: "16. 你在恋爱中是否存在以下严重行为？",
    options: [
      { label: 'A', text: "过度依赖/粘人", score: -1 },
      { label: 'B', text: "频繁查岗/控制欲强", score: -1.5 },
      { label: 'C', text: "情绪化/经常发脾气", score: -1 },
      { label: 'D', text: "忽视对方感受", score: -1 },
      { label: 'E', text: "不够成熟/缺乏责任感", score: -1 },
      { label: 'F', text: "以上都不存在或较轻微", score: 2 }
    ]
  },
  {
    id: 17,
    module: "分手原因分析",
    dimension: "对方预警",
    text: "17. 对方在分手前是否有明显的预警表现？",
    options: [
      { label: 'A', text: "减少联系频率", score: 0.5 },
      { label: 'B', text: "约会时心不在焉", score: 0.5 },
      { label: 'C', text: "拒绝亲密行为", score: 0.5 },
      { label: 'D', text: "以上都没有，表现正常", score: 2 }
    ]
  },
  {
    id: 18,
    module: "分手原因分析",
    dimension: "心死程度",
    text: "18. 你认为对方是否已经放下这段感情？",
    options: [
      { label: 'A', text: "没有，仍有情感牵绊", score: 2 },
      { label: 'B', text: "不确定，看不出明显信号", score: 1.5 },
      { label: 'C', text: "可能已经放下", score: 0.5 },
      { label: 'D', text: "确定已经放下/有新欢", score: 0 }
    ]
  },
  {
    id: 19,
    module: "分手原因分析",
    dimension: "提出方",
    text: "19. 分手是谁提出的？",
    options: [
      { label: 'A', text: "对方主动提出", score: 1.5 },
      { label: 'B', text: "你主动提出（后悔了）", score: 1 },
      { label: 'C', text: "双方协商决定", score: 2 }
    ]
  },
  {
    id: 20,
    module: "分手原因分析",
    dimension: "第三者",
    text: "20. 分手时是否有第三者因素？",
    options: [
      { label: 'A', text: "确定有第三者", score: 0 },
      { label: 'B', text: "怀疑但不确定", score: 0.5 },
      { label: 'C', text: "没有第三者", score: 2 }
    ]
  },
  {
    id: 21,
    module: "分手原因分析",
    dimension: "自我认知",
    text: "21. 你对分手原因的认知是否清晰？",
    options: [
      { label: 'A', text: "非常清楚，对方表达明确", score: 2 },
      { label: 'B', text: "基本了解", score: 1.5 },
      { label: 'C', text: "不太清楚，感到困惑", score: 0.5 },
      { label: 'D', text: "完全不理解为什么分手", score: 0 }
    ]
  },
  {
    id: 22,
    module: "分手原因分析",
    dimension: "争吵频率",
    text: "22. 恋爱期间你们的争吵频率是？",
    options: [
      { label: 'A', text: "几乎不吵架", score: 2 },
      { label: 'B', text: "偶尔争吵（每月1-2次）", score: 1.5 },
      { label: 'C', text: "经常争吵（每周都有）", score: 0.5 },
      { label: 'D', text: "几乎天天吵", score: 0 }
    ]
  },
  {
    id: 23,
    module: "分手原因分析",
    dimension: "问题潜伏期",
    text: "23. 导致分手的问题是否在恋爱初期就存在？",
    options: [
      { label: 'A', text: "不是，是后期出现的", score: 2 },
      { label: 'B', text: "一直存在但不严重", score: 1 },
      { label: 'C', text: "一直存在且持续恶化", score: 0 }
    ]
  },

  // --- 第三部分：当前状态评估 (Q24-Q35) ---
  {
    id: 24,
    module: "当前状态评估",
    dimension: "联系状况",
    text: "24. 分手后你们的联系状况如何？",
    options: [
      { label: 'A', text: "保持正常交流", score: 2.5 },
      { label: 'B', text: "偶尔联系，对方会回复", score: 2 },
      { label: 'C', text: "你主动联系，对方冷淡回应", score: 1 },
      { label: 'D', text: "对方拒绝沟通/已拉黑", score: 0 }
    ]
  },
  {
    id: 25,
    module: "当前状态评估",
    dimension: "联系方式",
    text: "25. 对方是否删除了你的联系方式？",
    options: [
      { label: 'A', text: "没有删除", score: 2.5 },
      { label: 'B', text: "删除了社交媒体但保留通讯方式", score: 1.5 },
      { label: 'C', text: "全部删除/拉黑", score: 0 }
    ]
  },
  {
    id: 26,
    module: "当前状态评估",
    dimension: "共同回忆",
    text: "26. 对方是否删除了你们的共同回忆（照片/礼物等）？",
    options: [
      { label: 'A', text: "没有删除，还能看到", score: 2.5 },
      { label: 'B', text: "删除了部分", score: 1.5 },
      { label: 'C', text: "全部删除", score: 0.5 },
      { label: 'D', text: "不知道/无法查看", score: 1 }
    ]
  },
  {
    id: 27,
    module: "当前状态评估",
    dimension: "分手后行为",
    text: "27. 分手后你是否做过以下负面纠缠行为？",
    options: [
      { label: 'A', text: "频繁联系/轰炸式信息", score: -1.5 },
      { label: 'B', text: "哭闹/情绪失控", score: -1 },
      { label: 'C', text: "纠缠/堵人", score: -2.5 },
      { label: 'D', text: "求助对方朋友/家人施压", score: -1 },
      { label: 'E', text: "威胁/自我伤害", score: -2.5 },
      { label: 'F', text: "以上都没做过", score: 2.5 }
    ]
  },
  {
    id: 28,
    module: "当前状态评估",
    dimension: "动态同步",
    text: "28. 对方的社交媒体状态如何？",
    options: [
      { label: 'A', text: "正常更新，未屏蔽你", score: 2 },
      { label: 'B', text: "更新减少，能看到内容", score: 1.5 },
      { label: 'C', text: "已屏蔽你", score: 0.5 },
      { label: 'D', text: "发布疑似新恋情内容", score: 0 }
    ]
  },
  {
    id: 29,
    module: "当前状态评估",
    dimension: "社交试探",
    text: "29. 对方是否会在社交平台发布针对你的动态？",
    options: [
      { label: 'A', text: "有，发一些暗示性或伤感的动态", score: 2.5 },
      { label: 'B', text: "偶尔发一些相关的句子", score: 1.5 },
      { label: 'C', text: "完全没有相关动态", score: 1 }
    ]
  },
  {
    id: 30,
    module: "当前状态评估",
    dimension: "自我提升",
    text: "30. 分手后你是否在积极进行自我提升？",
    options: [
      { label: 'A', text: "积极改变（健身/学习/调整状态）", score: 2.5 },
      { label: 'B', text: "有所改变但不明显", score: 1.5 },
      { label: 'C', text: "状态下滑，生活混乱", score: 0 }
    ]
  },
  {
    id: 31,
    module: "当前状态评估",
    dimension: "被动关注",
    text: "31. 对方是否主动了解过你的近况？",
    options: [
      { label: 'A', text: "是，主动询问或通过他人了解", score: 2.5 },
      { label: 'B', text: "偶尔关注你的社交动态", score: 1.5 },
      { label: 'C', text: "完全不关注", score: 0 }
    ]
  },
  {
    id: 32,
    module: "当前状态评估",
    dimension: "现实纽带",
    text: "32. 你们是否还有必须联系的现实理由？",
    options: [
      { label: 'A', text: "有（共同财产/工作等）", score: 1.5 },
      { label: 'B', text: "没有", score: 1 }
    ]
  },
  {
    id: 33,
    module: "当前状态评估",
    dimension: "朋友界限",
    text: "33. 对方是否提到过“可以做朋友”？",
    options: [
      { label: 'A', text: "明确表示希望保持朋友关系", score: 2 },
      { label: 'B', text: "说过但态度模糊", score: 1 },
      { label: 'C', text: "拒绝任何关系", score: 0 }
    ]
  },
  {
    id: 34,
    module: "当前状态评估",
    dimension: "口碑回传",
    text: "34. 从共同朋友处了解到对方的状态是？",
    options: [
      { label: 'A', text: "对方也不好过/有后悔迹象", score: 2.5 },
      { label: 'B', text: "对方状态正常", score: 1.5 },
      { label: 'C', text: "对方生活更好/有新恋情", score: 0 },
      { label: 'D', text: "无共同朋友/不了解", score: 1 }
    ]
  },
  {
    id: 35,
    module: "当前状态评估",
    dimension: "认知同步",
    text: "35. 你是否已经了解对方当前的真实想法？",
    options: [
      { label: 'A', text: "通过沟通了解清楚", score: 2 },
      { label: 'B', text: "部分了解", score: 1 },
      { label: 'C', text: "完全不了解，在猜测", score: 0 }
    ]
  },

  // --- 第四部分：挽回条件评估 (Q36-Q45) ---
  {
    id: 36,
    module: "挽回条件评估",
    dimension: "挽回动机",
    text: "36. 你的挽回动机是什么？",
    options: [
      { label: 'A', text: "真心爱对方，愿意改变", score: 3 },
      { label: 'B', text: "习惯对方存在，不舍得", score: 1.5 },
      { label: 'C', text: "不甘心/赌气", score: 0 },
      { label: 'D', text: "害怕孤独/找不到更好的", score: 0 }
    ]
  },
  {
    id: 37,
    module: "挽回条件评估",
    dimension: "改变计划",
    text: "37. 你是否清楚需要改变什么来挽回？",
    options: [
      { label: 'A', text: "非常清楚，有具体计划", score: 3 },
      { label: 'B', text: "有一定想法", score: 1.5 },
      { label: 'C', text: "不清楚，希望对方回心转意", score: 0 }
    ]
  },
  {
    id: 38,
    module: "挽回条件评估",
    dimension: "资源储备",
    text: "38. 你有能力和资源做出改变吗？",
    options: [
      { label: 'A', text: "完全有能力", score: 3 },
      { label: 'B', text: "有一定能力", score: 2 },
      { label: 'C', text: "需要外部帮助", score: 1 },
      { label: 'D', text: "很难做到", score: 0 }
    ]
  },
  {
    id: 39,
    module: "挽回条件评估",
    dimension: "空间共识",
    text: "39. 你是否愿意给对方空间和时间？",
    options: [
      { label: 'A', text: "愿意，理解需要冷静期", score: 3 },
      { label: 'B', text: "愿意但很难控制", score: 1.5 },
      { label: 'C', text: "不愿意，想马上挽回", score: 0 }
    ]
  },
  {
    id: 40,
    module: "挽回条件评估",
    dimension: "风险承受",
    text: "40. 假如挽回失败，你能接受吗？",
    options: [
      { label: 'A', text: "能接受，尽力就好", score: 3 },
      { label: 'B', text: "很难接受但会面对", score: 1.5 },
      { label: 'C', text: "完全不能接受", score: 0 }
    ]
  },
  {
    id: 41,
    module: "挽回条件评估",
    dimension: "社交价值",
    text: "41. 你的社交吸引力如何？",
    options: [
      { label: 'A', text: "外形/性格/能力都有优势", score: 3 },
      { label: 'B', text: "有一定吸引力", score: 2 },
      { label: 'C', text: "吸引力一般", score: 1 },
      { label: 'D', text: "明显弱于对方", score: 0.5 }
    ]
  },
  {
    id: 42,
    module: "挽回条件评估",
    dimension: "依恋风格",
    text: "42. 对方的依恋风格倾向于？",
    options: [
      { label: 'A', text: "安全型（稳定可靠）", score: 2.5 },
      { label: 'B', text: "焦虑型（怕被抛弃）", score: 2 },
      { label: 'C', text: "回避型（重视独立）", score: 1 },
      { label: 'D', text: "不了解", score: 1 }
    ]
  },
  {
    id: 43,
    module: "挽回条件评估",
    dimension: "冲动程度",
    text: "43. 你们分手是否经过深思熟虑？",
    options: [
      { label: 'A', text: "冲动决定，事后可能后悔", score: 3 },
      { label: 'B', text: "考虑了一段时间", score: 1.5 },
      { label: 'C', text: "长期考虑，深思熟虑", score: 0.5 }
    ]
  },
  {
    id: 44,
    module: "挽回条件评估",
    dimension: "外部变故",
    text: "44. 对方的生活中是否出现重大变故？",
    options: [
      { label: 'A', text: "是，压力很大影响了感情", score: 1.5 },
      { label: 'B', text: "没有特别变故", score: 1 }
    ]
  },
  {
    id: 45,
    module: "挽回条件评估",
    dimension: "解决效能",
    text: "45. 如果复合，你认为问题能真正解决吗？",
    options: [
      { label: 'A', text: "能，已找到解决方案", score: 3 },
      { label: 'B', text: "不确定，但愿意尝试", score: 1.5 },
      { label: 'C', text: "不能，可能重蹈覆辙", score: 0 }
    ]
  },

  // --- 第五部分：深度评估 (Q46-Q50) ---
  {
    id: 46,
    module: "深度评估",
    dimension: "相处模式",
    text: "46. 以下哪项最符合你们的相处模式？",
    options: [
      { label: 'A', text: "相互支持，共同成长", score: 1.5 },
      { label: 'B', text: "一方付出多，一方享受多", score: 0.5 },
      { label: 'C', text: "相互消耗，负面情绪多", score: 0 }
    ]
  },
  {
    id: 47,
    module: "深度评估",
    dimension: "获益程度",
    text: "47. 对方在恋爱中获得了什么？",
    options: [
      { label: 'A', text: "情感支持、快乐、成长", score: 1.5 },
      { label: 'B', text: "有收获但也有负担", score: 1 },
      { label: 'C', text: "主要是负面体验", score: 0 }
    ]
  },
  {
    id: 48,
    module: "深度评估",
    dimension: "挽回价值",
    text: "48. 你认为这段感情值得挽回吗？",
    options: [
      { label: 'A', text: "非常值得，是真爱", score: 1.5 },
      { label: 'B', text: "值得尝试", score: 1 },
      { label: 'C', text: "不确定", score: 0.5 },
      { label: 'D', text: "其实不太值得", score: 0 }
    ]
  },
  {
    id: 49,
    module: "深度评估",
    dimension: "拒绝应对",
    text: "49. 如果对方明确拒绝复合，你会？",
    options: [
      { label: 'A', text: "尊重决定，放手离开", score: 1.5 },
      { label: 'B', text: "再争取一次，然后放手", score: 1 },
      { label: 'C', text: "一直争取，直到TA同意", score: -1.5 }
    ]
  },
  {
    id: 50,
    module: "深度评估",
    dimension: "未来期待",
    text: "50. 你对未来的期待是？",
    options: [
      { label: 'A', text: "希望复合后建立更健康的关系", score: 1.5 },
      { label: 'B', text: "只要在一起就好", score: 0.5 },
      { label: 'C', text: "没想那么多", score: 0 }
    ]
  }
];

export const DIMENSION_DESCRIPTIONS = [
  {
    title: "关系基础",
    desc: "分析恋爱时长、投入度及情感连接的厚度。",
    icon: "🏗️"
  },
  {
    title: "原因诊断",
    desc: "解构分手核心冲突及问题的可解决性。",
    icon: "🧬"
  },
  {
    title: "当前状态",
    desc: "评估当下的互动频率及对方的心理态度。",
    icon: "📡"
  },
  {
    title: "挽回条件",
    desc: "考察你的动机、资源及改变的具体意愿。",
    icon: "⚙️"
  },
  {
    title: "深度共振",
    desc: "探寻灵魂契合度及关系长期的存续价值。",
    icon: "💎"
  }
];
