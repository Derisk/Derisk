function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.setRequestHeader("x-ibm-client-id", "7216b8fc-4815-43e4-bc20-1614e35aec09");
    Httpreq.setRequestHeader("x-ibm-client-secret", "iX0dP6tS0jA0tR6uR5yH6eO7pV6bS0fL4gW8mW6gI5kG8rU2nU");
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
}

lat = "55.84972"
long = "-2.10678"
apiKey = "626505b9091f4982a505b9091f798235"
baseUrl = "https://api.us.apiconnect.ibmcloud.com/infomichaelwellnerde-dev/hackzurich/"

function runAll() {
    getLeisureTravelIndex();
    getAchesAndPainsIndex();
    getDrivingDifficultyIndex();
    getFrostPotentialIndex();
    getHeatCoolIndex();
}
/*********************** Forecast (BEGIN) ***********************/
// NB: Each caller bellow returns seven tuples (one for each day).
// Each tuple contains numeric value, worded value and the name of the day in the natural language
// (e.g. tomorrow, day after tomorrow, Thursday, Friday etc)
function getforecast() {
    var url = baseUrl + "v2/indices/travel/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json"
    var response = Get(url);
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [response.travelIndex12hour.leisureTravelIndex[i * 2],
                    response.travelIndex12hour.leisureTravelCategory[i * 2],
                    response.travelIndex12hour.daypartName[i * 2]];
    }
    return result;
}
/*********************** Forecast (BEGIN) ***********************/

/*********************** Lifestyle (BEGIN) ***********************/
function getLeisureTravelIndex() {
    var url = baseUrl + "v2/indices/travel/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json"
    var response = Get(url);
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [response.travelIndex12hour.leisureTravelIndex[i * 2],
                    response.travelIndex12hour.leisureTravelCategory[i * 2],
                    response.travelIndex12hour.daypartName[i * 2]];
    }
    return result;
}

function getAchesAndPainsIndex(){
    var url = baseUrl + "v2/indices/achePain/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json"
    var response = Get(url);
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [response.achesPainsIndex12hour.achesPainsIndex[i * 2],
                    response.achesPainsIndex12hour.achesPainsCategory[i * 2],
                    response.achesPainsIndex12hour.daypartName[i * 2]];
    }
    return result;
}

function getDrivingDifficultyIndex(){
    var url = baseUrl + "v2/indices/drivingDifficulty/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json"
    var response = Get(url);
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [response.drivingDifficultyIndex12hour.drivingDifficultyIndex[i * 2],
                    response.drivingDifficultyIndex12hour.drivingDifficultyCategory[i * 2],
                    response.drivingDifficultyIndex12hour.daypartName[i * 2]];
    }
    return result;
}

function getFrostPotentialIndex(){
    var url = baseUrl + "v2/indices/frost/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json"
    var response = Get(url);
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [response.frostPotentialIndex12hour.frostPotentialIndex[i * 2],
                    response.frostPotentialIndex12hour.frostPotentialCategory[i * 2],
                    response.frostPotentialIndex12hour.daypartName[i * 2]];
    }
    return result;
}

function getHeatCoolIndex(){
    var url = baseUrl + "v2/indices/heatCool/daypart/15day?geocode=" + lat + "," + long +
        "&language=en-US&format=json"
    var response = Get(url);
    var result = new Array(7);
    for (i = 0; i < 7; i++) {
        result[i] = [response.heatingCoolingIndex12hour.heatingCoolingIndex[i * 2],
                    response.heatingCoolingIndex12hour.heatingCoolingCategory[i * 2],
                    response.heatingCoolingIndex12hour.daypartName[i * 2]];
    }
    return result;
}
/*********************** Lifestyle (END) ***********************/