var http = require("http");
var fs = require("fs");
var handlebars = require("handlebars");
var introtemplate = fs.readFileSync("templates/intro.html", "utf8");
var steptemplate = fs.readFileSync("templates/step.html", "utf8");
var indextemplate = fs.readFileSync("index.html", "utf8");
var mydata = JSON.parse(require('fs').readFileSync('scraper/randomized.json', 'utf8'));

function onRequest(req, res) {
  if (req.url === '/wei') {
    var introduction = {};
    var context = {};

    var introduction = {
      "title": mydata.title,
      "intro": mydata.intro
    }
    var context = {
      "images": mydata.images,
      "part1": mydata.part1,
      "part2": mydata.part2,
      "part3": mydata.part3
    }



  	var introBuilder = handlebars.compile(introtemplate);
  	var introText = introBuilder(introduction);
    var stepBuilder = handlebars.compile(steptemplate);
  	var part1Text = stepBuilder(context.part1);
    var part2Text = stepBuilder(context.part2);
    var part3Text = stepBuilder(context.part3);

    var mainBuilder = handlebars.compile(indextemplate);
    var indexhtml = mainBuilder({
      'intro': introText,
      'part1': part1Text,
      "part2": part2Text,
      'part3': part3Text
    })


  	res.writeHead(200, {"Context-Type": "text/html"});
  	res.write(indexhtml);
  	res.end();
  } else {
    res.writeHead(200, {"Context-Type": "text/html"});
    res.write("wei");
    res.end();

  }
}

http.createServer(onRequest).listen(8000);
console.log("Server has started on port 8000.");
