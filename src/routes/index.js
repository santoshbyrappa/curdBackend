const cors = require('cors');
const EmployeeRoutes = require('./Employee');

module.exports = {
    init: (app) => {
        // CORS
        app.use(cors());
        app.use(EmployeeRoutes);


        // Catch all the mismatch routes
        app.get('/*', notFound);
        app.post('/*', notFound);
    }
}

function notFound(req, res) {
    return res.status(404).json({
        error: true,
        message: 'This api does not exist'
    });
}