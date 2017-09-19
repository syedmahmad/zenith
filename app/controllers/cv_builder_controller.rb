class CvBuilderController < ApplicationController

  def index
    flash[:success ] = "Success Flash Message: Welcome to GentellelaOnRails"
    #other alternatives are
    # flash[:warn ] = "Israel don't quite like warnings"
    #flash[:danger ] = "Naomi let the dog out!"
    if current_user
      @resumes = current_user.resumes
      @resume_ids = @resumes.pluck("id")
      @resume = @resumes.last
      if @resume
        @resume_data = Resume.where(id: @resume.id).includes(:resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
        @resume_data = @resume_data.take
      end
      @latest_resume = get_user_resume
    end
  end

  def new
    resume = current_user.resumes.create
    @resume_data = Resume.where(id: resume.id).includes(:resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
    @resume_data = @resume_data.take
    @resume = get_user_resume
  end

  def clone
    resume = Resume.find(params[:id])
    @resume = resume.amoeba_dup
    @resume.save
    redirect_to resume_path(@resume.id)
  end
  
  def create
    
  end
  
  def show
    @resume_data = Resume.where(id: params[:id]).includes(:resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
    @resume_data = @resume_data.take
    @resume = get_user_resume
  end
    
  def update
    resume = Resume.find(params[:id])
    resume.update!(permitted_params)
    render json: resume
  end

  def get_user_resume
    return{
      # "resume_style": (@resume_data.present? ? @resume_data.resume_style.attributes : ResumeStyle.new.attributes),
      "id": @resume_data.present? ? @resume_data.id : "",
      "header": (@resume_data.present? && @resume_data.header.present? ? @resume_data.header.attributes : Header.new.attributes),
      "summary": (@resume_data.present? && @resume_data.summary.present? ? @resume_data.summary.attributes : Summary.new.attributes),
      "achievements": (@resume_data.present? && @resume_data.achievements.present? ? @resume_data.achievements.map {|rec| rec.attributes} : [Achievement.new.attributes]),
      "awards": (@resume_data.present? && @resume_data.awards.present? ? @resume_data.awards.map {|rec| rec.attributes} : [Award.new.attributes]),
      "certificates": (@resume_data.present? && @resume_data.certificates.present? ? @resume_data.certificates.map {|rec| rec.attributes} : [Certificate.new.attributes]),
      "courses": (@resume_data.present? && @resume_data.courses.present? ? @resume_data.courses.map {|rec| rec.attributes} : [Course.new.attributes]),
      "education": (@resume_data.present? && @resume_data.educations.present? ? @resume_data.educations.map {|rec| rec.attributes} : [Education.new.attributes]),
      "experiences": (@resume_data.present? && @resume_data.experiences.present? ? @resume_data.experiences.map {|rec| rec.attributes} : [Experience.new.attributes]),
      "passions": (@resume_data.present? && @resume_data.passions.present? ? @resume_data.passions.map {|rec| rec.attributes} : [Passion.new.attributes]),
      "projects": (@resume_data.present? && @resume_data.projects.present? ? @resume_data.projects.map {|rec| rec.attributes} : [Project.new.attributes]),
      "quotes": (@resume_data.present? && @resume_data.quotes.present? ? @resume_data.quotes.map {|rec| rec.attributes} : [Quote.new.attributes]),
      "volunteers": (@resume_data.present? && @resume_data.volunteers.present? ? @resume_data.volunteers.map {|rec| rec.attributes} : [Volunteer.new.attributes]),
      "strengths": (@resume_data.present? && @resume_data.strengths.present? ? @resume_data.strengths.map {|rec| rec.attributes} : [Strength.new.attributes]),
      "languages": (@resume_data.present? && @resume_data.languages.present? ? @resume_data.languages.map {|rec| rec.attributes} : [Language.new.attributes]),
      "technologies": (@resume_data.present? && @resume_data.technologies.present? ? @resume_data.technologies.map {|rec| rec.attributes} : [Technology.new.attributes]),
      "skills": (@resume_data.present? && @resume_data.skills.present? ? @resume_data.skills.map {|rec| rec.attributes} : [Skill.new.attributes])
    }
  end

  def permitted_params
    # params = {"resume"=>{"achievements_attributes"=>{"description"=>"sdfsdfsdfsd111111111111111111111111111", "id"=>"1"}}, "id"=>"1"}
    params.require(:resume).permit(achievements_attributes: [:title, :description, :id], awards_attributes: [:title, :description, :id], certificates_attributes: [:name, :institutiion_name, :id], courses_attributes: [:title, :description, :id], strengths_attributes: [:title, :description, :id], educations_attributes: [:degree_name, :university_name, :id, :duration, :cgpa], experiences_attributes: [:id, :title, :company_name, :location, :duration, :description], languages_attributes: [:id, :name, :level], passions_attributes: [:id, :name],
      projects_attributes: [:id, :name, :location, :duration, :description], quotes_attributes: [:id, :name], skills_attributes: [:id, :name, :level], technologies_attributes: [:id, :name, :tec_names], volunteers_attributes: [:id, :title, :organization_name, :duration, :description])
  end

end

