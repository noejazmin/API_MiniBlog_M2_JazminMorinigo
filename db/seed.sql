INSERT INTO authors (name, email, bio)
VALUES
('Ana Garcia', 'ana@example.com', 'Desarrolladora backend y autora de contenidos sobre Node.js.'),
('Carlos Ruiz', 'carlos@example.com', 'Administrador de bases de datos y mentor tecnico.'),
('Maria Lopez', 'maria@example.com', 'Frontend developer interesada en APIs REST.');

INSERT INTO posts (title, content, author_id, published)
VALUES
(
    'Introduccion a Node.js',
    'Node.js es un entorno de ejecucion para JavaScript.',
    1,
    true
),
(
    'PostgreSQL vs MySQL',
    'Comparativa entre bases de datos relacionales.',
    2,
    true
),
(
    'REST APIs',
    'Las APIs REST permiten comunicar frontend y backend.',
    1,
    false
);

INSERT INTO comments (content, post_id, author_id)
VALUES
(
    'Excelente explicacion sobre Node.',
    1,
    2
),
(
    'Muy util la comparacion.',
    2,
    3
),
(
    'Me ayudo a entender REST.',
    3,
    1
);
