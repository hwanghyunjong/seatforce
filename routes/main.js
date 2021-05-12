var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
var dateFormat = require('dateformat');
var fs = require('fs');
var path = require('path');
const { strict } = require('assert');

let conn = new jsforce.Connection({
    loginUrl : "https://sobetec2.my.salesforce.com"
});


router.get('/',  (req, res) => { 
    try {
        conn.login(
            "hjhwang@sobetec.demo", 
            "thqpWkd12" + "oJSpN8f0mgnM9Z6Jjjoc560D",
            (err, reso) => {
                console.log('Connected to Salesforce!');
                res.render('../views/main.ejs');
            });
        // now you can use conn to read/write data...
        conn.logout();
    } catch (err) {
        console.error(err);
    }

});

module.exports = router;