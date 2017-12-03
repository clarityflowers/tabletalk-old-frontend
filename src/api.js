const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const deserialize = response => response.json(); 

const request = (urlInput, {method = "GET", queries, urlParams, body, auth}) => {
  // build url with url params
  const urlParts = urlInput.split("/");
  let url = urlParts[0];
  for (let i=1; i < urlParts.length; i++) {
    const urlPart = urlParts[i];
    if (urlPart[0] === '$') {
      const param = urlPart.substring(1);
      url += "/" + urlParams[param];
    }
    else {
      url += "/" + urlPart;
    }
  }

  // build query string
  let first = true;
  for (const query in queries) {
    if (first) { 
      url += "?";
      first = false;
    }
    else url += "&";
    
    url += `${query}=${queries[query]}`;
  }

  const headers = {}
  if (auth) {
    headers['Auth'] = auth;
  }
  if (method !== "GET") {
    headers['Content-Type'] = 'application/json';
  }

  const opts = {
    method,
    body: (method === "GET") ? undefined : body,
    headers
  }
  return fetch(url, opts)
    .then(checkStatus)
    .then(deserialize);
} 

const makeApi = (baseUrl, delegate, auth) => {
  const helpers = {
    path: (path, map) => makeApi(`${baseUrl}/${path}`, map, auth),
    auth: (path, jwt, map) => makeApi(`${baseUrl}/${path}`, map, jwt),
    get: (url, {queries, urlParams, auth}) => request(`${baseUrl}/${url}`, {method: "GET", queries, urlParams, auth}),
    post: (url, {body, urlParams, auth}) => request(`${baseUrl}/${url}`, {method: "POST", body, urlParams, auth}),
  }

  return delegate(helpers);
}

const api = makeApi(process.env.REACT_APP_API_URL, ({path, get}) => ({
  auth: path("auth", ({get}) => ({
    login: (provider, jwt) => get("login", {queries: {provider, jwt}})
  }))
}))

export default {
  auth: {
    login: api.auth.login
  }
};

window.api = api;