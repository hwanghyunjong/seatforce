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
	console.log(req.body)
	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	
	firebase.auth().signInWithEmailAndPassword(paramId, paramPassword)
		.then(function(firebaseUser) {
			var docUserinfo = db.collection('students').doc(`userinfo(${paramId})`);
			var doc = docUserinfo.get()
				.then(doc => {
					var userid = doc.data().id;
					var username = doc.data().name;
					var usernickname = doc.data().nickname;
					req.session.userid=userid;
					req.session.username=username;
					req.session.usernickname=usernickname;
					// console.log(req.session.userid);
					res.redirect('/main');
				})
				.catch(err => {
					console.log('Error getting documents', err)
				})
		})
		.catch(function(err) {
			res.redirect('/login');
		});
					
		
});


module.exports = router;