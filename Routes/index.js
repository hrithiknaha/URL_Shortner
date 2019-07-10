const express = require('express');
const router = express.Router();
const URL = require("../Models/url");

router.get('/:code', function(req,res){
    try {
        URL.find({urlCode: req.params.code}, function(err, url){
            if(err){
                return res.json(err);
            }
            if(url.length!= null){
                res.redirect(url[0].longUrl);
            }else{
                res.status(404).json("No url Found");
            }  
        });
    } catch (err) {
        res.status(500).json('Server Error');
    }
})

module.exports = router;