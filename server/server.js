import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import axios from 'axios';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 初始化数据库
const db = new Database('reconciliation.db');
db.pragma('journal_mode = WAL');

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT UNIQUE NOT NULL,
    answers TEXT NOT NULL,
    scores TEXT NOT NULL,
    ai_report TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 验证访问码（调用 BRAS 管理后台）
app.post('/api/verify-access-code', async (req, res) => {
  try {
    const { code } = req.body;
    
    // 调用 BRAS 管理后台验证接口
    const response = await axios.post('http://localhost:4001/api/access-codes/verify', {
      code: code
    });
    
    if (response.data.success) {
      res.json({ success: true });
    } else {
      res.status(401).json({ 
        success: false, 
        message: response.data.message || '访问码无效' 
      });
    }
  } catch (error) {
    console.error('验证访问码失败:', error.message);
    res.status(500).json({ 
      success: false, 
      message: '验证失败，请稍后重试' 
    });
  }
});

// 生成 AI 深度报告 (DeepSeek API)
app.post('/api/generate-report', async (req, res) => {
  try {
    const { scores, answers, primaryType } = req.body;
    
    if (!scores || !answers) {
      return res.status(400).json({ error: '缺少必要参数' });
    }

    // 构建提示词
    const answerSummary = Object.entries(answers)
      .map(([qId, option]) => `Q${qId}: ${option.text}`)
      .join('\\n');

    const prompt = `请基于以下评估报告，为用户生成一份深度个性化的挽回分析和行动方案。

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
1. 称谓统一：禁止使用"他"或"她"，必须统一使用"TA"来指代对方。
2. 语言风格：绝不使用"收到你的评估请求后"、"我们的专业团队"、"为您进行深度拆解"等带有距离感的官僚表达。语气要温暖、直接、深邃，像一位懂心理学的老友。
3. 表达禁忌：严禁使用"绝对不要"、"必须"、"绝不"等武断、生硬的措辞。请改为"建议不要"、"不建议"、"或许可以尝试避免"等建议性且委婉的表达。
4. 语言红线：严禁出现"高攀不起"、"卑微"、"舔狗"、"纠缠"等贬低性词汇。
5. 符号红线：输出内容必须是干净的纯文本。严禁使用任何 Markdown 符号，包括但不限于：##、#、**、__、*、-、> 等。不要使用任何格式化标记，只使用纯文本和段落换行。
6. 字数目标：内容要极度详实，包含大量具体场景分析与话术，向 8000 字靠拢。

【报告结构要求】
1. 深度开场白：从心理学和人性视角切入，直接触及用户当下的心境。
2. 关系深度解读 (1500字)：解构过往情感连接的质量与隐性契约。
3. 分手原因深层剖析 (2000字)：跳出表面争吵，直击 TA 心中真正的死结。
4. 对方心理状态深度分析 (1500字)：基于评估数据，还原 TA 目前的防御机制与潜意识渴望。
5. 阶段性行动方案 (3000字)：分为冷静断联期、二次吸引期、关系重建期。提供精准的 30 天行动建议和具体的复联联系话术。
6. 风险提示与禁忌：清晰列出当下建议不要触碰的雷区。
7. 暖心建议与自我重建：关于个人价值的重塑与成长的深层引导。

注意：请在报告的最末尾，完整包含以下这段文字（注意"亲爱的朋友："后面直接接内容，不要有任何空行或分隔符）：
"亲爱的朋友：无论这份报告的结果如何，我们都希望你明白：挽回的本质不是'把对方追回来'，而是'成为更好的自己'。如果最终你们能复合，那是因为你们真的解决了问题，建立了更健康的关系模式。如果最终无法挽回，你也会因为这段经历成长，在下一段关系中做得更好。所以，无论结果如何，你都不会白白付出。我们不会告诉你'只要照做就一定能成功'，因为感情从来不是数学题。但我们可以保证：这份报告基于心理学原理和大量真实案例，能最大限度提高你的成功率。最重要的是：请对自己好一点。你值得被爱，无论是被对方爱，还是被未来的人爱，还是被你自己爱。

—— BetterMe 情感分析团队"`;

    // 调用 DeepSeek API
    const response = await axios.post(
      process.env.DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的情感心理咨询师，擅长分析分手挽回问题。你的回复要温暖、专业、有深度。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 8000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let report = response.data.choices[0].message.content;
    
    // 清理所有 Markdown 符号
    report = report.replace(/#{1,6}\s?/g, "");           // 清除标题符号
    report = report.replace(/\*\*/g, "");                 // 清除加粗符号
    report = report.replace(/__/g, "");                   // 清除下划线
    report = report.replace(/\*/g, "");                   // 清除斜体符号
    report = report.replace(/^>\s?/gm, "");               // 清除引用符号
    report = report.replace(/^-\s?/gm, "");               // 清除列表符号
    report = report.replace(/^\d+\.\s?/gm, "");           // 清除数字列表
    report = report.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // 清除链接，保留文本

    res.json({ report });
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: '生成报告失败',
      details: error.response?.data?.error || error.message
    });
  }
});

// 保存测评记录（同时同步到管理后台）
app.post('/api/save-assessment', async (req, res) => {
  try {
    const { sessionId, answers, scores, aiReport, accessCode } = req.body;
    
    // 保存到本地数据库
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO assessments (session_id, answers, scores, ai_report)
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run(
      sessionId,
      JSON.stringify(answers),
      JSON.stringify(scores),
      aiReport || null
    );
    
    // 同步到 BRAS 管理后台
    try {
      const assessmentData = {
        sessionId: sessionId,
        accessCode: accessCode || null,
        totalScore: scores.total || 0,
        standardizedScore: scores.standardized || 0,
        grade: scores.grade || 'C',
        probability: scores.probability || '未知',
        attitudeLevel: scores.attitudeLevel || '未知',
        reasonType: scores.reasonType || '未知',
        sections: scores.sections || { base: 0, reason: 0, status: 0, conditions: 0, deep: 0 },
        answers: answers,
        aiReport: aiReport || null
      };
      
      const response = await axios.post('http://localhost:4001/api/assessments/submit', 
        assessmentData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data && response.data.id) {
        console.log('✅ 数据已同步到管理后台，Assessment ID:', response.data.id);
      }
    } catch (syncError) {
      console.error('⚠️ 管理后台同步失败:', syncError.response?.data || syncError.message);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('保存测评记录失败:', error);
    res.status(500).json({ error: '保存失败' });
  }
});

// 获取历史记录
app.get('/api/assessment-history/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const stmt = db.prepare('SELECT * FROM assessments WHERE session_id = ? ORDER BY created_at DESC');
    const records = stmt.all(sessionId);
    
    const parsedRecords = records.map(record => ({
      ...record,
      answers: JSON.parse(record.answers),
      scores: JSON.parse(record.scores)
    }));
    
    res.json({ records: parsedRecords });
  } catch (error) {
    console.error('获取历史记录失败:', error);
    res.status(500).json({ error: '获取失败' });
  }
});

// 导出 PDF 报告
app.post('/api/export-pdf', async (req, res) => {
  try {
    const { scores, answers, aiReport } = req.body;
    
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const filename = `reconciliation-report-${Date.now()}.pdf`;
    const filepath = path.join(__dirname, 'exports', filename);
    
    // 确保导出目录存在
    if (!fs.existsSync(path.join(__dirname, 'exports'))) {
      fs.mkdirSync(path.join(__dirname, 'exports'));
    }
    
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);
    
    // 添加中文字体支持（需要字体文件，这里先用英文）
    doc.fontSize(20).text('分手挽回可能性测评报告', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).text(`挽回成功率得分: ${scores.standardized}/100`);
    doc.text(`挽回等级: ${scores.grade}`);
    doc.text(`预估成功率: ${scores.probability}`);
    doc.text(`对方当前态度: ${scores.attitudeLevel}`);
    doc.moveDown();
    
    if (aiReport) {
      doc.fontSize(12).text('AI 深度分析报告:', { underline: true });
      doc.moveDown();
      doc.fontSize(10).text(aiReport, { align: 'left' });
    }
    
    doc.end();
    
    stream.on('finish', () => {
      res.download(filepath, filename, (err) => {
        if (err) {
          console.error('下载失败:', err);
        }
        // 下载后删除文件
        fs.unlinkSync(filepath);
      });
    });
  } catch (error) {
    console.error('导出 PDF 失败:', error);
    res.status(500).json({ error: '导出失败' });
  }
});

// 获取所有测评数据（用于导出）
app.get('/api/export-all-assessments', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, session_id, answers, scores, ai_report, created_at 
      FROM assessments 
      ORDER BY created_at DESC
    `);
    
    const records = stmt.all();
    
    const parsedRecords = records.map(record => ({
      id: record.id,
      sessionId: record.session_id,
      answers: JSON.parse(record.answers),
      scores: JSON.parse(record.scores),
      aiReport: record.ai_report,
      createdAt: record.created_at
    }));
    
    res.json({ 
      success: true, 
      count: records.length,
      data: parsedRecords 
    });
  } catch (error) {
    console.error('导出数据失败:', error);
    res.status(500).json({ error: '导出失败' });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 保存完整报告并生成分享链接
app.post('/api/save-report', (req, res) => {
  try {
    const { scores, aiReport } = req.body;
    
    if (!scores) {
      return res.status(400).json({ error: '缺少评分数据' });
    }
    
    // 生成唯一的报告ID
    const reportId = `R${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // 保存到数据库
    const stmt = db.prepare(`
      INSERT INTO assessments (session_id, answers, scores, ai_report)
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run(
      reportId,
      JSON.stringify({}),
      JSON.stringify(scores),
      aiReport || null
    );
    
    res.json({ 
      success: true, 
      reportId,
      shareUrl: `/report/${reportId}`
    });
  } catch (error) {
    console.error('保存报告失败:', error);
    res.status(500).json({ error: '保存失败' });
  }
});

// 获取分享的报告
app.get('/api/report/:reportId', (req, res) => {
  try {
    const { reportId } = req.params;
    
    const stmt = db.prepare(`
      SELECT session_id, scores, ai_report, created_at
      FROM assessments
      WHERE session_id = ?
    `);
    
    const report = stmt.get(reportId);
    
    if (!report) {
      return res.status(404).json({ error: '报告不存在' });
    }
    
    res.json({
      reportId: report.session_id,
      scores: JSON.parse(report.scores),
      aiReport: report.ai_report,
      createdAt: report.created_at
    });
  } catch (error) {
    console.error('获取报告失败:', error);
    res.status(500).json({ error: '获取失败' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📊 数据库已初始化`);
  console.log(`🔑 DeepSeek API 已配置`);
});
