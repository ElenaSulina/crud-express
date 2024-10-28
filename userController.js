require('dotenv').config()
const database = require('./data-sql.js')

class UserController {

    async createUser(req, res) {
        try { 
            const name = req.body.name;
            const age = req.body.age;
    
            if (name && age) {
                const user = {name, age: parseInt(age)};
                res.status(201).json(await database.addUser(user));
            }
            else {
                res.status(400).json({message: 'Name and age are required'});
            }
        } catch(e){
            res.status(500).json(e);
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const success = await database.deleteUser(id);
    
            if (success) {
                res.status(204).end();
            } else {
                res.status(404).json({message: 'User not found'});
            }
        } catch(e){
            res.status(500).json(e);
        }
    }

    async getUser(req, res) {
        try {
            const id = req.params.id;
            const user = await database.getUserById(id);
    
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "User not found"});
            }
        } catch(e){
            res.status(500).json(e);
        }
    }
 
    async listOfUsers(req, res) {
        try {
            res.status(200).json(await database.getUsers());
        } catch(e){
            res.status(500).json(e);
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const updatedData = {};
    
            for (let key in req.body) {
                updatedData[key] = key === 'age' ? parseInt(req.body[key]) : req.body[key];
            }
    
            const updatedUser = await database.updateUser(id, updatedData);
    
            if (updatedUser) {
                res.status(200).json(updatedUser);
            }
            else {
                res.status(404).json({message: 'User not found'});
            }
    
        } catch(e){
            res.status(500).json(e);
            console.log(e);
        }
    }
};


module.exports = new UserController();
