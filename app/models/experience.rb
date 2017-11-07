class Experience < ActiveRecord::Base
	belongs_to :resume
  serialize :outcomes, Array
	default_scope { order('item_index ASC, created_at DESC') }


  def self.create_default(resume_id)
    Experience.create(resume_id: resume_id, :outcomes => [""])
  end
end
