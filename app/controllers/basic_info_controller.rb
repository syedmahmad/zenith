class BasicInfoController < ApplicationController
  
  def new
    # redirect_to root_path and return if current_or_guest_user.guest?
    @user = current_user
  end

  def edit
    # redirect_to root_path and return if current_or_guest_user.guest?
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update_attributes(basic_info_params)
      redirect_to new_user_registration_path
    else
      flash[:warning] = 'All fields are required!'
      render :new
    end
  end

  private

  def basic_info_params
    params.require(:user).permit(
      :user_name,
      :full_name,
      :street_address,
      :postal_code,
      :city,
      :country,
      :experience,
      :profession
    )
  end
   
end