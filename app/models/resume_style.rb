class ResumeStyle < ActiveRecord::Base
  belongs_to :resume
  serialize :available_background_images, Array
  serialize :available_fonts, Array
  serialize :available_colors, Array
  
  def self.create_default(resume_id)
    ResumeStyle.create(resume_id: resume_id, background_img:"white.png", :available_background_images => ["white.png","arches.png","checkered.png","handmade.png","paper.png","psychedelic.png","struckaxiom.png","vichy.png","weave.png","worn.png"],
      font_family:"Lato", :available_fonts => ["Lato","Playfair Display","Abril Fatface","Raleway","Montserrat","Exo 2","Oswald","Chivo","Roboto Slab"],
      color:"black", :available_colors => ["black","#8616cc","#FF0F0F","#CF924A","#A861A6","#00a7dd","#FA6C00","#FB51A5","#5ac41d","#36006B"])
  end
end