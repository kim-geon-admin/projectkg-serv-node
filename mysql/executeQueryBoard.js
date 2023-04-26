const connection = require('./connection');

exports.selectBoardData = function(request,response){ 
  //let query = ' SELECT * FROM project.board '; 
  let query =  'SELECT id,subject,contents,user_id,DATE_FORMAT(creation_timestamp, "%Y-%m-%d %H:%i:%s") as creation_timestamp,select_count FROM project.board ';
      query += 'order by creation_timestamp desc ';
  connection.query(query, function (error, results, fields) {
    
    if (error) throw error;

    response.send(results);
    console.log('BoardData 정상 조회');
  }); 

}

exports.selectTopBoardData = function(request,response){ 
  //let query = ' SELECT * FROM project.board '; 
  let query =  'SELECT id,subject,contents,user_id,DATE_FORMAT(creation_timestamp, "%Y-%m-%d %H:%i:%s") as creation_timestamp,select_count FROM project.board ';
      query += 'order by select_count desc limit 8';
  connection.query(query, function (error, results, fields) {
    
    if (error) throw error;

    response.send(results);
    console.log('TopBoardData 정상 조회');
  });

}


exports.selectDetailData = function(request,response){ 
  //let query = ' SELECT * FROM project.board '; 
  console.log(request.query);
  let paramArr = [request.query.id,request.query.user_id];
  let query =  'SELECT id,subject,contents,user_id,select_count  FROM project.board';
      query += ' where id= ?  and user_id= ? ';
  connection.query(query,paramArr, function (error, results, fields) {
    
    if (error) throw error;

    response.send(results);
    console.log('Deatail BoardData 정상 조회');
  });

}
exports.updateSearchCount = function(request,response){ 
   //let query = ' SELECT * FROM project.board '; 
   console.log(request.query);
   let paramArr = [request.query.id,request.query.user_id];
   let query =  'update project.board set  select_count = select_count+1';
       query += ' where id= ?  and user_id= ? ';
   connection.query(query,paramArr, function (error, results, fields) {
     
     if (error)  console.log('조회수 증가 실패');
 
  
    // console.log('Deatail BoardData 정상 조회');
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


