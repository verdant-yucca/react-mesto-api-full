import {jwt, serverUrl} from "./constants";

class Api {
  constructor({ serverUrl, headers }) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  };

  _checkResponse = res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    };

  getUserInfo() {
    return fetch (`${this._serverUrl}/users/me`, {
      headers: this._headers
    })
      .then (this._checkResponse);
  };

  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._headers
    })
      .then (this._checkResponse);
  };

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  };

  addCard(name, info) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: info
      })
    })
      .then (this._checkResponse);
  };

  deleteCard(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then (this._checkResponse);
  };

  editAvatar(url) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      })
    })
      .then (this._checkResponse);
  };

  editProfile(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then (this._checkResponse);
  };

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then (this._checkResponse);
  }
}

const api = new Api({
  serverUrl: serverUrl,
  headers: {
    authorization: jwt,
    'Content-Type': 'application/json'
  }
});

export default api;
