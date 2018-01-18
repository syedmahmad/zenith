class SessionsController < Devise::SessionsController
  prepend_before_filter :require_no_authentication, only: [:cancel ]
  def create
    @user = User.find_by_email(params[:email])
    if @user != nil
      sign_in(@user)
    else
      flash[:success ] = "Sorry! something went wrong. Please try again."
    end
    redirect_to '/'
  end
   
end