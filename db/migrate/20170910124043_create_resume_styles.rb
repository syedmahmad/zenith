class CreateResumeStyles < ActiveRecord::Migration
  def change
    create_table :resume_styles do |t|
      t.string :background
      t.string :fontbody
      t.string :fontheading
      t.string :color
      t.integer :resume_id
      t.timestamps null: false
    end
  end
end
