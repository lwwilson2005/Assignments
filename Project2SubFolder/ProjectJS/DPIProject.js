

//**************************************************************** */
// DPIProject.js - Working copy 4/24/2018
// DPI = Database Project Interface
// 4/24/2018
// This works by calling the ip address with the specified URL
// The interface will translate the table name in the URL
// into a SQL Server database call and provide JSON datastream
// back to the caller. This javascript routine provides data 
// over a public and private ip addressing scheme. Although
// the below code has been redacted, the presentation uses
// data supplied over the internet via a public ip address.
//
// The framework is written in NodeJS. The other dependencies are
// Express for the REST server and MSSQL for the javascript
// driver to connect the SQL Server.
//**********************************************************

var express = require('express');
var app = express();
var sql = require("mssql");
//var routes = require('./routes/')


//route for r0
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function (req, res, next) {
    // Default route - return error message
    // Add fs logging function to this first
    var get1time = new Date();
    console.log("Got a DPI Empty Search request from address: " , req.ip, " at ",get1time);
    // res.send("404 Error")
    goodreq = true;
    if (goodreq) {
        
        
        var config = {
            user: 'projecttest2',
            password: '??????????',
            server: '192.168.88.10', 
            database: 'project2_db',
	        port: 49172
        };

        // connect to your database
        sql.connect(config, function (err) {
    
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();
            // query to the database and get the records
            strSQL = "select *"
            
            strSQL = strSQL + "from Clean_vssr;  "
            
            request.query(strSQL, function (err, result) {
        
        
            
                if (err) console.log(err)

                // send records as a response
                res.send(result.recordset);
            sql.close()
            
            });
        });
    
        //************************************* */
        //Place search code above
        } else {
            
             res.send("404 Error");
        }
    
    
    });
        

    //end route r1
    
//
//******************************************Search Route Section************** */

//
//********************************************************route for r4
app.get('/search/:ID/pw/:pass/table/:tbl/db/:dbnum', function (req, res,next) {
    // variable search of Project tables
    // insert the relevant table name in the URL
    
    
    //
    var get4time = new Date();
    console.log("Got a DPI Table request from: " , req.ip, " at ",get4time);
    custID = parseInt(req.params.ID,10);
    if (typeof custID != "number") {
        console.log('This is not number');
    }
    
    
    pwd = req.params.pass;
    ssrch = req.params.dbnum;
    tname = req.params.tbl;
    //
    
    //
    console.log(ssrch,custID,pwd, tname);
    ssrch = req.params.search;
    goodreq = false;
    if (pwd === "??????????") {
        goodreq = true;
        console.log("password accepted");
        
    } else { 
        console.log("bad password ", pwd, " from: ", req.ip);
        goodreq = false;
    }
    
    if (goodreq) {
        
        
        var config = {
            user: 'projecttest2',
            password: '??????????',
            server: '192.168.88.51', 
            database: 'project2_db',
	        port: 49172 
        };

        // connect to your database
        sql.connect(config, function (err) {
    
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();
            //console.log("Got a DPI GET request for the homepage at " , req.ip);
        
            //console.log(sMinage, sMaxage)
            // query to the database and get the records
            strSQL = "select * "
            strSQL = strSQL + "from " + tname + ";  "
            console.log(strSQL);
            // strSQL = strSQL + "from Clean_usa_unemployment;  "
            request.query(strSQL, function (err, result) {
        
        
            
                if (err) console.log(err)

                // send records as a response
                res.send(result.recordset);
            sql.close()
            
            });
        });
    
        //************************************* */
        //Place search code above
        } else {
            
             res.send("404 Error");
        }
    
    
    });
//end route r4
//



//*********************************************POST Section****************** */
//Post
// default POST
app.post('/', function(req,res, next) {
    console.log("Got a DPI Post request from: " , req.ip);
    
    res.send("404 Error");
})
//end post
//

//
//******************************************************Delete Section************
app.delete('/', function(req,res, next) {
    var getDelTime = new Date();
    console.log("Got a DPI Delete request from: " , req.ip, " at ",getDelTime);
    res.send("404 Error");
})
//end delete
//
//********************************************************Functions Section********* */

//


//

//
//*********************************************End Filter Section******** */


var server = app.listen(8001, function () {
    var shost = server.address().address
    var sport = server.address().port
    var serverstart = new Date()
    console.log('DPIProject2 V1.2 is running..started on: ', serverstart, shost, sport);
});
