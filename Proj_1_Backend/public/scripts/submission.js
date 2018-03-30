/* eslint-disable */

$('#logoutbutton').on('click', function() {
  localStorage.clear();
  $('#loginbutton').show();
  $('#signupbutton').show();
  $('#logoutbutton').hide();
  $('#addSubmission').hide();
  message = 'Logged out successfully.';
  myFunction(4800);
});

// Snackbar related

var message = '';
var imgUrl = '';

function myFunction(timeout) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar")
  $('#snackbar').text(this.message);
  // Add the "show" class to DIV
  x.className = "";
  x.className = "show";

  // After x seconds, remove the show class from DIV
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, timeout);
}

// Image related

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(650);

      imgUrl = e.target.result;
    }.bind(this);
    reader.readAsDataURL(input.files[0]);
  }
}

$("#imageUpload").change(function() {
  file1 = this.files[0];

  imageType1 = file1.type;
  imageSize1 = file1.size;

  // Check type
  var acceptableTypes = ["image/jpeg", "image/png", "image/jpeg"];
  wrongType1 = ($.inArray(imageType1, acceptableTypes) == -1)
  if (wrongType1) {
    $("#submissionMessage").html("Only jpeg, png and jpeg images are accepted.");
    return false;
  }

  // Check size
  if (imageSize1 > 3 * 1024 * 1024) {
    $("#submissionMessage").html("Please upload image less than 3MB.");
    return false;
  }

  readURL(this);
});

// Update picture

$("#submissionform").submit(function() {
  event.preventDefault();
  file1 = $("#imageUpload")[0].files[0];
  if (!file1) {
    message = 'Please upload a picture.';
    myFunction(4800);
    return false;
  }

  if (wrongType1) {
    $("#submissionMessage").html("Only jpeg, png and jpeg images are accepted.");
    $("#submissionMessage").slideToggle();
    return false;
  }

  if (imageSize1 > 3 * 1024 * 1024) {
    $("#submissionMessage").html("Please upload image less than 3MB.");
    $("#submissionMessage").slideToggle();
    return false;
  }
  var data = {};
  data['imgPath'] = imgUrl;

  $(this).serializeArray().forEach(function(item) {
    data[item.name] = item.value;
  });

  data['tags'] = document.getElementById('tags').value.split(",");
  data['userId'] = localStorage.uid;
  data['dateTime'] = new Date();
  $.ajax({
    type: "POST",
    url: 'http://localhost:2403/submissions',
    data: data,
    dataType: 'json',
    success: function(data) {
      if (data) {
        message = 'Post added successfully.';
        myFunction(4800);
        $("#submissionModal").modal('hide');
        $("#submissionform")[0].reset();
        $('#imagePreview').css('background-image', 'url(' + './assets/Blank_Pic.png' + ')');
        $('#imagePreview').hide();
        $('#imagePreview').fadeIn(650);
        $("#eventsGallery").empty();
        onLoad1();
      }
    }.bind(this),
    error: function(error) {
      Error(error);
    }
  });
});

$("#submissionModal").on('shown.bs.modal', function() {
  $("#uid")[0].value = localStorage.uid;
});

function onLoad1() {
  $.ajax({
    type: "GET",
    url: 'http://localhost:2403/submissions',
    success: function(data) {
      if (data) {
       var $container = $('<div></div>',{'class':'thumbnail-list'}); 
        for (var row in data) {
          var imagez = '<div class="thumbnail-item"> <img class="imgg" src="' + data[row].imgPath + '" alt="">';
          var subscription = '<p class="imgName">'+data[row].name+'</p> <p class="imgDescription">'+data[row].description+'</p></div>';
          $container.append(imagez + subscription);
          }
         $('#eventsGallery').append($container);
      }
    }
  });
}

onLoad1();
