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
      request('http://localhost:5555/login?username=armando', function(err, response, body) {
        var data = JSON.parse(response.body)[0];
        assert.equal(200, response.statusCode);
        assert.equal(1, data.customerID);
        done();
      });
    });

    it('should return 200 for logging in successfully - restaurant', function (done) {
      request('http://localhost:5555/login?username=a', function(err, response, body) {
        var data = JSON.parse(response.body)[0];
        assert.equal(200, response.statusCode);
        assert.equal(1, data.restaurantID);
        done();
      });
    });

    it('should return 204 for an unsuccessful login', function (done) {
      request('http://localhost:5555/login?username=z', function(err, response, body) {
        assert.equal(204, response.statusCode);
        done();
      });
    });
  });

  describe('/customer/search-criteria - GET', function () {
    it('should return data for restaurants near hack reactor', function (done) {
      request('http://localhost:5555/customer/search-criteria?find_distance=10&find_priceRange=4&find_partySize=2&find_cuisine=american&customerLoc=37.783548,-122.408953', function(err, response, body) {
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
        method: 'post',
        body: {username: 'armando'},
        json: true,
        url: 'http://localhost:5555/customer/signup'
      }
      request(options, function (err, response, body) {
        assert.equal(409, response.statusCode);
        assert.equal("Username or email already in use", response.body);
        done();
      });
    });
  });

  // d: change restaurantName to username
  describe('/restaurant/signup - POST', function() {
    it('should return 409 when trying to insert a restaurant that already exists', function(done) {
      var options = {
        method: 'post',
        body: {
          username: 'p',
          lat: 1,
          long: 1,
          priceRange: 1
        },
        json: true,
        url: 'http://localhost:5555/restaurant/signup'
      }
      request(options, function (err, response, body) {
        assert.equal(409, response.statusCode);
        assert.equal("Username or email already in use", response.body);
        done();
      });
    });
  });

  describe('/test - GET', function () {
  	it('should return 404 for dead pages', function (done) {
      request('http://localhost:5555/test', function(err, response, body) {
        assert.equal(404, response.statusCode);
      });
      request('http://localhost:5555/login', function(err, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
      // request('http://localhost:5555/customer/signup', function(err, response, body) {
      //   assert.equal(404, response.statusCode);
      // });

      // var options = {
      //   method: 'post',
      //   json: true,
      //   url: 'http://localhost:5555/customer/signup'
      // }
      // request(options, function (err, response, body) {
      //   assert.equal(404, response.statusCode);
      //   done();
      // })
    });
  });

  describe('/?', function () {
    it('should return data for a valid search', function (done) {
        http.get('http://localhost:5555/?find_distance=10&find_priceRange=1&find_partySize=2&find_cuisine=french',

        // request('http://localhost:5555/login?username=z', function(err, response, body) {
        //   assert.equal(204, response.statusCode);
        //   done();
        // });
        function (response) {
          assert.equal(200, response.statusCode);
          done();
        });
    });
  });
});


// edge cases:
//  posts have no data

/*
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
*/
