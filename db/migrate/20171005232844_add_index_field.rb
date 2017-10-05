class AddIndexField < ActiveRecord::Migration
  def change
  	add_column :achievements, :item_index, :integer
	add_column :awards, :item_index, :integer
	add_column :certificates, :item_index, :integer
	add_column :courses, :item_index, :integer
	add_column :educations, :item_index, :integer
	add_column :experiences, :item_index, :integer
	add_column :languages, :item_index, :integer
	add_column :passions, :item_index, :integer
	add_column :projects, :item_index, :integer
	add_column :quotes, :item_index, :integer
	add_column :volunteers, :item_index, :integer
	add_column :strengths, :item_index, :integer
	add_column :technologies, :item_index, :integer
	add_column :skills, :item_index, :integer
  end
end
