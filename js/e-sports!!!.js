// Enable foundation 
$(document).foundation()

// Global variables.
var owtemplate;
var offset = 0;
cache = [];


/* Function loads when the documents is ready. Makes calls to the various api's to load the data.*/
function readyFn() {
    var template = $('#mytemplate').html();
    owtemplate = $('#owtemplate').html();
    var rowtemplate = $('#owrandomtemplate').html();
    Mustache.parse(template);
    Mustache.parse(rowtemplate);
    
    // Loads e-sports gifs from giphy for the first tab, otherwise pulls them from local storage.
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

    // Caches gifs for load more button.
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

    // Loads random gif for the hearthstone tab. 
    var owdiv = $('#owrandom');
    var ow = $.get("http://api.giphy.com/v1/gifs/random?tag=hearthstone&api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu");
    ow.done(function(result) { 
        console.log("success got data", result);
        var view = {
            title: result.data.title,
            gif: result.data.embed_url
        };
        var rendered = Mustache.render(rowtemplate, view);
        owdiv.append(rendered);
    });

   // Loads heros from the overwatch api for the Overwatch Hero tab. 
   herodropdown();

   // Loads live series data from the pandascore api. 
   pandascore();
}

/* Function loads values from cache array when loadMore button is clicked in the main tab. */
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

/* Function loads live upcoming series data for all e-sports. This data is freshly delivered from the pandascore
api and changes when upcoming series changes. */
function pandascore(){
    var hero=$('#liveseries');
    var herotemplate = $('#seriestemplate').html();
    Mustache.parse(herotemplate);
    var ps = $.get("https://cors.io/?https://api.pandascore.co/series/running.json?token=yT37jtMrmE4FAnoSqGpOB760RamLL8_N5SkznnNEk5lfZwFZiGY");
    ps.done(function(results) { 
        data = JSON.parse(results);
        console.log("success got data", data);
        data.forEach(function (result) {
            t =[]
            for(i = 0; i < result.tournaments.length; i++){
                t.push(result.tournaments[i].name);
            }
            var view = {
                name: result.videogame.name,
                img: result.league.image_url,
                url: result.league.url,
                full_name: result.full_name,
                begin: result.begin_at,
                end: result.end_at,
                tournament: t      
            };
            view.hasURL = (result.league.url != null);

            
            var rendered = Mustache.render(herotemplate, view);
            hero.append(rendered);
        })
    });
}

/* Function generates a random gif related to the overwatch character by querying the giphy random endpoint.
*/
function herogifgen(name){
    var hero=$('#herogif').empty();
    var herotemplate = $('#herogiftemplate').html();
    Mustache.parse(herotemplate);
    var owh = $.get("http://api.giphy.com/v1/gifs/random?api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&tag=overwatch " + name);
    owh.done(function(result) { 
        console.log("success got data", result);
        var view = {
            title: result.data.title,
            gif: result.data.embed_url
        };
        console.log("success got data", view);
        var rendered = Mustache.render(herotemplate, view);
        console.log("success got data", rendered);
        hero.append(rendered);
    });
}

/* Function queries the overwatch api to load current hero data and renders them in the third tab. */ 
function herodropdown(){
    var owhdiv = $('#overwatchdropdown');
    owhtemplate = $('#dropdowntemplate').html();
    Mustache.parse(owhtemplate);
    var owh = $.get("https://overwatch-api.net/api/v1/hero");
    owh.done(function(results) { 
        console.log("success got data", results);
        results.data.forEach(function (result) {
            var view = {
                name: result.name,
                description: result.description,
                age: result.age,
                location: result.base_of_operations
                
            };
            var rendered = Mustache.render(owhtemplate, view);
            owhdiv.append(rendered);
        })
    });
}

/* Function queries giphy for the search params provided by the user. */
function owsearch(){
    //javascript, jQuery for user directed hearthstone gifs
    var search = document.forms["overwatchsearch"]["search"].value;
    var display=$('#display').empty(); 
    Mustache.parse(owtemplate);
    var overwatchSearch = "http://api.giphy.com/v1/gifs/search?api_key=AbeAQpZhmg7KZH3O1uZILCRVcsSXJqsu&limit=20&q=hearthstone ";
    overwatchSearch +=  search.toLowerCase;
    var hearthstone = $.get(overwatchSearch);
    hearthstone.done(function(results) { 
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

// Disables entering on the search bar. This allows search to only occur when button is clicked.
$('#search').on('keyup keypress', function(event) {
  var key = event.keyCode || event.which;
  if (key === 13) { 
    event.preventDefault();
    return false;
}
});

// Brings the user to the top of the page.
$('#top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});

// Scrolls the window to the top of the page and disables scroll to top at the top of the page.
$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});


$( document ).ready( readyFn );
