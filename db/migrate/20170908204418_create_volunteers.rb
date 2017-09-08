class CreateVolunteers < ActiveRecord::Migration
  def change
    create_table :volunteers do |t|
		t.string :title,       null: false, default: ""
		t.string :organization_name,       null: false, default: ""
		t.integer :resume_id
		t.string :duration,       null: false, default: ""
		t.string :description, null: false, default: ""
		t.timestamps null: false
    end
  end
end
