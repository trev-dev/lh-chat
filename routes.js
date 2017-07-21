module.exports = function(app, recent) {


    app.get('/', function(req, res){

        res.render('chat.pug', {pretty:true});

    });

    app.get('/recents', function(req, res){

        res.json(recent.getRecents());

    });


};