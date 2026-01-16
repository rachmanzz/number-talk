CREATE TABLE IF NOT EXISTS node_trees (
  id TEXT PRIMARY KEY, -- UUID

  parent_id TEXT NULL,
  user_username TEXT NOT NULL,

  operation TEXT NOT NULL
    CHECK (operation IN ('start', 'add', 'sub', 'mul', 'div')),

  left_value REAL NULL,
  right_value REAL NULL,
  result_value REAL NOT NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (parent_id)
    REFERENCES node_trees(id)
    ON DELETE CASCADE,

  FOREIGN KEY (user_username)
    REFERENCES users(username)
    ON DELETE CASCADE
);
