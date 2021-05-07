var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

const jsforce = require("jsforce");const conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : "https://test.salesforce.com"
    loginUrl : "https://resilient-raccoon-pg4msf-dev-ed.my.salesforce.com"
  });
  // Log in with basic SOAP login (see documentation for other auth options)
  conn.login(
    "zhwhd3@resilient-raccoon-pg4msf.com",
    "ckdqnr34#$" + "6sH35SQMdzKBI8RmPaf9tsfVm",
    (err, res) => {
      if (err) {
        return console.error("Failed to log in to Salesforce: ", err);
      }
      console.log("Successfully logged in!");
      // Run a SOQL query
      conn.query("SELECT Id, Name FROM Account LIMIT 5", (err, result) => {
        if (err) {
          return console.error("Failed to run SOQL query: ", err);
        }
        // Display query results
        var { records } = result;
        console.log(`Fetched ${records.length} records:`);
        records.forEach(record => {
          console.log(`- ${record.Name} (${record.Id})`);
        });
      });
    }
  );

router.get('/',  (req, res) => { 
    res.render('../views/login.ejs', {
        records : records
    });

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