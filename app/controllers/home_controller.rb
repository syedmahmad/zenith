class HomeController < ApplicationController
  layout 'home'

  def index
    @user = current_user
  end

  def terms
  end

  def privacy
  end

  # def cookies
  # end

  def about
  end

end
