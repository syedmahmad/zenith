class RegistrationsController < Devise::RegistrationsController

  def create
    # add custom create logic here
    user = User.create(user_name: params[:user_name], email: params[:email], password: params[:password])
    sign_in(user)
    redirect_to '/'
  end

end 