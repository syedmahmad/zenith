class AddFieldsInLayout < ActiveRecord::Migration
  def change
  	add_column :layouts, :resume_id, :integer
  end
end
