var app = require("../../app"),
    chai = require("chai"),
    expect = chai.expect,
    cheerio = require("cheerio"),
    request = require("supertest");
describe('News Page', function () {
    var $;
    it('should render correctly', function (done) {
        request(app).get("/news").set('accept','text/html')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end(function(err, res){
                if(err) throw err;
                $ = cheerio.load(res.text);
                done();
            });
    });
    it('should have atleast one news', function (done) {
        expect($('#mainsection>.news-item').length).to.be.above(0);
        done();
    });
    it('should not have any broken image', function (done) {
        expect($('img').attr('src').length).to.be.above(0);
        done();
    });
});