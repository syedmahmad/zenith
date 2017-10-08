class Achievement < ActiveRecord::Base
	belongs_to :resume
	default_scope { order('item_index ASC') }
end
