var express = require("express");
var fs = require("fs");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
  res.send("hello it is my first express application");
});
app.get('/about', function(req, res) {
  res.send("This is basic express application");
});

app.get('/users/:userId/books/:bookId', function(req, res) {
  res.send(req.params);
});
app.get('/GetStudents', function(req, res) {
  fs.readFile(__dirname + "/Student.json", 'utf8', function(err, data) {
    res.json({
      status: true,
      Status_Code: 200,
      requested_at: new Date(),
      requrl: req.url,
      request_Method: req.method,
      studentdata: JSON.parse(data)
    });
  });
});
app.get('/GetStudentid/:id', (req, res) => {
  fs.readFile(__dirname + "/Student.json", 'utf8', function(err, data) {
    var students = JSON.parse(data);
    var student = students["Student" + req.params.id];
    if (student)
      res.json(student);
    else
      res.json({ status: false, message: "Student not found" });
  });
});
app.get('/studentinfo', function(req, res) {
  res.sendFile('StudentInfo.html', { root: __dirname });
});
app.post('/submit-data', function(req, res) {
  var name = req.body.firstName + ' ' + req.body.lastName;
  var Age = req.body.myAge + ' Gender: ' + req.body.gender;
  var Qual = ' Qualification: ' + req.body.Qual;

  res.send({
    status: true,
    message: 'form Details',
    data: {
      name: name,
      age: Age,
      Qualification: Qual
    }
  });
});
app.listen(5000, function() {
  console.log("server is running on port 5000");
});
