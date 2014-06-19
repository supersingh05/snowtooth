var app = require("../../app"),
    chai = require("chai"),
    expect = chai.expect,
    cheerio = require("cheerio"),
    request = require("supertest");
describe('Home Page', function () {
    var $;
    it('should render correctly', function (done) {
        request(app).get("/").set('accept','text/html')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end(function(err, res){
                if(err) throw err;
                $ = cheerio.load(res.text);
                done();
            });
    });
    it('should have atleast one marketing box', function (done) {
        expect($('#mainsection>div').length).to.be.above(0);
        done();
    });
    it('should not have any broken image', function (done) {
        expect($('img').attr('src').length).to.be.above(0);
        done();
    });
});