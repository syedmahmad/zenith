class SessionsController < Devise::SessionsController
 
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