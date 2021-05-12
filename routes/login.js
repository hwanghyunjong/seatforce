var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
var url = require('url');
var dateFormat = require('dateformat');
var fs = require('fs');
var path = require('path');
const { strict } = require('assert');

let conn = new jsforce.Connection({
    loginUrl : "https://sobetec2.my.salesforce.com"
});


router.get('/',  (req, res) => { 
    var queryData = url.parse(req.url, true).query;
    var title = queryData.id;

    try {
        conn.login(
            "hjhwang@sobetec.demo", 
            "thqpWkd12" + "oJSpN8f0mgnM9Z6Jjjoc560D",
            (err, reso) => {
                console.log('Connected to Salesforce!');
                conn.query("SELECT id, FirstName, LastName FROM Contact", (err, result) => {
                    if (err) {
                        return console.error("Failed to run SOQL query: ", err);
                    }
                    var { records } = result;
                    let cooper = records
                        .filter(x => x.LastName === 'Jones')[0];
                    //console.log(cooper);
                    
                    var LastName = cooper.LastName;
                    //console.log(LastName);
                    
                    res.render('../views/index.ejs', {
                        LastName : LastName,
                        title : title
                    });
                });
            });
        // now you can use conn to read/write data...
        conn.logout();
    } catch (err) {
        console.error(err);
    }

});

router.get('/:month/:day',  (req, res) => { 
    var params = req.params;
    console.log(params.day);
    try {
        conn.login(
            "hjhwang@sobetec.demo", 
            "thqpWkd12" + "oJSpN8f0mgnM9Z6Jjjoc560D",
            (err, reso) => {
                console.log('Connected to Salesforce!');
                conn.query(`SELECT Name, ApplicationDate__c, ApplicationTime__c FROM TestDriveExperience__c Where ApplicationDate__c = 2021-${params.month}-${params.day}`, (err, result) => {
                    if (err) {
                        return console.error("Failed to run SOQL query: ", err);
                    }
                    var { records } = result;
                    console.log(records);

                    var LastName = [];

                    for (i=0; i<records.length; i++) {
                        LastName.push(records[i].ApplicationTime__c);
                    };

                    console.log(LastName);
                    
                    res.render('../views/login.ejs', {
                        LastName : LastName,
                        monthdata : params.month,
                        daydata : params.day
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
	var paramEmail = req.body.Id || req.query.Id;
    var paramBirth = req.body.birthday || req.query.birthday;

    var firstnum = req.body.firstnum || req.query.firstnum;
    var middlenum = req.body.middlenum || req.query.middlenum;
    var lastnum = req.body.lastnum || req.query.lastnum;

    var car1 =req.body.car1 || req.query.car1;
    var car2 =req.body.car2 || req.query.car2;
    var car3 =req.body.car3 || req.query.car3;
    var car4 =req.body.car4 || req.query.car4;
    var car5 =req.body.car5 || req.query.car5;

    var cars = [car1,car2,car3,car4,car5];

    var check1 = req.body.agree1;
    var check2 = req.body.agree2;
    var check3 = req.body.agree3;
    var check4 = req.body.agree4;
    var check5 = req.body.agree5;

    var gender = req.body.gender;

    var yearmonth = req.body.yearmonthday;

    var radio = req.body.timevalue;
    
    console.log(radio);

    var checks = [check1, check2, check3, check4, check5];

    var array = [];
    var aa = '';

    for (i=0; i<5; i++) {
        if (cars[i] == "Y") {
            array.push(checks[i]);
        }
    }

    console.log(array.length);

    for (j=0; j<array.length; j++) {
        if (j < array.length-1) {
            aa += `${array[j]};`;
        } else {
            aa += `${array[j]}`;
        }
    }

    console.log(aa);

    try {
        conn.login(
            "hjhwang@sobetec.demo", 
            "thqpWkd12" + "oJSpN8f0mgnM9Z6Jjjoc560D",
            (err, reso) => {
                console.log('Connected to Salesforce!!!');
                conn.sobject("TestDriveExperience__c")
                    .create(
                    { 
                        LastName : paramName,
                        Email : paramEmail,
                        Birthday__c : paramBirth,
                        Phone : firstnum + middlenum + lastnum,
                        Company	 : 'sobetec',
                        CurrencyIsoCode : 'KRW',
                        Status : 'Open - Not Contacted',
                        VehicleModelOfInterest__c : aa,
                        Gender__c : gender
                    }, 
                    function(err, ret) {
                        if (err || !ret.success) { return console.error(err, ret); 
                    }
                    console.log("Created record id : " + ret.id);
                    // ...
                  });
            });
        // now you can use conn to read/write data...
        res.redirect('/login');
    } catch (err) {
        console.error(err);
    }
		
});


module.exports = router;