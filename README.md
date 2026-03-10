# FusionAgent 官网部署指南

本文档说明如何将FusionAgent产品宣传网站部署到GitHub Pages。

## 📋 目录结构

```
fusion-agent/
├── website/
│   ├── index.html          # 主页面
│   ├── styles.css         # 样式文件
│   ├── script.js          # 交互脚本
│   └── README.md         # 本文档
└── .github/
    └── workflows/
        └── deploy-website.yml  # GitHub Actions 工作流
```

## 🚀 部署步骤

### 方式一：自动部署（推荐）

使用GitHub Actions自动部署，每次推送到main/master分支时自动部署。

#### 1. 启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 **Settings** > **Pages**
3. 在 **Source** 下选择 **GitHub Actions**
4. 保存设置

#### 2. 推送代码

```bash
git add website/ .github/workflows/deploy-website.yml
git commit -m "Add website and deploy workflow"
git push origin main
```

#### 3. 查看部署状态

1. 进入 **Actions** 标签页
2. 查看 **Deploy Website to GitHub Pages** 工作流
3. 等待部署完成（约1-2分钟）

#### 4. 访问网站

部署完成后，网站将在以下地址可用：

```
https://<username>.github.io/fusion-agent/
```

或者：

```
https://fusionagent.github.io/fusion-agent/
```

### 方式二：手动部署

如果需要手动部署，可以使用以下方法：

#### 方法1：使用gh命令行工具

```bash
gh repo edit --enable-pages=true --pages-source-branch=gh-pages --pages-source-path=/
gh workflow run deploy-website.yml
```

#### 方法2：手动上传

1. 构建网站（如果需要）
2. 创建 `gh-pages` 分支
3. 将 `website/` 目录的内容复制到根目录
4. 推送分支

```bash
git checkout --orphan gh-pages
git rm -rf .
cp -r website/* .
git add .
git commit -m "Deploy website"
git push origin gh-pages
```

## 📝 自定义域名（可选）

如果需要使用自定义域名：

### 1. 配置DNS

在你的域名DNS设置中添加以下记录：

```
# 使用 A 记录
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153

# 或使用 CNAME 记录
CNAME  www  fusionagent.github.io
```

### 2. 在GitHub中配置

1. 进入 **Settings** > **Pages**
2. 在 **Custom domain** 中输入你的域名
3. 点击 **Save**
4. 选择 **Enforce HTTPS**

### 3. 添加CNAME文件

在 `website/` 目录下创建 `CNAME` 文件：

```
www.yourdomain.com
```

## 🎨 自定义网站

### 修改内容

主要配置文件：

- **index.html**: 网站HTML结构和内容
- **styles.css**: 网站样式和主题
- **script.js**: 交互功能和动画

### 修改主题颜色

在 `styles.css` 中修改CSS变量：

```css
:root {
    --primary-color: #6366f1;      /* 主色调 */
    --secondary-color: #8b5cf6;    /* 次要色 */
    --accent-color: #ec4899;        /* 强调色 */
    --dark-bg: #0f172a;            /* 深色背景 */
    --light-bg: #1e293b;           /* 浅色背景 */
    --text-primary: #f8fafc;        /* 主文本 */
    --text-secondary: #94a3b8;      /* 次要文本 */
}
```

### 添加新功能

在 `index.html` 中添加新的section：

```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2 class="section-title">新功能</h2>
        <p class="section-subtitle">功能描述</p>
        <!-- 内容 -->
    </div>
</section>
```

在 `styles.css` 中添加样式：

```css
.new-section {
    padding: 6rem 0;
    background: rgba(30, 41, 59, 0.3);
}
```

## 📊 网站功能特性

### 已实现功能

- ✅ 响应式设计（支持手机、平板、桌面）
- ✅ 深色主题设计
- ✅ 流畅的动画效果
- ✅ 移动端导航菜单
- ✅ 平滑滚动
- ✅ 交互式元素
- ✅ SEO优化（meta标签）
- ✅ GitHub图标集成

### 技术栈

- HTML5
- CSS3（Grid、Flexbox、动画）
- 原生JavaScript（无依赖）
- Font Awesome图标库

## 🔧 故障排除

### 部署失败

**问题**: GitHub Actions部署失败

**解决方案**:
1. 检查工作流文件路径是否正确
2. 确认仓库设置了Pages权限
3. 查看Actions日志获取详细错误信息

### 404错误

**问题**: 访问网站显示404

**解决方案**:
1. 确认Pages已启用
2. 检查分支是否为main/master
3. 等待几分钟让DNS生效

### 样式不加载

**问题**: 网站显示但样式丢失

**解决方案**:
1. 检查文件名大小写（Linux区分大小写）
2. 确认文件路径正确
3. 清除浏览器缓存

## 📈 监控和分析

### Google Analytics

添加Google Analytics：

1. 在 `index.html` 的 `<head>` 中添加：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. 替换 `GA_MEASUREMENT_ID` 为你的跟踪ID

## 🤝 贡献

欢迎贡献改进网站：

1. Fork仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📞 支持

如有问题，请：

- 提交 [Issue](https://github.com/fusionagent/fusion-agent/issues)
- 查看 [GitHub Pages文档](https://docs.github.com/en/pages)
- 联系团队

## 📄 许可证

网站内容遵循项目主许可证：Apache 2.0 License

---

**最后更新**: 2026-03-10
