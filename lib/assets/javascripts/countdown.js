$(document).on("turbolinks:load", function () {
    $(function() {

        let note = $('#note'),
            ts = new Date("April 1, 2020"),
            targetDate = true;

        if ((new Date()) > ts) {
            ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
            targetDate = false;
        }

        if (targetDate) {
            $('#targetDate').html(ts.toDateString())
            $('#countdown').countdown({
                timestamp: ts,
                callback: function (days, hours, minutes, seconds) {

                    let message = "";
                    message += "<span class='text'> month" + ( days == 1 ? '' : 's' ) + " </span>";
                    message += "<span class='text'> day" + ( days == 1 ? '' : 's' ) + " </span>";
                    message += "<span class='text'> hour" + ( hours == 1 ? '' : 's' ) + " </span>";
                    message += "<span class='text'>minute" + ( minutes == 1 ? '' : 's' ) + " </span>";
                    message += "<span class='text'>second" + ( seconds == 1 ? '' : 's' ) + " </span>";

                    if (targetDate) {
                        message += "";
                    }
                    else {
                        message = "";
                    }

                    note.html(message);
                }
            });
        }

    });
});