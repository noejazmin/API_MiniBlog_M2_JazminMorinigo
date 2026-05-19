# API MiniBlog M2

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar authors, posts y comments.

Este proyecto corresponde al Proyecto Integrador del Modulo 2 del bootcamp Henry.

## De Que Trata Este Proyecto

El objetivo del proyecto es construir una API REST sencilla, similar a JSONPlaceholder, para practicar:

- creacion de servidores con Express;
- conexion a PostgreSQL;
- consultas SQL directas con `pg`;
- operaciones CRUD;
- validaciones basicas;
- manejo de errores;
- tests con Vitest y Supertest;
- documentacion con OpenAPI;
- deploy en Railway.

La idea es que la API pueda funcionar localmente y tambien en produccion:

```txt
API Express -> PostgreSQL -> OpenAPI -> Swagger UI -> GitHub -> Railway -> URL publica
```

## Funcionalidades

Este proyecto incluye:

- CRUD completo de authors.
- CRUD completo de posts.
- Extra credit: creacion y listado de comments.
- Archivo `docs/openapi.yaml`.
- Swagger UI servido desde `/api-docs`.
- Spec OpenAPI servida desde `/openapi.yaml`.
- Conexion a PostgreSQL usando `DATABASE_URL`.
- Scripts SQL para crear tablas y cargar datos iniciales.
- Tests automaticos.
- Deploy en Railway.
- README preparado para instalar, probar y desplegar el proyecto paso a paso.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- OpenAPI
- Swagger UI
- yamljs
- Vitest
- Supertest
- Railway

## Dependencias Instaladas

### Dependencias De Produccion

Estas dependencias son necesarias para que la API funcione:

- `express`: permite crear el servidor y definir rutas HTTP.
- `pg`: permite conectar Node.js con PostgreSQL.
- `dotenv`: permite trabajar con variables de entorno.
- `swagger-ui-express`: permite mostrar Swagger UI en `/api-docs`.
- `yamljs`: permite leer el archivo `docs/openapi.yaml`.

Instalacion equivalente:

```bash
npm install express pg dotenv swagger-ui-express yamljs
```

### Dependencias De Desarrollo

Estas dependencias se usan durante el desarrollo y las pruebas:

- `nodemon`: permite reiniciar automaticamente el servidor durante el desarrollo.
- `vitest`: permite ejecutar tests automaticos.
- `supertest`: permite probar endpoints HTTP desde los tests.

Instalacion equivalente:

```bash
npm install -D nodemon vitest supertest
```

### Reinicio Automatico Del Servidor

El proyecto puede reiniciar el servidor automaticamente mientras se desarrolla.

Actualmente existen dos formas comunes de hacerlo:

1. Usando `nodemon`.
2. Usando `node --watch`, que viene incluido en versiones modernas de Node.js.

Si se quiere usar `node --watch`, el script de desarrollo en `package.json` debe quedar asi:

```json
"dev": "node --watch src/server.js"
```

En este proyecto el archivo principal del servidor esta en:

```txt
src/server.js
```

Por eso no se debe usar:

```json
"dev": "node --watch server.js"
```

Ese comando buscaria `server.js` en la raiz del proyecto, pero el archivo real esta dentro de `src`.

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

Cada vez que se guarda un cambio en el proyecto, Node reinicia el servidor automaticamente.

Para ejecutar el servidor sin reinicio automatico:

```bash
npm start
```

## Guia Para Entender El Proyecto

Para leer el proyecto de forma ordenada, conviene revisar estos archivos y carpetas:

- `src/app.js`: configura Express, middlewares, rutas, Swagger UI y OpenAPI.
- `src/server.js`: levanta el servidor en el puerto local o en el puerto asignado por Railway.
- `src/db/pool.js`: configura la conexion a PostgreSQL usando `DATABASE_URL`.
- `db/setup.sql`: crea las tablas `authors`, `posts` y `comments`.
- `db/seed.sql`: inserta datos iniciales de prueba.
- `src/routes/`: define los endpoints HTTP.
- `src/services/`: contiene las consultas SQL.
- `src/validators/`: contiene las validaciones.
- `src/middlewares/`: contiene middlewares de errores y rutas no encontradas.
- `docs/openapi.yaml`: documenta endpoints, parametros, bodies, schemas y respuestas.
- `tests/`: contiene los tests automaticos.
- `README.md`: guia de instalacion, uso y deploy.

## Estructura Del Proyecto

```txt
API_MiniBlog_M2_JazminMorinigo/
|-- db/
|   |-- setup.sql
|   `-- seed.sql
|-- docs/
|   `-- openapi.yaml
|-- src/
|   |-- db/
|   |   |-- pool.js
|   |   `-- test-connection.js
|   |-- errors/
|   |   `-- createError.js
|   |-- middlewares/
|   |   |-- error.middleware.js
|   |   `-- notFound.middleware.js
|   |-- routes/
|   |   |-- authors.routes.js
|   |   |-- posts.routes.js
|   |   `-- comments.routes.js
|   |-- services/
|   |   |-- authors.service.js
|   |   |-- posts.service.js
|   |   `-- comments.service.js
|   |-- validators/
|   |   |-- authors.validator.js
|   |   |-- posts.validator.js
|   |   |-- comments.validator.js
|   |   `-- id.validator.js
|   |-- app.js
|   `-- server.js
|-- tests/
|   |-- health.test.js
|   |-- authors.test.js
|   |-- posts.test.js
|   `-- comments.test.js
|-- .env.example
|-- .gitignore
|-- package.json
|-- package-lock.json
|-- vitest.config.js
`-- README.md
```

## Endpoints Disponibles

```txt
GET    /health
GET    /db-test
GET    /api-docs
GET    /openapi.yaml

GET    /authors
GET    /authors/:id
POST   /authors
PUT    /authors/:id
DELETE /authors/:id

GET    /posts
GET    /posts/:id
GET    /posts/author/:authorId
POST   /posts
PUT    /posts/:id
DELETE /posts/:id

GET    /comments
GET    /comments/post/:postId
POST   /comments
```

## Documentacion OpenAPI

El archivo principal de documentacion se encuentra en:

```txt
docs/openapi.yaml
```

Este archivo describe:

- informacion general de la API;
- servidor local;
- servidor de produccion;
- endpoints disponibles;
- parametros de ruta;
- body requerido para `POST`;
- body requerido para `PUT`;
- schemas de respuesta;
- errores posibles;
- codigos HTTP.

Swagger UI lee ese archivo y genera una pagina interactiva para ver y probar endpoints desde el navegador.

## Instalacion Local

Clonar el repositorio:

```bash
git clone https://github.com/noejazmin/API_MiniBlog_M2_JazminMorinigo.git
```

Entrar al proyecto:

```bash
cd API_MiniBlog_M2_JazminMorinigo
```

Instalar dependencias:

```bash
npm install
```

`npm install` lee el archivo `package.json` e instala las dependencias necesarias en la carpeta `node_modules`.

## Variables De Entorno Locales

Crear un archivo `.env` en la raiz del proyecto.

Contenido recomendado:

```env
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/api_miniblog_db
PORT=3000
```

Ejemplo:

```env
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/api_miniblog_db
PORT=3000
```

El archivo `.env` no se sube a GitHub porque contiene datos privados.

## Preparar PostgreSQL Local

Entrar a PostgreSQL como usuario administrador:

```bash
psql -U postgres
```

Crear la base de datos:

```sql
CREATE DATABASE api_miniblog_db;
```

Conectarse a la base:

```sql
\c api_miniblog_db
```

Crear las tablas ejecutando `setup.sql`:

```sql
\i 'C:/ruta/al/proyecto/db/setup.sql'
```

Ejemplo en Windows:

```sql
\i 'C:/Users/tu_usuario/Desktop/API_MiniBlog_M2_JazminMorinigo/db/setup.sql'
```

Cargar datos iniciales ejecutando `seed.sql`:

```sql
\i 'C:/ruta/al/proyecto/db/seed.sql'
```

Ejemplo en Windows:

```sql
\i 'C:/Users/tu_usuario/Desktop/API_MiniBlog_M2_JazminMorinigo/db/seed.sql'
```

Verificar tablas:

```sql
\dt
```

Verificar datos:

```sql
SELECT * FROM authors;
SELECT * FROM posts;
SELECT * FROM comments;
```

Salir de `psql`:

```sql
\q
```

Importante: `setup.sql` contiene `DROP TABLE IF EXISTS`, por lo tanto borra y vuelve a crear las tablas. Si se ejecuta sobre una base con datos, esos datos pueden eliminarse.

## Ejecutar Localmente

Modo desarrollo, con reinicio automatico del servidor:

```bash
npm run dev
```

Este comando usa el script `dev` definido en `package.json`.

Si el script esta configurado con `node --watch src/server.js`, Node reinicia el servidor automaticamente cada vez que se guarda un cambio en el proyecto.

Modo normal:

```bash
npm start
```

Este comando usa:

```bash
node src/server.js
```

Sirve para ejecutar la API sin reinicio automatico.

La API queda disponible en:

```txt
http://localhost:3000
```

## Probar En Navegador

Health check:

```txt
http://localhost:3000/health
```

Verificar conexion con PostgreSQL:

```txt
http://localhost:3000/db-test
```

Swagger UI:

```txt
http://localhost:3000/api-docs
```

Spec OpenAPI:

```txt
http://localhost:3000/openapi.yaml
```

Listar authors:

```txt
http://localhost:3000/authors
```

Listar posts:

```txt
http://localhost:3000/posts
```

Listar comments:

```txt
http://localhost:3000/comments
```

## Probar Con curl

Verificar servidor:

```bash
curl http://localhost:3000/health
```

Verificar conexion con PostgreSQL:

```bash
curl http://localhost:3000/db-test
```

Ver spec OpenAPI:

```bash
curl http://localhost:3000/openapi.yaml
```

Listar authors:

```bash
curl http://localhost:3000/authors
```

Crear author:

```bash
curl -X POST http://localhost:3000/authors ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Ana Garcia\",\"email\":\"ana@example.com\",\"bio\":\"Autora de contenidos backend.\"}"
```

Listar posts:

```bash
curl http://localhost:3000/posts
```

Crear post:

```bash
curl -X POST http://localhost:3000/posts ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Introduccion a Node.js\",\"content\":\"Node.js permite ejecutar JavaScript en el servidor.\",\"author_id\":1,\"published\":true}"
```

Listar comments:

```bash
curl http://localhost:3000/comments
```

Crear comment:

```bash
curl -X POST http://localhost:3000/comments ^
  -H "Content-Type: application/json" ^
  -d "{\"content\":\"Muy buen post.\",\"post_id\":1,\"author_id\":1}"
```

Nota: los ejemplos con `^` estan pensados para PowerShell o CMD en Windows. En Git Bash o Linux se puede usar `\`.

## Tests Automaticos

Ejecutar todos los tests:

```bash
npm test -- --run
```

Ejecutar tests en modo interfaz:

```bash
npm run test:ui
```

Ejecutar tests con coverage:

```bash
npm run test:coverage
```

Los tests usan Vitest y Supertest para probar endpoints de la API sin usar Thunder Client manualmente.

Los tests cubren:

- health check;
- CRUD de authors;
- CRUD de posts;
- endpoints de comments;
- validaciones basicas;
- ids invalidos;
- recursos inexistentes;
- email duplicado.

## Preparar GitHub

Verificar estado del repositorio:

```bash
git status
```

Agregar cambios:

```bash
git add .
```

Crear commit:

```bash
git commit -m "docs: actualiza README de entrega"
```

Subir a GitHub:

```bash
git push
```

No subir:

```txt
.env
node_modules/
coverage/
```

Estos archivos deben estar contemplados en `.gitignore`.

## Preparar Railway

Railway permite desplegar la API y crear una base PostgreSQL en la nube.

Pasos generales:

1. Crear cuenta o iniciar sesion en Railway.
2. Crear un nuevo proyecto.
3. Agregar un servicio PostgreSQL.
4. Conectar el repositorio de GitHub como servicio Node/Express.
5. Configurar variables de entorno en el servicio de la API.
6. Ejecutar `setup.sql` en la base de Railway.
7. Ejecutar `seed.sql` si se quieren datos iniciales.
8. Generar dominio publico.
9. Probar la API desplegada.

## Variables En Railway

En el servicio de la API, agregar:

```env
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_PUBLIC_URL}}
```

Si el servicio PostgreSQL se llama `postgres`, usar:

```env
NODE_ENV=production
DATABASE_URL=${{postgres.DATABASE_PUBLIC_URL}}
```

Railway distingue mayusculas y minusculas en el nombre del servicio.

No escribir comillas en Railway.

Usar:

```txt
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_PUBLIC_URL}}
```

No usar:

```txt
NODE_ENV="production"
DATABASE_URL="${{Postgres.DATABASE_PUBLIC_URL}}"
```

Tambien se puede copiar el valor directo de la URL publica, sin comillas:

```env
DATABASE_URL=postgresql://usuario:password@host:puerto/railway
```

No subir esa URL real a GitHub porque contiene usuario y password.

## Por Que DATABASE_URL Sirve Local Y En Railway

La variable `DATABASE_URL` contiene toda la informacion necesaria para conectarse a PostgreSQL:

```txt
postgresql://usuario:password@host:puerto/base_de_datos
```

En local puede apuntar a PostgreSQL instalado en la computadora:

```env
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/api_miniblog_db
```

En Railway apunta a PostgreSQL en la nube:

```env
DATABASE_URL=${{Postgres.DATABASE_PUBLIC_URL}}
```

La ventaja de este formato es que no hace falta separar la conexion en muchas variables.

## Ejecutar setup.sql En Railway

La base PostgreSQL de Railway empieza vacia. Por eso hay que ejecutar `setup.sql`.

Usar la URL publica de PostgreSQL que entrega Railway:

```bash
psql "postgresql://USUARIO:PASSWORD@HOST:PUERTO/railway" -f db/setup.sql
```

Tambien se puede entrar primero a `psql`:

```bash
psql "postgresql://USUARIO:PASSWORD@HOST:PUERTO/railway"
```

Y dentro de `psql` ejecutar:

```sql
\i 'C:/ruta/al/proyecto/db/setup.sql'
```

Verificar tablas:

```sql
\dt
```

Deben aparecer:

```txt
authors
posts
comments
```

## Ejecutar seed.sql En Railway

Despues de crear las tablas, se pueden cargar datos iniciales:

```bash
psql "postgresql://USUARIO:PASSWORD@HOST:PUERTO/railway" -f db/seed.sql
```

O dentro de `psql`:

```sql
\i 'C:/ruta/al/proyecto/db/seed.sql'
```

Verificar datos:

```sql
SELECT * FROM authors;
SELECT * FROM posts;
SELECT * FROM comments;
```

Salir:

```sql
\q
```

## Verificar Deploy

Cuando Railway termine el deployment, generar un dominio publico desde:

```txt
Settings > Networking > Generate Domain
```

URL publica de este proyecto:

```txt
https://apiminiblogm2jazminmorinigo-production.up.railway.app
```

Probar health:

```bash
curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/health
```

Probar conexion con PostgreSQL:

```bash
curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/db-test
```

Probar authors:

```bash
curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/authors
```

Probar posts:

```bash
curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/posts
```

Probar comments:

```bash
curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/comments
```

Abrir Swagger UI:

```txt
https://apiminiblogm2jazminmorinigo-production.up.railway.app/api-docs/
```

Abrir OpenAPI YAML:

```txt
https://apiminiblogm2jazminmorinigo-production.up.railway.app/openapi.yaml
```

## Probar Persistencia En Produccion

Crear un author en Railway:

```bash
curl -X POST https://apiminiblogm2jazminmorinigo-production.up.railway.app/authors ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Author Railway\",\"email\":\"author.railway@example.com\",\"bio\":\"Creado desde la API desplegada.\"}"
```

Listar authors:

```bash
curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/authors
```

Reiniciar el servicio Express en Railway y volver a listar:

```bash
curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/authors
```

Si el author sigue apareciendo, la API esta conectada a PostgreSQL en Railway y la persistencia funciona.

## Errores Comunes En Railway

### Error `connect ECONNREFUSED 127.0.0.1:5432`

La API esta intentando conectarse a PostgreSQL local dentro del contenedor de Railway.

Esto suele pasar cuando `DATABASE_URL` no esta configurada en el servicio de la API.

Solucion:

1. Entrar al servicio de la API, no al servicio PostgreSQL.
2. Ir a `Variables`.
3. Agregar:
   ```env
   NODE_ENV=production
   DATABASE_URL=${{Postgres.DATABASE_PUBLIC_URL}}
   ```
4. Ir a `Deployments`.
5. Hacer redeploy.

### Error `getaddrinfo ENOTFOUND postgres.railway.internal`

La API esta intentando usar una URL interna que no resolvio correctamente.

Solucion recomendada:

```env
DATABASE_URL=${{Postgres.DATABASE_PUBLIC_URL}}
```

Luego hacer redeploy.

### Error `relation "authors" does not exist`

La API conecto correctamente a PostgreSQL, pero las tablas todavia no existen.

Solucion:

```bash
psql "DATABASE_PUBLIC_URL_DE_RAILWAY" -f db/setup.sql
```

Despues verificar:

```bash
psql "DATABASE_PUBLIC_URL_DE_RAILWAY" -c "SELECT * FROM authors;"
```

### Los Endpoints Devuelven Arrays Vacios

Puede ser normal si solo se ejecuto `setup.sql`.

Solucion:

```bash
psql "DATABASE_PUBLIC_URL_DE_RAILWAY" -f db/seed.sql
```

### Error `Author no encontrado`

Al crear un post, el `author_id` enviado no existe.

Solucion:

1. Consultar authors:
   ```bash
   curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/authors
   ```
2. Usar un `id` existente en el body del post.

### Error `Post o author no encontrado`

Al crear un comment, el `post_id` o el `author_id` enviado no existe.

Solucion:

1. Consultar posts:
   ```bash
   curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/posts
   ```
2. Consultar authors:
   ```bash
   curl https://apiminiblogm2jazminmorinigo-production.up.railway.app/authors
   ```
3. Usar ids existentes.

### Error 502 Bad Gateway

Revisar logs del servicio Express en Railway.

Confirmar que `src/server.js` use:

```js
const PORT = process.env.PORT || 3000;
```

Railway asigna el puerto automaticamente en produccion.

## Codigos HTTP Utilizados

- `200 OK`: request exitosa.
- `201 Created`: recurso creado correctamente.
- `400 Bad Request`: datos invalidos o incompletos.
- `404 Not Found`: recurso o ruta no encontrada.
- `409 Conflict`: email duplicado.
- `500 Internal Server Error`: error inesperado del servidor.

## Uso De AI

Durante el desarrollo de este proyecto se utilizo AI como apoyo para:

- organizar el plan de trabajo;
- comprender conceptos de backend, Express, PostgreSQL, SQL y testing;
- revisar errores durante el desarrollo;
- guiar la implementacion paso a paso;
- mejorar la estructura del proyecto;
- redactar documentacion tecnica;
- preparar la documentacion OpenAPI;
- revisar el deploy en Railway.

La implementacion fue realizada paso a paso, probando cada funcionalidad y registrando avances con Git.
