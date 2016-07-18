var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    app = express();

MongoClient.connect('mongodb://localhost:27017/crudapp', function(err, db){
   "use strict";
    if(err) throw err;

    var dbCollection = db.collection('avtodor');

    app.use(express.static('public'));

    app.set('views', './views');
    app.set('views engine', 'jade');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/getaccident', function(req, res){
        var query = {};
        dbCollection.find(query).toArray(function(err, docs) {
            if(err) throw err;
            res.json(docs);
        });
    });

    app.post('/save', function(req, res) {
        var newAccident = req.body;
        dbCollection.insert({
            'address':newAccident.address,
            'type':newAccident.type,
            'status':newAccident.status,
            'photo':newAccident.photo
        }, function(err, inserted){
            if(err) throw err;
            res.send(
                (err === null) ? {msg: ''} : {msg: err}
            );
        });
    });

    app.delete('/delete/:id', function(req, res){
        var itemForDeleting = req.params.id;
        dbCollection.remove({_id: ObjectID(itemForDeleting)}, function(err){
            res.send(
                (err === null) ? {msg: ''} : {msg: err}
            );
        });
    });

   app.post('/update/:id', function(req,res){
       var itemForUpdating = req.params.id;
        dbCollection.update({_id:ObjectID(itemForUpdating)},
            {'address':req.body.address,
                'type':req.body.type,
                'status':req.body.status,
                'photo':req.body.photo
            },function(err){
                res.send(
                    (err === null) ? {msg: ''} : {msg: err}
                );
            });
    });

    app.listen(8083);
    console.log('App server listening on port 8083');
});
