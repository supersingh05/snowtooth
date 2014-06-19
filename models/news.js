/**
 * Created by Sumit Rai on 18-06-2014.
 */
var mongoose = require('mongoose');

var calendarSchema = mongoose.Schema({
    title: String,
    img: String,
    description: String,
    content: String,
    author: String,
    date: String
});

var dbModel = mongoose.model('news', calendarSchema, 'news');
var model = dbModel;

module.exports = {
    injectModel: function(m){
        model = m;
    },
    resetModel: function(){
        model = dbModel;
    },
    fetch: function (done) {

        var count,
            title,
            done;

        if (typeof arguments[0] == "string") {
            title = arguments[0];
            done = arguments[1]
        } else if (typeof arguments[0] == "number") {
            count = arguments[0];
            done = arguments[1];
        } else if (typeof arguments[0] == "function") {
            done = arguments[0];
        }

        if (title) {

            model.findOne({ 'title': title }, function (err, news) {
                if (err) throw err;
                done(news);
            });

        } else if (count) {

            model.find().limit(count).exec(function (err, news) {
                if (err) throw err;
                done(news);
            });

        } else {

            model.find().exec(function (err, news) {
                if (err) throw err;
                done(news);
            });

        }

    }
};
