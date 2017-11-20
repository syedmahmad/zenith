class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable, :omniauthable,
          :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook, :twitter, :linkedin, :google_oauth2]
  has_many :resumes

  def self.from_omniauth(auth)
   where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
     user.provider = auth.provider
     user.uid = auth.uid
     user.oauth_token = auth.credentials.token
     user.first_name = auth.extra.raw_info.first_name
     user.last_name = auth.extra.raw_info.last_name

     if auth.provider == "facebook"
       user.user_name = auth.info.name
       user.email = auth.extra.raw_info.email
       # Facebook's token doesn't last forever
       # user.oauth_expires_at = Time.at(auth.credentials.expires_at)
       user.save
     elsif auth.provider == "linkedin" || auth.provider == "google_oauth2"
       # Google's token doesn't last forever
       # user.oauth_expires_at = Time.at(auth.credentials.expires_at)
       user.user_name = auth.info.nickname
       user.email = auth.info.email
       user.save
     elsif auth.provider == "twitter" 
       user.user_name = auth.extra.raw_info.name
       user.save
     end
   end
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
