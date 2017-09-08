class CreateCertificates < ActiveRecord::Migration
  def change
    create_table :certificates do |t|
      t.string :name,       null: false, default: ""
      t.string :institutiion_name,       null: false, default: ""
      t.integer :resume_id
      t.timestamps null: false
    end
  end
end
