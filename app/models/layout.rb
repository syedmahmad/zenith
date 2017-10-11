class Layout < ActiveRecord::Base
  enum layout_type: [ :single, :double]

  serialize :section_names, Array
  serialize :section_data, Array
  belongs_to :user
  belongs_to :resume

  def self.create_default(resume_id)
    Layout.create(resume_id: resume_id, section_names:["Experiences", "Education", "Strengths", "Achievements", "Languages", "Projects"], :section_data => [{name: "Experiences", page: 0, column: 0}, {name: "Achievements", page: 0, column: 1}, {name: "Education", page: 0, column: 0}, {name: "Languages", page: 0, column: 1}, {name: "Strengths", page: 0, column: 0}, {name: "Projects", page: 0, column: 1}])
  end

  def get_json
  	{id: id, underline: underline, resume_id: resume_id, layout_type: layout_type, section_names: section_names, section_data: section_data}	
  end
end