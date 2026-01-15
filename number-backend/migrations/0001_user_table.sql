CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK (length(name) >= 3),
  username TEXT NOT NULL UNIQUE CHECK (length(username) >= 4),
  password TEXT NOT NULL CHECK (length(password) >= 8),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
