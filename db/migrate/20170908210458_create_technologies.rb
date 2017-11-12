class CreateTechnologies < ActiveRecord::Migration
  def change
    create_table :technologies do |t|
      t.string :name,       null: false, default: ""
      t.string :tec_names,  null: false, default: ""
      t.timestamps null: false
    end
  end
end
