class ApiInintialMovies {
  constructor(options) {
    this._baseUrl = options.baseUrl;

    this.getInitialMovies = this.getInitialMovies.bind(this);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}`).then((res) => this._getResponseData(res));
  }
}

const apiInintialMovies = new ApiInintialMovies({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default apiInintialMovies;
