/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

var TODOS_FILE = path.join(__dirname, 'todos.json');

app.set('port', (process.env.PORT || 8000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/todos', function (req, res) {
  fs.readFile(TODOS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/todos/:id', function (req, res) {
  fs.readFile(TODOS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var todos = JSON.parse(data);
    var todo = todos.find(function (elem) {
      return elem.id == req.params.id;
    });
    res.json(todo);
  });
});

app.post('/api/todos', function (req, res) {
  fs.readFile(TODOS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var todos = JSON.parse(data);
    var todo = {
      id:        Date.now(),
      text:      req.body.text,
      completed: false
    };
    todos.push(todo);
    fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 4), function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(todos);
    });
  });
});

app.route('/api/todos/:id')
    .put(function (req, res) {
      fs.readFile(TODOS_FILE, function (err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        var todos = JSON.parse(data);
        var todo = todos.find(function (elem) {
          return elem.id == req.params.id;
        });
        var todoIndex = todos.indexOf(todo);
        var newTodo = Object.assign({}, todo, req.body.todo);

        todos = todos.splice(todoIndex, 1, newTodo);
        fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 4), function (err) {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          res.json(todos);
        });
      });
    })
    .delete(function (req, res) {
      fs.readFile(TODOS_FILE, function (err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        var todos = JSON.parse(data);
        var todoIndex = todos.findIndex(function (elem) {
          return elem.id == req.params.id;
        });

        todos.splice(todoIndex, 1);
        fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 4), function (err) {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          res.json(todos);
        });
      });
    });

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});