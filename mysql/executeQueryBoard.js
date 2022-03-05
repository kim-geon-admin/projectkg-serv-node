const connection = require('./connection');

exports.selectBoardData = function(request,response){ 
  //let query = ' SELECT * FROM project.board '; 
  let query =  'SELECT id,subject,contents,user_id,DATE_FORMAT(creation_timestamp, "%Y-%m-%d %H:%i:%s") as creation_timestamp FROM project.board';
  connection.query(query, function (error, results, fields) {
    
    if (error) throw error;

    response.send(results);
    console.log('BoardData 정상 조회');
  });

}


exports.insertBoardData = function(request,response){ 
  let query = ' INSERT INTO `project`.`board` (`subject`, `contents`, `user_id`,`creation_timestamp`) ';
      query += ' VALUES (?, ?, ?,now())';  
  let param = [request.body.subject,request.body.contents,request.body.user_id];
   console.log(param);
  connection.query(query,param, function (error, results, fields) {
    
    if (error) throw error;

    response.send('success');
    console.log('BoardData 정상 등록되었습니다');
  });

}


