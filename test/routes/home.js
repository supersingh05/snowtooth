/**
 * Created by Sumit Rai on 19-06-2014.
 */
var sinon = require("sinon"),
    expect = require("chai").expect,
    route = require('../../routes/index');

describe('Home Route', function () {
    var responseMock,
        homeMock,
        calendarMock,
        sampleRecords = [
            { "id": "snowtooth" },
            { "id": "snowface" },
            { "id": "bigmountia" }
        ];
    before(function(){
        responseMock = {
            render: sinon.stub(),
            send: sinon.stub()
        };
        homeMock = {
            fetch: sinon.stub()
        };
        homeMock.fetch.yields(sampleRecords);
        route.setModel(homeMock, calendarMock);
    });
    after(function(){
        route.resetModel();
    });
    beforeEach(function(){
        responseMock.render.reset();
        homeMock.fetch.reset();
    });
    describe('renderIndex()', function () {

        it('it should fetch data and render HTML', function (done) {
            route.get.home({},responseMock);
            expect(homeMock.fetch.called, 'Home fetch failed').to.be.ok;
            expect(responseMock.render.calledWith('index',{
                title: "Home Page",
                description: "This is a Home Page",
                data: sampleRecords
            })).to.be.ok;
            done();
        });
    });
});
