class ResumeStyle < ActiveRecord::Base
  belongs_to :resume
  serialize :background_images, Array
  
  def self.create_default(resume_id)
    ResumeStyle.create(resume_id: resume_id, background_img:"white.png", :background_images => ["arches.png","checkered.png","handmade.png","paper.png","psychedelic.png","struckaxiom.png","vichy.png","weave.png","worn.png"])
  end
end
