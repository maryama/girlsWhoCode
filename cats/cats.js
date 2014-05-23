// cats.js
window.onload = function () {
  var makeQuery = function() {
    var baseUrl = "http://api.dp.la/v2/items";
    var params = [
      "api_key=62bd9cf024cbc6bf37e804777e71fab4",
      "q=cat"
    ];
    return baseUrl + "?" + params.join("&")
  };

  function sendRequest(requestUrl) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000?url=" + requestUrl, true);
    xhr.responseType = "JSON";
    xhr.onload = function(e) {
      console.log(JSON.parse(xhr.response));
    };
    xhr.send();
  };

  document.getElementById("catButton").onclick = function(){
    var requestUrl = makeQuery();
    sendRequest(requestUrl);
  };
}
