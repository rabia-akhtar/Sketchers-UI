$(document).foundation()
//javascript, jQuery

$('#trigger-reveal').on('click', function(){
    $.ajax('/my/modal/content').
    done(function(content) {
        $('reveal1').html(content).foundation('open');
    });
})

function readyFn() {
    var template = $('#mytemplate').html();
    Mustache.parse(template);
    //javascript, jQuery for random e-sports gifs
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=esports+RANDOM&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=20");
    var div = $('#results');
    xhr.done(function(results) { 
        console.log("success got data", results);
        results.data.forEach(function (result) {
            var view = {
                title: result.title,
                gif: result.embed_url
              };
              var rendered = Mustache.render(template, view);
              div.append(rendered);
        })
    });
}

function owsearch(){
    //javascript, jQuery for user directed overwatch gifs
    var search = document.forms["overwatchsearch"]["search"].value;
    var display=$('#display')
    var template = $('#owtemplate').html();
    Mustache.parse(template);
    var overwatchSearch = "http://api.giphy.com/v1/gifs/search?q=overwatch ";
    overwatchSearch +=search + "&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=5";
    var overwatch = $.get(overwatchSearch);
    overwatch.done(function(results) { 
        console.log("success got data", results);
        results.data.forEach(function (result) {
            var view = {
                title: result.title,
                gif: result.embed_url
              };
              var rendered = Mustache.render(template, view);
              display.append(rendered);
        })
    });
}
$( document ).ready( readyFn );
