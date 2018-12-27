export function handleAxiosGetError (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert('Error ' + error.response.status + ': ' + error.response.data.message);
        console.error(error.response);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        alert('There was an issue with the request');
    } else {
        // Something happened in setting up the request that triggered an Error
        alert('Unknown error');
        console.error(error.message);
    }
}

export function handleAxiosPostError (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert('Error ' + error.response.status + ': ' + error.response.data.message);
        console.error(error.response);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        // Silently fail as background sync in the service worker should retry this
    } else {
        // Something happened in setting up the request that triggered an Error
        alert('Unknown error');
        console.error(error.message);
    }
}
