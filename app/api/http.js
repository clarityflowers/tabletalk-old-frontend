'use strict'

import Auth from 'utils/auth.js';

function httpRequest(url, method, body, onResponse) {
  var request = new XMLHttpRequest();
  request.open(method, process.env.API_URL + '/' + url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('token', Auth.getToken());
  request.onreadystatechange = () => {
    if (request.readyState == XMLHttpRequest.DONE) {
      let data = null;
      if (request.responseText) {
        data = JSON.parse(request.responseText);
      }
      onResponse(request.status, data);
    }
  };
  if (body) {
    request.send(JSON.stringify(body));
  }
  else {
    request.send();
  }
}

function request(url, method, body, resolve, reject) {
  let attempts = 0;
  let handleResponse = (status, data) => {
    attempts++;
    if (status >= 200 && status < 400) {
      resolve(data)
    }
    else if (status == 401 && attempts == 0) {
      Auth.reAuth(() => {
        httpRequest(url, method, body, handleResponse);
      })
    }
    else if (status >= 400) {
      reject({code: status, message: data && data.error});
    }
  }
  httpRequest(url, method, body, handleResponse);
}

export default class HTTP {
  static get(url, resolve, reject) {
    request(url, 'GET', null, resolve, reject);
  }

  static post(url, body, resolve, reject) {
    request(url, 'POST', body, resolve, reject);
  }
}
