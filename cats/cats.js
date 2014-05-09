// cats.js
window.onload = function () {
  var DPLA = function() {
    this.search = function(paramStr, aCallback) {
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200)
          aCallback(req.responseText);
      }

      var baseUrl = "http://api.dp.la/v2/items";
      req.open("GET", baseUrl, true);
      req.setRequestHeader("Access-Control-Allow-Origin", "http://localhost");
      req.setRequestHeader("Access-Control-Allow-Origin", "http://api.dp.la");
      req.setRequestHeader("Access-Control-Allow-Credentials", true);
      req.send(paramStr);
    }
  }

  document.getElementById("catButton").onclick = function(){
    var dpla = new DPLA();
    dpla.search("q=cat&api_key=62bd9cf024cbc6bf37e804777e71fab4", console.log);
  };
}
