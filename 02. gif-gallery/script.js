const API_KEY = "Mj5AHrhbz1qo4rj4Ks4wSCdX94pP8yoB";

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
    // Search button click effect
    $('.search-btn').click(function() {
        $(this).addClass('pressed');
        setTimeout(() => {
            $(this).removeClass('pressed');
        }, 110);
        if ($("#search-txt").val() != "") {
            sendSearchRequest($("#search-txt").val());
        } else {
            sendTrendingRequest();
        }
    });
});

function sendSearchRequest(query) {
    let searchReq = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`;
    let xhr = jQuery.get(searchReq);
    xhr.done( data => {
        console.log(`q=${query}\nrequest_url=${searchReq}`, data);
    });
}

function sendTrendingRequest() {
    let trendReq = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
    let xhr = jQuery.get(trendReq);
    xhr.done( data => {
        console.log(`trending_request\nrequest_url=${trendReq}`, data);
    })
}