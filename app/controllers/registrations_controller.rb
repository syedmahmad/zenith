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

  def new
    if current_user.user_type.eql?("guest")
      # only update user_type here as all other fields will become updated once user come here...
      if current_user.update_attributes(user_type: "real")
        calculate_basic_info
      end
    else
      calculate_basic_info
    end
  end

  private
    def calculate_basic_info
      # redirect user if its basic info not completed........
      if current_user.profession.nil? && current_user.street_address.nil?
        redirect_to new_basic_info_path
      else
        bypass_sign_in(current_user)
        redirect_to '/'
      end
    end

end 