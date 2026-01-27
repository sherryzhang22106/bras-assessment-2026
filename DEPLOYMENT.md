# 🚀 部署和启动指南

## 快速开始

### 第一次使用

1. **安装所有依赖**
```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server
npm install
cd ..
```

2. **配置环境变量**

创建 `.env.local`（前端）:
```env
VITE_API_URL=http://localhost:3001/api
```

确认 `server/.env`（后端）已配置:
```env
PORT=3001
DEEPSEEK_API_KEY=sk-448ce19cde5643e7894695332072dd58
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
ACCESS_CODE=TEST2025
```

3. **启动开发服务器**
```bash
npm run dev:all
```

这会同时启动前端和后端服务：
- 前端：http://localhost:5173
- 后端：http://localhost:3001

---

## 详细步骤

### 方式一：一键启动（推荐）

```bash
npm run dev:all
```

### 方式二：分别启动

**终端 1 - 启动后端**：
```bash
cd server
npm run dev
```

**终端 2 - 启动前端**：
```bash
npm run dev
```

---

## 测试流程

### 1. 访问首页
打开浏览器访问：http://localhost:5173

### 2. 输入访问码
- 默认访问码：`TEST2025`
- 后端会验证访问码

### 3. 完成测评
- 阅读免责声明并同意
- 回答 50 道题目
- 查看基础报告

### 4. 生成 AI 报告
- 点击"生成 AI 深度分析"
- 等待 DeepSeek API 响应（约 30-60 秒）
- 查看完整报告

### 5. 导出 PDF（可选）
- 在报告页面点击"导出 PDF"
- 下载完整测评报告

---

## 验证后端 API

### 健康检查
```bash
curl http://localhost:3001/api/health
```

应返回：
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 验证访问码
```bash
curl -X POST http://localhost:3001/api/verify-access-code \
  -H "Content-Type: application/json" \
  -d '{"code": "TEST2025"}'
```

应返回：
```json
{
  "success": true
}
```

---

## 常见问题

### Q1: 端口冲突
**问题**：`Port 3001 is already in use`

**解决方案**：
```bash
# 查找占用端口的进程
lsof -i :3001

# 杀死进程
kill -9 <PID>

# 或修改 server/.env 中的 PORT
```

### Q2: API Key 错误
**问题**：生成 AI 报告失败

**解决方案**：
1. 确认 `server/.env` 中的 `DEEPSEEK_API_KEY` 正确
2. 检查 DeepSeek API 额度
3. 查看后端日志

### Q3: 数据库错误
**问题**：无法保存测评记录

**解决方案**：
```bash
# 删除旧数据库
rm server/reconciliation.db

# 重启后端（会自动创建新数据库）
cd server
npm run dev
```

### Q4: 前端无法连接后端
**问题**：Network Error

**解决方案**：
1. 确认后端已启动（http://localhost:3001/api/health）
2. 检查 `.env.local` 中的 `VITE_API_URL`
3. 检查浏览器控制台是否有 CORS 错误

---

## 生产部署

### 1. 构建前端
```bash
npm run build
```

生成的文件在 `dist/` 目录。

### 2. 启动后端
```bash
cd server
npm start
```

### 3. 使用 Nginx 代理

**nginx.conf** 示例：
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 前端静态文件
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. 使用 PM2 管理后端

```bash
# 安装 PM2
npm install -g pm2

# 启动后端
cd server
pm2 start server.js --name "reconciliation-api"

# 保存配置
pm2 save

# 设置开机自启
pm2 startup
```

---

## 环境变量说明

### 前端 (.env.local)
| 变量 | 说明 | 默认值 |
|------|------|--------|
| VITE_API_URL | 后端 API 地址 | http://localhost:3001/api |

### 后端 (server/.env)
| 变量 | 说明 | 默认值 |
|------|------|--------|
| PORT | 服务器端口 | 3001 |
| DEEPSEEK_API_KEY | DeepSeek API 密钥 | sk-xxx |
| DEEPSEEK_API_URL | DeepSeek API 地址 | https://api.deepseek.com/v1/chat/completions |
| ACCESS_CODE | 访问码 | TEST2025 |

---

## 性能优化建议

### 前端
- 启用 Gzip 压缩
- 配置 CDN
- 图片懒加载
- 代码分割

### 后端
- 启用 API 缓存
- 数据库索引优化
- 限流保护
- 日志管理

---

## 监控和日志

### 后端日志
```bash
# 查看实时日志
tail -f server/logs/server.log

# 使用 PM2 查看日志
pm2 logs reconciliation-api
```

### 数据库查询
```bash
# 进入 SQLite
sqlite3 server/reconciliation.db

# 查看所有表
.tables

# 查询测评记录
SELECT * FROM assessments ORDER BY created_at DESC LIMIT 10;
```

---

## 安全建议

### 1. 生产环境
- 使用 HTTPS
- 设置强访问码
- 定期更换 API Key
- 启用防火墙

### 2. API 限流
在 `server/server.js` 中添加：
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100 // 最多 100 次请求
});

app.use('/api/', limiter);
```

### 3. 输入验证
- 验证所有用户输入
- 防止 SQL 注入
- XSS 防护

---

## 备份和恢复

### 备份数据库
```bash
cp server/reconciliation.db server/backups/reconciliation_$(date +%Y%m%d).db
```

### 恢复数据库
```bash
cp server/backups/reconciliation_20240101.db server/reconciliation.db
```

---

## 版本更新

### 检查更新
```bash
npm outdated
cd server && npm outdated
```

### 更新依赖
```bash
npm update
cd server && npm update
```

---

## 联系支持

如有问题，请联系技术支持：
- 📧 Email: support@example.com
- 📱 微信: your_wechat_id

---

**祝你部署顺利！🎉**
