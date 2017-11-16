class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
  	puts "inside callback ..................\n"*100
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      puts "inside id persisted ..................\n"*100
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      puts "inside else persisted ..................\n"*100
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def failure
  	puts "inside failure ..................\n"*100
    redirect_to root_path
  end
end