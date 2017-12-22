class AddPageFieldInSections < ActiveRecord::Migration
  def change
  	add_column :achievements, :page, :integer, default: 0
	add_column :awards,       :page, :integer, default: 0
	add_column :certificates, :page, :integer, default: 0
	add_column :courses,      :page, :integer, default: 0
	add_column :educations,   :page, :integer, default: 0
	add_column :experiences,  :page, :integer, default: 0
	add_column :languages,    :page, :integer, default: 0
	add_column :passions,     :page, :integer, default: 0
	add_column :projects,     :page, :integer, default: 0
	add_column :quotes,       :page, :integer, default: 0
	add_column :volunteers,   :page, :integer, default: 0
	add_column :strengths,    :page, :integer, default: 0
	add_column :technologies, :page, :integer, default: 0
	add_column :skills,       :page, :integer, default: 0
  end
end
