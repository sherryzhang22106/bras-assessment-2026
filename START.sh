#!/bin/bash

echo "🚀 分手挽回可能性测评系统 v2.0"
echo "================================"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装前端依赖..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 正在安装后端依赖..."
    cd server && npm install && cd ..
fi

echo ""
echo "✅ 依赖检查完成"
echo ""
echo "🔧 启动服务..."
echo ""
echo "前端地址: http://localhost:5173"
echo "后端地址: http://localhost:3001"
echo ""
echo "访问码: TEST2025"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

# 启动前后端
npm run dev:all
