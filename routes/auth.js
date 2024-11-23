const express = require('express');
const router = express.Router();

router.post('/login', (req, res) =>{
    const {name} = req.body;

    if(!name) {
        return res.status(401).json({
            success: false,
            message: "Please provide credentials"
        })
    }
    return res.status(201).json({
        success: true,
        person: name
    })

});

router.post('/api/signup' , (req, res) => {
    
})

module.exports = router;
