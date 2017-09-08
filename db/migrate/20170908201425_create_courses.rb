class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :title,       null: false, default: ""
      t.integer :resume_id
      t.string :description, null: false, default: ""
      t.timestamps null: false
    end
  end
end
