const express = require('express');
let router = express.Router();
const propertyController = require('./controllers/propertyController');
const ResponseTemplate = require('./errorTemplates/index');
const validateId = require('./middlewares/validateRequest');
const fs = require('fs');

router.get('/properties/:id',validateId,function(req,res){
    propertyController.fetchById(req.params.id, function(err, propertyData) {
        if (err) {
            //throw err;
            res.json(ResponseTemplate.error(err.code, err.message));
        } else {
            return res.json(propertyData.data);
            fs.writeFile('./temp/propDetailResponse.json',JSON.stringify(propertyData.data), 'utf8', function (err) {
    			    if(err)
    						 return res.send(err);
            });
        }
    });
});

module.exports = router;
