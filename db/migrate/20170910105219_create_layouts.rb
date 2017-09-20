class CreateLayouts < ActiveRecord::Migration
  def change
    create_table :layouts do |t|
      t.integer :layout_type,              default: 1
      t.text :section_names
      t.text :section_data
      t.integer :resume_id
      t.integer :user_id
      t.timestamps null: false
      
    end
  end
end
