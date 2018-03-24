(function(window) {
  'use strict';
  var $ = window.jQuery;

  var FORM_SELECTOR = "[data-signup='form']";
  var FORM_SELECTOR_1 = "[data-login='form']";
  var SERVER_URL = 'http://localhost:2403/';
  var App = window.App;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;

  var remoteDS = new RemoteDataStore(SERVER_URL);

  var formHandler = new FormHandler(FORM_SELECTOR);
  var formHandler1 = new FormHandler(FORM_SELECTOR_1);

  // Signup form handling
  formHandler.addSubmitHandler(remoteDS);
  formHandler.addInputHandler();

  // Login form handling
  formHandler1.addSubmitHandler1(remoteDS);

  // Account management //
  function onLoad() {
    if (localStorage.isLoggedin) {
      $('#loginbutton').hide();
      $('#signupbutton').hide();
      $('#logoutbutton').show();
      $('#addSubmission').show();
    } else {
      $('#loginbutton').show();
      $('#signupbutton').show();
      $('#logoutbutton').hide();
      $('#addSubmission').hide();
    }
  }

  onLoad();
  // Account Management //

})(window);
