var express = require('express');
var app = express();

app.set('port', (process.env.PORT | 3000));
app.use(express.static(__dirname));

app.get('/', function(req,res){
  res.render(__dirname + '/index.html');
});

app.listen(app.get('port'), function(){
  console.log('server is up on the process.env.PORT or port 3000');
});

