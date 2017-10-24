class CreateExperiences < ActiveRecord::Migration
  def change
    create_table :experiences do |t|
      t.string :title,       null: false, default: ""
      t.string :company_name,       null: false, default: ""
      t.string :location,       null: false, default: ""
      t.integer :resume_id
      t.string :duration,       null: false, default: ""
      t.text :outcomes
      t.string :description, null: false, default: ""
      t.boolean :ongoing, default: true
      t.timestamps null: false
    end
  end
end
