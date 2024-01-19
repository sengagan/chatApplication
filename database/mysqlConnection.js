var mysql      = require('mysql2');
const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '152897',                   
//   database : 'customer'
  host     : '50.62.139.196',          
  user     : 'techiefreight',
  password : 'NCviwkO_;Wfx',
  database : 'techiefreight'
});
connection.connect(function(error){
    if(error){
        console.log("database not connected");
    }
    else{
        console.log("database connected successfully");
    }
})
module.exports = {connection};
