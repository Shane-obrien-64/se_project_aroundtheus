// Project 9.Token:
// cd56466a-c69a-4082-86d8-efb553341f31
// Group ID: group-12

const { get } = require("core-js/core/dict");

class Api {
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
      .catch((err) => {
        console.error(err);
      });
  }

  getUserinfo() {
    return fetch("https://around.nomoreparties.co/v1/groupId/users/me", {
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
      .catch((err) => {
        console.error(err);
      });
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
    "Content-Type": "application/json",
  },
});
