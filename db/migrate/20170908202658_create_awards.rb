class CreateAwards < ActiveRecord::Migration
  def change
    create_table :awards do |t|
      t.string :name,       null: false, default: ""
      t.integer :resume_id
      t.string :icon
      t.timestamps null: false
    end
  end
end
