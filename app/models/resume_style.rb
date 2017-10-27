class ResumeStyle < ActiveRecord::Base
  belongs_to :resume
  serialize :available_background_images, Array
  serialize :available_fonts, Array
  serialize :available_primary_colors, Array
  serialize :available_secondary_colors, Array

  serialize :available_primary_fonts, Array
  serialize :available_secondary_fonts, Array
  serialize :available_font_sizes, Array
  
  def self.create_default(resume_id)
    ResumeStyle.create(resume_id: resume_id, background_img:"handmade.png", 
      :available_background_images => ["white.png","arches.png","checkered.png","handmade.png","paper.png","psychedelic.png","struckaxiom.png","vichy.png","weave.png","worn.png"],
       primary_font:"Exo 2", secondary_font: "Roboto", font_size: "12px",
      :available_primary_fonts => ['Droid Sans','Exo 2','Lato','Montserrat','Oswald','Roboto','Slabo 27px'],
      :available_secondary_fonts => ['Exo 2','Lato','Open Sans','Raleway','Roboto','Roboto Condensed','Slabo 27px'],
      :available_font_sizes => ['10px', '11px', '12px', '14px', '16px'],
       primary_color:"black", secondary_color: "#00a7dd", 
      :available_secondary_colors => ["black","#8616cc","#FF0F0F","#CF924A","#A861A6","#00a7dd","#FA6C00","#FB51A5","#5ac41d","#36006B"],
      :available_primary_colors => ["black","#012B7E","#36006B","#58320E","#8616cc","#FF0F0F","#FB51A5"])
  end
end