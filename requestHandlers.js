var querystring = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

function start(response) {
  console.log("Request handler start called");

  var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" '+
      'content="text/html; charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/upload" enctype="multipart/form-data" '+
      'method="post">'+
      '<input type="file" name="upload">'+
      '<input type="submit" value="Upload file" />'+
      '</form>'+
      '</body>'+
      '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler upload called");
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files){
    console.log("parsing done");
    fs.rename(files.upload.path, "tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Received image: <br/>");
    response.write("<img src=\"/show\"/>");
    response.end();
  });
}

function show(response) {
  console.log("Request handler show called");
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("tmp/test.png").pipe(response);
}

exports.upload = upload;
exports.start = start;
exports.show = show;
