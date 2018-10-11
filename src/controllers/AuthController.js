const User = require('../models/User');
const Menu = require('../models/menu');
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
class AuthController {
    static async login(req, res) {

    	const data = req.body;
    	//Verify data
        if (!data.email || !data.password){
            return res.status(400).json({ error: true, message: "Email/Password missing." });
        }

        User.findOne({ email: { '$regex': data.email , '$options': 'i' } }).then((user) => {
        	if(!user) return res.json({error: true, message: "User not found."});
        	let status = bcrypt.compare(data.password, user.password);
        	if(!status){
        		return res.json({error: true, message: "Incorrect Password."})
        	}else{
        		let token = jwt.sign({ _id: user._id }, "secret key", { expiresIn: 60 * 60 * 50 });
        		return res.json({error: false, message: 'User logged in successfully', data:{name:user.name, token}});
        	}
        }, (err) => {
           log.error("error finding user",err);
          	return res.json({error: true, message: "An error Occured."});
        });
    }

    static async signup(req, res) {
    	console.log(req.body);
    	if(!req.body.password || !req.body.email){
    		return res.json({error : true, message :  "Fields required"})
    	}
    	const saltRounds = 10;
    	var hash  = await bcrypt.hash(req.body.password, saltRounds);
    	console.log(hash);
    	req.body.password = hash;
    	await User.create(req.body);
    	return res.json({error : false, message :"User created successfully "});

    }

    static async getMenus(req, res) {

    	let menus = await Menu.find();

    	return res.json({error : false,data : {menus}});

    }

    static async isAuthenticated(req, res) {

    	

    }


}

module.exports = AuthController;