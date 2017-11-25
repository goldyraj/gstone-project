(function($) {
    
    "use strict";

    // ==================== Preloader
    function preloader_load() {
        if($('.preloader').length){
            $('.preloader').delay(500).fadeOut(700);
        }
    }


    // ==================== Navbar Scroll To Fixed
        $('.scrollingto-fixed').scrollToFixed();
        var summaries = $('.summary');
        summaries.each(function(i) {
            var summary = $(summaries[i]);
            var next = summaries[i + 1];
            summary.scrollToFixed({
                marginTop: $('.scrollingto-fixed').outerHeight(true) + 10,
                limit: function() {
                    var limit = 0;
                    if (next) {
                        limit = $(next).offset().top - $(this).outerHeight(true) - 10;
                    } else {
                        limit = $('.footer').offset().top - $(this).outerHeight(true) - 10;
                    }
                    return limit;
                },
                zIndex: 999
            });
        });


   // ==================== Gallery Masonry Isotop And Other Gallery and Lightbox
    function masonryIsotop() {
        if ($('.masonry-gallery').length) {
            $('.masonry-gallery').isotope({
                layoutMode:'masonry'
            });
        }
        if($('.masonry-filter').length){
            $('.masonry-filter a').children('span').on('click', function(){
                var Self = $(this);
                var selector = Self.parent().attr('data-filter');
                $('.masonry-filter a').children('span').parent().removeClass('active');
                Self.parent().addClass('active');
                $('.masonry-gallery').isotope({ filter: selector });
                return false;
            });
    }
        


    //LighvtBox / Fancybox
    if($('.lightbox-image').length) {
      $('.lightbox-image').fancybox();
    }

    }


    // ==================== Parallax Backgrounds
    $.stellar({
       horizontalScrolling: false,
       responsive: true
    });

    // ==================== Price range slider  Main Slider
 
    $(".slide-main").owlCarousel({
        loop:true,
        autoplay:true,
        autoplayHoverPause:true,
        smartSpeed: 1000,
        autoplayTimeout:4000,
        center:false,
        mouseDrag: false,
        items:1,
        nav:true,
        dots:true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    });
    var owl = $('.slide-main');
    owl.owlCarousel();
    owl.on('translate.owl.carousel', function (event) {
        $('.slide-text').removeClass('flipInX animated').hide();
    })
    owl.on('translated.owl.carousel', function (event) {
        $('.slide-text').addClass('flipInX animated').show();
    });
    

    // Owl carousel - Testimonial
    if($('.testimonial-carousel').length){
        $('.testimonial-carousel').owlCarousel({
            loop:true,
            margin:30,
            dots: true,
            nav:false,
            autoplayHoverPause:false,
            autoplay: true,
            smartSpeed: 700,
            responsive: {
                0: {
                    items: 1,
                    center: false
                },
                480:{
                    items:1,
                    center: false
                },
                600: {
                    items: 2,
                    center: false
                },
                768: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        })
    }


    // ==================== Scroll To top
    $(function () {
            $.scrollUp({
                scrollName: 'scrollUp', 
                scrollDistance: 300,       
                scrollFrom: 'top',          
                scrollSpeed: 700,           
                easingType: 'linear',   
                animation: 'fade',      
                animationSpeed: 200,      
                scrollTrigger: false,     
                scrollTarget: false, 
                scrollText: '', 
                scrollTitle: false,   
                scrollImg: true,   
                activeOverlay: false,
                zIndex: 2147483647, 
            });
        });


    
/* ==========================================================================
   When document is loading, do
   ========================================================================== */

    $(window).on('load', function() {
        // add your functions
        preloader_load();
        masonryIsotop();
    }); 


})(window.jQuery);

/*
Calendar script
*/


var app = angular.module('DateDemo',['ui.bootstrap']);

/*
* Note the use of the filter service
*/
function DateDemoController($scope,$filter)
{
  $scope.processDate = function(dt)
  {
    return $filter('date')(dt, 'dd-MM-yyyy');
  }
}
