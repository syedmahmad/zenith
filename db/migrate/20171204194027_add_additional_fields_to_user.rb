class AddAdditionalFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :street_address, :string
    add_column :users, :postal_code, :string
    add_column :users, :city, :string
    add_column :users, :country, :string
    add_column :users, :experience, :string
    add_column :users, :profession, :string
  end
end
