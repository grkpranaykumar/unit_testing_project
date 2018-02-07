var chai = require('chai');
chai.use(require('chai-match'));
chai.use(require('chai-http'));
const expect = chai.expect;
const should = chai.should();
const nock = require('nock');
const fs = require('fs');
const _=require('lodash');

const utils = require('../app/config/utils');
const obj = require("../app/config/constants");
const propertyController = require('../app/controllers/propertyController');
//const apiRouter = require('../app/api')
const request = require('supertest')(obj.API_URL + '/99mobapi/v0');

describe('TestCase for Utility functions',function() {
  it('it should build proper API call url',()=>{
    expect(utils.buildUrl()).to.equal('https://pwa.infoedge.com/99mobapi/v0/propertyDetail/qwerty/000000000?rtype=json&');
  });

  it('it should build proper API call url with given ID', function() {
      expect(utils.buildUrl('G30244743')).to.equal('https://pwa.infoedge.com/99mobapi/v0/propertyDetail/qwerty/G30244743?rtype=json&')
  });

  it('it should check for correct ID', function() {
      expect(utils.checkforId('G30244743')).to.equal(true)
  });

  it('it should check for incorrect ID', function() {
      expect(utils.checkforId('7-=d92di')).to.equal(false)
  });

});


describe('TestCase for PropertyContoller returning Callback',function(){

  it('apiRequest should return a promise',function(done){
      var testPromise = new Promise(function(resolve, reject) {
        // test with dummy ID
        propertyController.apiRequest('G30244743')
          .then(function(data) {
              resolve(data)
          }, function(err) {
              reject(err)
          })
      });
      testPromise.then(function(result) {
          try {
              expect(result).to.not.be.undefined;
              expect(result.status).to.equal(200);
              done();
          } catch (err) {
              done(err);
          }
      }, done);
  });

  var id='G30244743';
  it("fetchById is returning callBack",function(done){
    _.isObject(propertyController.fetchById).should.be.true;
    propertyController.fetchById(id,function(res){
      chai.assert.isObject(res);
      done();
    });
  });

});

describe('Testcase for routes',function(){
  it("should get JSON response",function(done){

      // var contents = fs.readFileSync('./temp/propDetailResponse.json');
      // var jsonContent = JSON.parse(contents);
      //nock(obj.API_URL + '/99mobapi/v0').get('/propertyController/'+obj.API_TOKEN+'/G30244743'+'?rtype=json&').reply(200, jsonContent);

      nock(obj.API_URL + '/99mobapi/v0').get('/propertyDetail/'+obj.API_TOKEN+'/G30244743'+'?rtype=json&').replyWithFile(200,'./app/temp/propDetailResponse.json', { 'Content-Type': 'application/json' });

      request.get('/propertyDetail/'+obj.API_TOKEN+'/G30244743'+'?rtype=json&')
      .expect(200)
      .end(function(err,res){
           expect(typeof res).to.equal('object');
           expect(res.body).to.have.property('propGTMInfo');
           done();
      });
  });

  // it.only("should return 200 on success",function(done){
  //   apiRouter.get('',function(req,res){
  //     expect(res.statusCode).to.equal(200);
  //     done();
  //   });
  // });

});
