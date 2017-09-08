class CreateTechnologies < ActiveRecord::Migration
  def change
    create_table :technologies do |t|
      t.string :name,       null: false, default: ""
      t.text :tec_names, array: true, default: []
      t.timestamps null: false
    end
  end
end
