const dotenv = require("dotenv");

dotenv.config();

const env = {
  PORT: Number(process.env.PORT || 3000),
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};

if (!env.DATABASE_URL) {
  throw new Error("La variable d'environnement DATABASE_URL est obligatoire.");
}

module.exports = env;
