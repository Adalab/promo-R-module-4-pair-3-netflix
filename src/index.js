// Importamos los dos módulos de NPM necesarios para trabajar
const express = require("express");
const cors = require("cors"); //hace que nuestra API SEA accesible desde cualquier lugar.
const movies = require("./data/movies.json");
const users = require("./data/users.json");

// Creamos el servidor
const server = express(); // a partir de server podré hacer uso de todas las funcionalidades de express.

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
  //const genderFilterParam = req.query.gender;
  //GUARDAMOS EL VALOR DEL GENERO
  //const sortFilterParam = req.query.sort;
  //GUARDAMOS EL VALOR DEL NOMBRE
  //const filteredMovies = movies.filter(movie => movie.gender.toLowerCase().includes(genderFilterParam.toLowerCase())
  //FILTRAMOS LAS PELÍCULAS POR GÉNERO
  const response = {
    success: true,
    movies, //filteredMovies
  };
  res.json(response);
});

// Enpoint de users para login
server.post("/login", (req, res) => {
  const filteredUsers = users.find(
    (user) =>
      user.email === req.body.email && user.password === req.body.password
  );
  if (filteredUsers !== "undefined") {
    const response = {
      success: true,
      userId: filteredUsers.id,
    };
    res.json(response);
  } else {
    const response = {
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    };
    res.json(response);
  }
});

// // Endpoint para gestionar los errores 404
// server.get("*", (req, res) => {
//   // Relativo a este directorio
//   const notFoundFileRelativePath = "../src/public-react/404-not-found.html";
//   const notFoundFileAbsolutePath = path.join(
//     __dirname,
//     notFoundFileRelativePath
//   );
//   res.status(404).sendFile(notFoundFileAbsolutePath);
// });

const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerImages = "./src/public-movies-images"; // En esta carpeta ponemos los ficheros estáticos de las imágenes
server.use(express.static(staticServerImages));
