const obj = require('./constants');

let Util={

  buildUrl(response){
    let dummy_id='000000000';
    if(response===undefined || response===''){
      return `${obj.API_URL}/99mobapi/v0/propertyDetail/${obj.API_TOKEN}/${dummy_id}?rtype=json&`
    }
    return `${obj.API_URL}/99mobapi/v0/propertyDetail/${obj.API_TOKEN}/${response}?rtype=json&`
  },

  checkforId(input){
    let pattern = '^([A-Z0-9_]){9}$';
    if (input.match(pattern)) {
        return true;
    } else {
        return false;
    }
  }
}

module.exports = Util;
