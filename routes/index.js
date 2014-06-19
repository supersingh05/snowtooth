var express = require('express'),
    router = express.Router(),
    homeModel = require('../models/home'),
    model = homeModel,
    renderIndex = function (req, res) {
        model.fetch(function (homeData) {
            res.render('index', {
                title: "Home Page",
                description: "This is a Home Page",
                data: homeData
            });
        });

    };
/* GET home page. */
router.get('/', renderIndex);

module.exports = {
    router: router,
    get: {
        home: renderIndex
    },
    setModel: function(m){
        model = m;
    },
    resetModel: function(){
        model = homeModel;
    }
};
