var express = require("express");
var router = express.Router();
const { signout, signup, signin, isSignedIn, getTodos, getUsertodos, addUsertodos, updateTodos, deleteTodos } = require("../controllers/todos");
const { getUserById, getUser, UpdateUser, getAllUsers, getToDos  } = require("../controllers/user");

router.param("userId", getUserById);

router.get("/", getTodos)
router.get("/:id", getUsertodos);
router.post("/user/:userId/add", addUsertodos);
router.put("/user/:userId/update/:id", updateTodos);
router.delete("/user/:userId/delete/:id", deleteTodos);


module.exports = router;