$(document).foundation()

















//javascript, jQuery
var randomGifBar = $.get("http://api.giphy.com/v1/gifs/search?q=esports+RANDOM&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=5");
xhr.done(function(data) { console.log("success got data", data); });



// //javascript, jQuery
// var overwatchSearch = "http://api.giphy.com/v1/gifs/search?q=overwatch";
// overwatchSearch += "replace this with -----+userInput--------" + "&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=5";

// var xhr = $.get(overwatchSearch);
// xhr.done(function(data) { console.log("success got data", data); });