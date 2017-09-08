class CreateAchievements < ActiveRecord::Migration
  def change
    create_table :achievements do |t|
      t.string :title,       null: false, default: ""
      t.string :item_icon
      t.integer :resume_id
      t.string :description, null: false, default: ""
      t.timestamps null: false
    end
  end
end
