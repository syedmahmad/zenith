class CreateLayouts < ActiveRecord::Migration
  def change
    create_table :layouts do |t|
      t.integer :layout_type,              default: 1
      t.string :section_name,       null: false, default: ""
      t.text :section_data
      t.integer :user_id
      t.timestamps null: false
      
    end
  end
end
