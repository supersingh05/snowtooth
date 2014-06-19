/**
 * Created by Sumit Rai on 19-06-2014.
 */
var sinon = require("sinon"),
    expect = require("chai").expect,
    calendar = require('../../models/calendar');

describe('Calendar Model', function () {
    var modelMock, stubs;
    before(function(){
        modelMock = {
            findOne: sinon.stub(),
            find: sinon.stub(),
            limit: sinon.stub(),
            sort: sinon.stub(),
            exec: sinon.stub()
        };
        modelMock.findOne.yields(null, { title: 'Snow Face Concert' });
        modelMock.find.returns(modelMock);
        modelMock.sort.returns(modelMock);
        modelMock.limit.returns(modelMock);
        modelMock.exec.yields(null, [
            { title: 'Snow Face Concert' },
            { title: 'Skier Party' },
            { title: 'Snow Face Fun Day' },
            { title: 'Employee Party' }
        ]);
        stubs = Object.keys(modelMock);
        calendar.injectModel(modelMock);
    });
    after(function(){
        calendar.resetModel();
    });

    describe('fetch()', function () {
        beforeEach(function(){
            stubs.forEach(function(stub){
                modelMock[stub].reset();
            });
        });
        it('should fetch a single event', function (done) {
            var title = 'Snow Face Concert';
            calendar.fetch(title, function(event){
                expect(event.title).to.equal('Snow Face Concert');
                expect(modelMock.findOne.called).to.be.ok;
                expect(modelMock.findOne.calledWith({title: title})).to.be.ok;
            });
            done();
        });
        it('should fetch all events', function (done) {
            calendar.fetch(function (event) {
                expect(event.length).to.equal(4);
                expect(modelMock.find.called).to.be.ok;
                expect(modelMock.sort.calledOn(modelMock)).to.be.ok;
                expect(modelMock.sort.calledWith({ 'start': 1 })).to.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });
        it('should fetch specific number of events', function (done) {
            calendar.fetch(2, function (event) {
                expect(event.length).to.equal(4);
                expect(modelMock.find.called).to.be.ok;
                expect(modelMock.sort.calledOn(modelMock)).to.be.ok;
                expect(modelMock.sort.calledWith({ 'start': 1 })).to.be.ok;
                expect(modelMock.limit.calledOn(modelMock)).to.be.ok;
                expect(modelMock.limit.calledWith(2)).to.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });
    });
});
