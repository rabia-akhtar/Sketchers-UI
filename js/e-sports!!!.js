$(document).foundation()
//javascript, jQuery

var owtemplate;
function readyFn() {
    var template = $('#mytemplate').html();
    owtemplate = $('#owtemplate').html();
    Mustache.parse(template);
    //javascript, jQuery for random e-sports gifs
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=esports&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=10");
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
    var display=$('#display').empty();
    Mustache.parse(owtemplate);
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
              var rendered = Mustache.render(owtemplate, view);
              display.append(rendered);
        })
    });
}

$('#top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});

$( document ).ready( readyFn );
