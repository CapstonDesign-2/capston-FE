const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api/system-info",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );

  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://benchcom.duckdns.org",
      changeOrigin: true,
    })
  );
};