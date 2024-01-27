//Image Slider 1
$(document).ready(function () {
    // Initialize Slick Carousel
    $('#image-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000
    });

    // Customize dots for styling
    $('.slider-dots').append('<div class="slider-dot"></div>'.repeat($('#image-slider .slick-dots li').length));
    $('.slider-dot:first-child').addClass('active');

    // Add event listener to update active dot on slide change
    $('#image-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.slider-dot').removeClass('active');
        $('.slider-dot').eq(nextSlide).addClass('active');
    });
});

//Image Slider 2
$(document).ready(function () {
    // Initialize the second Slick Carousel
    $('#image-slider2').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000
    });

    // Customize dots for styling (adjust the selector)
    $('.slider-dots').append('<div class="slider-dot"></div>'.repeat($('#image-slider2 .slick-dots li').length));
    $('.slider-dot:first-child').addClass('active');

    // Add event listener to update active dot on slide change (adjust the selector)
    $('#image-slider2').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.slider-dot').removeClass('active');
        $('.slider-dot').eq(nextSlide).addClass('active');
    });
});

//Image Slider 3
$(document).ready(function () {
    // Initialize the third Slick Carousel
    $('#image-slider3').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000
    });

    // Customize dots for styling (adjust the selector)
    $('.slider-dots').append('<div class="slider-dot"></div>'.repeat($('#image-slider3 .slick-dots li').length));
    $('.slider-dot:first-child').addClass('active');

    // Add event listener to update active dot on slide change (adjust the selector)
    $('#image-slider3').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.slider-dot').removeClass('active');
        $('.slider-dot').eq(nextSlide).addClass('active');
    });
});