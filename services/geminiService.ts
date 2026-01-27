
// Fix: Use the official @google/genai library as required
import { GoogleGenAI } from "@google/genai";
import { UserScores, Option } from "../types";
import { QUESTIONS } from "../constants";

/**
 * Generates a deep, personalized reconciliation analysis report using the Gemini 3 Pro model.
 * This model is chosen for its superior reasoning capabilities in complex text generation tasks.
 */
export const generateDeepReport = async (
  scores: UserScores, 
  answers: Record<number, Option>,
  primaryType: string
): Promise<string> => {
  // 说明：此代码在浏览器中运行，GEMINI_API_KEY 会被打包进前端。
  // 真正的生产环境建议改为后端代理，避免在客户端暴露密钥。
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.error('Gemini API key is missing. 请在 .env.local 中配置 GEMINI_API_KEY');
    return '当前无法生成 AI 深度报告：缺少 Gemini API Key 配置。请联系管理员。';
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const answerSummary = Object.entries(answers)
    .map(([qId, option]) => {
      const q = QUESTIONS.find(q => q.id === parseInt(qId));
      return q ? `Q${qId}: ${q.text} -> 用户选择: ${option.text}` : "";
    })
    .join("\n");

  const prompt = `
    请基于以下评估报告，为用户生成一份深度个性化的挽回分析和行动方案。

    【核心数据摘要】
    - 挽回成功率得分: ${scores.standardized}/100
    - 挽回等级: ${scores.grade}
    - 预估成功率: ${scores.probability}
    - 对方当前态度: ${scores.attitudeLevel}
    - 核心分手原因: ${scores.reasonType}
    - 依恋类型推断: ${primaryType}

    【用户详细答题摘要】
    ${answerSummary}

    【严格要求】
    1. 称谓统一：禁止使用“他”或“她”，必须统一使用“TA”来指代对方。
    2. 语言风格：绝不使用“收到你的评估请求后”、“我们的专业团队”、“为您进行深度拆解”等带有距离感的官僚表达。语气要温暖、直接、深邃，像一位懂心理学的老友。
    3. 表达禁忌：严禁使用“绝对不要”、“必须”、“绝不”等武断、生硬的措辞。请改为“建议不要”、“不建议”、“或许可以尝试避免”等建议性且委婉的表达。
    4. 语言红线：严禁出现“高攀不起”、“卑微”、“舔狗”、“纠缠”等贬低性词汇。
    5. 符号红线：输出内容必须是干净的纯文本。禁止使用 ##、#、**、__、* 等任何 Markdown 符号。请使用清晰的段落换行来区分内容。
    6. 字数目标：内容要极度详实，包含大量具体场景分析与话术，向 8000 字靠拢。

    【报告结构要求】
    1. 深度开场白：从心理学和人性视角切入，直接触及用户当下的心境。
    2. 关系深度解读 (1500字)：解构过往情感连接的质量与隐性契约。
    3. 分手原因深层剖析 (2000字)：跳出表面争吵，直击 TA 心中真正的死结。
    4. 对方心理状态深度分析 (1500字)：基于评估数据，还原 TA 目前的防御机制与潜意识渴望。
    5. 阶段性行动方案 (3000字)：分为冷静断联期、二次吸引期、关系重建期。提供精准的 30 天行动建议和具体的复联联系话术。
    6. 风险提示与禁忌：清晰列出当下建议不要触碰的雷区。
    7. 暖心建议与自我重建：关于个人价值的重塑与成长的深层引导。

    注意：请在报告的最末尾，完整包含以下这段文字：
    “亲爱的朋友：
    无论这份报告的结果如何，我们都希望你明白：
    挽回的本质不是'把对方追回来'，而是'成为更好的自己'。
    如果最终你们能复合，那是因为你们真的解决了问题，建立了更健康的关系模式。
    如果最终无法挽回，你也会因为这段经历成长，在下一段关系中做得更好。
    所以，无论结果如何，你都不会白白付出。
    我们不会告诉你'只要照做就一定能成功'，因为感情从来不是数学题。
    但我们可以保证：这份报告基于心理学原理和大量真实案例，能最大限度提高你的成功率。
    最重要的是：请对自己好一点。
    你值得被爱，无论是被对方爱，还是被未来的人爱，还是被你自己爱。
    加油！
    —— BetterMe Space Station情感分析团队”
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const text = typeof response.text === 'function' ? response.text() : (response.text || '');
    
    // 强制清除残留的 markdown 符号
    text = text.replace(/#{1,6}\s?/g, ""); 
    text = text.replace(/\*\*/g, "");
    text = text.replace(/__/g, "");
    text = text.replace(/\*/g, "");
    
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "由于分析请求过于庞大，生成深度报告时遇到一点小麻烦。请您参考基础评估结果，或稍后尝试重新生成。";
  }
};
