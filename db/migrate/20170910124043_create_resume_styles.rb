class CreateResumeStyles < ActiveRecord::Migration
  def change
    create_table :resume_styles do |t|
      t.string :background_img
      t.text :available_background_images
      t.string :font_family
      t.text :available_fonts
      t.string :primary_color, :default => "black"
      t.string :secondary_color, :default => "#00a7dd"
      t.text :available_primary_colors
      t.text :available_secondary_colors
      t.integer :resume_id
      t.timestamps null: false
    end
  end
end
