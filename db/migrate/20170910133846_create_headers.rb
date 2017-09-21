class CreateHeaders < ActiveRecord::Migration
  def change
    create_table :headers do |t|
      t.string :name,        null: false, default: ""
      t.string :job_title,        null: false, default: ""

      t.string :phone,        null: false, default: ""
      t.string :email,        null: false, default: ""
      t.string :location,        null: false, default: ""
      t.string :website_link,        null: false, default: ""
            
      t.boolean :show_name,              default: true
      t.boolean :show_location,              default: true
      t.boolean :show_job_title,              default: true
      t.boolean :show_phone,              default: true
      t.boolean :show_email,              default: true
      t.boolean :shwo_website_link,              default: true
      t.boolean :show_avatar,              default: true
      t.integer :resume_id
      t.timestamps null: false
    end
  end
end
