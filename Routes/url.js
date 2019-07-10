const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');

const URL = require('../Models/url');

router.post('/shorten',function(req,res){
    const { longUrl } = req.body;
    const baseUrl = 'http://localhost:5000';

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base URL');
    }
    //console.log(req.body);
    const urlCode = shortid.generate();
    if(validUrl.isUri(longUrl)){
        try {
            URL.find({ longUrl }, function(err, url){
                if(err){
                    return res.json(err);
                }
                if(url.length){
                    res.json("Link already present");
                }else{
                    const shortUrl = baseUrl + '/' + urlCode;
    
                    url = new URL({
                        longUrl,
                        shortUrl,
                        urlCode,
                        data: new Date()
                    });
    
                    url.save();
                    res.json(url);
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json('Server error');
        }
    }else{
        res.status(401).json('Invalid longUrl');
    }
})

module.exports = router;