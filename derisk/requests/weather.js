const fetchOptions = {
  headers: {
    "x-ibm-client-id": "7216b8fc-4815-43e4-bc20-1614e35aec09",
    "x-ibm-client-secret": "iX0dP6tS0jA0tR6uR5yH6eO7pV6bS0fL4gW8mW6gI5kG8rU2nU"
  }
}

const lat = "55.84972"
const long = "-2.10678"
const apiKey = "626505b9091f4982a505b9091f798235"
const baseUrl = "https://api.us.apiconnect.ibmcloud.com/infomichaelwellnerde-dev/hackzurich/"

function runAll() {
    getLeisureTravelIndex();
    getAchesAndPainsIndex();
    getDrivingDifficultyIndex();
    getFrostPotentialIndex();
    getHeatCoolIndex();
}

/*********************** Forecast (BEGIN) ***********************/
export function getforecast() {
  return fetch(baseUrl + "v1/geocode/" + lat + "/" + long + "/forecast/daily/7day.json?units=m", fetchOptions)
  .then((response) => {
    const responseBody = JSON.parse(response._bodyInit)
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = responseBody.forecasts[i];
    }
    return Promise.resolve(result);
  })
  .catch(error => {
    return Promise.reject(error);
  });      
}
/*********************** Forecast (BEGIN) ***********************/

/*********************** Lifestyle (BEGIN) ***********************/
// NB: Each caller bellow returns seven tuples (one for each day).
// Each tuple contains numeric value, worded value and the name of the day in the natural language
// (e.g. tomorrow, day after tomorrow, Thursday, Friday etc)
export function getLeisureTravelIndex() {
  return fetch(baseUrl + "v2/indices/travel/daypart/15day?geocode=" + lat + "," + long +
      "&language=en-US&format=json", fetchOptions)
  .then((response) => {
    const responseBody = JSON.parse(response._bodyInit)
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [responseBody.travelIndex12hour.leisureTravelIndex[i * 2],
                    responseBody.travelIndex12hour.leisureTravelCategory[i * 2],
                    responseBody.travelIndex12hour.daypartName[i * 2]];
    }
    return Promise.resolve(result);
  })
  .catch(error => {
    return Promise.reject(error);
  });
}

export function getAchesAndPainsIndex(){
  return fetch(baseUrl + "v2/indices/achePain/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json", fetchOptions)
  .then((response) => {
    const responseBody = JSON.parse(response._bodyInit)
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [responseBody.achesPainsIndex12hour.achesPainsIndex[i * 2],
                    responseBody.achesPainsIndex12hour.achesPainsCategory[i * 2],
                    responseBody.achesPainsIndex12hour.daypartName[i * 2]];
    }

    return Promise.resolve(result);
  })
  .catch(error => {
    return Promise.reject(error);
  });
}

export function getDrivingDifficultyIndex(){
  return fetch(baseUrl + "v2/indices/drivingDifficulty/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json", fetchOptions)
  .then((response) => {
    const responseBody = JSON.parse(response._bodyInit)
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [responseBody.drivingDifficultyIndex12hour.drivingDifficultyIndex[i * 2],
                    responseBody.drivingDifficultyIndex12hour.drivingDifficultyCategory[i * 2],
                    responseBody.drivingDifficultyIndex12hour.daypartName[i * 2]];
    }

    return Promise.resolve(result);
  })
  .catch(error => {
    return Promise.reject(error);
  });
}

export function getFrostPotentialIndex(){
  return fetch(baseUrl + "v2/indices/frost/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json", fetchOptions)
  .then((response) => {
    const responseBody = JSON.parse(response._bodyInit)
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [responseBody.frostPotentialIndex12hour.frostPotentialIndex[i * 2],
                    responseBody.frostPotentialIndex12hour.frostPotentialCategory[i * 2],
                    responseBody.frostPotentialIndex12hour.daypartName[i * 2]];
    }

    return Promise.resolve(result);
  })
  .catch(error => {
    return Promise.reject(error);
  });
}

export function getHeatCoolIndex(){
  return fetch(baseUrl + "v2/indices/heatCool/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json", fetchOptions)
  .then((response) => {
    const responseBody = JSON.parse(response._bodyInit)
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [responseBody.heatingCoolingIndex12hour.heatingCoolingIndex[i * 2],
                    responseBody.heatingCoolingIndex12hour.heatingCoolingCategory[i * 2],
                    responseBody.heatingCoolingIndex12hour.daypartName[i * 2]];
    }

    return Promise.resolve(result);
  })
  .catch(error => {
    return Promise.reject(error);
  });
}
/*********************** Lifestyle (END) ***********************/

/*const https = require('https');
const async = require('async');

function nodeGet(url, path, headers, callback){
    var options = {
            host: url,
            path: path,
            method: 'GET',
            headers: headers,
        };

    console.log("Start");
    var x = https.request(options, function(res){
        console.log("Connected");
        let body = [];
//        res.end('data', function(data) {
//            callback(data.toString('utf8'))});
        res.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          callback(body);
        });

    });


    x.end();
}

function nodePost(url, path, headers, post_data, callback){
    var options = {
            host: url,
            path: path,
            method: 'POST',
            headers: headers,
        };

    console.log("Start");
    var x = https.request(options, function(res){
        console.log("Connected");
        let body = [];
//        res.end('data', function(data) {
//            callback(data.toString('utf8'))});
        res.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          callback(JSON.parse(body));
        });

    });
    x.write(post_data);
    x.end();
}*/

//token = "0cd67476-c586-4ddd-8200-ba7540a1b291";
//var parseString = require('xml2js').parseString;

/*export function getTrends() {
    var token = "";
    var positiveEnts = ["EntertainmentAwardEvent", "SportsEvent"]
    var positiveRels = ["MovieRelease", "Holiday", "CompanyExpansion", "CompanyInvestment", "IPO"]

    var negativeRels = ["ArmedAttack", "Arrest", "Bankruptcy", "MarketIndex", "ProductRecall"]

    var positiveTrends = []
    var negativeTrends = []
    nodeGet("rmb.reuters.com", "/rmd/rest/xml/items?channel=CLE548&mediaType=T&" +
    "completeSentences=true&dateRange=2017.09.11.00.00&token=0Uar2fCpykVuDNCZhDFwTHYiBToDgJCb81kIX5wuiTI=&limit=300", {},
        function(response) {
            parseString(response, function (err, result) {
                async.eachSeries(result.results.result, function(_result, callback) {
                    item_id = _result.id[0];
                    nodeGet("rmb.reuters.com", "/rmd/rest/xml/item?id=" + item_id + "&entityMarkupField=body&" +
                    "token=0Uar2fCpykVuDNCZhDFwTHYiBToDgJCb81kIX5wuiTI", {},
                        function(resp) {
                            parseString(resp, function (err, res) {
                                cleanText = res.newsMessage.itemSet[0].newsItem[0].contentSet[0].
                                    inlineXML[0].html[0].body[0].p.join(" ");
                                nodePost("api.thomsonreuters.com", "/permid/calais", {
                                    "Accept": "application/json",
                                    "x-ag-access-token": "wlj9Duv0lY1QKUs0hvnGvXgBmdgJJLoP",
                                    "outputFormat": "application/json"},
                                    cleanText, function(r) {
                                        var outcome = false
                                        for (var key in r) {
                                            if (r[key]._typeGroup == "entities" && positiveEnts.includes(r[key]._type)) {
                                                positiveTrends.push(r[key]._type)
                                                outcome = true;
                                            }
                                            if (r[key]._typeGroup == "relations" && positiveRels.includes(r[key]._type)) {
                                                positiveTrends.push(r[key]._type)
                                                outcome = true;
                                            }
                                            if (r[key]._typeGroup == "relations" && negativeRels.includes(r[key]._type)) {
                                                negativeTrends.push(r[key]._type)
                                                outcome = true;
                                            }
//                                            console.log(r[key]._type)
                                        }
                                        if (outcome == true)
                                            console.log("YES!!!!!!!!!!!!!!!!!!!!!");
                                        callback();
                                    });
                            });
                        });

                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if( err ) {
                      // One of the iterations produced an error.
                      // All processing will now stop.
                      console.log('A file failed to process');
                    } else {
                      console.log('All files have been processed successfully');
                        console.log(positiveTrends);
                        console.log(negativeTrends);
                    }
                });
            });
        });
    return [positiveTrends, negativeTrends];
}*/

function fill(r, group, type, result) {
    if (r._typeGroup == group && r._type == type)
        result[type] = r.name
}

function fill2(r, group, result) {
    if (r._typeGroup == group)
        result[r._typeGroup] = r.name
}

/*export function understand(text) {
    var result = {}
    nodePost("api.thomsonreuters.com", "/permid/calais", {
        "Accept": "application/json",
        "x-ag-access-token": "wlj9Duv0lY1QKUs0hvnGvXgBmdgJJLoP",
        "outputFormat": "application/json"},
        text, function(r) {
            for (var key in r) {
                fill(r[key], "entities", "Country", result);
                fill(r[key], "entities", "City", result);
                fill(r[key], "entities", "Position", result);
                fill2(r[key], "industry", result);
                fill(r[key], "entities", "Organization", result);
                fill(r[key], "entities", "Region", result);
            }
            return result;
        });
}*/

export function understand(text) {
  return fetch("https://api.thomsonreuters.com/permid/calais", {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "x-ag-access-token": "wlj9Duv0lY1QKUs0hvnGvXgBmdgJJLoP",
      "outputFormat": "application/json"
    },
    body: text
  })
  .then((response) => {
    var result = {};
    for (var key in response) {
          fill(r[key], "entities", "Country", result);
          fill(r[key], "entities", "City", result);
          fill(r[key], "entities", "Position", result);
          fill2(r[key], "industry", result);
          fill(r[key], "entities", "Organization", result);
          fill(r[key], "entities", "Region", result);
      }

    return Promise.resolve(result);
  })
  .catch(error => {
    return Promise.reject(error);
  });
}