var express = require('express'),
    router = express.Router(),
    newsModel = require('../models/news'),
    model = newsModel,
    renderNews = function(req, res) {
        model.fetch(function (newsData) {
            if (req.ajax) {
                res.status = 200;
                res.send(newsData);
            } else {
                res.render('news',  {
                    title: "Snowtooth News",
                    description: "News all around from the world about Snowtooth",
                    data: newsData
                });
            }
        });
    },
    renderNewsItem = function(req, res) {
        model.fetch(req.params.title.replace(/-/g, ' '), function (newsData) {
            if (req.ajax) {
                res.status = 200;
                res.send(newsData);
            } else {
                res.render('article', newsData);
            }
        });
    };

/* GET calendar page. */
router.get('/', renderNews);
router.get('/:title', renderNewsItem);

module.exports = {
    router: router,
    get: {
        news: renderNews,
        item: renderNewsItem
    },
    setModel: function(m){
        model = m;
    },
    resetModel: function(){
        model = newsModel;
    }
};
