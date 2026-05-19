INSERT INTO authors (name, email, bio)
VALUES
('Ana Garcia', 'ana@example.com', 'Desarrolladora backend y autora de contenidos sobre Node.js.'),
('Carlos Ruiz', 'carlos@example.com', 'Administrador de bases de datos y mentor tecnico.'),
('Maria Lopez', 'maria@example.com', 'Frontend developer interesada en APIs REST.'),
('Lucia Fernandez', 'lucia.fernandez@example.com', 'Desarrolladora backend interesada en APIs REST y PostgreSQL.'),
('Mateo Alvarez', 'mateo.alvarez@example.com', 'Autor de contenido sobre JavaScript, Node.js y buenas practicas.'),
('Sofia Martinez', 'sofia.martinez@example.com', 'Programadora frontend que documenta su aprendizaje en desarrollo web.'),
('Tomas Herrera', 'tomas.herrera@example.com', 'Estudiante de backend enfocado en bases de datos relacionales.'),
('Valentina Ruiz', 'valentina.ruiz@example.com', 'Creadora de tutoriales sobre Express, testing y arquitectura simple.'),
('Nicolas Torres', 'nicolas.torres@example.com', 'Desarrollador junior interesado en despliegues y APIs productivas.'),
('Camila Romero', 'camila.romero@example.com', 'Autora de articulos sobre validaciones, errores y buenas practicas.'),
('Joaquin Silva', 'joaquin.silva@example.com', 'Backend developer en formacion con foco en SQL y servicios REST.'),
('Martina Castro', 'martina.castro@example.com', 'Estudiante de programacion que comparte apuntes sobre bases de datos.'),
('Benjamin Morales', 'benjamin.morales@example.com', 'Autor tecnico interesado en Node.js, testing y documentacion.');

INSERT INTO posts (author_id, title, content, published)
VALUES
((SELECT id FROM authors WHERE email = 'ana@example.com'), 'Introduccion a Node.js', 'Node.js es un entorno de ejecucion para JavaScript.', true),
((SELECT id FROM authors WHERE email = 'carlos@example.com'), 'PostgreSQL vs MySQL', 'Comparativa entre bases de datos relacionales.', true),
((SELECT id FROM authors WHERE email = 'ana@example.com'), 'REST APIs', 'Las APIs REST permiten comunicar frontend y backend.', false),
((SELECT id FROM authors WHERE email = 'lucia.fernandez@example.com'), 'Primeros pasos con Express', 'Express permite crear servidores web de forma simple usando rutas y middlewares.', true),
((SELECT id FROM authors WHERE email = 'lucia.fernandez@example.com'), 'Como organizar rutas en Node.js', 'Separar rutas, servicios y validadores ayuda a mantener el codigo mas claro.', true),
((SELECT id FROM authors WHERE email = 'lucia.fernandez@example.com'), 'Errores comunes al crear una API', 'Validar datos y manejar errores evita respuestas confusas para el cliente.', false),
((SELECT id FROM authors WHERE email = 'mateo.alvarez@example.com'), 'Que es una API REST', 'Una API REST permite comunicar aplicaciones usando metodos HTTP.', true),
((SELECT id FROM authors WHERE email = 'mateo.alvarez@example.com'), 'Diferencia entre GET y POST', 'GET se usa para consultar informacion y POST para crear nuevos recursos.', true),
((SELECT id FROM authors WHERE email = 'mateo.alvarez@example.com'), 'Buenas practicas con endpoints', 'Usar nombres claros y respuestas consistentes mejora la experiencia de uso.', false),
((SELECT id FROM authors WHERE email = 'sofia.martinez@example.com'), 'Frontend consumiendo APIs', 'El frontend puede pedir datos al backend usando fetch o herramientas similares.', true),
((SELECT id FROM authors WHERE email = 'sofia.martinez@example.com'), 'JSON como formato de respuesta', 'JSON es un formato comun para intercambiar datos entre cliente y servidor.', true),
((SELECT id FROM authors WHERE email = 'sofia.martinez@example.com'), 'Estados de carga en interfaces', 'Mostrar mensajes de carga y error ayuda al usuario.', false),
((SELECT id FROM authors WHERE email = 'tomas.herrera@example.com'), 'Introduccion a PostgreSQL', 'PostgreSQL es un sistema de base de datos relacional que entiende SQL.', true),
((SELECT id FROM authors WHERE email = 'tomas.herrera@example.com'), 'Relaciones entre tablas', 'Las claves foraneas permiten conectar autores, posts y comentarios.', true),
((SELECT id FROM authors WHERE email = 'tomas.herrera@example.com'), 'Consultas SQL parametrizadas', 'Usar parametros evita errores y mejora la seguridad.', false),
((SELECT id FROM authors WHERE email = 'valentina.ruiz@example.com'), 'Validaciones en una API', 'Validar los datos antes de guardar protege la integridad de la base.', true),
((SELECT id FROM authors WHERE email = 'valentina.ruiz@example.com'), 'Middleware de errores', 'Un middleware centralizado permite responder errores de forma ordenada.', true),
((SELECT id FROM authors WHERE email = 'valentina.ruiz@example.com'), 'Testing con Supertest', 'Supertest permite probar endpoints sin abrir el navegador.', false),
((SELECT id FROM authors WHERE email = 'nicolas.torres@example.com'), 'Deploy en Railway', 'Railway permite publicar una API y conectarla con PostgreSQL en la nube.', true),
((SELECT id FROM authors WHERE email = 'nicolas.torres@example.com'), 'Variables de entorno', 'Las variables de entorno guardan configuraciones sin subir secretos al repositorio.', true),
((SELECT id FROM authors WHERE email = 'nicolas.torres@example.com'), 'Probar una API desplegada', 'Thunder Client, Swagger y el navegador ayudan a verificar endpoints online.', false),
((SELECT id FROM authors WHERE email = 'camila.romero@example.com'), 'Codigos HTTP basicos', 'Los codigos 200, 201, 400, 404 y 500 comunican el resultado de una request.', true),
((SELECT id FROM authors WHERE email = 'camila.romero@example.com'), 'Validar emails duplicados', 'Una restriccion UNIQUE evita que dos autores usen el mismo correo.', true),
((SELECT id FROM authors WHERE email = 'camila.romero@example.com'), 'Mensajes de error claros', 'Un buen mensaje de error ayuda a encontrar el problema rapidamente.', false),
((SELECT id FROM authors WHERE email = 'joaquin.silva@example.com'), 'Servicios y consultas SQL', 'Los servicios concentran el acceso a la base de datos usando pool.query.', true),
((SELECT id FROM authors WHERE email = 'joaquin.silva@example.com'), 'JOIN entre posts y authors', 'JOIN permite traer datos relacionados desde varias tablas.', true),
((SELECT id FROM authors WHERE email = 'joaquin.silva@example.com'), 'Eliminar datos relacionados', 'ON DELETE CASCADE borra registros dependientes cuando se elimina el padre.', false),
((SELECT id FROM authors WHERE email = 'martina.castro@example.com'), 'Como leer una tabla SQL', 'SELECT permite consultar filas y columnas guardadas en una tabla.', true),
((SELECT id FROM authors WHERE email = 'martina.castro@example.com'), 'INSERT para cargar datos', 'INSERT agrega nuevas filas dentro de una tabla existente.', true),
((SELECT id FROM authors WHERE email = 'martina.castro@example.com'), 'UPDATE y DELETE con cuidado', 'UPDATE modifica datos y DELETE los elimina, por eso conviene usar WHERE.', false),
((SELECT id FROM authors WHERE email = 'benjamin.morales@example.com'), 'Documentar con OpenAPI', 'OpenAPI describe endpoints, parametros, cuerpos y respuestas de una API.', true),
((SELECT id FROM authors WHERE email = 'benjamin.morales@example.com'), 'Swagger UI para probar endpoints', 'Swagger UI permite ejecutar requests desde una documentacion visual.', true),
((SELECT id FROM authors WHERE email = 'benjamin.morales@example.com'), 'README para una entrega', 'Un README claro explica como instalar, probar y usar el proyecto.', false);


INSERT INTO comments (content, post_id, author_id)
SELECT
    comment_text,
    posts.id,
    posts.author_id
FROM posts
JOIN authors ON authors.id = posts.author_id
CROSS JOIN (
    VALUES
        ('Muy claro el contenido.'),
        ('Me ayudo a entender mejor el tema.'),
        ('Buen ejemplo para practicar.'),
        ('Este post complementa bien la API.'),
        ('Me gustaria probarlo desde Swagger.')
) AS comment_list(comment_text)
    WHERE authors.email IN (
        'lucia.fernandez@example.com',
        'mateo.alvarez@example.com',
        'sofia.martinez@example.com',
        'tomas.herrera@example.com',
        'valentina.ruiz@example.com',
        'nicolas.torres@example.com',
        'camila.romero@example.com',
        'joaquin.silva@example.com',
        'martina.castro@example.com',
        'benjamin.morales@example.com',
        'ana@example.com',
        'carlos@example.com'
);
