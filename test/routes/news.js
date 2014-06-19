/**
 * Created by Sumit Rai on 19-06-2014.
 */
var sinon = require("sinon"),
    expect = require("chai").expect,
    route = require('../../routes/news');

describe('News Route', function () {
    var responseMock, newsMock, sampleEvents = [
        { title: 'Snowtooth expects a good winter' },
        { title: 'Bear living in Chair 6' },
        { title: "What's with all the hate" },
        { title: 'Be on the lookout crazy looking stuff to ski' }
    ];
    before(function(){
        responseMock = {
            render: sinon.stub(),
            send: sinon.stub()
        };
        newsMock = {
            fetch: sinon.stub()
        };
        newsMock.fetch.yields(sampleEvents);
        route.setModel(newsMock);
    });
    after(function(){
        route.resetModel();
    });
    beforeEach(function(){
        responseMock.render.reset();
        newsMock.fetch.reset();
    });
    describe('renderNews()', function () {

        it('it should fetch data and render HTML', function (done) {
            route.get.news({},responseMock);
            expect(newsMock.fetch.called).to.be.ok;
            expect(responseMock.render.calledWith('news',{
                title: "Snowtooth News",
                description: "News all around from the world about Snowtooth",
                data: sampleEvents
            })).to.be.ok;
            done();
        });
    });
    describe('renderNewsItem()', function () {
        var req;
        before(function(){
            req = {
                params: {
                    title: "Bear living in Chair 6"
                }
            };
            newsMock.fetch.yields({ title: 'Bear living in Chair 6' });
        });
        it('it should fetch data and render HTML', function (done) {
            route.get.item(req,responseMock);
            expect(newsMock.fetch.called).to.be.ok;
            expect(newsMock.fetch.calledWith("Bear living in Chair 6")).to.be.ok;
            expect(responseMock.render.calledWith('article',{ title: 'Bear living in Chair 6' })).to.be.ok;
            done();
        });
    });
});
