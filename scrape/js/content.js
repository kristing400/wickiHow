function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'scraper/randomized.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}


var introduction = {};
var context = {};
// Call to function with anonymous callback
loadJSON(function(response) {
// Do Something with the response e.g.
  mydata = JSON.parse(response);
  var introduction = {
    "title": mydata.title,
    "intro": mydata.intro
  }
  var context = {
    "part1": mydata.part1,
    "part2": mydata.part2,
    "part3": mydata.part3
  }

});


var intro = Handlebars.templates.intro(introduction);
var part1 = Handlebars.templates.step(context.part1);
var part2 = Handlebars.templates.step(context.part2);
var part3 = Handlebars.templates.step(context.part3);

$(function() {
  $("#intro").html(intro);
  $("#part1").html(part1);
  $("#part2").html(part2);
  $("#part3").html(part3);
});
