module.exports = function(app) {


    app.get('/', function(req, res){

        res.render('chat.pug', {pretty:true});

    });


}