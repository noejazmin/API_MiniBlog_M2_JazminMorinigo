INSERT INTO authors (name, email)
VALUES
('Ana García', 'ana@example.com'),
('Carlos Ruiz', 'carlos@example.com'),
('María López', 'maria@example.com');

INSERT INTO posts (title, content, author_id)
VALUES
(
    'Introducción a Node.js',
    'Node.js es un entorno de ejecución para JavaScript.',
    1
),
(
    'PostgreSQL vs MySQL',
    'Comparativa entre bases de datos relacionales.',
    2
),
(
    'REST APIs',
    'Las APIs REST permiten comunicar frontend y backend.',
    1
);

INSERT INTO comments (content, post_id)
VALUES
(
    'Excelente explicación sobre Node.',
    1
),
(
    'Muy útil la comparación.',
    2
),
(
    'Me ayudó a entender REST.',
    3
);