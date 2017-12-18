/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: http://creative-tim.com
 *
 */

(function() {
  window.LoginService = {};

  LoginService.showRegisterForm = function() {
    $('.loginBox').fadeOut('fast', function() {
      $('.registerBox').fadeIn('fast');

      $('.login-footer').fadeOut('fast',function() {
        $('.register-footer').fadeIn('fast');
      });

      $('#loginModal .modal-title').html('Register with');
    });

    $('.message').removeClass('alert alert-danger alert-success').html('');
  }

  LoginService.showLoginForm = function() {
    $('#loginModal .registerBox, #loginModal .forgotPasswordBox, #loginModal .unlockBox').fadeOut('fast', function() {
      $('.loginBox').fadeIn('fast');

      $('.register-footer').fadeOut('fast',function() {
        $('.login-footer').fadeIn('fast');
      });

      $('#loginModal .modal-title').html('Login with');
    });

    $('.message').removeClass('alert alert-danger alert-success').html('');
  }

  LoginService.showForgotPasswordForm = function() {
    $('#loginModal .loginBox').fadeOut('fast', function() {
      $('.forgotPasswordBox').fadeIn('fast');

      $('.login-footer').fadeOut('fast',function() {
        $('.register-footer').fadeIn('fast');
      });

      $('#loginModal .modal-title').html('Forgot Password');
    });

    $('.message').removeClass('alert alert-danger alert-success').html('');
  }

  LoginService.showUnlockForm = function() {
    $('#loginModal .loginBox').fadeOut('fast', function() {
      $('.unlockBox').fadeIn('fast');

      $('.login-footer').fadeOut('fast',function() {
        $('.register-footer').fadeIn('fast');
      });

      $('#loginModal .modal-title').html('Unlock your Account');
    });

    $('.message').removeClass('alert alert-danger alert-success').html('');
  }


  LoginService.openLoginModal = function() {
    this.showLoginForm();
    setTimeout(function(){
      $('.ui-modal').modal('hide');
      $('#loginModal').modal('show');
    }, 230);
  }

  LoginService.openRegisterModal = function() {
    this.showRegisterForm();
    setTimeout(function(){
      $('#loginModal').modal('show');
    }, 230);
  }

  LoginService.shakeModal = function(message) {
    $('#loginModal .modal-dialog').addClass('shake');
    $('.message').addClass('alert alert-danger').html(message);
    $('input[type="password"]').val('');

    setTimeout(function(){
      $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000);
  }

  LoginService.showAlertSuccess = function(message) {
    $('.message').removeClass('alert alert-danger');
    $('.message').addClass('alert alert-success').html(message);

    setTimeout(function(){
      this.closeModal();
    }.bind(this), 3500);
  }

  LoginService.closeModal = function() {
    $('#loginModal').modal('hide');
  }

  $("form#login-form").bind("ajax:success", function() {
    window.location.href = '/builder'
  });

  $("form#login-form").bind("ajax:error", function(_, data) {
    LoginService.shakeModal(data.responseText);
  });

  $("form#signup-form").bind("ajax:success", function() {
    LoginService.showAlertSuccess('You will receive an email to confirm your account.');
  });

  $("form#signup-form").bind("ajax:error", function() {
    LoginService.shakeModal("Email already taken or passwords don't match");
  });

  $("form#forgot-form").bind("ajax:success", function() {
    LoginService.showAlertSuccess('You will receive an email with the instructions to reset your password.');
  });

  $("form#forgot-form").bind("ajax:error", function() {
    LoginService.shakeModal('Something went wrong.');
  });

  $("form#unlock-form").bind("ajax:success", function() {
    LoginService.showAlertSuccess('Yoi will receive an email with a link to unlock your account');
  });

  $("form#unlock-form").bind("ajax:error", function(_, data) {
    var message;
    var emailError = data.responseJSON.errors.email;

    if(emailError) {
      message = 'Email ' + emailError[0];
    } else {
      message = 'Something went wrong';
    }

    LoginService.shakeModal(message);
  });
})();
