const express = require("express");
const router = express.Router();

const { getUserById, getUser, UpdateUser, getAllUsers, getToDos, getRegUsers, addToDoUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);


router.get("/getAllUsers", getAllUsers)
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId/update", isSignedIn, isAuthenticated, UpdateUser);
router.get("/user/:userId/todos", isSignedIn, isAuthenticated, getToDos)





module.exports = router;
