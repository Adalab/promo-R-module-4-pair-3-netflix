// login

const getMoviesFromApi = (params) => {
  const queryParams = `gender=${params.gender}&sort=${params.sort}`;
  return fetch("//localhost:4000/movies?" + queryParams, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
