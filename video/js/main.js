$(document).ready(function() {
    var pageH,pageW;
    page = {
        init: function() {
            $('body').on('touchmove', function(e) {
                e.preventDefault();
            });
            $(window).resize(function() {
                page.resize();
            });
            page.MV = document.getElementById('video1');
            page.resize();
            page._click.init();
        },
        resize: function() {
            pageW = $(window).width();
            pageH = $(window).height();
            console.log(pageW, pageH);
            $('.page').width(pageW).height(pageH);
        },
        _click: {
            init: function() {
                page._click._click1();
                page._click._click1_1();
            },
            _click1: function() {
                $('.panzi_click_dom').on('touchstart', function(e) {
                    page.MV.play();
                    page._click._start_out();
                    page.MV.addEventListener('timeupdate', function() {
                        if(page.MV.currentTime>=123.1) {
                        }
                    })
                    e.preventDefault();
                });
            },
            _click1_1: function() {
                $('.panzi_click_dom').on('touchend', function(e) {
                    page._click._start_in();
                    page.MV.pause();
                    e.preventDefault();
                });
            },
            _start_out: function() {
                $('.start_box_01,.start_box_02,.start_box_03').hide();
                $('.panzi_box').removeClass('fadeIn').hide();
            },
            _start_in: function() {
                $('.start_box_03,.panzi_box').show();
            }
        },
        
    }
    page.init();
});