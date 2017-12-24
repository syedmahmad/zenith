class CvBuilder < ActiveRecord::Base

  attr_accessible :resume_id, :created_at, :updated_at, :avatar_file_name, :avatar_content_type, :avatar_file_size, :avatar_updated_at, :img_url
  , :available_background_images, :available_primary_colors, :available_secondary_colors, :available_primary_fonts, :available_secondary_fonts, :available_font_sizes, :resume_id, :created_at, :updated_at
  
end
