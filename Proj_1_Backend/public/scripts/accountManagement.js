/* eslint-disable */

(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function AccountMgmt(element) {
    if (element) {
      this.$logoutElement = $(element);
      AccountMgmt.prototype.addLogoutHandler = function() {
        this.$logoutElement.on("click", function() {
          localStorage.clear();
          $('#loginbutton').show();
          $('#signupbutton').show();
          $('#myfoodbutton').hide();
          $('#logoutbutton').hide();
          $('#addSubmission').hide();
        });
      };
    }
  }

  AccountMgmt.prototype.addInititalLoadHandler = function() {
    if (localStorage.isLoggedin) {
      $('#loginbutton').hide();
      $('#signupbutton').hide();
      $('#myfoodbutton').show();
      $('#logoutbutton').show();
      $('#addSubmission').show();
    } else {
      $('#loginbutton').show();
      $('#signupbutton').show();
      $('#myfoodbutton').hide();
      $('#logoutbutton').hide();
      $('#addSubmission').hide();
    }

    $.ajax({
      type: "GET",
      url: 'http://localhost:2403/submissions',
      success: function(data) {
        if (data) {
          for (var row in data) {
            var images = '<div class="col-md-3"><div class="thumbnail"> <img src="' + data[row].imgPath + '" alt="">';
            var name = '<div class="caption"><p class="imgName">' + data[row].name + '</p>'
            // var subscription = '<p class="imgDescription">'+data[row].description+'</p>'
            // var buttonLike = '<p><a href="#" class="btn btn-info btn-xs" role="button">Like</a>'
            // var buttonComment = '<a href="#" class="btn btn-default btn-xs" role="button">Comment</a></p></div></div></div>';
            $('#eventsGallery').append(images + name);
          }
        }
      }
    });
  };

  App.AccountMgmt = AccountMgmt;
  window.App = App;

})(window);
