class CreateEducations < ActiveRecord::Migration
  def change
    create_table :educations do |t|
      t.string :degree_name,       null: false, default: ""
      t.string :university_name,       null: false, default: ""
      t.integer :resume_id
      t.string :duration,       null: false, default: ""
      t.float :cgpa
      t.timestamps null: false
    end
  end
end
