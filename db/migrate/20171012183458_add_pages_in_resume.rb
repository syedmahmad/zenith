class AddPagesInResume < ActiveRecord::Migration
  def change
  	add_column :resumes, :pages, :integer, default: 1
  end
end
