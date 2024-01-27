$(document).ready(function () {
    // Accordion functionality
    $('.accordion li a').on('click', function () {
      // Hide all divs except the one associated with the clicked link
      $('.accordion li div').not($(this).next()).slideUp();
      $(this).next().slideToggle();
    });
  });
  