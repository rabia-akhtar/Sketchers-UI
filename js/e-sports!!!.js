$(document).foundation()












//javascript, jQuery
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=overwatch+RANDOM&api_key=YOUR_API_KEY&limit=5");
xhr.done(function(data) { console.log("success got data", data); });