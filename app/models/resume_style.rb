class ResumeStyle < ActiveRecord::Base
  belongs_to :resume
  serialize :available_background_images, Array
  serialize :available_fonts, Array
  
  def self.create_default(resume_id)
    ResumeStyle.create(resume_id: resume_id, background_img:"white.png", :available_background_images => ["white.png","arches.png","checkered.png","handmade.png","paper.png","psychedelic.png","struckaxiom.png","vichy.png","weave.png","worn.png"],
      font_family:"Lato", :available_fonts => ["Lato","Playfair Display","Abril Fatface","Raleway","Montserrat","Exo 2","Oswald","Chivo","Roboto Slab"])
  end
end