getCommonHeaders = () => {
  let commonHeaders = {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': '113',
    'Cache-Control': 'no-cache',
    'X-Powered-By': 'Express',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Credentials': 'true',
    'ETag': 'W/"71-0ih1+6hSmy7SWBFYt049ZTxNrFU"',
    'Date': 'Sun, 15 Oct 2023 12:45:44 GMT',
    'Connection': 'keep-alive',
    'Keep-Alive': 'timeout=5',
  };

  return commonHeaders;
};

export async function ApiRequest(endUrl, method, headers, body) {
  try {
    let requestHeaders = getCommonHeaders();
    if (headers) {
      requestHeaders = {...requestHeaders, ...headers};
    }
    const options =
      method == 'GET'
        ? {
            method: method,
            // headers: requestHeaders,
          }
        : {
            method: method,
            headers: requestHeaders,
            body: JSON.stringify(body),
          };
    // console.log('sssssoption', options);
    try {
      return fetch(endUrl, options)
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson', responseJson);
          return responseJson;
        });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}
