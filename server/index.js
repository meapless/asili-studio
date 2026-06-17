/**
 * ASILI Studio — Inquiry API
 * A small, dependency-light Express service that backs the contact form.
 *
 *   POST  /api/inquiries      -> validate + persist a project inquiry
 *   GET   /api/inquiries      -> list inquiries (simple admin/demo view)
 *   GET   /api/health         -> liveness probe
 *
 * Storage is a flat JSON file (data/inquiries.json) so the project runs with
 * zero external services. Swapping in Postgres/SQLite is a single-module change
 * (see the `store` object) — kept intentionally small for the portfolio demo.
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

app.use(cors());
app.use(express.json({ limit: "32kb" }));
// Serve the built frontend (so `node server` can host the whole app in one process)
app.use(express.static(path.join(__dirname, "..")));

/* ----------------------------- tiny JSON store ---------------------------- */
const store = {
  _ensure() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
  },
  all() {
    this._ensure();
    try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); }
    catch { return []; }
  },
  add(record) {
    const rows = this.all();
    rows.push(record);
    fs.writeFileSync(DATA_FILE, JSON.stringify(rows, null, 2));
    return record;
  },
};

/* ------------------------------ validation -------------------------------- */
const TYPES = ["Residential", "Commercial", "Cultural", "Interior", "Urban Planning"];
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validate(body) {
  const errors = {};
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const type = (body.type || "").trim();
  const message = (body.message || "").trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (type && !TYPES.includes(type)) errors.type = "Unknown project type.";
  if (message.length > 4000) errors.message = "Message is too long.";

  return { errors, value: { name, email, type: type || "Residential", message } };
}

/* -------------------------------- routes ---------------------------------- */
app.get("/api/health", (_req, res) => res.json({ ok: true, service: "asili-inquiry-api" }));

app.post("/api/inquiries", (req, res) => {
  const { errors, value } = validate(req.body || {});
  if (Object.keys(errors).length) {
    return res.status(422).json({ ok: false, errors });
  }
  const record = {
    id: crypto.randomUUID(),
    ...value,
    createdAt: new Date().toISOString(),
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
  };
  store.add(record);
  // In production: enqueue an email/Slack notification to the studio here.
  return res.status(201).json({ ok: true, id: record.id });
});

app.get("/api/inquiries", (_req, res) => {
  const rows = store.all().map(({ ip, ...safe }) => safe); // never leak IPs
  res.json({ ok: true, count: rows.length, inquiries: rows.reverse() });
});

app.listen(PORT, () => {
  console.log(`ASILI inquiry API listening on http://localhost:${PORT}`);
});
