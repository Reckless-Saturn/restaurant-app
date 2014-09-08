var http = require('http');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var request = require('request');

chai.use(chaiHttp);

var server = require('../server/server.js');
describe('server', function () {

  describe('/ - OPTIONS', function() {
    it('should return 200 for an Options request', function(done) {
      request({
        method: 'OPTIONS',
        uri: 'http://localhost:5555'
      },
      function(err, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });

  describe('/login - GET', function () {
    it('should return 200 for logging in successfully - diner', function (done) {
      request.get('http://localhost:5555/login?username=armando', function(err, response, body) {
        var data = JSON.parse(response.body)[0];
        assert.equal(200, response.statusCode);
        assert.equal(1, data.customerID);
        done();
      });
    });

    it('should return 200 for logging in successfully - restaurant', function (done) {
      request.get('http://localhost:5555/login?username=a', function(err, response, body) {
        var data = JSON.parse(response.body)[0];
        assert.equal(200, response.statusCode);
        assert.equal(1, data.restaurantID);
        done();
      });
    });

    it('should return 204 for an unsuccessful login', function (done) {
      request.get('http://localhost:5555/login?username=z', function(err, response, body) {
        assert.equal(204, response.statusCode);
        done();
      });
    });
  });

  describe('/customer/search-criteria - GET', function () {
    it('should return data for restaurants near hack reactor', function (done) {
      request.get('http://localhost:5555/customer/search-criteria?find_distance=10&find_priceRange=4&find_partySize=2&find_cuisine=american&customerLoc=37.783548,-122.408953', function(err, response, body) {
        var data = JSON.parse(response.body)[0];
        assert.equal(200, response.statusCode);
        expect(data.restaurantName).to.not.be.undefined;
        done();
      });

    });
  });

  describe('/customer/signup - POST', function() {
    it('should return 409 when trying to insert a user that already exists', function(done) {
      var options = {
        body: {username: 'armando'},
        json: true,
        url: 'http://localhost:5555/customer/signup'
      }
      request.post(options, function (err, response, body) {
        assert.equal(409, response.statusCode);
        assert.equal("Username or email already in use", response.body);
        done();
      });
    });
  });

  describe('/restaurant/signup - POST', function() {
    it('should return 409 when trying to insert a restaurant that already exists', function(done) {
      var options = {
        body: {
          username: 'p',
          lat: 1,
          long: 1,
          priceRange: 1
        },
        json: true,
        url: 'http://localhost:5555/restaurant/signup'
      }
      request.post(options, function (err, response, body) {
        assert.equal(409, response.statusCode);
        assert.equal("Username or email already in use", response.body);
        done();
      });
    });
  });

  describe('404', function () {
    it('should return 404 for dead pages', function (done) {
      request.get('http://localhost:5555/test', function(err, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });

    it('should return 404 for empty requests', function (done) {
      request.get('http://localhost:5555/login', function(err, response, body) {
        assert.equal(404, response.statusCode);
      });

      request.post('http://localhost:5555/customer/signup', function (err, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });

    it('should return 404 for requests using the wrong protocol', function (done) {
      var options = {
        body: {username: 'armando'},
        json: true,
        url: 'http://localhost:5555/login'
      }
      request.post(options, function(err, response, body) {
        assert.equal(404, response.statusCode);
      });

      request.get('http://localhost:5555/customer/signup?username=p&lat=1&long=1&priceRange=1', function(err, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
  });
});
