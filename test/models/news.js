/**
 * Created by Sumit Rai on 19-06-2014.
 */
var sinon = require("sinon"),
    expect = require("chai").expect,
    news = require('../../models/news');

describe('News Model', function () {
    var modelMock, stubs;
    before(function(){
        modelMock = {
            findOne: sinon.stub(),
            find: sinon.stub(),
            limit: sinon.stub(),
            exec: sinon.stub()
        };
        modelMock.findOne.yields(null, { title: "Bear living in Chair 6" });
        modelMock.find.returns(modelMock);
        modelMock.limit.returns(modelMock);
        modelMock.exec.yields(null, [
            { title: 'Snowtooth expects a good winter' },
            { title: 'Bear living in Chair 6' },
            { title: "What's with all the hate" },
            { title: 'Be on the lookout crazy looking stuff to ski' }
        ]);
        stubs = Object.keys(modelMock);
        news.injectModel(modelMock);
    });
    after(function(){
        news.resetModel();
    });

    describe('fetch()', function () {
        beforeEach(function(){
            stubs.forEach(function(stub){
                modelMock[stub].reset();
            });
        });
        it('should fetch a single item', function (done) {
            var title = 'Bear living in Chair 6';
            news.fetch(title, function(event){
                expect(event.title).to.equal('Bear living in Chair 6');
                expect(modelMock.findOne.called).to.be.ok;
                expect(modelMock.findOne.calledWith({title: title})).to.be.ok;
            });
            done();
        });
        it('should fetch all news', function (done) {
            news.fetch(function (event) {
                expect(event.length).to.equal(4);
                expect(modelMock.find.called).to.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });
        it('should fetch specific number of news', function (done) {
            news.fetch(2, function (event) {
                expect(event.length).to.equal(4);
                expect(modelMock.find.called).to.be.ok;
                expect(modelMock.limit.calledOn(modelMock)).to.be.ok;
                expect(modelMock.limit.calledWith(2)).to.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });
    });
});
