class RegistrationsController < Devise::RegistrationsController
  prepend_before_filter :require_no_authentication, :only => []
  def create
    # adding custom create logic...
    if current_user.user_type.eql?("guest")
      current_user.update_attributes(user_name: params[:user_name], email: params[:email], password: params[:password], user_type: "account")
      # not sign_out current_user as we need same user
      bypass_sign_in(current_user)
    else
      user = User.create(user_name: params[:user_name], email: params[:email], password: params[:password], user_type: "account")
      user.resumes.create
      sign_in(user)
    end
    redirect_to '/'
  end

end 