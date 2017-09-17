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