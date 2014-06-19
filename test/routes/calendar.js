/**
 * Created by Sumit Rai on 19-06-2014.
 */
var sinon = require("sinon"),
    expect = require("chai").expect,
    route = require('../../routes/calendar');

describe('Calendar Route', function () {
    var responseMock, calendarMock, sampleEvents = [
        { title: 'Snow Face Concert' },
        { title: 'Skier Party' },
        { title: 'Snow Face Fun Day' },
        { title: 'Employee Party' }
    ];
    before(function(){
        responseMock = {
            render: sinon.stub(),
            send: sinon.stub()
        };
        calendarMock = {
            fetch: sinon.stub()
        };
        calendarMock.fetch.yields(sampleEvents);
        route.setModel(calendarMock);
    });
    after(function(){
        route.resetModel();
    });
    beforeEach(function(){
        responseMock.render.reset();
        calendarMock.fetch.reset();
    });
    describe('renderCalendar()', function () {

        it('it should fetch data and render HTML', function (done) {
            route.get.calendar({},responseMock);
            expect(calendarMock.fetch.called).to.be.ok;
            expect(responseMock.render.calledWith('calendar',{
                title: "Calendar",
                description: "This is a calendar",
                data: sampleEvents
            })).to.be.ok;
            done();
        });
    });
    describe('renderEvent()', function () {
        var req;
        before(function(){
            req = {
                params: {
                    title: "Snow Face Concert"
                }
            };
            calendarMock.fetch.yields({ title: 'Snow Face Concert' });
        });
        it('it should fetch data and render HTML', function (done) {
            route.get.event(req,responseMock);
            expect(calendarMock.fetch.called).to.be.ok;
            expect(calendarMock.fetch.calledWith("Snow Face Concert")).to.be.ok;
            expect(responseMock.render.calledWith('event',{ title: 'Snow Face Concert' })).to.be.ok;
            done();
        });
    });
});
