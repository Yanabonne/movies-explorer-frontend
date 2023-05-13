class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getInitialMovies = this.getInitialMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this._getResponseData = this._getResponseData.bind(this);
  }

  _getResponseData(res) {
    return res.ok
      ? res.json()
      : res.json().then((res) => Promise.reject(`Ошибка: ${res.message}`));
  }

  getUserInfo() {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }

  getInitialMovies() {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }

  updateUserInfo(data) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addMovie(data) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteMovie(movieId) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: "https://api.yanabonnemovies.nomoredomains.monster",
});

export default api;
