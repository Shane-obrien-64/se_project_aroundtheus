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
    return fetch(this.baseUrl + "/cards", {
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
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getUserinfo() {
    return fetch(this.baseUrl + "/users/me", {
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

  updateProfileImg(avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  postCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        "Content-Type": "application/json",
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

  addLike(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "PUT",
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        "Content-Type": "application/json",
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

  deleteLike(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
        "Content-Type": "application/json",
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
