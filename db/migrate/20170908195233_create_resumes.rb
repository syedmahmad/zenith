class CreateResumes < ActiveRecord::Migration
  def change
    create_table :resumes do |t|

      t.string :name,       null: false, default: ""
      t.string :title,       null: false, default: ""
      t.integer :user_id
      t.string :description, null: false, default: ""
      t.timestamps null: false
    end
  end
end
