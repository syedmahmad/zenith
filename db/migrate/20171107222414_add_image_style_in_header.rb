class AddImageStyleInHeader < ActiveRecord::Migration
  def change
  	add_column :headers, :image_style, :string, default: "circle"
  end
end
