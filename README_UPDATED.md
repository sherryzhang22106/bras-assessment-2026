# 分手挽回可能性测评系统 v2.0

## 🚀 项目概述

这是一个专业的心理测评 Web 应用，用于评估分手挽回的可能性，并提供基于 AI 的深度分析报告。

### ✨ 主要特性

- 📊 **50题专业测评** - 涵盖关系基础、分手原因、当前状态等5大维度
- 🤖 **AI深度分析** - 基于 DeepSeek API 生成8000字级个性化报告
- 💾 **数据持久化** - SQLite 数据库存储测评历史
- 📱 **响应式设计** - 完美支持移动端、平板和桌面设备
- 📄 **PDF导出** - 一键导出完整测评报告
- 🔒 **安全架构** - API Key 在后端管理，避免前端暴露

---

## 🏗️ 技术栈

### 前端
- React 19
- TypeScript
- Vite
- Recharts（图表）
- React Markdown

### 后端
- Node.js + Express
- Better-SQLite3
- DeepSeek API
- PDFKit

---

## 📦 安装步骤

### 1. 克隆项目
```bash
git clone <repository-url>
cd 分手挽回可能性测评\ \(3\)
```

### 2. 安装前端依赖
```bash
npm install
```

### 3. 安装后端依赖
```bash
cd server
npm install
cd ..
```

### 4. 配置环境变量

**前端** (`.env.local`):
```env
VITE_API_URL=http://localhost:3001/api
```

**后端** (`server/.env`):
```env
PORT=3001
DEEPSEEK_API_KEY=your_api_key_here
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
ACCESS_CODE=TEST2025
```

---

## 🚀 运行项目

### 方式一：同时启动前后端
```bash
npm run dev:all
```

### 方式二：分别启动

**终端1 - 前端**:
```bash
npm run dev
```

**终端2 - 后端**:
```bash
npm run server:dev
```

访问地址：
- 前端：http://localhost:5173
- 后端：http://localhost:3001

---

## 📂 项目结构

```
分手挽回可能性测评 (3)/
├── components/           # React 组件
│   ├── LandingPage.tsx   # 着陆页
│   ├── AccessCodeModal.tsx # 访问码验证
│   ├── Disclaimer.tsx    # 免责声明
│   ├── Questionnaire.tsx # 问卷测评
│   ├── BasicReport.tsx   # 基础报告
│   └── AIReport.tsx      # AI 深度报告
├── services/             # API 服务
│   └── apiService.ts     # 后端 API 调用
├── utils/                # 工具函数
│   └── scoring.ts        # 评分算法
├── styles/               # 样式文件
│   └── mobile-responsive.css # 移动端优化
├── server/               # 后端服务
│   ├── server.js         # Express 服务器
│   ├── package.json      # 后端依赖
│   └── .env              # 后端环境变量
├── constants.ts          # 问卷题目配置
├── types.ts              # TypeScript 类型定义
├── App.tsx               # 主应用组件
└── package.json          # 前端依赖
```

---

## 🔧 核心功能

### 1. 访问码验证
- 后端验证访问码
- 支持自定义访问码配置
- 防止前端硬编码泄露

### 2. 智能评分系统
- 5个评估维度
- 加权计分算法
- A-E 等级划分
- 态度类型判定

### 3. AI 深度分析
- 调用 DeepSeek API
- 生成 8000+ 字个性化报告
- 包含心理学分析、行动方案、30天挽回计划
- 自动清理 Markdown 符号

### 4. 数据持久化
- SQLite 本地数据库
- 存储测评历史
- 支持查询历史记录
- Session ID 管理

### 5. PDF 报告导出
- 服务端生成 PDF
- 包含完整测评结果和 AI 分析
- 自动下载

### 6. 移动端优化
- 响应式设计
- 触摸优化
- iOS 安全区域适配
- 横竖屏支持

---

## 🔐 安全优化

### ✅ 已解决的问题

1. **API Key 暴露风险**
   - ❌ 旧方案：API Key 硬编码在前端
   - ✅ 新方案：API Key 存储在后端环境变量

2. **代码错误修复**
   - ❌ 旧代码：`const text = ...`后无法重新赋值
   - ✅ 新代码：改用`let text`或直接return

3. **访问码硬编码**
   - ❌ 旧方案：前端硬编码 ACCESS_CODE
   - ✅ 新方案：后端验证+环境变量配置

---

## 📊 评分算法

### 计算公式
```
最终得分 = (原始得分 + 10) / 115.5 × 100
```

### 等级划分
| 等级 | 分数范围 | 成功率 | 态度类型 |
|------|---------|--------|---------|
| A | 75-100 | 75-90% | 挽留型 |
| B | 55-74 | 50-75% | 观望型 |
| C | 35-54 | 25-50% | 抗拒型 |
| D | 20-34 | 10-25% | 决裂型 |
| E | 0-19 | <10% | 决裂型 |

---

## 🎨 UI/UX 优化

### 移动端适配
- ✅ 最小触摸面积 44px（iOS 标准）
- ✅ 字体大小 16px（避免自动缩放）
- ✅ 安全区域适配（刘海屏）
- ✅ 横竖屏优化
- ✅ 触摸反馈优化

### 性能优化
- ✅ GPU 加速
- ✅ 平滑滚动
- ✅ 懒加载
- ✅ 图表响应式

---

## 🐛 已修复的问题

### 1. geminiService.ts 代码错误
```typescript
// ❌ 错误代码
const text = response.text();
text = text.replace(...); // 报错：不能给 const 重新赋值

// ✅ 修复方案1
let text = response.text();
text = text.replace(...);

// ✅ 修复方案2（已采用）
// 直接在后端处理，前端接收干净的文本
```

### 2. API 切换
- ❌ 旧：Google Gemini API
- ✅ 新：DeepSeek API

### 3. 架构升级
- ❌ 旧：纯前端应用
- ✅ 新：前后端分离架构

---

## 📝 API 接口文档

### 1. 验证访问码
```
POST /api/verify-access-code
Content-Type: application/json

Request:
{
  "code": "TEST2025"
}

Response:
{
  "success": true
}
```

### 2. 生成 AI 报告
```
POST /api/generate-report
Content-Type: application/json

Request:
{
  "scores": { ... },
  "answers": { ... },
  "primaryType": "Secure"
}

Response:
{
  "report": "..."
}
```

### 3. 保存测评记录
```
POST /api/save-assessment
Content-Type: application/json

Request:
{
  "sessionId": "session_xxx",
  "answers": { ... },
  "scores": { ... },
  "aiReport": "..."
}

Response:
{
  "success": true
}
```

### 4. 获取历史记录
```
GET /api/assessment-history/:sessionId

Response:
{
  "records": [...]
}
```

### 5. 导出 PDF
```
POST /api/export-pdf
Content-Type: application/json

Request:
{
  "scores": { ... },
  "answers": { ... },
  "aiReport": "..."
}

Response: application/pdf
```

---

## 🔄 数据库Schema

### assessments 表
```sql
CREATE TABLE assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT UNIQUE NOT NULL,
  answers TEXT NOT NULL,         -- JSON
  scores TEXT NOT NULL,           -- JSON
  ai_report TEXT,                 -- 可选
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

---

## 🚀 部署指南

### 开发环境
```bash
npm run dev:all
```

### 生产构建
```bash
# 前端构建
npm run build

# 后端启动
cd server
npm start
```

### 环境变量
确保生产环境配置正确的：
- `DEEPSEEK_API_KEY`
- `VITE_API_URL`（前端）
- `PORT`（后端）

---

## 📈 未来优化方向

### 已完成 ✅
- [x] 修复代码错误
- [x] 切换到 DeepSeek API
- [x] 添加后端服务
- [x] 实现数据持久化
- [x] PDF 导出功能
- [x] 移动端响应式优化

### 计划中 📅
- [ ] 支付集成
- [ ] 用户账号系统
- [ ] 数据可视化增强
- [ ] 多语言支持
- [ ] PWA 支持
- [ ] 暗黑模式

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

## 👨‍💻 作者

BetterMe Space Station 情感分析团队

---

## 📞 联系方式

如有问题，请联系：support@example.com

---

**祝你使用愉快！愿每一段感情都能找到最好的归宿。❤️**
