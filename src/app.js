const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const mountSwagger = require("./config/swagger");
const router = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

mountSwagger(app);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API JURIS 221 operationnelle",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  app.listen(env.PORT, "0.0.0.0", () => {
    // eslint-disable-next-line no-console
    console.log(`Serveur demarre sur http://0.0.0.0:${env.PORT}`);
  });
}

module.exports = app;
