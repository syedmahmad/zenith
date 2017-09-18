class CvBuilderController < ApplicationController

  def index
    flash[:success ] = "Success Flash Message: Welcome to GentellelaOnRails"
    #other alternatives are
    # flash[:warn ] = "Israel don't quite like warnings"
    #flash[:danger ] = "Naomi let the dog out!"
    @resume = get_user_resume
  end
  
  def update
    puts "params---------------"
    puts params
    
    render json: true  
  end

  def get_user_resume
    @resume_data = nil
    if current_user
      @resume_data = Resume.where(id: current_user.resume.id).includes(:resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers, :skills, :technologies, :languages)
      @resume_data = @resume_data.take
    end
    return{
      # "resume_style": (@resume_data.present? ? @resume_data.resume_style.attributes : ResumeStyle.new.attributes),
      "header": (@resume_data.present? ? @resume_data.header.attributes : Header.new.attributes),
      "summary": (@resume_data.present? ? @resume_data.summary.attributes : Summary.new.attributes),
      "achievements": (@resume_data.present? ? @resume_data.achievements.map {|rec| rec.attributes} : [Achievement.new.attributes]),
      "awards": (@resume_data.present? ? @resume_data.awards.map {|rec| rec.attributes} : [Award.new.attributes]),
      "certificates": (@resume_data.present? ? @resume_data.certificates.map {|rec| rec.attributes} : [Certificate.new.attributes]),
      "courses": (@resume_data.present? ? @resume_data.courses.map {|rec| rec.attributes} : [Course.new.attributes]),
      "education": (@resume_data.present? ? @resume_data.educations.map {|rec| rec.attributes} : [Education.new.attributes]),
      "experiences": (@resume_data.present? ? @resume_data.experiences.map {|rec| rec.attributes} : [Experience.new.attributes]),
      "passions": (@resume_data.present? ? @resume_data.passions.map {|rec| rec.attributes} : [Passion.new.attributes]),
      "projects": (@resume_data.present? ? @resume_data.projects.map {|rec| rec.attributes} : [Project.new.attributes]),
      "quotes": (@resume_data.present? ? @resume_data.quotes.map {|rec| rec.attributes} : [Quote.new.attributes]),
      "volunteers": (@resume_data.present? ? @resume_data.volunteers.map {|rec| rec.attributes} : [Volunteer.new.attributes]),
      "strengths": (@resume_data.present? ? @resume_data.strengths.map {|rec| rec.attributes} : [Strength.new.attributes]),
      "languages": (@resume_data.present? ? @resume_data.languages.map {|rec| rec.attributes} : [Language.new.attributes]),
      "technologies": (@resume_data.present? ? @resume_data.technologies.map {|rec| rec.attributes} : [Technology.new.attributes]),
      "skills": (@resume_data.present? ? @resume_data.skills.map {|rec| rec.attributes} : [Skill.new.attributes])
    }
  end

  def permitted_params
    params.require(:resume).permit(:Achievements_attributes => [])
  end

end

