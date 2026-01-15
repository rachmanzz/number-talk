CREATE TABLE IF NOT EXISTS node_trees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  parent_id INTEGER NULL,
  user_id INTEGER NOT NULL,

  operation TEXT NOT NULL
    CHECK (operation IN ('start', 'add', 'sub', 'mul', 'div')),

  left_value REAL NULL,
  right_value REAL NULL,
  result_value REAL NOT NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (parent_id)
    REFERENCES node_trees(id)
    ON DELETE CASCADE,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
