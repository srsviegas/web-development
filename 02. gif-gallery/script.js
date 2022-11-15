const API_KEY = 'Mj5AHrhbz1qo4rj4Ks4wSCdX94pP8yoB';

$(document).ready(function() {
    // Focus effect on search box / button
    $('.search-box').focus(function() {
        $(this).addClass('focused');
        $('.search-btn').addClass('focused');
    }).blur(function() {
        $(this).removeClass('focused');
        $('.search-btn').removeClass('focused');
    });
    // Autofocus on search box after effect loads
    $('.search-box').focus();
    // Search button click
    $('.search-btn').click(function() {
        $(this).addClass('pressed');
        setTimeout(() => {
            $(this).removeClass('pressed');
        }, 110);
        searchStart();
    });
    // Start search request with enter press
    $('.search-box').keypress(event => {
        if (event.key === "Enter")
            searchStart();
    })
    // To the top button
    $('.scroll-top').click(function() {
        $(this).addClass('pressed');
        setTimeout(() => {
            $(this).removeClass('pressed');
        }, 110);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })

    function searchStart() {
        $('.search-box').blur();
        $('#gifs').empty();
        if ($('#search-txt').val() !== '') {
            $("#gifs-title").html(`GIFs about \"${$('#search-txt').val()}\"`);
            sendSearchRequest($('#search-txt').val());
        } else {
            $("#gifs-title").html("Trending GIFs");
            sendTrendingRequest();
        }
    }
});

function sendSearchRequest(query) {
    let searchReq = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`;
    let xhr = jQuery.get(searchReq);
    xhr.done( data => {
        console.log(`q=${query}\nrequest_url=${searchReq}`, data);
        placeGifs(data.data);
    });
}

function sendTrendingRequest() {
    let trendReq = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
    let xhr = jQuery.get(trendReq);
    xhr.done( data => {
        console.log(`trending_request\nrequest_url=${trendReq}`, data);
        placeGifs(data.data);
    })
}

function placeGifs(gifs) {
    gifs.forEach(gif => {
        $('#gifs').append(createGifElement(gif));
    });
    let y = $('#gifs-title').offset().top;
    $('#gifs-block').css('height', y+200);
    window.scrollTo({
        top: y - 50,
        behavior: 'smooth'
    });
}

function createGifElement(gifData) {
    var pics = $('<picture>', { 
        id: gifData.id,
        class: 'gif-container'
    });
    pics.append($('<source>', { 
        srcset: gifData.images.preview_webp.url,
    }));
    pics.append($('<img>', {
        src: gifData.images.preview_gif.url
    }))
    return pics;
}