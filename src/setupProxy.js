const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://benchcom.duckdns.org/",
      changeOrigin: true,
    })
  );
  app.use(
    "/api2",
    createProxyMiddleware({
      target: "http://localhost:3000/",
      changeOrigin: true,
    })
  );
};