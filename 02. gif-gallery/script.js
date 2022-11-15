const API_KEY = "Mj5AHrhbz1qo4rj4Ks4wSCdX94pP8yoB";

$(document).ready(function() {
    $('.search-btn').click(function() {
        $(this).addClass('pressed');
        setTimeout(() => {
            $(this).removeClass('pressed');
        }, 110);
        sendSearchRequest($("#search-txt").val());
    });
});

function sendSearchRequest(query) {
    let searchReq = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`;
    let xhr = $.get(searchReq);
    xhr.done((data) => {
        console.log(`q=${query}\nrequest_url=${searchReq}`, data);
        console.log(data.data[0].images.original.webp);
    });
}