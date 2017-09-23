class Layout < ActiveRecord::Base
  enum layout_type: [ :single_column, :double_column ]

  serialize :section_names, Array
  serialize :section_data, Array
  belongs_to :user
  belongs_to :resume

  def self.create_default(resume_id)
    Layout.create(resume_id: resume_id, section_names:["Experiences", "Education", "Strengths", "Achievements", "Languages", "Projects"], section_data: [{name: "Experiences", page: 0}, {name: "Education", page: 0}, {name: "Strengths", page: 0}, {name: "Achievements", page: 0}, {name: "Languages", page: 0}, {name: "Projects", page: 0}])
  end
end