CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_settings (
    user_id INT PRIMARY KEY,
    theme VARCHAR(20) DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    priority VARCHAR(10) DEFAULT 'medium',
    deadline DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE task_tags (
    task_id INT,
    tag_id INT,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

INSERT INTO users (username, email) VALUES 
('ivan_dev', 'ivan@example.com'),
('anna_pm', 'anna@example.com');

INSERT INTO user_settings (user_id, theme, notifications_enabled) VALUES 
(1, 'dark', TRUE),
(2, 'light', FALSE);

INSERT INTO tasks (user_id, title, description, status, priority, deadline) VALUES 
(1, 'Изучить SQL', 'Пройти курс по реляционным БД', 'completed', 'high', '2026-05-15'),
(1, 'Разработать API', 'REST-endpoints для задач', 'active', 'medium', '2026-05-20'),
(2, 'Написать отчёт', 'Документация по практике УП.11', 'active', 'high', '2026-05-25');

INSERT INTO tags (name) VALUES ('учеба'), ('работа'), ('срочно'), ('личный');

INSERT INTO task_tags (task_id, tag_id) VALUES 
(1, 1),
(2, 2), (2, 3),
(3, 1), (3, 4);