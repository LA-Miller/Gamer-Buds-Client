let APIURL = "";

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'https://lam-gamer-buds-server.herokuapp.com';
        break;
    case 'gamer-buds-client.herokuapp.com':
        APIURL = 'https://lam-gamer-buds-server.herokuapp.com'
        break;
}

export default APIURL;