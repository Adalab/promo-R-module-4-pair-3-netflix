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

const sendProfileToApi = (userId, body) => {
  console.log(userId);
  return fetch("//localhost:4000/user/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      userId: userId,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getProfileFromApi = (id) => {
  return fetch("//localhost:4000/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      userId: id,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// user movies

const getUserMoviesFromApi = (userId) => {
  return fetch("//localhost:4000/user/movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      userId: userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
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
