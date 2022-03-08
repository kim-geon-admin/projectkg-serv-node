const connection = require('./connection');

exports.selectUser = function(request,response){ 
  let query = ' select user_name,user_password,user_id from user_info  '; 
      query += 'where user_id= ?  and user_password = ?';
  let param = [request.body.user_id,request.body.user_password];
  connection.query(query,param, function (error, results, fields) {
    
    if (error) throw error;
   // console.log('The solution is: ', results);
   // response.writeHead(200);
    response.send({
      return_code : 200,
      jwt_token : request.jwt_token,
      result : results
    
    });
    console.log('수행');
  });

}

