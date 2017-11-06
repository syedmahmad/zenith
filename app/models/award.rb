class Award < ActiveRecord::Base
	belongs_to :resume
	default_scope { order('item_index ASC, created_at DESC') }
end
