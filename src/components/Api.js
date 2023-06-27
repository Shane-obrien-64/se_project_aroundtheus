export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialData() {
    const cardInfo = this.getInitialCards();
    const userInfo = this.getUserinfo();
    return Promise.all([cardInfo, userInfo]);
  }

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        return Promise.resolve(data);
      });
  }

  getUserinfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        return Promise.resolve(data);
      });
  }

  updateProfile(name, about) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  updateProfileImg(avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  postCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}
