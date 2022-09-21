const dotenv = require('dotenv');
dotenv.config();

// Importer package Node HTTP
const http = require('http');

// Importer application Express
const app = require('./app');

const PORT = process.env.PORT;

// Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }
    if(port >= 0) {
        return port;
    }
    return false;
};

// Indiquer le port à l'application
const port = normalizePort(PORT);
app.set('port', port);

// Recherche les différentes erreurs et les gère de manière appropriée
// Elle est ensuite enregistré dans le serveur 
const errorHandler = error => {
    if(error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1)
            break;
        default:
            throw error;
    }
};

// Créer server
const server = http.createServer(app);

// Un écouteur d'évènements, consigne le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Ecouter les requêtes sur le port
server.listen(port);