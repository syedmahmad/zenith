class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable, :omniauthable,
          :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook, :twitter, :linkedin, :google_oauth2]
  has_many :resumes

  def self.from_omniauth(auth)
      params = {}

      params["provider"] = auth.provider
      params["uid"] = auth.uid
      params["oauth_token"] = auth.credentials.token
      params["first_name"] = auth.extra.raw_info.first_name
      params["last_name"] = auth.extra.raw_info.last_name

      if auth.provider == "facebook"
        params["user_name"] = auth.info.name
        if auth.extra.raw_info.email
          params["email"] = auth.extra.raw_info.email
        else
          params["email"] = "#{auth.info.name.gsub(" ","_")}@facebook.com"
        end
       # Facebook's token doesn't last forever
       # params["oauth_expires_at = Time.at(auth.credentials.expires_at)
       
      elsif auth.provider == "linkedin"
       # Google's token doesn't last forever
       # params["oauth_expires_at = Time.at(auth.credentials.expires_at)
        
        params["user_name"] = auth.info.nickname
        params["email"] = auth.info.email

      elsif auth.provider == "google_oauth2"
        params["email"] = auth.info.email
        params["user_name"] = auth.info.name
      elsif auth.provider == "twitter" 
        params["user_name"] = auth.extra.raw_info.name
        params["email"] = "#{auth.extra.raw_info.name.gsub(" ","_")}@facebook.com"
      end

      params
  end

  def self.new_with_session(params, session)
   if session["devise.user_attributes"]
     new(session["devise.user_attributes"], without_protection: true) do |user|
       user.attributes = params
       user.valid?
     end
   else
     super
   end
  end

  def password_required?
   super && provider.blank?
  end

  def update_with_password(params, *options)
   if encrypted_password.blank?
     update_attributes(params, *options)
   else
     super
   end
  end       
end
