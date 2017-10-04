class ResumeStyle < ActiveRecord::Base
  belongs_to :resume
  serialize :available_background_images, Array
  serialize :available_fonts, Array
  serialize :available_primary_colors, Array
  serialize :available_secondary_colors, Array
  
  def self.create_default(resume_id)
    ResumeStyle.create(resume_id: resume_id, background_img:"white.png", :available_background_images => ["white.png","arches.png","checkered.png","handmade.png","paper.png","psychedelic.png","struckaxiom.png","vichy.png","weave.png","worn.png"],
      font_family:"Lato", :available_fonts => ["Lato","Playfair Display","Abril Fatface","Raleway","Montserrat","Exo 2","Oswald","Chivo","Roboto Slab"],
      primary_color:"black", secondary_color: "#00a7dd", :available_secondary_colors => ["black","#8616cc","#FF0F0F","#CF924A","#A861A6","#00a7dd","#FA6C00","#FB51A5","#5ac41d","#36006B"],
      :available_primary_colors => ["black","#012B7E","#36006B","#58320E","#8616cc","#FF0F0F","#FB51A5"])
  end
end