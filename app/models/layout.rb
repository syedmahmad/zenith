class Layout < ActiveRecord::Base
  enum layout_type: [ :single_column, :double_column ]

  after_initialize :add_sections
  serialize :section_names, Array
  serialize :section_data, Array
  belongs_to :user
  belongs_to :resume

  def self.create_default(resume_id)
    Layout.create(resume_id: resume_id,section_names:["Experiences", "Education", "Strengths", "Achievements", "Languages", "Projects"])
  end

  def add_sections
  	self.section_names = ["Experiences", "Education", "Strengths", "Achievements", "Languages", "Projects"]
  end
end
