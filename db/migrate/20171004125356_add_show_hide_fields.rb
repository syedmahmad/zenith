class AddShowHideFields < ActiveRecord::Migration
  def change
  	# Achievements
  	add_column :achievements, :show_title, :boolean, default: true
  	add_column :achievements, :show_description, :boolean, default: true

  	#Awards
  	add_column :awards, :description, :text
  	add_column :awards, :show_icon, :boolean, default: true
  	add_column :awards, :show_description, :boolean, default: true

  	#Certificates
  	add_column :certificates, :show_institutiion, :boolean, default: true

  	#Courses
  	add_column :courses, :show_description, :boolean, default: true

  	#Education
  	add_column :educations, :show_location, :boolean, default: true
  	add_column :educations, :show_period, :boolean, default: true
  	add_column :educations, :show_outcomes, :boolean, default: true
  	add_column :educations, :show_gpa, :boolean, default: true

  	#Experiences
  	add_column :experiences, :show_location, :boolean, default: true
  	add_column :experiences, :show_period, :boolean, default: true
  	add_column :experiences, :show_outcomes, :boolean, default: true
  	add_column :experiences, :show_description, :boolean, default: true
  	add_column :experiences, :show_link, :boolean, default: true

  	#Languages
  	add_column :languages, :show_proficiency, :boolean, default: true

  	#Passions
  	add_column :passions, :show_icon, :boolean, default: true
  	add_column :passions, :show_description, :boolean, default: true

  	#Projects
  	add_column :projects, :show_location, :boolean, default: true
  	add_column :projects, :show_period, :boolean, default: true
  	add_column :projects, :show_outcomes, :boolean, default: true
  	add_column :projects, :show_description, :boolean, default: true
  	add_column :projects, :show_link, :boolean, default: true

  	#Quotes
  	add_column :quotes, :author, :string
  	add_column :quotes, :show_author, :boolean, default: true

  	#Skills
  	add_column :skills, :show_level, :boolean, default: true

  	#Strengths
	add_column :strengths, :show_icon, :boolean, default: true
	add_column :strengths, :show_description, :boolean, default: true

	#Technologies
	add_column :technologies, :show_icon, :boolean, default: true
	add_column :technologies, :show_description, :boolean, default: true

	#Volunteers
	add_column :volunteers, :show_location, :boolean, default: true
  	add_column :volunteers, :show_period, :boolean, default: true
  	add_column :volunteers, :show_outcomes, :boolean, default: true
  	add_column :volunteers, :show_description, :boolean, default: true

  end
end
