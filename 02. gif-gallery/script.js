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
        if (event.key === 'Enter')
            searchStart();
    });

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
    });

    // Image preview hover
    $(document).on('mouseenter', '.gif-preview', function() {
        $(this).addClass('preview-overlay');
    });
    $(document).on('mouseleave', '.gif-preview', function() {
        $(this).removeClass('preview-overlay');
    });

    // Display clicked image
    $(document).on('click', '.gif-preview', function() {
        $('.img-display').show();
    });

    // Block scroll if image showcase is visible
    $('.img-display').on('mousewheel touchmove', (event) => {
        event.preventDefault();
    });

    // Image display hover
    $('.img-display').hover(() => {
        $('#img-display-shadow').css('opacity', '100%');
    }, () => {
        $('#img-display-shadow').css('opacity', '0%');
    });

    // Image display close button
    $('#img-display-close').click(() => $('.img-display').hide());

    function searchStart() {
        $('.search-box').blur();
        $('#gifs').empty();
        let q = $('#search-txt').val();
        if (q !== '') {
            document.title = (q + ' - GIFGallery');
            $('#gifs-title').html(`GIFs about \'${q}\'`);
            sendSearchRequest(q);
        } else {
            document.title = 'GIFGallery';
            $('#gifs-title').html('Trending GIFs');
            sendTrendingRequest();
        }
        $('.search-box').val(null);
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
    let container = $('<div>', {
        id: gifData.id,
        class: 'gif-preview'
    });
    container.append($('<video>', {
        src: gifData.images.downsized_small.mp4,
        autoplay: true,
        loop: true,
        muted: true
    }));
    return container;
}