class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  
  def all
   auth = request.env["omniauth.auth"]
   user = User.where(provider: auth.provider, uid: auth.uid).take 
   if user.present?
     flash.notice = "Signed in!"
     sign_in(user)
     redirect_to new_user_registration_path
   else
      user = User.from_omniauth(auth)
      if current_user.present? && current_user.update_attributes(user)
        redirect_to new_user_registration_path
      else
        if user["email"].present?
          user = User.create(user)
          user.resumes.create
          sign_in(user)
        end
        # here we need to show error messages or redirect to error page....
        redirect_to "/"
      end
   end
 end
  
  alias_method :facebook, :all
  alias_method :twitter, :all
  alias_method :linkedin, :all
  alias_method :google_oauth2, :all
end