const express = require('express');
const obj = require("../config/constants");
const utils = require('../config/utils');
const https = require('https');
const axios = require('axios');


let propertyController = {

		//fetchById is a property
		fetchById : function(id, callBack){
				return propertyController.apiRequest(id).then((response)=>{
						callBack(null,response);
				}).catch((error)=>{
					callBack(error,null);
				});
		},


		apiRequest: (id) =>{
			var propertyApiUrl = utils.buildUrl(id);
			var options={
				url: propertyApiUrl,
				method:'GET',
				responseType:'json',
				httpsAgent: new https.Agent({ rejectUnauthorized: false })
			};
			return axios(options);
		}

};



module.exports = propertyController;
