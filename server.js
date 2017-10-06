var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/:date')
.get(function(req,res){
  //console.log(req.params.date);
  var date = req.params.date;
  //console.log(date);
  var d = Date.parse(date);
  if(isNaN(d)){
    var dateNatural = new Date(parseInt(date*1000));
    if(dateNatural=="Invalid Date"){
      res.json({unix:null,natural:null});
    }else{
      var months = ["January","Februray","March","April","May","June","July","August","September","October","November","December"];
      var year = dateNatural.getFullYear();
      var month = months[dateNatural.getMonth()];
      var day = dateNatural.getDate();
      var answer = month+" "+day+", "+year;
      res.json({unix:date,natural:answer});
    }
  }else{
    var months = ["January","Februray","March","April","May","June","July","August","September","October","November","December"];
    var dateNatural = new Date(d);
    var year = dateNatural.getFullYear();
    var month = months[dateNatural.getMonth()];
    var day = dateNatural.getDate();
    var answer = month+" "+day+", "+year;
    res.json({unix:d/1000,natural:answer});
  }
  /*var abr = false;
  var month;
  var abrs = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  var months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  for (var i = 0; i < months.length; i++){
    if(date.indexOf(months[i])!=-1){
      month = i+1;
      i = months.length;
    }
  }
  if(month==null||month==undefined){
    for (var i = 0; i < abrs.length; i++){
    if(date.indexOf(abrs[i])!=-1){
      month = i+1;
      abr = true;
      i = abrs.length;
    }
  }
  }
  //console.log(month);
  if(month==null||month==undefined){
    res.json({unix:null,natural:null});
    //res.send();
  }else{
    if(abr){
      date = date.substr(0,date.indexOf(abrs[month-1])) + date.substr(date.indexOf(abrs[month-1])+3,date.length);
    }else{
      date = date.substr(0,date.indexOf(months[month-1])) + date.substr(date.indexOf(months[month-1])+months[month-1].length,date.length);
    }
    var temp = "";
    //console.log(date.substr(1,3));
    for (var i = 0; i < date.length; i++){
      if(date.substr(i,1)!=","&&date.substr(i,1)!=" "){
        temp += date.substr(i,1);
        //console.log(date.substr(i,i+1));
      }
    }
    console.log(temp);
    var day = parseInt(temp.substr(0,2));
    var year = parseInt(temp.substr(2,temp.length));
    if(day>31){
      day = parseInt(temp.substr(0,1));
      year = parseInt(temp.substr(1,temp.length));
    }
    if(day>31||day<1){
      res.json({unix:null,natural:null});
    }else if (year>2038){
      res.json({unix:null,natural:null,note:'Unix will end by 2038 as it will exceed 32-bit Integer max :)'});
    }else{
      var d = Date.parse("12 Ma 2017");
      console.log(d);
    res.json({natural:months[month-1]+" "+day+" "+year});
    }*/
    //date = parseInt(date);
    //res.send();
  //}
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.get('/', function(request, response) {
  response.render('index.html');
});
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);