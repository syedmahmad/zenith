class Project < ActiveRecord::Base
	belongs_to :resume
  serialize :outcomes, Array
	default_scope { order('item_index ASC') }

  def self.create_default(resume_id)
    Project.create(resume_id: resume_id, :outcomes => [""])
  end
end
