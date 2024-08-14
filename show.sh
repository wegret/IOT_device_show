#!/bin/bash

# 从端口 5173 开始
port=5173

while true; do
  # 查找占用端口的进程ID（PID）
  pid=$(sudo lsof -t -i:$port)
  
  # 如果找到PID，则终止该进程
  if [ -n "$pid" ]; then
    echo "Killing process $pid on port $port"
    sudo kill -9 $pid
  else
    echo "Port $port is free"
    break
  fi
  
  # 检查下一个端口
  port=$((port + 1))
done

# 等待一秒确保进程已被杀死
sleep 1

# 启动所有进程
echo "Starting all processes..."
nohup npm run dev > output.log 2>&1 &

echo "All processes started successfully."
