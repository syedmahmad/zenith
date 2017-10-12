class CreateLanguages < ActiveRecord::Migration
  def change
    create_table :languages do |t|
      t.string :name,       null: false, default: ""
      t.string :level,       default: "40"
      t.timestamps null: false
    end
  end
end
