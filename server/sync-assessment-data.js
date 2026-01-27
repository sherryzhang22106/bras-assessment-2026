const axios = require('axios');
const Database = require('better-sqlite3');

// 评估系统数据库
const sourceDb = new Database('/Users/zhangli（在用）/张莉文件夹/00-private/0000-开发项目相关信息/分手挽回可能性测评 (3)/server/reconciliation.db');

async function syncData() {
  try {
    // 获取所有评估记录
    const assessments = sourceDb.prepare('SELECT * FROM assessments ORDER BY id').all();
    
    console.log(`找到 ${assessments.length} 条评估记录`);
    
    for (const assessment of assessments) {
      const scores = JSON.parse(assessment.scores);
      const answers = JSON.parse(assessment.answers);
      
      const data = {
        sessionId: assessment.session_id,
        totalScore: scores.total || 0,
        standardizedScore: scores.standardized || 0,
        grade: scores.grade || 'C',
        probability: scores.probability || '未知',
        attitudeLevel: scores.attitudeLevel || '未知',
        reasonType: scores.reasonType || '未知',
        sections: scores.sections || {
          base: 0,
          reason: 0,
          status: 0,
          conditions: 0,
          deep: 0
        },
        answers: answers,
        aiReport: assessment.ai_report || null,
        ipAddress: '127.0.0.1'
      };
      
      try {
        const response = await axios.post('http://localhost:4001/api/assessments/submit', data, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.data && response.data.success) {
          console.log(`✅ 同步成功: ${assessment.session_id} (ID: ${response.data.id})`);
        } else {
          console.log(`⚠️ 同步失败: ${assessment.session_id} - ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(`⚠️ 已存在，跳过: ${assessment.session_id}`);
        } else {
          console.error(`❌ 同步错误: ${assessment.session_id} - ${error.message}`);
        }
      }
    }
    
    console.log('\n同步完成！');
  } catch (error) {
    console.error('同步失败:', error);
  } finally {
    sourceDb.close();
  }
}

syncData();
