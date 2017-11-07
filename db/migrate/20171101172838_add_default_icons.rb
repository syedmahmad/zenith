class AddDefaultIcons < ActiveRecord::Migration
  def change
  	add_column :passions, :icon, :string, default: "fa-heart"
  	add_column :strengths, :icon, :string, default: "fa-star"
  	change_column :awards, :icon, :string, default: "fa-trophy"
  end
end
