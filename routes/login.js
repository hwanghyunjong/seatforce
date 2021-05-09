var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
var dateFormat = require('dateformat');
var fs = require('fs');
var path = require('path');

let conn = new jsforce.Connection({
    loginUrl : "https://resilient-raccoon-pg4msf-dev-ed.my.salesforce.com"
});



router.get('/',  (req, res) => { 
    try {
        conn.login(
            "zhwhd3@resilient-raccoon-pg4msf.com", 
            "ckdqnr34#$" + "6sH35SQMdzKBI8RmPaf9tsfVm",
            (err, reso) => {
                console.log('Connected to Salesforce!');
                conn.query("SELECT id, FirstName, LastName FROM Contact", (err, result) => {
                    if (err) {
                        return console.error("Failed to run SOQL query: ", err);
                    }
                    var { records } = result;
                    let cooper = records
                        .filter(x => x.LastName === 'Jones')[0];
                    console.log(cooper);
                    
                    var LastName = cooper.LastName;
                    console.log(LastName);
                    
                    res.render('../views/index.ejs', {
                        LastName : LastName
                    });
                });

            });
        // now you can use conn to read/write data...
        conn.logout();
    } catch (err) {
        console.error(err);
    }

});

router.route('/').post(function(req, res) {
	//console.log(req.body)
    var paramName = req.body.LastName || req.body.LastName;
	var paramEmail = req.body.id || req.query.id;
    console.log(paramName);

    try {
        conn.login(
            "zhwhd3@resilient-raccoon-pg4msf.com", 
            "ckdqnr34#$" + "6sH35SQMdzKBI8RmPaf9tsfVm",
            (err, reso) => {
                console.log('Connected to Salesforce!!!');
                conn.sobject("Account").create({ Name : 'My Account #2' }, function(err, ret) {
                    if (err || !ret.success) { return console.error(err, ret); }
                    console.log("Created record id : " + ret.id);
                    // ...
                  });
            });
        // now you can use conn to read/write data...
        conn.logout();
    } catch (err) {
        console.error(err);
    }
					
		
});


module.exports = router;