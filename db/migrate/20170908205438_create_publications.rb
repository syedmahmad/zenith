class CreatePublications < ActiveRecord::Migration
  def change
    create_table :publications do |t|
      t.string :name,       null: false, default: ""
      t.string :authors_name,       null: false, default: ""
      t.integer :resume_id
      t.string :date,       null: false, default: ""
      t.string :url
      t.string :description,       null: false, default: ""
      t.timestamps null: false
    end
  end
end
