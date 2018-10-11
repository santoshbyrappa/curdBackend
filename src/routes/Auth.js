const Express = require("express");
const router = new Express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/auth/login', AuthController.login);
router.post('/auth/signup', AuthController.signup);
router.get('/menus', AuthController.getMenus);

module.exports = router;
