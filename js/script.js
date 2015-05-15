//var channelName = 'TechGuyWeb';

$(document).ready(function () {
    document.getElementById("search").addEventListener('click', search, false);

    function search() {
        $('#results').empty();
        var userName = document.getElementById('userName').value;
        $.get(
            //the response from youtube is JSON format data
            "https://www.googleapis.com/youtube/v3/channels", {
                part: 'contentDetails',
                forUsername: userName,
                //id: 'UU6quGYDtkY7E-EgVj9t7-LQ',
                //apply key on google developer console
                key: 'AIzaSyDJfqZ4c3Atr88MC2HTggdZwK5kNyYKmQo'
            },
            //extract JSON data from youtube, get playlistId
            function (data) {
                $.each(data.items, function (i, item) {
                    console.log(item);
                    pid = item.contentDetails.relatedPlaylists.uploads;
                    getVids(pid);
                })
            }
        );
    }

    //get vedio list from youtube with playlistId
    function getVids(pid) {
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 10,
                playlistId: pid,
                key: 'AIzaSyDJfqZ4c3Atr88MC2HTggdZwK5kNyYKmQo'
            },
            //deal with the videoes obtained from youtube and display them on HTML file
            function (data) {
                var output;
                $.each(data.items, function (i, item) {
                    console.log(item);
                    videTitle = item.snippet.title;
                    videoId = item.snippet.resourceId.videoId;

                    //output = '<li>'+videTitle+'</li>';
                    output = '<li><iframe height="350" width="500" src=\"//www.youtube.com/embed/' + videoId + '\"></iframe></li>';
                    $('#results').append(output);
                })
            }
        );
    }
});
