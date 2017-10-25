class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|

      t.string :name,       null: false, default: ""
      t.string :location,       null: false, default: ""
      t.integer :resume_id
      t.text    :outcomes
      t.boolean :show_outcomes,    default: true
      t.string :duration,       null: false, default: ""
      t.string :description, null: false, default: ""
      t.boolean :ongoing, default: false
      t.timestamps null: false
    end
  end
end
