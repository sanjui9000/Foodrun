(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(data) {
    $.ajax({
      url: this.serverUrl + 'users',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function() {
        console.log('Data added successfully.');
      },
      error: function(error) {
        Error(error);
      }
    });
  };

  RemoteDataStore.prototype.authenticate = function(data) {
    $.ajax({
      url: this.serverUrl + 'users/login',
      type: 'POST',
      data: data,
      success: function(response) {
        $('#loginmessage').hide();
        localStorage.setItem("uid", response.uid);
        localStorage.setItem("isLoggedin", response.id);
        $('#loginModal').modal('hide');
        $('#loginbutton').hide();
        $('#signupbutton').hide();
        $('#logoutbutton').show();
        $('#addSubmission').show();
      },
      error: function(error) {
        $('#loginmessage').html('Please enter a valid username/password combination.');
        $('#loginmessage').slideToggle();
      }
    });
  };

  RemoteDataStore.prototype.getCurrentUser = function() {
    var currUid = localStorage.uid;
    if (!currUid) {
      Error('Some issue with getting current user token');
    } else {
      return currUid;
    }
  }

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
