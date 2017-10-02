class RemoveColumnFromHeader < ActiveRecord::Migration
  def change
  	remove_column :headers, :shwo_website_link, :boolean, default: true
  	add_column :headers, :show_website_link, :boolean, default: true
  end
end
