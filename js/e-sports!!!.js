$(document).foundation()
//javascript, jQuery

var owtemplate;
var offset = 0;
cache = [];
function readyFn() {
    var template = $('#mytemplate').html();
    owtemplate = $('#owtemplate').html();
    var rowtemplate = $('#owrandomtemplate').html();
    Mustache.parse(template);
    Mustache.parse(rowtemplate);
    //javascript, jQuery for random e-sports gifs
    //var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=esports&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=50");
    var div = $('#results');
    var data = JSON.parse(localStorage.getItem('esportsgifs'));
    if (!data){
        $.ajax({
          dataType: "json",
          cache: true,
          url: 'http://api.giphy.com/v1/gifs/search',
          data: {q: 'esports',
          api_key: 'AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu',
          limit: 10},
          success: function(results){
            console.log("success got data", results);
            localStorage.setItem('esportsgifs', JSON.stringify(results));
            results.data.forEach(function (result) {
                var view = {
                    title: result.title,
                    gif: result.embed_url
                };
                var rendered = Mustache.render(template, view);
                div.append(rendered);
            })
        }
    });
    } else {
        data.data.forEach(function (result) {
                var view = {
                    title: result.title,
                    gif: result.embed_url
                };
                var rendered = Mustache.render(template, view);
                div.append(rendered);
            })
    }


    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=esports&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&offset=11");
    xhr.done(function(results) { 
        console.log("success got data", results);
        results.data.forEach(function (result) {
            cache.push({
                title: result.title,
                gif: result.embed_url
            });
        })
    });

    var owdiv = $('#owrandom');
    var ow = $.get("http://api.giphy.com/v1/gifs/random?tag=overwatch&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu");
    ow.done(function(result) { 
        console.log("success got data", result);
            var view = {
                    title: result.data.title,
                    gif: result.data.embed_url
                };
                var rendered = Mustache.render(rowtemplate, view);
                owdiv.append(rendered);
    });

    var owhdiv = $('#owheros');
    owhtemplate = $('#owhtemplate').html();
    Mustache.parse(owhtemplate);
    var owh = $.get("https://overwatch-api.net/api/v1/hero");
    owh.done(function(results) { 
        console.log("success got data", results);
            results.data.forEach(function (result) {
                var view = {
                    name: result.name,
                    value: result.id
                };
                var rendered = Mustache.render(owhtemplate, view);
                owhdiv.append(rendered);
            })
    });

}

function loadMore() {
    var div = $('#results');
    var template = $('#mytemplate').html();
    Mustache.parse(template);
    if (offset > cache.length){
        document.getElementById("load").style.display = "none";
    }
    else {
    for (i = offset; i < offset + 10; i++){
        var view = cache[i]
                var rendered = Mustache.render(template, view);
                div.append(rendered);
    }
    }
    offset += 10
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
