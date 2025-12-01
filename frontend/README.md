# Marketplace Frontend

React前端应用，与Marketplace Backend API集成。

## 功能特性

- ✅ 用户认证（登录/登出）
- ✅ 产品列表展示
- ✅ 产品详情页面
- ✅ 购物车功能（添加、更新、删除商品）
- ✅ 路由保护
- ✅ 响应式设计

## 技术栈

- React 18
- React Router DOM
- Axios
- Vite
- Context API (状态管理)

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 确保后端服务正在运行

后端服务应该在 `http://localhost:3000` 运行。

```bash
cd ../backend
npm install
npm start
```

### 3. 启动前端开发服务器

```bash
npm run dev
```

前端应用将在 `http://localhost:5173` 运行。

## 测试账号

- 邮箱: `john.doe@example.com`
- 密码: `password123`

## 项目结构

```
src/
├── components/        # 可复用组件
│   ├── Navbar.jsx    # 导航栏
│   ├── ProductCard.jsx  # 产品卡片
│   └── Cart.jsx      # 购物车组件
├── pages/            # 页面组件
│   ├── Login.jsx     # 登录页面
│   ├── Products.jsx  # 产品列表
│   └── ProductDetail.jsx  # 产品详情
├── context/           # Context API
│   ├── AuthContext.jsx  # 认证上下文
│   └── CartContext.jsx  # 购物车上下文
├── services/         # API服务
│   └── api.js        # API调用
├── App.jsx           # 主应用组件
└── main.jsx          # 入口文件
```

## 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist/` 目录。

## 预览生产构建

```bash
npm run preview
```

