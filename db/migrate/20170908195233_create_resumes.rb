class CreateResumes < ActiveRecord::Migration
  def change
    create_table :resumes do |t|
      t.string :name
      t.integer :layout_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
