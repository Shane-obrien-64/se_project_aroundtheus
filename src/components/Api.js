// Project 9.Token:
// cd56466a-c69a-4082-86d8-efb553341f31
// Group ID: group-12

// const { get } = require("core-js/core/dict");

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateProfile(name, about) {
    fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: "PATCH",
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  getUserinfo() {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addLike() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        method: "PUT",
      },
    });
  }

  deleteLike() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        method: "DELETE",
      },
    });
  }
}
