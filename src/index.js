// Importamos los dos módulos de NPM necesarios para trabajar
const express = require("express");
const cors = require("cors"); //hace que nuestra API SEA accesible desde cualquier lugar.

// Creamos el servidor
const server = express(); // a partir de server podré hacer uso de todas las funcionalidades de express.

//Bases de datos
const Database = require("better-sqlite3");

// Configuración motores de plantilla
server.set("view engine", "ejs");

//Bases de datos URL
const db = new Database("./src/db/database.db", { verbose: console.log });

// Configuramos el servidor
server.use(cors()); //server va a utilizar cors para que nuestro servidor pueda ser accesible desde cualquier cliente.
server.use(express.json()); //con esta línea entiende que las respuestas que me lleguen desde el servidor al cliente voy a poder utilizar formato del tipo json.

// Arrancamos el servidor en el puerto.
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// ------------------------ ENDPOINTS DE PELÍCULAS ------------------------ //

// Enpoint de movies para FILTRAR
server.get("/movies", (req, res) => {
  //filtros
  const sortFilterParam = req.query.sort; //ALFABÉTICO
  const genderFilterParam = req.query.gender; //GÉNERO

  //Gardamos las películas
  const query = db.prepare(
    `SELECT * FROM movies ORDER BY title ${sortFilterParam}`
  );
  const list = query.all();
  //Guardamos el valor del género
  const queryGender = db.prepare("SELECT * FROM movies WHERE gender = ?");

  const filteredMoviesByGender = queryGender.all(genderFilterParam);
  if (genderFilterParam !== "") {
    const response = {
      success: true,
      movies: filteredMoviesByGender,
    };
    res.json(response);
  }

  const response = {
    success: true,
    movies: list,
  };
  res.json(response);
});

// Endpoint escuchar peticiones: obtenemos con el ID de la URL la página de cada película.
server.get("/movie/:id", (req, res) => {
  const query = db.prepare("SELECT * FROM movies WHERE id=?");
  const foundMovie = query.get(req.params.id);
  console.log(foundMovie);
  res.render("movie", foundMovie);
});

// ------------------------ ENDPOINTS DE USUARIAS ------------------------ //

// Enpoint de users para LOGIN: obtenemos el usuario al rellenar el formulario
server.post("/login", (req, res) => {
  const query = db.prepare(
    "SELECT * FROM users WHERE email = ? AND password = ?"
  );
  const filteredUsers = query.get(req.body.email, req.body.password);

  // Condición: si tengo datos me devuelve al ID y puedo ver a la usuaria
  if (filteredUsers !== undefined) {
    const response = {
      success: true,
      userId: filteredUsers.id,
    };
    res.json(response);
    // Revisar el ELSE: Cannot read property 'id' of undefined
  } else {
    const response = {
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    };
    res.json(response);
  }
});

// Endpoint para RECUPERAR DATOS del PERFIL de la usuaria
server.get("/user/profile", (req, res) => {
  console.log(req.header("userId"));
  const queryUser = db.prepare("SELECT * FROM users WHERE id=?");
  const foundUsers = queryUser.get(req.header("userId"));
  res.json(foundUsers);
});

// Endpoint para ACTUALIZAR el PERFIL de la usuaria

server.post("/user/profile", (req, res) => {
  console.log(req.header("userId"));
  // const queryUser = db.prepare("SELECT * FROM users WHERE id=?");
  const queryUpdate = db.prepare(
    "UPDATE users SET email = ?, password = ?, name = ? WHERE id = ?"
  );
  const response = {
    success: true,
  };
  const updateUser = queryUpdate.run(
    req.body.email,
    req.body.password,
    req.body.name,
    req.header("userId")
  );
  res.json(response);
});

// Endpoint para REGISTRO de nuevas usuarias

server.post("/sing-up", (req, res) => {
  const query = db.prepare(
    "SELECT * FROM users WHERE email = ? AND password = ?"
  );
  const addNewUser = query.get(req.body.email, req.body.password);
  const queryInsert = db.prepare(
    "INSERT INTO users (email, password) VALUES (?,?)"
  );
  // Condición: si tengo datos me devuelve al ID y puedo ver a la usuaria

  if (addNewUser) {
    const response = {
      success: false,
      errorMessage: "Usuaria/o ya registrada/o",
    };
    res.json(response);
  } else {
    const insertNewUser = queryInsert.run(req.body.email, req.body.password);
    const response = {
      success: true,
      userId: insertNewUser.addNewUser,
    };
    res.json(response);
  }
});

// Endpoint para películas FAVORITAS de la usuaria

server.get("/user/movies", (req, res) => {
  // preparamos la query para obtener los movieIds
  const movieIdsQuery = db.prepare(
    "SELECT movieId FROM rel_movies_users WHERE userId = ?"
  );
  const movieIds = movieIdsQuery.all(req.header("userId"));
  // obtenemos las interrogaciones separadas por comas
  const moviesIdsQuestions = movieIds.map((id) => "?").join(", ");
  console.log(moviesIdsQuestions);
  // que nos devuelve '?, ?'
  // preparamos la segunda query para obtener todos los datos de las películas
  const moviesQuery = db.prepare(
    `SELECT * FROM movies WHERE id IN (${moviesIdsQuestions})`
  );
  console.log(moviesQuery);
  // convertimos el array de objetos de id anterior a un array de números
  const moviesIdsNumbers = movieIds.map((movie) => movie.movieId); // que nos devuelve [1.0, 2.0]
  console.log(moviesIdsNumbers);
  // ejecutamos segunda la query
  const movies = moviesQuery.all(moviesIdsNumbers);

  // respondemos a la petición con
  res.json({
    success: true,
    movies: movies,
  });
});

// ------------------------ SERVIDORES ESTÁTICOS ------------------------ //

const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerImages = "./src/public-movies-images"; // En esta carpeta ponemos los ficheros estáticos de las imágenes
server.use(express.static(staticServerImages));
