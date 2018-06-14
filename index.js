// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');

var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');

// Routes begin here

// | GET | /games | index | display a list of all games |
app.get('/games', function(req, res) {
      var fileContents = fs.readFileSync('./games.json');
      var games = JSON.parse(fileContents);
      res.render('index', {games: games, id: req.params.name});
});

// | GET | /games/new | new | return an HTML form for creating a new game |
app.get('/games/new', function(req, res) {
      res.render('new');
  });


// | POST | /games | create | create a new game (using form data from /games/new) |

app.post('/games', function(req, res) {
    var games = fs.readFileSync('./games.json');
    games = JSON.parse(games);
    games.push({name: req.body.name, description: req.body.description});
    fs.writeFileSync('./games.json', JSON.stringify(games));
    res.redirect('/games');
});


// | GET | /games/:name | show | display a specific game |

app.get("/games/:name", function(req, res) {
  // returns one game
  var games = fs.readFileSync("games.json");
  games = JSON.parse(games);
  var name = req.params.name;
    res.render('show', {game: games[req.params.name]});
  });

// | GET | /games/:name/edit | edit | return an HTML form for editing a game |

app.get('/games/:name/edit', function(req, res) {
  var games = fs.readFileSync("games.json");
games = JSON.parse(games);
res.render('edit', {game: games[req.params.name], id: req.params.name});
  });


// | PUT | /games/:name | update | update a specific game (using form data from /games/:name/edit) |

app.put("/games/:name", function(req, res) {
  // returns all rappers
  var Games = fs.readFileSync("games.json");
  games = JSON.parse(games);
  var gameIndex = req.params.name;
  var gameName = req.body.name;
  var gameDesc = req.body.description;
  if (mcIndex >= mcs.length) {
    res.send('error');
  } else {
  games.splice(mcIndex, 1, {name: gameName, albums: gameDesc} );
  fs.writeFileSync("./games.json", JSON.stringify(games));
  res.json(games);
}
});


// | DELETE | /games/:name | destroy | deletes a specific game |

app.delete("/games/:name", function(req, res) {
  // deletes a game
  var games = fs.readFileSync("./games.json");
  games = JSON.parse(games);
  games.splice(req.params.name, 1);
  fs.writeFileSync("./games.json", JSON.stringify(games));
  res.json('games');
});



// helper functions

// Read list of games from file.
function getGames() {
    var fileContents = fs.readFileSync('./games.json'); // :'(
    var games = JSON.parse(fileContents);
    return games;
}

// Write list of games to file.
function saveGames(games) {
    fs.writeFileSync('./games.json', JSON.stringify(games));
}

// remove null values from JSON function?

// start the server
var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
