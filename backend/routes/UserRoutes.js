const express = require('express');

const router=express.Router();
const {auth,isAdmin,isKam}=  require("../middlewares/AuthMiddleware.js");

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