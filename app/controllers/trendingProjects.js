var express = require('express');
var curl = require("curlrequest");
var obj = require("../config/constants");
const axios = require('axios');
const https = require('https');

var trendingProjects = {};

trendingProjects.show = function(req, res, next){

	 //let propertyApiUrl = API_URL+'/99mobapi/v0'+{map}+API_TOKEN+:id+?rtype=json&
	var propertyApiUrl = obj.API_URL + '/99mobapi/v0/trendingprojects/' + obj.API_TOKEN +'/R/'+ req.params.id + '?rtype=json';
	//https://pwa.infoedge.com/99mobapi/v0/propertyDetail/qwerty/G30244743?rtype=json&
	//https://pwa.infoedge.com/99mobapi/v0/trendingprojects/qwerty/R/Z34785527?rtype=json

	var options={
		url: propertyApiUrl,
		method:'GET',
		responseType:'json',
		httpsAgent: new https.Agent({ rejectUnauthorized: false })
	};
	axios(options).then(function(response){
		res.send(response.data);
		}).catch(function(err){
			console.log(err);
		});
};

module.exports = trendingProjects;
