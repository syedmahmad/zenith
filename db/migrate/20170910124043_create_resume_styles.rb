class CreateResumeStyles < ActiveRecord::Migration
  def change
    create_table :resume_styles do |t|
      t.string :background_img
      t.text :available_background_images
      t.string :font_family
      t.text :available_fonts
      t.integer :resume_id
      t.timestamps null: false
    end
  end
end
