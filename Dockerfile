# 第一阶段：构建前端
# 使用 Node.js 20 官方镜像作为构建环境
FROM node:22 AS builder

# 设置工作目录
WORKDIR /app

# 复制所有代码
COPY . .
# 安装pnpm
RUN npm install -g pnpm && pnpm config set registry https://registry.npmmirror.com
RUN pnpm install
# 运行构建命令
RUN pnpm build

# 第二阶段：最终镜像
# 使用轻量级的 Nginx 1.27.3-alpine 镜像来提供服务
FROM nginx:1.27.3-alpine

# 使用多行字符串来写入 nginx 配置
# 保持 Nginx 配置不变
# 使用时请修改server_name
RUN printf '\
server {\n\
    listen 80;\n\
    server_name local;\n\  
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

# 复制构建完成的静态文件到 Nginx 的公共目录
# 保持文件复制路径不变
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 Nginx 的默认端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]