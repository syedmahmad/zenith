class AddFieldsInLanguages < ActiveRecord::Migration
  def change
  	add_column :languages, :resume_id, :integer
  	add_column :technologies, :resume_id, :integer
  	add_column :skills, :resume_id, :integer
  end
end
