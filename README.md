# API MiniBlog M2

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar authors, posts y comments.

Este proyecto corresponde al Proyecto Integrador del Modulo 2 del bootcamp Henry.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- Vitest
- Supertest

## Funcionalidades

- CRUD completo de authors.
- CRUD completo de posts.
- Extra credit: creacion y listado de comments.
- Validaciones basicas usando validators.
- Manejo de errores con respuestas JSON.
- Persistencia en PostgreSQL.
- Queries SQL parametrizadas.
- Tests automatizados.
- Documentacion OpenAPI.

## Codigos HTTP Utilizados

- `200 OK`: request exitosa.
- `201 Created`: recurso creado correctamente.
- `400 Bad Request`: datos invalidos o incompletos.
- `404 Not Found`: recurso o ruta no encontrada.
- `409 Conflict`: email duplicado.
- `500 Internal Server Error`: error inesperado del servidor.

## Arquitectura

El proyecto separa responsabilidades en:

- `routes`: definen endpoints y respuestas HTTP.
- `services`: contienen queries SQL y acceso a PostgreSQL.
- `validators`: validan datos recibidos en el body o parametros.
- `middlewares`: manejan errores y rutas no encontradas.
- `db`: contiene la conexion a PostgreSQL y scripts relacionados.

## Estructura Del Proyecto

```txt
db/
  setup.sql
  seed.sql

src/
  db/
    pool.js
    test-connection.js
  errors/
    createError.js
  middlewares/
    error.middleware.js
    notFound.middleware.js
  routes/
    authors.routes.js
    posts.routes.js
    comments.routes.js
  services/
    authors.service.js
    posts.service.js
    comments.service.js
  validators/
    authors.validator.js
    posts.validator.js
    comments.validator.js
    id.validator.js
  app.js
  server.js

tests/
  health.test.js
  authors.test.js
  posts.test.js
  comments.test.js

openapi.yaml
```

## Requisitos

Tener instalado:

- Node.js
- PostgreSQL
- Git

## Instalacion

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

`npm install` lee `package.json` e instala lo necesario en:

```txt
node_modules/
```

## Variables De Entorno

Crear un archivo `.env` en la raiz del proyecto usando como guia `.env.example`.

Ejemplo:

```env
PORT=3000

DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_miniblog_db
```

## Base De Datos

### Conectarse A PostgreSQL

Abrir una terminal y conectarse a PostgreSQL con el usuario `postgres`:

```bash
psql -U postgres
```

Si PostgreSQL pide password, ingresar la contraseña configurada durante la instalacion.

Una vez dentro de `psql`, el prompt se vera parecido a:

```txt
postgres=#
```

Desde ahi se pueden ejecutar comandos SQL y comandos propios de `psql`.

Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE api_miniblog_db;
```

Los siguientes comandos se ejecutan dentro de `psql` o SQL Shell de PostgreSQL.

Conectarse a la base:

```sql
\c api_miniblog_db
```

Ejecutar el setup reemplazando la ruta por la ubicacion real del proyecto:

```sql
\i 'C:/ruta/al/proyecto/db/setup.sql'
```

Ejemplo en Windows:

```sql
\i 'C:/Users/tu_usuario/Desktop/API_MiniBlog_M2_JazminMorinigo/db/setup.sql'
```

Ejecutar seed reemplazando la ruta por la ubicacion real del proyecto:

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

IMPORTANTE: el archivo `setup.sql` contiene `DROP TABLE IF EXISTS`, por eso elimina las tablas existentes y las crea nuevamente. Despues de ejecutar `setup.sql`, la estructura de la base queda lista pero sin datos. Para insertar authors, posts y comments de prueba, se debe ejecutar luego `seed.sql`.

## Ejecutar El Servidor

Para iniciar la API en modo desarrollo, usar:

```bash
npm run dev
```

Este comando utiliza `nodemon`, por lo que el servidor se reinicia automaticamente cuando se guardan cambios en los archivos del proyecto.

Para iniciar la API en modo produccion, usar:

```bash
npm start
```

Por defecto, el servidor se ejecuta en:

```txt
http://localhost:3000
```

Para verificar que el servidor esta funcionando correctamente en Thunder Client:

```txt
Metodo: GET
URL: http://localhost:3000/health
```

Para verificar que la API puede conectarse correctamente con PostgreSQL:

```txt
Metodo: GET
URL: http://localhost:3000/db-test
```

## Ejecutar Tests

Para ejecutar todos los tests del proyecto:

```bash
npm test -- --run
```

Los tests estan desarrollados con Vitest y Supertest. Estos tests permiten verificar endpoints de la API sin usar Thunder Client manualmente.

Los tests cubren:

- health check del servidor.
- CRUD de authors.
- CRUD de posts.
- creacion y listado de comments.
- validaciones basicas.
- errores esperados como datos incompletos, ids invalidos y recursos inexistentes.

## Endpoints

La API trabaja con respuestas en formato JSON.

### Health

Estos endpoints sirven para verificar el estado general de la API.

#### Verificar servidor

```txt
Metodo: GET
URL: http://localhost:3000/health
```

Verifica que el servidor Express este funcionando.

#### Verificar conexion con PostgreSQL

```txt
Metodo: GET
URL: http://localhost:3000/db-test
```

Verifica que la API pueda conectarse correctamente con PostgreSQL.

### Authors

La entidad `authors` representa a los autores o usuarios que pueden crear posts y comments.

#### Listar authors

```txt
Metodo: GET
URL: http://localhost:3000/authors
```

Devuelve un array con todos los authors registrados.

#### Obtener author por id

```txt
Metodo: GET
URL: http://localhost:3000/authors/1
```

Devuelve un author especifico segun su `id`.

Si el author existe, devuelve status `200`.  
Si el author no existe, devuelve status `404`.  
Si el id no es numerico, devuelve status `400`.

#### Crear author

```txt
Metodo: POST
URL: http://localhost:3000/authors
```

Crea un nuevo author en la base de datos.

Body esperado:

```json
{
  "name": "Ana Garcia",
  "email": "ana@example.com",
  "bio": "Autora de contenidos backend."
}
```

Campos requeridos:

- `name`
- `email`

Campo opcional:

- `bio`

Respuestas posibles:

- `201`: author creado correctamente.
- `400`: faltan campos obligatorios.
- `409`: el email ya existe.

#### Actualizar author

```txt
Metodo: PUT
URL: http://localhost:3000/authors/1
```

Actualiza los datos de un author existente.

Body esperado:

```json
{
  "name": "Ana Garcia Actualizada",
  "email": "ana.actualizada@example.com",
  "bio": "Bio actualizada."
}
```

Respuestas posibles:

- `200`: author actualizado correctamente.
- `400`: id invalido o datos incompletos.
- `404`: author no encontrado.
- `409`: el email ya existe.

#### Eliminar author

```txt
Metodo: DELETE
URL: http://localhost:3000/authors/1
```

Elimina un author segun su `id`.

Respuestas posibles:

- `200`: author eliminado correctamente.
- `400`: id invalido.
- `404`: author no encontrado.

### Posts

La entidad `posts` representa las publicaciones del MiniBlog. Cada post pertenece a un author mediante `author_id`.

#### Listar posts

```txt
Metodo: GET
URL: http://localhost:3000/posts
```

Devuelve un array con todos los posts registrados.

#### Obtener post por id

```txt
Metodo: GET
URL: http://localhost:3000/posts/1
```

Devuelve un post especifico segun su `id`.

Respuestas posibles:

- `200`: post encontrado.
- `400`: id invalido.
- `404`: post no encontrado.

#### Listar posts por author

```txt
Metodo: GET
URL: http://localhost:3000/posts/author/1
```

Devuelve todos los posts asociados a un author especifico, incluyendo informacion del author.

Respuestas posibles:

- `200`: lista de posts del author.
- `400`: authorId invalido.

#### Crear post

```txt
Metodo: POST
URL: http://localhost:3000/posts
```

Crea un nuevo post asociado a un author existente.

Body esperado:

```json
{
  "title": "Introduccion a Node.js",
  "content": "Node.js permite ejecutar JavaScript en el servidor.",
  "author_id": 1,
  "published": true
}
```

Campos requeridos:

- `title`
- `content`
- `author_id`

Campo opcional:

- `published`

Si `published` no se envia, el valor por defecto es `false`.

Respuestas posibles:

- `201`: post creado correctamente.
- `400`: faltan campos obligatorios o `author_id` no es numerico.
- `404`: author no encontrado.

#### Actualizar post

```txt
Metodo: PUT
URL: http://localhost:3000/posts/1
```

Actualiza los datos de un post existente.

Body esperado:

```json
{
  "title": "Titulo actualizado",
  "content": "Contenido actualizado.",
  "author_id": 1,
  "published": false
}
```

Respuestas posibles:

- `200`: post actualizado correctamente.
- `400`: id invalido o datos incompletos.
- `404`: post o author no encontrado.

#### Eliminar post

```txt
Metodo: DELETE
URL: http://localhost:3000/posts/1
```

Elimina un post segun su `id`.

Respuestas posibles:

- `200`: post eliminado correctamente.
- `400`: id invalido.
- `404`: post no encontrado.

### Comments

La entidad `comments` corresponde al extra credit del proyecto. Cada comment pertenece a un post y a un author.

#### Listar comments

```txt
Metodo: GET
URL: http://localhost:3000/comments
```

Devuelve un array con todos los comments registrados, incluyendo informacion relacionada del post y del author.

#### Listar comments por post

```txt
Metodo: GET
URL: http://localhost:3000/comments/post/1
```

Devuelve todos los comments asociados a un post especifico.

Respuestas posibles:

- `200`: lista de comments del post.
- `400`: postId invalido.

#### Crear comment

```txt
Metodo: POST
URL: http://localhost:3000/comments
```

Crea un nuevo comment asociado a un post y a un author existentes.

Body esperado:

```json
{
  "content": "Muy buen post.",
  "post_id": 1,
  "author_id": 1
}
```

Campos requeridos:

- `content`
- `post_id`
- `author_id`

Respuestas posibles:

- `201`: comment creado correctamente.
- `400`: faltan campos obligatorios o algun id no es numerico.
- `404`: post o author no encontrado.

## Documentacion OpenAPI

La documentacion formal de la API se encuentra en el archivo:

```txt
openapi.yaml
```

OpenAPI sirve para describir la API de forma estructurada. En este archivo se documentan:

- endpoints disponibles;
- metodos HTTP;
- parametros;
- bodies esperados;
- posibles respuestas;
- codigos de estado.

Para visualizar la documentacion se puede usar Swagger Editor:

```txt
https://editor.swagger.io/
```

Pasos para visualizar `openapi.yaml`:

1. Abrir Swagger Editor en el navegador.
2. Abrir el archivo `openapi.yaml` del proyecto.
3. Copiar todo su contenido.
4. Pegar el contenido en Swagger Editor.
5. Revisar la documentacion generada.

## Deploy En Railway

Railway permite desplegar la API y crear una base de datos PostgreSQL en la nube.

La idea general del deploy es:

1. Subir el proyecto a GitHub.
2. Conectar el repositorio con Railway.
3. Crear una base PostgreSQL en Railway.
4. Configurar las variables de entorno.
5. Crear las tablas en la base de Railway.
6. Ejecutar el seed si se quieren datos iniciales.
7. Probar la API desplegada.

### 1. Subir El Proyecto A GitHub

Antes de desplegar, confirmar que el proyecto este actualizado en GitHub.

Verificar el estado local del repositorio:

```bash
git status
```

Subir los commits locales a GitHub:

```bash
git push
```

Si `git status` muestra cambios pendientes, primero hacer commit y luego ejecutar `git push`.

### 2. Crear Proyecto En Railway

1. Entrar a Railway.
2. Iniciar sesion.
3. Crear un nuevo proyecto.
4. Elegir la opcion para desplegar desde GitHub.
5. Seleccionar el repositorio del proyecto:

```txt
API_MiniBlog_M2_JazminMorinigo
```

Railway detecta que es un proyecto Node.js porque existe el archivo:

```txt
package.json
```

### 3. Revisar El Comando De Inicio

En `package.json`, el proyecto tiene este script:

```json
"start": "node src/server.js"
```

Railway usa este comando para iniciar la aplicacion en produccion.

El archivo `src/server.js` usa la variable de entorno `PORT`:

```js
const PORT = process.env.PORT || 3000;
```

Esto es importante porque Railway asigna el puerto automaticamente en produccion.

### 4. Crear PostgreSQL En Railway

Dentro del mismo proyecto de Railway:

1. Agregar un nuevo servicio.
2. Elegir PostgreSQL.
3. Esperar a que Railway cree la base de datos.
4. Entrar al servicio de PostgreSQL.
5. Buscar la seccion de variables.

Railway suele mostrar variables como:

```txt
PGHOST
PGPORT
PGUSER
PGPASSWORD
PGDATABASE
DATABASE_URL
```

Estas variables contienen los datos reales para conectarse a la base PostgreSQL creada en Railway.

### 5. Configurar Variables De Entorno En La API

La aplicacion usa estas variables:

```env
PORT
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
DB_NAME
```

En el servicio de la API dentro de Railway, agregar las variables de entorno copiando los valores desde el servicio PostgreSQL.

Ejemplo de relacion entre variables:

```txt
DB_USER     -> valor de PGUSER
DB_PASSWORD -> valor de PGPASSWORD
DB_HOST     -> valor de PGHOST
DB_PORT     -> valor de PGPORT
DB_NAME     -> valor de PGDATABASE
```

Tambien agregar:

```env
PORT=3000
```

Nota: Railway puede asignar el puerto internamente. La aplicacion ya usa `process.env.PORT`, por eso esta preparada para Railway.

### 6. Crear Las Tablas En La Base De Railway

La base PostgreSQL de Railway empieza vacia. Por eso hay que ejecutar el contenido de:

```txt
db/setup.sql
```

Ese archivo crea las tablas:

- authors
- posts
- comments

Importante: `setup.sql` contiene instrucciones `DROP TABLE IF EXISTS`, por lo tanto borra y vuelve a crear las tablas. Usarlo solo cuando se quiera iniciar o reiniciar la estructura de la base.

Opciones para ejecutar el SQL:

- usar la consola o herramienta SQL que provea Railway;
- conectarse a la base con `psql`.

Si se usa `psql`, se debe conectar a la base de Railway con los datos de conexion que Railway provee.

Ejecutar el archivo `setup.sql` usando la ruta local donde este guardado el proyecto.

Comando general dentro de `psql`:

```sql
\i 'ruta/local/al/proyecto/db/setup.sql'
```

Ejemplo en Windows:

```sql
\i 'C:/Users/tu_usuario/Desktop/API_MiniBlog_M2_JazminMorinigo/db/setup.sql'
```

### 7. Cargar Datos Iniciales

Despues de crear las tablas, se puede cargar informacion de prueba ejecutando:

```txt
db/seed.sql
```

Este archivo inserta authors, posts y comments iniciales.

Ejecutar el archivo `seed.sql` usando la ruta local donde este guardado el proyecto.

Comando general dentro de `psql`:

```sql
\i 'ruta/local/al/proyecto/db/seed.sql'
```

Ejemplo en Windows:

```sql
\i 'C:/Users/tu_usuario/Desktop/API_MiniBlog_M2_JazminMorinigo/db/seed.sql'
```

Importante: `seed.sql` no se ejecuta automaticamente. Primero se ejecuta `setup.sql` para crear la estructura y luego `seed.sql` para cargar datos de prueba.

### 8. Probar La API Desplegada

Cuando Railway termine el deploy, va a generar una URL publica para la API.

Ejemplo de URL publica de Railway:

```txt
https://tu-dominio-de-railway.up.railway.app
```

Con esa URL se pueden probar los endpoints desde Thunder Client o el navegador.

#### Verificar servidor en Railway

```txt
Metodo: GET
Endpoint: /health
URL completa: https://tu-dominio-de-railway.up.railway.app/health
```

Si `/health` responde correctamente, significa que el servidor esta funcionando.

#### Verificar conexion con PostgreSQL en Railway

```txt
Metodo: GET
Endpoint: /db-test
URL completa: https://tu-dominio-de-railway.up.railway.app/db-test
```

Si `/db-test` responde correctamente, significa que la API puede conectarse con PostgreSQL en Railway.

### 9. Probar Endpoints Principales En Railway

Luego de verificar `/health` y `/db-test`, probar los endpoints principales.

#### Authors

```txt
Metodo: GET
Endpoint: /authors
URL completa: https://tu-dominio-de-railway.up.railway.app/authors
```

#### Posts

```txt
Metodo: GET
Endpoint: /posts
URL completa: https://tu-dominio-de-railway.up.railway.app/posts
```

#### Comments

```txt
Metodo: GET
Endpoint: /comments
URL completa: https://tu-dominio-de-railway.up.railway.app/comments
```

Si se cargaron datos con `seed.sql`, estos endpoints deberian devolver arrays con informacion.

Si no se ejecuto `seed.sql`, pueden devolver arrays vacios.

### 10. Probar Creacion De Datos En Railway

Tambien se pueden probar requests con body JSON desde Thunder Client.

#### Crear author

```txt
Metodo: POST
Endpoint: /authors
URL completa: https://tu-dominio-de-railway.up.railway.app/authors
```

Body JSON:

```json
{
  "name": "Ana Garcia",
  "email": "ana.railway@example.com",
  "bio": "Author creada desde Railway."
}
```

#### Crear post

```txt
Metodo: POST
Endpoint: /posts
URL completa: https://tu-dominio-de-railway.up.railway.app/posts
```

Body JSON:

```json
{
  "title": "Post creado en Railway",
  "content": "Contenido de prueba para la API desplegada.",
  "author_id": 1,
  "published": true
}
```

#### Crear comment

```txt
Metodo: POST
Endpoint: /comments
URL completa: https://tu-dominio-de-railway.up.railway.app/comments
```

Body JSON:

```json
{
  "content": "Comentario creado en Railway.",
  "post_id": 1,
  "author_id": 1
}
```

### 11. Errores Comunes En Railway

Si la API no conecta con PostgreSQL, revisar:

- que las variables de entorno esten cargadas en el servicio de la API;
- que los valores de `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME` coincidan con los de PostgreSQL en Railway;
- que la base tenga las tablas creadas con `setup.sql`;
- que el deploy se haya reiniciado despues de cargar las variables.

Si los endpoints devuelven arrays vacios:

- puede ser normal si no se ejecuto `seed.sql`;
- ejecutar `seed.sql` si se quieren datos de prueba.

Si aparece error de tablas inexistentes:

- significa que todavia no se ejecuto `setup.sql` en la base de Railway.

Si al crear un post devuelve `Author no encontrado`:

- revisar que exista un author con el `id` enviado en `author_id`.

Si al crear un comment devuelve `Post o author no encontrado`:

- revisar que existan el post y el author indicados en `post_id` y `author_id`.

## Uso De AI

Durante el desarrollo de este proyecto se utilizo AI como apoyo para:

- organizar el plan de trabajo;
- comprender conceptos de backend, Express, PostgreSQL, SQL y testing;
- revisar errores durante el desarrollo;
- guiar la implementacion paso a paso;
- mejorar la estructura del proyecto;
- redactar documentacion tecnica.

La implementacion fue realizada paso a paso, probando cada funcionalidad y registrando los avances con Git.
