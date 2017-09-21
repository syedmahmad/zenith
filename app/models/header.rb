class Header < ActiveRecord::Base
  belongs_to :resume
  # after_initialize :add_img_url
  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/default_avatar.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  # def add_img_url
  # 	puts "add_img_url .........................\n"*100
  # 	class << self
  # 	  attr_accessor :img_url
  # 	end
  # 	unless self.avatar.url != "/images/default_avatar.png"
  		
  # 	end
  # 	img_url = "/images/default_avatar.png"
  # end
end
