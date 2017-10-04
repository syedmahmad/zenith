class CreateResumeStyles < ActiveRecord::Migration
  def change
    create_table :resume_styles do |t|
      t.string :background_img
      t.text :available_background_images
      t.string :primary_color, :default => "black"
      t.string :secondary_color, :default => "#00a7dd"
      t.text :available_primary_colors
      t.text :available_secondary_colors
      
      t.string :primary_font
      t.string :secondary_font
      t.string :font_size
      t.text :available_primary_fonts
      t.text :available_secondary_fonts
      t.text :available_font_sizes

      t.integer :resume_id
      t.timestamps null: false
    end
  end
end
