class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|

      t.string :name,       null: false, default: ""
      t.string :location,       null: false, default: ""
      t.integer :resume_id
      t.string :duration,       null: false, default: ""
      t.string :description, null: false, default: ""
      t.timestamps null: false
    end
  end
end
