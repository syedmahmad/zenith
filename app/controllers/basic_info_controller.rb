class BasicInfoController < ApplicationController
  layout "basic_info"
  before_action :varify_passwords, only: [:update]

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
      if params[:user].has_key?(:encrypted_password) || params[:user].has_key?(:password)
        bypass_sign_in(@user)
      end
      redirect_to new_user_registration_path
    else
      flash[:warning] = @user.errors.full_messages.first
      render :new
    end
  end

  def update_password
    @user = current_user
  end

  private

  def basic_info_params
    params.require(:user).permit(
      :user_name,
      :street_address,
      :postal_code,
      :city,
      :country,
      :experience,
      :profession,
      :current_password,
      :password_confirmation,
      :encrypted_password
    )
  end

  def varify_passwords
    @user = current_user
    if params[:user].has_key?(:encrypted_password) || params[:user].has_key?(:current_password) || params[:user].has_key?(:password_confirmation) 
      if !current_user.valid_password?(params[:user][:current_password])
        flash[:error] = 'Current password not correct!'
        render :action => :update_password
      elsif !params[:user][:password_confirmation].eql?(params[:user][:encrypted_password])        
        flash[:error] = 'Confirm password not match!'
        render :action => :update_password
      end
      true
    elsif params[:user].has_key?(:street_address)
      unless params[:user][:user_name].present? && params[:user][:street_address].present? && params[:user][:city].present? && params[:user][:postal_code].present? && params[:user][:country].present? && params[:user][:profession].present? && params[:user][:experience].present?
        flash[:error] = 'All fields are required!'
        if params[:action].eql?("update")
          render :action => :edit
        else
          render :action => :new
        end
      end
      true
    else
      true
    end
  end
   
end