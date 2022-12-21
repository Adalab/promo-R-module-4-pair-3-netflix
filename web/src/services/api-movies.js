// login

const getMoviesFromApi = (params) => {
  console.log("Se están pidiendo las películas de la app");
  console.log(params);
  return fetch(
    `//localhost:4000/movies?gender=${params.gender}&sort=${params.sort}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;

// const getMoviesFromApi = (params) => {
//   console.log(params);
//   const queryParams = `gender=${params.gender.toLowerCase()}&sort=${params.sort}`;
//   // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
//   return fetch('//localhost:4000/movies?' + queryParams)
//   .then(response => response.json())
//   .then(data => {
//      return data;
//   });
// };
