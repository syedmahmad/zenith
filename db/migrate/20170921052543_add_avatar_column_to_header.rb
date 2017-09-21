class AddAvatarColumnToHeader < ActiveRecord::Migration
  def change
    add_attachment :headers, :avatar
  end
end
