const connection = require('./connection');

exports.selectBoard = function(response){ 
  
  connection.query('  select * from board', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    response.writeHead(200);
    response.send(results);
  });

}

