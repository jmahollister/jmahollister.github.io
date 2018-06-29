/* global $ _ opspark */

$(document).ready(function() {
    $.getJSON('data.json', function (data) {
        // YOUR CODE BELOW HERE //
        
        // uncomment this to inspect all available data; delete when done //

        // EXAMPLE: Looping over top rated recordings; replace with your code //
        // let topRated = data.discography.topRated;
        // _.forEach(topRated, function(recording) {
        //     console.log(recording);
        // });
        
        $('#section-bio').css('background-color', 'rgb(' + 239 + ',' + 80 + ',' + 41 + ')').css('color', 'white');
        $('#section-quotes').css('background-color', 'rgb(' + 239 + ',' + 80 + ',' + 41 + ')').css('color', 'white').css('font-style', 'italic');
        
        
        //could not figure out how to do/ instructions unclear
         let topRated = data.discography.topRated;
        _.forEach(topRated, function(recording) {
            let $li = $('<ul>');
            $li.append($('<li>').text(recording.title)).appendTo($('#list-top-rated'));
        }); 

        // YOUR CODE ABOVE HERE //
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});
