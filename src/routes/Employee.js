const Express = require("express");
const router = new Express.Router();

const EmployeeController = require('../controllers/EmployeeController');

router.get('/employees', EmployeeController.index);
router.post('/employees', EmployeeController.create);
router.put('/employees/:id', EmployeeController.update);
router.delete('/employees/:id', EmployeeController.delete);

module.exports = router;
