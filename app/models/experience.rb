class Experience < ActiveRecord::Base
	belongs_to :resume
  serialize :outcomes, Array
	default_scope { order('item_index ASC') }
end
