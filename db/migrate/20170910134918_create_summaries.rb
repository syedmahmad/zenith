class CreateSummaries < ActiveRecord::Migration
  def change
    create_table :summaries do |t|
      t.string :name,       null: false, default: ""
      t.string :title,       null: false, default: ""
      t.integer :resume_id
      t.string :description, null: false, default: ""
      t.timestamps null: false
    end
  end
end
