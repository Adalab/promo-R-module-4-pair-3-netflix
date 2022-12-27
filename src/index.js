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
const dbUser = new Database("./src/db/databaseuser.db", {
  verbose: console.log,
});

// Configuramos el servidor
server.use(cors()); //server va a utilizar cors para que nuestro servidor pueda ser accesible desde cualquier cliente.
server.use(express.json()); //con esta línea entiende que las respuestas que me lleguen desde el servidor al cliente voy a poder utilizar formato del tipo json.

// Arrancamos el servidor en el puerto.
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Enpoint de movies para filtrar
server.get("/movies", (req, res) => {
  //FILTROS
  const sortFilterParam = req.query.sort; //ALFABÉTICO
  const genderFilterParam = req.query.gender; //GÉNERO

  //GUARDAR TODAS LAS PELÍCULAS
  const query = db.prepare(
    `SELECT * FROM movies ORDER BY title ${sortFilterParam}`
  );
  const list = query.all();
  //GUARDAMOS EL VALOR DEL GENERO
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

// Enpoint de users para login: obtenemos el usuario al rellenar el formulario
server.post("/login", (req, res) => {
  const query = dbUser.prepare(
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

// Endpoint escuchar peticiones: obtenemos con el ID de la URL la página de cada película.
server.get("/movie/:id", (req, res) => {
  console.log(req.params);
  const query = db.prepare("SELECT * FROM movies WHERE id=?");
  const foundMovie = query.get(req.params.id);
  console.log(foundMovie);
  res.render("movie", foundMovie);
});

const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerImages = "./src/public-movies-images"; // En esta carpeta ponemos los ficheros estáticos de las imágenes
server.use(express.static(staticServerImages));
