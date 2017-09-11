class Layout < ActiveRecord::Base
  enum layout_type: [ :single_column, :double_column ]

  serialize :section_data, Hash
  belongs_to :user
  belongs_to :resume
end
