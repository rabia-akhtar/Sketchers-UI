$(document).foundation()
//javascript, jQuery

$('#trigger-reveal').on('click', function(){
    $.ajax('/my/modal/content').
    done(function(content) {
        $('reveal1').html(content).foundation('open');
    });
})











//javascript, jQuery for random e-sports gifs
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=esports+RANDOM&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=5");
xhr.done(function(data) { console.log("success got data", data); });



//javascript, jQuery for user directed overwatch gifs
var overwatchSearch = "http://api.giphy.com/v1/gifs/search?q=overwatch";
var userSearch = "replace this with..........  +(toLowerCase)userInput  .............";
overwatchSearch += userSearch + "&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=5";
var overwatch = $.get(overwatchSearch);
overwatch.done(function(data) { console.log("success got data", data); });