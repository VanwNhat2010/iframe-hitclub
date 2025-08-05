const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Cho phép iframe (bỏ chặn x-frame-options)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("X-Frame-Options", "ALLOWALL");
  next();
});

// Proxy tới trang hit.club
app.use('/proxy', createProxyMiddleware({
  target: 'https://i.hit.club',
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' },
  onProxyRes: function (proxyRes) {
    delete proxyRes.headers['x-frame-options']; // Loại bỏ X-Frame-Options
  }
}));

// Trang demo
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Proxy Server đang chạy tại http://localhost:${PORT}`);
});
