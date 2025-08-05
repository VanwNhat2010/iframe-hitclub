const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Giao diện test iframe
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Proxy tới trang https://i.hit.club
app.use('/proxy', createProxyMiddleware({
  target: 'https://i.hit.club',
  changeOrigin: true,
  secure: false,
  pathRewrite: { '^/proxy': '' },
  onProxyRes: (proxyRes, req, res) => {
    // Gỡ bỏ các header chặn iframe nếu có
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
  }
}));

app.listen(PORT, () => {
  console.log(`✅ Proxy server chạy tại http://localhost:${PORT}`);
});
