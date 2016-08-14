var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());


app.get('/', function(req, res){
    res.send('Todo API Root');
});

app.get('/todos', function(req, res){
    res.json(todos);
});

app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;
    
    todos.forEach(function(todo){
        if(todoId === todo.id){
            matchedTodo = todo;
        }
    });
    if(matchedTodo){
        res.json(matchedTodo);
    }else{
        res.status(404).send();
    }
    //res.send('Asking for too with id of ' + req.params.id);
});

app.post('/todos', function(req, res) {
    var body = req.body;
    
    body.id = todoNextId++;
    
    todos.push(body);
    
    //console.log('Description: ' + body.description);
    
    res.json(body);
});

app.listen(PORT,function() {
    console.log('Express listening on port ' + PORT + '!');
});