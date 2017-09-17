const https = require('https');
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
}

//token = "0cd67476-c586-4ddd-8200-ba7540a1b291";
var parseString = require('xml2js').parseString;

export function getTrends() {
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
}