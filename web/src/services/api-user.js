// login

const sendLoginToApi = (data) => {
  return fetch("http://localhost:4000/login", {
    method: "POST", // Para enviar datos
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// signup

const sendSingUpToApi = (data) => {
  return fetch("http://localhost:4000/sing-up", {
    method: "POST", // Para enviar datos
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// profile

const sendProfileToApi = (body) => {
  const queryParams = `user-id${body.id}`;
  return fetch("//localhost:4000/user/profile?" + queryParams, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-id": body.id,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getProfileFromApi = (body) => {
  // const queryParams = `user-id${body.id}`;
  return fetch("//localhost:4000/user/profile", {
    //// FALLA, NO COGE EL ID
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-id": body.id,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// user movies

const getUserMoviesFromApi = (userId) => {
  console.log(
    "Se están pidiendo datos de las películas de la usuaria:",
    userId
  );
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(
    "//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json"
  )
    .then((response) => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return {
        success: true,
        movies: [
          {
            id: 1,
            title: "Gambita de dama",
            gender: "Drama",
            image:
              "//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg",
          },
        ],
      };
    });
};

const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserMoviesFromApi: getUserMoviesFromApi,
};

export default objToExport;
