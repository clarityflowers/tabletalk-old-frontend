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

const request = (urlInput, {method = "GET", queries, urlParams, body, jwt}) => {
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
  if (jwt) {
    headers['Authorization'] = "Bearer " + jwt;
  }
  if (method !== "GET") {
    headers['Content-Type'] = 'application/json';
  }

  const opts = {
    method,
    body: (method === "GET") ? undefined : body,
    headers
  }
  return fetch(`${process.env.REACT_APP_API_URL}/${url}`, opts)
    .then(checkStatus)
    .then(deserialize);
}

export const get = (url, {queries, urlParams, jwt} = {}) => request(url, {method: "GET", queries, urlParams, jwt});
export const post = (url, {body, urlParams, jwt} = {}) => request(url, {method: "POST", body, urlParams, jwt});

const addUrl = (fn, added) => (url, opts) => fn(`${added}/${url}`, opts);

export const withUrl = (args, added) => {
  if (added === undefined) return withUrl({get, post}, args);
  else if (typeof args === "function") return addUrl(args, added);
  else {
    const result = {};
    for (const key in args) {
      result[key] = withUrl(args[key], added);
    }
    return result;
  }
} 