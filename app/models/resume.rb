class Resume < ActiveRecord::Base
	belongs_to :user

	has_one :resume_style
	has_one :header
	has_one :summary
	has_many :layouts, dependent: :destroy
	has_many :achievements, dependent: :destroy
	has_many :awards, dependent: :destroy
	has_many :certificates, dependent: :destroy
	has_many :courses, dependent: :destroy
	has_many :educations, dependent: :destroy
	has_many :experiences, dependent: :destroy
	has_many :languages, dependent: :destroy
	has_many :passions, dependent: :destroy
	has_many :projects, dependent: :destroy
	has_many :publications, dependent: :destroy
	has_many :quotes, dependent: :destroy
	has_many :volunteers, dependent: :destroy
end
