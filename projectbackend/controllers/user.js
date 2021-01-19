const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User was not found"
            })
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.getAllUsers = async (req, res) => {
    
    User.find()
        .populate("todos")
        .exec((err, user) => {
        if (err) {
            res.json(err)
        }
        res.json(user)
    })
    
}

  

exports.getRegUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            res.json(err)
        }
        res.json(users)
    })
}

exports.addToDoUser = async (req, res) => {
    let {
        name,
        todos
    } = req.body;

    try {
        let user = new User();
        user.name = name;
        
        const { userId } = req.params
        const user1 = await User.findById(userId).populate("todos")
        res.json(user1.todos)
        await user1.save()
        console.log("user: ", JSON.stringify(user1));
        if (_.isEmpty(user)) {
            res.status(500).json({
                message: 'unable to create user empty'
            })
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: 'unable to create user',
            err: JSON.stringify(err)
        })
    }
}


exports.getToDos = async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId).populate("todos")
    res.json(user)
  
}

exports.UpdateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "update not success"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);

        }
    );
};

