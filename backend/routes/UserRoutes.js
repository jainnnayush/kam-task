const express = require('express');

const router=express.Router();
const {auth,isAdmin,isKam}=  require("../middlewares/AuthMiddleware.js");
const {createUser,getAllUsers,getUserById,deleteUser,updateUser} = require('../controllers/UserController.js');

// Admin route to manage users (admin,kam). Customers can signup by themselves.
router.post('/',auth,isAdmin,createUser); // create a new user
router.get('/',auth,isAdmin,getAllUsers); // get all users
router.get('/:id',auth,isAdmin,getUserById); // get a specefic user
router.delete('/:id',auth,isAdmin,deleteUser); // delete a user
router.put('/:id', auth, isAdmin,updateUser); // update a user


router.get("/kam" ,auth, isKam, (req , res) => {
    res.json({
        success : true,
        message : "Welcome to the protected route for the KAM",
    })
})

router.get("/admin",auth, isAdmin, (req , res) => {
    res.json({
        success : true,
        message : "Welcome to the protected route for the admin",
    })
})

module.exports = router;