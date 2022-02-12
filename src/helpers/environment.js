let APIURL = "";

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'https://git.heroku.com/gamer-buds-client.git':
        APIURL = 'https://git.heroku.com/gamer-buds-client.git'
}

export default APIURL;