const fs = require('fs');
const https = require('https');
var path = require('path');

function Get(url, callback){
    var r = "";
    https.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', function() {
        callback(JSON.parse(data));
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    console.log(r);
    return r;
}

//lat = "55.84972"
//long = "-2.10678"
venueID = "4b058820f964a52047b322e3"
clientID = "20AJ1RG4UTDN4LISBS0EJJUJ5YUXXTPSW2HRAX4ASKL0YB1V"
clientSecret = "FLRW3VN22BGM2ZTJ20CVATT3HNZ5AMRX2XZFJPPZG0AZAO2J"
ACCESS_TOKEN = "HAYEBWXKJX24TKVB2KUL4PFMIX1AY4YIGZTZ01TNARSK1A2Y"


//function getVendorID(){
////    var url = "https://api.foursquare.com/v2/venues/" + venueID + "/stats?client_id=" + clientID +
////    "&client_secret=" + clientSecret + "&v=YYYYMMDD"
//    var url = "https://api.foursquare.com/v2/venues/search?query=Calton%20Hill&intent=global&client_id=" + clientID +
//    "&client_secret=" + clientSecret + "&v=20170901"
//    var response = Get(url);
//    return response;
//}

total = 0
saveIn = 10

function getStats(results, currentId){
    console.log("Current id = " + currentId + "; total so far = " + total + "\n");
    var url = "https://api.foursquare.com/v2/venues/" + venueID + "/photos?client_id=" + clientID +
    "&client_secret=" + clientSecret + "&VENUE_ID=" + venueID + "&startAt=1505347200&endAt=1505433600" +
    "&v=20170915&m=foursquare&oauth_token=" + ACCESS_TOKEN + "&limit=200&offset=" + currentId;
    var response = Get(url, function(r) {
        console.log(r);
        if (r.response.photos.count == 0) {
            saveData(results);
            return
        }
        for(var i = 0; i < r.response.photos.count; ++i) {
            var d = r.response.photos.items[i].createdAt;
            if(d >= 1406851200 /* Friday, 1 August 2014 00:00:00 */ &&
               d <= 1501545599 /* Monday, 31 July 2017 23:59:59 */) {
                if (d in results)
                    results[d] = results[d] + 1;
                else
                    results[d] = 1;
                total = total + 1
            }
        }
        currentId = currentId + r.response.photos.count;
        if (saveIn == 0) {
            saveData(results);
            saveIn = 10
        }
        else
            saveIn = saveIn - 1;
        getStats(results, currentId);
    });
}

function saveData(d) {
    const content = JSON.stringify(d);

    fs.appendFile("results.json", content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}


fs.stat('results.json', function(err, stat) {
    if(err == null) {
        var json = JSON.parse(fs.readFileSync('results.json', 'utf8'));
        getStats(json, Object.keys(json).length);
    } else if(err.code == 'ENOENT') {
        // file does not exist
        getStats({}, 0);
    } else {
        console.log('Some other error: ', err.code);
    }
});