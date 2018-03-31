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
        var $container = $('<div></div>',{'class':'thumbnail-list'});
        var lowerQuery = searchQuery.toLowerCase();

        for (var row in data) {
          var lowerDataName = '';

          //if the query is the user's id in localStorage, use that as the term
          //else, use the submission name
          if (localStorage.uid && localStorage.uid.toLowerCase() == lowerQuery){
            lowerDataName = data[row].userId.toLowerCase();
          } else {
            lowerDataName = data[row].name.toLowerCase();
          }

          //if match in the name, append image to gallery and continue
          if (lowerDataName.includes(lowerQuery)) {
            var foodUser = data[row].userId;
            var editButton = '';
            if (localStorage.uid && foodUser == localStorage.uid){
              editButton = '<p class="imgEdit">Edit</p>';
            }
            var imagez = '<div class="thumbnail-item" data-creator="' + foodUser + '"> <img class="imgg" src="' + data[row].imgPath + '" alt="">';
            var subscription = '<p class="imgName">'+data[row].name+'</p> <p class="imgDescription">'+data[row].description+'</p></div>';
            $container.append(imagez + editButton + subscription);
            continue;
          }

          for (var tag in data[row].tags) {
            //if match in tags, append image to gallery and break (to avoid duplicates for dupe tags)
            var lowerTagName = data[row].tags[tag].toLowerCase();
            if (lowerTagName.includes(lowerQuery)) {
              var foodUser = data[row].userId;
              var editButton = '';
              if (localStorage.uid && foodUser == localStorage.uid){
                editButton = '<p class="imgEdit">Edit</p>';
              }
              var imagez = '<div class="thumbnail-item" data-creator="' + foodUser + '"> <img class="imgg" src="' + data[row].imgPath + '" alt="">';
              var subscription = '<p class="imgName">'+data[row].name+'</p> <p class="imgDescription">'+data[row].description+'</p></div>';
              $container.append(imagez + editButton + subscription);
              break;
            }
          }
        }

        $('#eventsGallery').append($container);
      }
    }
  });
};


//Handle clicking "search"
$('#searchButton').on('click', function() {
  var searchInput = document.getElementById("searchItems");
  var searchQuery = searchInput.value;

  var re = /^([A-z]{3,}\s?)*$/;
  if (!re.test(searchQuery)){
    searchInput.setCustomValidity("Search term must be at least 3 letters.");
  } else {
    searchInput.setCustomValidity("");
    searchReturn(searchInput.value.toLowerCase());
  }
});

//Handle enter key
$('#searchItems').keypress(function (e) {
  if (e.which == 13) {
    var searchInput = document.getElementById("searchItems");
    var searchQuery = searchInput.value;

    var re = /^([A-z]{3,}\s?)*$/;
    if (!re.test(searchQuery)){
      searchInput.setCustomValidity("Search term must be at least 3 letters.");
    } else {
      searchInput.setCustomValidity("");
      searchReturn(searchInput.value.toLowerCase());
    }
    return false;
  }
});

//Handle clicking "My Food"
$('#myfoodbutton').on('click', function() {
  searchReturn(localStorage.uid.toLowerCase());
});
