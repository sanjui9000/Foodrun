/* eslint-disable */

var searchReturn = function(que) {
  var searchQuery = que;

  $.ajax({
    type: "GET",
    url: 'http://localhost:2403/submissions',
    success: function(data) {
      if (data) {
        //empty the gallery
        $('#eventsGallery').empty();
        var lowerQuery = searchQuery.toLowerCase();

        for (var row in data) {
          //convert to lowercase for comparison
          var lowerDataName = data[row].name.toLowerCase();

          //if match in the name, append image to gallery and continue
          if (lowerDataName.includes(lowerQuery)) {
            $('#eventsGallery').append('<img class="eventImg" src="' + data[row].imgPath + '" alt="">');
            continue;
          }

          for (var tag in data[row].tags) {
            //if match in tags, append image to gallery and break (to avoid duplicates for dupe tags)
            var lowerTagName = data[row].tags[tag].toLowerCase();
            if (lowerTagName.includes(lowerQuery)) {
              $('#eventsGallery').append('<img class="eventImg" src="' + data[row].imgPath + '" alt="">');
              break;
            }
          }
        }
      }
    }
  });
};

$('#searchButton').on('click', function() {
  searchReturn(document.getElementById("searchItems").value.toLowerCase());
});
