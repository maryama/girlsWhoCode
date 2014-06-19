var scientist = "";
var makeQuery = function(query) {
  var baseUrl = "http://api.dp.la/v2/items";
  var params = [
    "api_key=62bd9cf024cbc6bf37e804777e71fab4",
    "q=" + query
  ];
  return baseUrl + "?" + params.join("&");
};

function getRandomScientist() {
  sendRequest("random", onScientistLoad);
};

function sendRequest(requestParams, onloadFunc) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8000?" + requestParams, true);
  xhr.responseType = "JSON";
  xhr.onload = onloadFunc
  xhr.send();
};

function sendUrlRequest(requestUrl, onloadFunc) {
  requestParams = "url=" + requestUrl;
  sendRequest(requestParams, onloadFunc);
};

function onWikipediaLoad() {
  var wikiResponse = JSON.parse(this.response);
  console.log(wikiResponse);
  var summary = document.createTextNode(wikiResponse);
  document.body.appendChild(summary);
};

function onDplaLoad() {
  var dplaResponse = JSON.parse(this.response);
  console.log(dplaResponse);
};

function onScientistLoad() {
  scientist = JSON.parse(this.response);
  document.title = scientist;
  var scientistNode = document.createTextNode(scientist);
  document.getElementById("h1").appendChild(scientistNode);
  var requestUrl = makeQuery(scientist);
  sendUrlRequest(requestUrl, onDplaLoad);
  sendRequest("wiki=" + scientist, onWikipediaLoad);
};

// when the page is loaded,  grab a random female scientist to query about
window.onload = function () {
  document.getElementById("catButton").onclick = function() {

    getRandomScientist();
  };
};
