class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
  devise :database_authenticatable, :registerable, :omniauthable,
          :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook, :twitter, :linkedin, :google_oauth2]
  has_many :resumes

  # user_omniauth_authorize_path(provider)
  # user_omniauth_callback_path(provider)

  # def self.from_omniauth(auth)
  #   where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
  #     user.email = auth.info.email
  #     user.encrypted_password = Devise.friendly_token[0,20]
  #     user.user_name = auth.info.name   # assuming the user model has a name
  #     # user.image = auth.info.image # assuming the user model has an image
  #     # If you are using confirmable and the provider(s) you use validate emails, 
  #     # uncomment the line below to skip the confirmation emails.
  #     # user.skip_confirmation!
  #   end
  # end

   # def self.from_omniauth(auth, signed_in_resource = nil)
   #  puts "from_omniauth   .....................\n"*100
   #   user = User.where(provider: auth.provider, uid: auth.uid).first
   #    if user.present?
   #     user
   #    else
   #      # Check wether theres is already a user with the same 
   #      # email address
   #      user_with_email = User.find_by_email(auth.info.email)
   #      if user_with_email.present?
   #        user = user_with_email
   #      else
   #        user = User.new
   #        if auth.provider == "facebook"

   #          user.provider = auth.provider
   #          user.uid = auth.uid
   #          user.oauth_token = auth.credentials.token

   #          user.first_name = auth.extra.raw_info.first_name
   #          user.last_name = auth.extra.raw_info.last_name
   #          user.email = auth.extra.raw_info.email
   #          # Facebook's token doesn't last forever
   #          # user.oauth_expires_at = Time.at(auth.credentials.expires_at)
   #          user.save
   #        elsif auth.provider == "linkedin" 

   #          user.provider = auth.provider
   #          user.uid = auth.uid
   #          user.oauth_token = auth.credentials.token

   #          user.first_name = auth.info.first_name
   #          user.last_name = auth.info.last_name
   #          user.email = auth.info.email

   #          user.save
   #          elsif auth.provider == "twitter" 

   #          user.provider = auth.provider
   #          user.uid = auth.uid
   #          user.oauth_token = auth.credentials.token

   #          user.user_name = auth.extra.raw_info.name

   #        elsif auth.provider == "google_oauth2"

   #          user.provider = auth.provider
   #          user.uid = auth.uid
   #          user.oauth_token = auth.credentials.token

   #          user.first_name = auth.info.first_name
   #          user.last_name = auth.info.last_name
   #          user.email = auth.info.email
   #          # Google's token doesn't last forever
   #          # user.oauth_expires_at = Time.at(auth.credentials.expires_at)
   #          user.save
   #      end
   #     end    
   #   end
   #   return user
   # end
   # # For Twitter (save the session eventhough we redirect user to registration page first)
   # def self.new_with_session(params, session)
   #   if session["devise.user_attributes"]
   #     new(session["devise.user_attributes"], without_protection: true) do |user|
   #       user.attributes = params
   #       user.valid?
   #     end
   #   else
   #     super
   #   end  
   # end  
   # # For Twitter (disable password validation)
   # def password_required?
   #   super && provider.blank?
   # end 


   def self.from_omniauth(auth)
     where(auth.slice(:provider, :uid)).first_or_create do |user|
       user.provider = auth.provider
       user.uid = auth.uid
       user.user_name = auth.info.nickname
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
