var express = require('express'),
    router = express.Router(),
    calendarModel = require('../models/calendar'),
    model = calendarModel,
    renderCalendar = function(req, res) {
        model.fetch(function (calendarData) {
            if (req.ajax) {
                    res.status = 200;
                    res.send(calendarData);
            } else {
                res.render('calendar', {
                    title: "Calendar",
                    description: "This is a calendar",
                    data: calendarData
                });
            }
        });

    },
    renderEvent = function(req, res) {
        model.fetch(req.params.title.replace(/-/g, ' '), function (calendarData) {
            if (req.ajax) {
                res.status = 200;
                res.send(calendarData);
            } else {
                res.render('event', calendarData);
            }
        });
    };

/* GET calendar page. */
router.get('/', renderCalendar);
router.get('/:title', renderEvent);

module.exports = {
    router: router,
    get: {
        calendar: renderCalendar,
        event: renderEvent
    },
    setModel: function(m){
        model = m;
    },
    resetModel: function(){
        model = calendarModel;
    }
};
