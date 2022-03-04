const connection = require('./connection');

exports.selectBoardData = function(request,response){ 
  let query = ' SELECT * FROM project.board '; 
   
  connection.query(query, function (error, results, fields) {
    
    if (error) throw error;

    response.send(results);
    console.log('BoardData 정상 조회');
  });

}

