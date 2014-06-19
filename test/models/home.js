/**
 * Created by Sumit Rai on 19-06-2014.
 */
var sinon = require("sinon"),
    expect = require("chai").expect,
    home = require('../../models/home');

describe('Home Model', function () {
    var modelMock, stubs;
    before(function(){
        modelMock = {
            findOne: sinon.stub(),
            find: sinon.stub(),
            limit: sinon.stub(),
            exec: sinon.stub()
        };
        modelMock.findOne.yields(null, { "id": "snowtooth"});
        modelMock.find.returns(modelMock);
        modelMock.limit.returns(modelMock);
        modelMock.exec.yields(null, [
            { "id": "snowtooth" },
            { "id": "snowface" },
            { "id": "bigmountia" }
        ]);
        stubs = Object.keys(modelMock);
        home.injectModel(modelMock);
    });
    after(function(){
        home.resetModel();
    });

    describe('fetch()', function () {
        beforeEach(function(){
            stubs.forEach(function(stub){
                modelMock[stub].reset();
            });
        });
        it('should fetch a single record', function (done) {
            var id = 'snowtooth';
            home.fetch(id, function(event){
                expect(event.id).to.equal('snowtooth');
                expect(modelMock.findOne.called).to.be.ok;
                expect(modelMock.findOne.calledWith({id: id})).to.be.ok;
            });
            done();
        });
        it('should fetch all records', function (done) {
            home.fetch(function (event) {
                expect(event.length).to.equal(3);
                expect(modelMock.find.called).to.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });
        it('should fetch specific number of records', function (done) {
            home.fetch(2, function (event) {
                expect(event.length).to.equal(3);
                expect(modelMock.find.called).to.be.ok;
                expect(modelMock.limit.calledOn(modelMock)).to.be.ok;
                expect(modelMock.limit.calledWith(2)).to.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });
    });
});
