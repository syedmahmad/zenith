class AddDurationInCertificate < ActiveRecord::Migration
  def change
  	add_column :certificates, :duration, :string, default: ""
  	add_column :certificates, :show_period, :boolean, default: true
  end
end
