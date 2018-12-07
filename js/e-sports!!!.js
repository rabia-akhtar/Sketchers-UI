$(document).foundation()












//javascript, jQuery
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=overwatch+RANDOM&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=5");
xhr.done(function(data) { console.log("success got data", data); });