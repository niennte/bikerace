/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function($){

    // Number of seconds in every time division
    var days	= 24*60*60,
        hours	= 60*60,
        minutes	= 60;

    // Creating the plugin
    $.fn.countdown = function(prop){

        var options = $.extend({
            callback	: function(){},
            timestamp	: 0
        },prop);

        let left, mth, d, h, m, s, positions;

        // Initialize the plugin
        init(this, options);

        positions = this.find('.position');

        function getMonthsUntil(target) {
            let months = 0;
            let now = new Date();
            months = (target.getFullYear() * 12 + target.getMonth()) - (now.getFullYear() * 12 + now.getMonth())
            return months <= 0 ? 0 : months;
        }

        function getDaysLeft() {
            let now = new Date();
            let monthEnd = new Date(now.getTime());
            monthEnd.setMonth(now.getMonth() + 1);
            monthEnd.setDate(0);
            return monthEnd.getDate() > now.getDate() ? monthEnd.getDate() - now.getDate() : 0;
        }

        (function tick(){

            // Time left
            left = Math.floor((options.timestamp - (new Date())) / 1000);

            if(left < 0){
                left = 0;
            }

            // Number of months left
            mth = getMonthsUntil(options.timestamp) < 0 ? 0 : getMonthsUntil(options.timestamp);
            //console.log(mth)
            updateDuo(0, 1, mth);

            // Number of days left
            updateDuo(2, 3, getDaysLeft());
            d = Math.floor(left / days);
            left -= d*days;

            // Number of hours left
            h = Math.floor(left / hours);
            updateDuo(4, 5, h);
            left -= h*hours;

            // Number of minutes left
            m = Math.floor(left / minutes);
            updateDuo(6, 7, m);
            left -= m*minutes;

            // Number of seconds left
            s = left;
            updateDuo(8, 9, s);

            // Calling an optional user supplied callback
            options.callback(d, h, m, s);

            // Scheduling another call of this function in 1s
            setTimeout(tick, 1000);
        })();

        // This function updates two digit positions at once
        function updateDuo(minor,major,value){
            switchDigit(positions.eq(minor),Math.floor(value/10)%10);
            switchDigit(positions.eq(major),value%10);
        }

        return this;
    };


    function init(elem, options){
        elem.addClass('countdownHolder');

        // Creating the markup inside the container
        $.each(['Months', 'Days','Hours','Minutes','Seconds'],function(i){
            $('<span class="count'+this+'">').html(
                '<span class="position">\
                  <span class="digit static">0</span>\
                </span>\
                <span class="position">\
                  <span class="digit static">0</span>\
                </span>'
            ).appendTo(elem);

            if(this!="Seconds"){
                elem.append('<span class="countDiv countDiv'+i+'"></span>');
            }
        });

    }

    // Creates an animated transition between the two numbers
    function switchDigit(position,number){

        var digit = position.find('.digit')

        if(digit.is(':animated')){
            return false;
        }

        if(position.data('digit') == number){
            // We are already showing this number
            return false;
        }

        position.data('digit', number);

        var replacement = $('<span>',{
            'class':'digit',
            css:{
                top:'-2.1em',
                opacity:0
            },
            html:number
        });

        // The .static class is added when the animation
        // completes. This makes it run smoother.

        digit
            .before(replacement)
            .removeClass('static')
            .animate({top:'2.5em',opacity:0},'fast',function(){
                digit.remove();
            })

        replacement
            .delay(100)
            .animate({top:0,opacity:1},'fast',function(){
                replacement.addClass('static');
            });
    }
})(jQuery);