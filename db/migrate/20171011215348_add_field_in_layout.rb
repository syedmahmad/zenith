class AddFieldInLayout < ActiveRecord::Migration
  def change
  	add_column :layouts, :underline, :boolean, default: true
  end
end
