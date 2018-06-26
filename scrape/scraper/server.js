//
// var express = require('express');
// var fs      = require('fs');
// var request = require('request');
// var cheerio = require('cheerio');
// var app     = express();
//
// app.get('/scrape', function(req, res){
//   // Let's scrape Anchorman 2
//   url = 'http://www.wikihow.com/Be-a-Good-Catholic';
//
//   request(url, function(error, response, html){
//     if(!error){
//       var $ = cheerio.load(html);
//
//       var title, intro, rating;
//       var json = { title : "", intro : "", rating : ""};
//
//       $('.firstHeading').filter(function(){
//           var data = $(this);
//           title = data.children().first().text();
//
//           json.title = title;
//       })
//
//       $('.-sitemap-select-item-selected').filter(function(){
//           var data = $(this);
//           intro = data.text();
//           console.log("wei");
//
//           json.intro = "plz";
//       })
//
//       $('.ratingValue').filter(function(){
//         var data = $(this);
//         rating = data.text().trim();
//
//         json.rating = "plz";
//       })
//     }
//
//     fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//       console.log('File successfully written! - Check your project directory for the output.json file');
//     })
//
//     res.send('Check your console!')
//   })
// })
//
// app.listen('8081')
// console.log('Magic happens on port 8081');
// exports = module.exports = app;
var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  // var articles = [
  //   'http://www.wikihow.com/Be-a-Good-Catholic',
  //   'http://www.wikihow.com/Contact-Krishna',
  //   'http://www.wikihow.com/Have-Fun-Being-Naked',
  //   'http://www.wikihow.com/Be-and-Feel-Beautiful-All-the-Time',
  //   'http://www.wikihow.com/Create-a-Models-%27Essentials%27-Kit',
  //   'http://www.wikihow.com/Be-More-Affectionate',
  //   'http://www.wikihow.com/Flirt-with-a-Guy',
  //   'http://www.wikihow.com/Get-Rid-of-a-Cold-Without-Medicine',
  //   'http://www.wikihow.com/Grow-Marigolds',
  //   'http://www.wikihow.com/Change-Your-Name-in-New-Hampshire',
  //   'http://www.wikihow.com/Make-Birria',
  //   'http://www.wikihow.com/Restore-Your-Faith-in-Humanity',
  //   'http://www.wikihow.com/Avoid-People-You-Don%27t-Want-to-Talk-To',
  //   'http://www.wikihow.com/Be-a-Dominatrix',
  //   'http://www.wikihow.com/Choose-a-Loyal-Partner',
  //   'http://www.wikihow.com/End-a-Codependent-Relationship',
  //   'http://www.wikihow.com/Fight-With-Your-Partner-So-You-Both-Win',
  //   'http://www.wikihow.com/Find-a-Good-Man-if-You%27re-Less-Than-Beautiful',
  //   'http://www.wikihow.com/Forget-Lost-Love',
  //   'http://www.wikihow.com/Reverse-Insulin-Resistance',
  //   'http://www.wikihow.com/Be-Self-Employed',
  //   'https://www.wikihow.com/Overseed-a-Lawn',
  //   'https://www.wikihow.com/Grow-Copepods',
  //   'http://www.wikihow.com/Clean-Drinking-Glasses',
  //   'http://www.wikihow.com/Do-a-Quick-and-Easy-Meditation',
  //   'http://www.wikihow.com/Improve-Your-Singing-Voice',
  //   'http://www.wikihow.com/Tell-if-Bread-Is-100-Percent-Whole-Wheat',
  //   'http://www.wikihow.com/Replace-a-Toilet-Handle',
  //   'http://www.wikihow.com/Be-a-Good-Brother',
  //   'http://www.wikihow.com/Kill-Cockroaches-or-Ants-Without-Pesticide',
  //   'http://www.wikihow.com/Clone-Plants',
  //   'http://www.wikihow.com/Use-Cement-Additives',
  //   'http://www.wikihow.com/Understand-Your-Rabbit',
  //   'http://www.wikihow.com/Care-for-a-Christmas-Cactus',
  //   'http://www.wikihow.com/Season-a-Cast-Iron-Skillet',
  //   'http://www.wikihow.com/Take-Care-of-an-Overheated-Guinea-Pig',
  //   'http://www.wikihow.com/Disarm-Someone-With-a-Knife',
  //   'http://www.wikihow.com/Exercise-Your-Rabbit',
  //   'http://www.wikihow.com/Improve-Your-Memory-With-Hypnosis',
  //   'http://www.wikihow.com/Keep-Your-Room-Clean',
  //   'http://www.wikihow.com/Grow-Lisianthus',
  //   'http://www.wikihow.com/Make-a-Simple-Electric-Generator',
  //   'http://www.wikihow.com/Write-a-Prologue-for-Your-Novel',
  //   'http://www.wikihow.com/Be-Selfless',
  //   'http://www.wikihow.com/Calculate-a-Down-Payment-for-a-Car',
  //   'http://www.wikihow.com/Write-a-Family-History',
  //   'http://www.wikihow.com/Respect-Your-Partner',
  //   'http://www.wikihow.com/Apply-Makeup-for-Beginners',
  //   'http://www.wikihow.com/Get-Taller-by-Stretching',
  //   'http://www.wikihow.com/Make-a-Paper-Carnation',
  //   'http://www.wikihow.com/Cope-With-Feelings-of-Love-for-the-Wrong-Person-at-the-Wrong-Time',
  //   'http://www.wikihow.com/Eavesdrop',
  //   'http://www.wikihow.com/Get-Through-Tough-Times',
  //   'http://www.wikihow.com/Grow-Green-Onions',
  //   'http://www.wikihow.com/Buy-a-Jockstrap',
  //   'http://www.wikihow.com/Bathe-a-Leopard-Gecko',
  //   'http://www.wikihow.com/Keep-a-Bored-Indoor-Cat-Entertained-While-You%27re-Not-at-Home',
  //   'http://www.wikihow.com/Fix-Nicotine-Stained-Fingers',
  //   'http://www.wikihow.com/Not-Be-Lazy',
  //   'http://www.wikihow.com/Figure-Cost-Per-Square-Inch-of-Pizza',
  //   'http://www.wikihow.com/Find-Out-Whether-a-Girl-Loves-You-or-Is-Just-Being-a-Good-Friend',
  //   'http://www.wikihow.com/Have-a-Sleepover-(Young-Girls)',
  //   'http://www.wikihow.com/Preserve-Beetroot',
  //   'http://www.wikihow.com/Do-the-Billie-Jean-Dance',
  //   'http://www.wikihow.com/Disinfect-Earplugs',
  //   'http://www.wikihow.com/Avoid-Injury-(Massage-Therapists)',
  //   'http://www.wikihow.com/Act-Toward-Someone-with-Dissociative-Identity-Disorder',
  //   'http://www.wikihow.com/Spool-New-Fishing-Line-Onto-a-Reel',
  //   'http://www.wikihow.com/Get-Skinny-Legs-Quick',
  //   'http://www.wikihow.com/Keep-Your-Wife-Happy',
  //   'http://www.wikihow.com/Unclog-a-Slow-Shower-Drain',
  //   'http://www.wikihow.com/Change-an-Outdoor-Cat-Into-an-Indoor-Cat',
  //   'http://www.wikihow.com/Use-Self-Hypnosis-to-Quit-Smoking',
  //   'http://www.wikihow.com/Make-Goat-Milk-Lotion',
  //   'http://www.wikihow.com/Learn-English-Faster',
  //   'http://www.wikihow.com/Give-Your-Wife-a-Backrub',
  //   'http://www.wikihow.com/Cure-Dehydration-at-Home',
  //   'http://www.wikihow.com/Control-Arthritis-Pain-in-Dogs',
  //   'http://www.wikihow.com/Run-a-4X100-Relay',
  //   'http://www.wikihow.com/Resist-Naughty-Food-Cravings',
  //   'http://www.wikihow.com/Remove-Facial-Wrinkles-with-Fruit',
  //   'http://www.wikihow.com/Build-a-Positive-Thinking-Mindset',
  //   'http://www.wikihow.com/Save-Money-as-a-Kid',
  //   'http://www.wikihow.com/Get-Rid-of-a-Savior-Complex',
  //   'http://www.wikihow.com/Felt-a-Pool-Table',
  //   'http://www.wikihow.com/Start-a-Maid-Service',
  //   'http://www.wikihow.com/Be-the-Only-Single-One-in-the-Group',
  //
  // ]

  var json = {};
  var images = [];
  var done = false;
  // var n = articles.length;
  var n = 80;
  console.log(n);

  for (var j = 0; j < n; j ++) {
    url = "http://www.wikihow.com/Special:Randomizer";

    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);

        var title, intro, steps;
        var contents = {intro : "", steps : []};
        var images = [];

        $('.firstHeading').filter(function(){
            var data = $(this);
            title = data.children().first().text();
            console.log(title);
        })

        $('div div div div div div div.section p:nth-of-type(2)').filter(function(){
            var data = $(this);
            intro = data.text();

            contents.intro = intro;
        })
        $('li.hasimage img').each(function(i) {
          var data = $(this);
          img = data.attr('data-src');
          if (img) {
            images.push(img);
          }


        })

        $('div.step').each(function(i){
          var data = $(this);
          step = data.text().trim();

          contents.steps[i] = step;
        })
        json[title] = contents;
        json[title]['images'] = images;
        if (Object.keys(json).length == n) {

          done = true;
          console.log("DONE")
        }
        if (done) {
          fs.writeFile('output7.json', JSON.stringify({"stories":json}, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');
          })

          res.send('Check your console!')
        }
      }
    })
  }

})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
