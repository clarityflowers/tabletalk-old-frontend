'use strict'

import Auth from 'utils/auth.js';

function httpRequest(url, method, params, body, onResponse) {
  var request = new XMLHttpRequest();
  let paramCount = 0;
  let urlWithParams = url;
  if (params) {
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        if (paramCount == 0) {
          urlWithParams += '?';
        }
        else {
          urlWithParams += '&';
        }
        urlWithParams += `${key}=${params[key]}`;
        paramCount++;
      }
    }
  }
  console.log(urlWithParams);
  request.open(method, process.env.API_URL + '/' + urlWithParams, true);
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

function request({url, method, params, body, resolve, reject}) {
  let attempts = 0;
  let handleResponse = (status, data) => {
    attempts++;
    if (status >= 200 && status < 400) {
      resolve(data)
    }
    else if (status == 401 && attempts == 1) {
      Auth.reAuth(() => {
        httpRequest(url, method, params, body, handleResponse);
      }, reject);
    }
    else if (status >= 400) {
      let message = null;
      if (data) {
        message = data.error;
      }
      reject({code: status, error: !!data && data.error});
    }
  }
  httpRequest(url, method, params, body, handleResponse);
}

export default class HTTP {
  static get({url, params, resolve, reject}) {
    request({url, method: 'GET', params, resolve, reject});
  }

  static post(url, params, body, resolve, reject) {
    request({url, method: 'POST', params, body, resolve, reject});
  }
}
