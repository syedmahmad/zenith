class Resume < ActiveRecord::Base
	
	attr_accessor :skip_validation

	belongs_to :user
	has_one :resume_style, dependent: :destroy
	has_one :header, dependent: :destroy
	has_one :summary, dependent: :destroy
	has_one :layout, dependent: :destroy
	has_many :achievements, dependent: :destroy
	has_many :awards, dependent: :destroy
	has_many :certificates, dependent: :destroy
	has_many :courses, dependent: :destroy
	has_many :educations, dependent: :destroy
	has_many :experiences, dependent: :destroy
	has_many :languages, dependent: :destroy
	has_many :passions, dependent: :destroy
	has_many :projects, dependent: :destroy
	has_many :quotes, dependent: :destroy
	has_many :volunteers, dependent: :destroy
	has_many :strengths, dependent: :destroy
	has_many :technologies, dependent: :destroy
	has_many :skills, dependent: :destroy

	amoeba do
    enable
  end

	accepts_nested_attributes_for :resume_style
	accepts_nested_attributes_for :header
	accepts_nested_attributes_for :summary
	accepts_nested_attributes_for :layout
	accepts_nested_attributes_for :achievements
	accepts_nested_attributes_for :awards
	accepts_nested_attributes_for :certificates
	accepts_nested_attributes_for :courses
	accepts_nested_attributes_for :educations
	accepts_nested_attributes_for :experiences
	accepts_nested_attributes_for :languages
	accepts_nested_attributes_for :passions
	accepts_nested_attributes_for :projects
	accepts_nested_attributes_for :strengths
	accepts_nested_attributes_for :quotes
	accepts_nested_attributes_for :volunteers
	accepts_nested_attributes_for :technologies
	accepts_nested_attributes_for :skills

	after_create :setup_sections, :if => Proc.new{|f| !skip_validation } 

	def setup_sections
		ResumeStyle.create_default(self.id)
		self.create_header
		self.create_summary
		Layout.create_default(self.id)
		achievements.create
		awards.create
		certificates.create
		courses.create
		educations.create
		experiences.create
		languages.create
		passions.create
		projects.create
		quotes.create
		volunteers.create
		strengths.create
		technologies.create
		skills.create
	end


	def self.delete_unclaimed_CVs
		Resume.all.where('created_at > ?', 24.hours.ago).each do |resume|
			if resume.user.present? && resume.user.user_name.eql?("guest")
				resume.destroy
			end
		end
	end
end
