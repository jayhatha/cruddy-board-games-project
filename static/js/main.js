console.log("JS good to go, sir!");

// listen for a "submit" event for the edit page. the edit form will live
// at the path GET /games/:name/edit. Use AJAX to send a PUT request to the
// appropriate URL

$(document).ready(function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        var newData = $(this).serialize();
        var url = $(this).attr('action');
        console.log(url);
        $.ajax({
            method: 'PUT',
            url: url,
            data: newData
        }).done(function(data) {
            console.log(data);
            window.location = '/games';
        });
    });


// listen for clicks on "delete" links. use AJAX to send a DELETE HTTP request
// to the appropriate URL


    $('a').on('click', function(event) {
      event.preventDefault();
      var url = $(this).attr('href');
      $.ajax({
        method: 'DELETE',
        url: url
      }).done(function(data) {
        window.location = '/games';
      });
    });
});
