const Todo = require("../models/Todo");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const User = require("../models/user");


exports.getTodos = (req, res) => {
    
    
    Todo.find(function (err, todos)  {
        if(err) {
            return res.status(400).json({
                error: "NO TODO found"
            })
        }
        else {
            res.json(todos)
        }

    })
    

}

exports.getUsertodos = (req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) {
            return res.status(400).json({
                error: "List not found"
            })
        }
        else {
            return res.json(todo)
        }
    })
}

exports.addUsertodos = async (req, res) => {
    
    const { userId } = req.params
    try {
        const todo = new Todo(req.body)
        const user = await User.findById(userId)
        
        todo.user = user

        await todo.save()
        
        user.todos.push(todo)

        await user.save()

        res.json(todo)
               
    } catch (err) {
        return res.status(500).json({
            message: 'Unable to create a todo',
            err: JSON.stringify(err)
        })
    }

};

  

exports.updateTodos = (req, res) => {

    Todo.update(
        { _id: req.params.id },
        {
            $set: {
                todo_heading : req.body.todo_heading,
                todo_desc : req.body.todo_desc,
                todo_priority : req.body.todo_priority,
                todo_completed : req.body.todo_completed
            }
        }, (err, updatetodo) => {
            if (err) {
                return res.status(400).json({
                    error: "not updated"
                })
            }
            else {
                res.json(updatetodo)
            }
        }
    )
}

exports.deleteTodos = (req, res) => {

    Todo.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })

        //.then(data => res.json(data))
        //.catch(console.log("error"))
    
}
    
