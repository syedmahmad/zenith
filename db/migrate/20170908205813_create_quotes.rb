class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
      t.string :name,       null: false, default: ""
      t.integer :resume_id
      t.timestamps null: false
    end
  end
end
