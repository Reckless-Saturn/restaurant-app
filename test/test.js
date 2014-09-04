var http = require('http');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

var server = require('../server/server.js');
describe('server get requests', function () {
	describe('/', function () {
  	it('should return 200 for a live page', function (done) {
    	http.get('http://localhost:5555', function (res) {
      	assert.equal(200, res.statusCode);
	      done();
  	  });
  	});
  });

  describe('/test', function () {
  	it('should return 404 for dead pages', function (done) {
    	http.get('http://localhost:5555/test', function (res) {
        	assert.equal(404, res.statusCode);
  	      done();
        });
    });
  });

  describe('/test', function () {
    it('should return data for a valid search', function (done) {
        http.get('http://localhost:5555/?find_distance=10&find_priceRange=1&find_partySize=2&find_cuisine=french',
        function (res) {
          assert.equal(200, res.statusCode);
          done();
        });
    });
  });
});

describe('server post requests', function () {
  it('should return 200 for empty posts', function (done) {
    chai.request('http://localhost:5555')
      .post('/')
      .req(function (req) {
        req.send();
      })
      .res(function (res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
