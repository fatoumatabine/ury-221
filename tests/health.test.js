const test = require("node:test");
const assert = require("node:assert/strict");

process.env.NODE_ENV = "test";
process.env.PORT = "0";
process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://jurist221:jurist221@127.0.0.1:5432/jurist221?schema=public";

const app = require("../src/app");

test("the app exposes an Express handler", () => {
  assert.equal(typeof app, "function");
});

test("the app registers a GET /health endpoint", () => {
  const hasHealthRoute = app._router.stack.some(
    (layer) => layer.route?.path === "/health" && layer.route.methods.get
  );

  assert.equal(hasHealthRoute, true);
});
