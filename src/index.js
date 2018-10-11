'use strict';

require('dotenv').config();

const Express = require('express');
const Cluster = require('cluster');
const bodyParser = require('body-parser')

const Routes = require('./routes');
const Db = require('./services/Db');

// App
const PORT = process.env.PORT || 3000;
const app = Express();

app.use(bodyParser.json());
app.disable("x-powered-by");
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception: ', err)
})
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason)
})

// The server start function
function start() {
	// Initialize the db, routes
	Db.init();
    Routes.init(app);

	// Start the application
      app.listen(PORT, () => {
		console.log(`Server enviroment: ${process.env.NODE_ENV}`);
        console.log(`Server is up: http://localhost:${PORT}`);
	});
}

// Production logic -> Tracking errors and
// automatically restarting server in case of any error
if (process.env.NODE_ENV === 'production') {
	// If we have an error, we will restart the server
	if (Cluster.isMaster) {
		Cluster.fork();
		Cluster.on('exit', (worker, code, signal) => {
			Cluster.fork();
		});
	}
	if (Cluster.isWorker) {
		start();
	}
} else {
	start();
}