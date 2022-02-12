let APIURL = "";

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        // APIURL = 'http://localhost:3000';
        APIURL = 'https://lam-gamer-buds-server.herokuapp.com';
        break;
    case 'https://git.heroku.com/gamer-buds-client.git':
        APIURL = 'https://lam-gamer-buds-server.herokuapp.com'
}

export default APIURL;