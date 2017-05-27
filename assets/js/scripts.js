$(document).ready(function() {

  // touch device detection
  $touch = ( navigator.userAgent.match(/(Android|webOS|iPad|iPhone|iPod|BlackBerry)/i) ? true : false );
  if ($touch) { $('body').addClass('isTouch') }
  var touchEvent = $touch ? 'touchstart' : 'click';

  //reading the start 'top' value of #logo
  // $logoTopInit = $('#logo').offset().top - $(window).scrollTop();
  $logoTopInit = ($('body').hasClass('home')) ? 30 : -30;

  //adding animation to svg logo
  $('body').addClass('isLoaded');
  $('.logo').addClass('animated');
  //adding animation to svg logo
  setTimeout(function() { $('body').removeClass('header-full'); }, 1500);


  // add autosize to textareas
  autosize($('textarea'));

  // initiating smooth scroll plugin
  $('a[href^="#"]').smoothScroll( { afterScroll: function() { location.hash = $(this).attr('href'); $(this).blur(); } });

  // initiating isotope
  if($('.project-container').length > 0) {
    $('.project-container').isotope({
      // options
      itemSelector: '.project',
      layoutMode: 'fitRows',
      getSortData: {
        name: '.project-title'
      },
      sortBy: 'asc',
      sortAscending: true
    });
  }

  // initiating scrollactions
  scrollActions();
  
});


function scrollActions() {
  scroll = $(window).scrollTop();

  // top logo 'parallax'
  if ($(window).width() > 767 ) {
    $('#logo').css('top',($logoTopInit-(scroll/3))+'px');
  }

  allowMobileScroll = true;
  if (allowMobileScroll) {
    $('section').each(function() {

      thisTop = $(this).offset().top;
      scrollValue = (scroll - thisTop) / 1.5;

      $(this).find('.section__bg-image')
        .css('-webkit-transform','translateY(' + scrollValue + 'px)')
        .css('-moz-transform','translateY(' + scrollValue + 'px)')
        .css('transform','translateY(' + scrollValue + 'px)');

    });
  }

}







// Owl Carousel
$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items: 1,
    autoWidth: true,
    nav: false,
    dotsEach: 1
  });
});






// Contact Form Dialog


$(document).ready(function() {
  // Dialog stuff
  setTimeout(function() { openContactForm() }, 500);

  $('dialog [data-action="continue"]').on('click touchstart', function (e) {
    e.preventDefault();
    bubbleRun($(this).closest('.bubble-wrap'));
  });
  $('dialog [data-action="dialog-close"]').on('click touchstart', function (e) {
    closeContactForm();
  });
  $(document).on('keydown', function(e) {
    console.log(e.keyCode);
    if(e.keyCode == 27) {
      closeContactForm()
    }
  });
  $('dialog .bubble').find('textarea, input').on('keypress keydown', function(e) {
    if(e.keyCode == 13 && e.shiftKey == true) {
      e.preventDefault();
      bubbleRun($(this).closest('.bubble-wrap'));
    }
  });
  $('dialog form [type="submit"]').on('click touchstart', function(e) {
    e.preventDefault();
    bubbleRun($(this).closest('.bubble-wrap'));
    $form = $(this).closest('form');
    $form.addClass('isSending');
    console.log($data);
  });
});

function openContactForm() {
  $('body').addClass('dialogIsActive');
  setTimeout(function() {
    bubbleRun( $('dialog').find('.bubble-wrap#bubble1') );
  }, 500);
}
function closeContactForm() {
  $('.bubble-wrap').removeClass('isLoaded');
  $('form.conversation').removeClass('isSending');
  $('body').removeClass('dialogIsActive');
}
function bubbleRun($obj, stophere) {
  nextTimeout = 0;
  if(!$obj.hasClass('isLoaded')) {
    $obj.addClass('isLoaded');
    $obj.find('textarea, input').first().focus();
    nextTimeout = 1500;
  }

  if(stophere !== true) {

    $next = $obj.next();
    if(!$next.hasClass('bubble-wrap--right')) {
      setTimeout( function() { bubbleRun($next); }, nextTimeout);
    } else {
      setTimeout( function() { bubbleRun($next, true); }, nextTimeout);
    }

  }
}







// Location via L Daniel API
$(document).ready(function() {
  if($('#ldaniel_location').length > 0 && $('#ldaniel_location').attr('data-url').length > 0) {

    $url = $('#ldaniel_location').attr('data-url');

    $.getJSON( $url, function(r) {

      $.each(r['location'], function(i, item) {
        if (item['year'] == '2017') {
          current = item['location_city'] + ' ' + item['location_flag'];
        }
      });

      if(current) {
        html = 'Currently in: <strong>';
        html += current;
        html += '</strong>';

        $('#ldaniel_location').html(html);
      } else {
        console.log('No location found for curent year');
      }

    });

  }
});







$(window).scroll(function() { scrollActions(); });
$(window).resize(function() { scrollActions(); });
$(document).bind("scrollstart", function() { scrollActions(); });
$(document).bind("scrollstop", function() { scrollActions(); });
