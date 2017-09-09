class CreatePassions < ActiveRecord::Migration
  def change
    create_table :passions do |t|
      t.string :name,       null: false, default: ""
      t.integer :resume_id
      t.string :icon
      t.timestamps null: false
    end
  end
end
