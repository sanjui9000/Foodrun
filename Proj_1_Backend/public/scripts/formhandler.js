(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    } else if (this.$formElement[0].id == "signupform") {

      FormHandler.prototype.addSubmitHandler = function(ds) {
        this.$formElement.on("submit", function(event) {
          event.preventDefault();

          var data = {};
          $(this).serializeArray().forEach(function(item) {
            data[item.name] = item.value;
          });
          this.reset();
          ds.add(data);
        });
      };

      FormHandler.prototype.addInputHandler = function() {
        this.$formElement.on("input", "[name='username']", function(event) {
          var username = event.target.value;
          var message = "";
          var re = /^(?=.*\d).{8,}$/;
          if (re.test(String(username).toLowerCase())) {
            event.target.setCustomValidity("");
          } else {
            message = "Username should be at least 8 characters with 1 digit.";
            event.target.setCustomValidity(message);
          }
        });

        this.$formElement.on("input", "[name='email']", function(event) {
          var emailAddress = event.target.value;
          var message = "";
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(String(emailAddress).toLowerCase())) {
            event.target.setCustomValidity("");
          } else {
            message = emailAddress + " is not an authorized email address.";
            event.target.setCustomValidity(message);
          }
        });

        this.$formElement.on("input", "[name='password']", function(event) {
          var password = event.target.value;
          var message = "";
          var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
          if (re.test(String(password))) {
            event.target.setCustomValidity("");
          } else {
            message = "Password should contain at least 8 characters with atleast 1 numeric character, 1 lowercase letter, 1 uppercase letter & 1 special character";
            event.target.setCustomValidity(message);
          }
        });

        this.$formElement.on("input", "[name='password2']", function(event) {
          var password = event.target.value;
          var message = "";
          if (password == $('#password')[0].value) {
            event.target.setCustomValidity("");
          } else {
            message = "Both passwords should match";
            event.target.setCustomValidity(message);
          }
        });
      };
    } else if (this.$formElement[0].id == "loginform") {
      FormHandler.prototype.addSubmitHandler1 = function(ds) {
        this.$formElement.on("submit", function(event) {
          event.preventDefault();
          var data = {};
          $(this).serializeArray().forEach(function(item) {
            data[item.name] = item.value;
          });
          var data1 = {};
          data1.username = data.loginemail1;
          data1.password = data.loginpassword1;
          this.reset();
          ds.authenticate(data1);
        });
      };
    }
  }

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
