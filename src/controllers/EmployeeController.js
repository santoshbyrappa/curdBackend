const Employee = require('../models/employee');
class EmployeeController {
    static async index(req, res) {
        try{
            let employees = await Employee.find();
            return res.json({error : false,data : {employees}});
        }catch(e){
             return res.json({error : true, message :"Something went wrong "});
        }
        
    }
    static async create(req, res) {
        var errors = checkValidation(req.body);
        if(Object.keys(errors).length > 0){
            return res.json({error : true, message :"Fill the essential employee details "});
        }
        try{
            await Employee.create(req.body);
            return res.json({error : false, message :"Employee created successfully "});
        }catch(e){
             return res.json({error : true, message :"Something went wrong "});
        }
    	
    }

    static async update(req, res) {
        try{
            await Employee.update({ _id: req.params.id }, req.body, {upsert:true});
            return res.json({error : false, message :"Employee created successfully "});
        }catch(e){
             return res.json({error : true, message :"Something went wrong "});
        }
        
    }

    static async delete(req, res) {
        try{
            await Employee.remove({ _id: req.params.id });
            return res.json({error : false, message :"Employee deleted successfully "});
        }catch(e){
             return res.json({error : true, message :"Something went wrong "});
        }
        
    }

    

}

function checkValidation (data){
    let errors = {};
    if(!data.name) errors.name = "Employee Name required";
    if(!data.email) errors.name = "Employee Email required";
    if(!data.company) errors.name = "Employee Company required";
    return errors;
}
module.exports = EmployeeController;