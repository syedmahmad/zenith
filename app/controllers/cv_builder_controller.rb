class CvBuilderController < ApplicationController

  def index
    # flash[:success ] = "Success Flash Message: Welcome to GentellelaOnRails"
    if current_user
      @resumes = current_user.resumes
      @resume_ids = @resumes.pluck("id")
      @resume = @resumes.last
      if @resume
        @resume_data = Resume.where(id: @resume.id).includes(:layout, :resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
        @resume_data = @resume_data.take
      end
      @latest_resume = get_user_resume
    else
      @latest_resume = get_user_resume      
    end
  end

  def new_resume
    
    if current_user.present?
      resume = current_user.resumes.create
      @resume_data = Resume.where(id: resume.id).includes(:resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
      @resume_data = @resume_data.take
      if @resume_data
        render :json => {:path_to_go => "resumes/#{@resume_data.id}"}, :status => 200
      else
        render file: "#{Rails.root}/public/422.html", layout: false, status: 422
      end
    else
      render file: "#{Rails.root}/public/500.html", layout: false, status: 500
    end  
    return
  end

  def create_sub_record
    section_names = params[:sub_section_name].constantize
    obj = section_names.create(resume_id: params[:id])
    render json: obj
  end

  def delete_sub_record
    section_names = params[:sub_section_name].constantize
    obj = section_names.find_by_id(params[:section_id]).destroy
    render json: obj
  end

  def new
    @resume_data = nil
    @resume = get_user_resume
  end

  def clone
    if current_user.present?
      resume = current_user.resumes.find_by_id(params[:id])
      if resume.present?
        @resume = resume.amoeba_dup
        @resume.save
        redirect_to resume_path(@resume.id)
      else
        render file: "#{Rails.root}/public/404.html", layout: false, status: 404
      end
    else
      render file: "#{Rails.root}/public/422.html", layout: false, status: 422
    end
  end
  
  def show
    @resume_data = Resume.where(id: params[:id]).includes(:resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
    @resume_data = @resume_data.take
    
    if @resume_data.present?
      @resume = get_user_resume
    else
      render file: "#{Rails.root}/public/404.html", layout: false, status: 404
    end
  end
    
  def update
    return unless current_user.present?
    resume = current_user.resumes.find_by_id(params[:id])
    resume.update!(permitted_params)
    render json: resume
  end

  def get_user_resume
    header_data = nil
    new_header_data = nil
    if @resume_data.present? && @resume_data.header.present?
      header_data = @resume_data.header.attributes
      header_data.merge!('img_url' => @resume_data.header.avatar.url)
    else
      new_header_data = Header.new.attributes
      new_header_data.merge!('img_url' => Header.new.avatar.url)
    end

    return{
      "resume_style": (@resume_data.present? ? @resume_data.resume_style.attributes : ResumeStyle.new(:background_img => "white.png", :available_background_images => ["arches.png","checkered.png","handmade.png","paper.png","psychedelic.png","struckaxiom.png","vichy.png","weave.png","worn.png"], font_family:"Lato", :available_fonts => ["Lato","Playfair Display","Abril Fatface","Raleway","Montserrat","Exo 2","Oswald","Chivo","Roboto Slab"], color:"black", :available_colors => ["black","#00a7dd","#8616cc","#FF0F0F","#CF924A","#A861A6","#00a7dd","#FA6C00","#FB51A5","#5ac41d","#36006B"]).attributes),
      "id": @resume_data.present? ? @resume_data.id : "",
      "header": (@resume_data.present? && @resume_data.header.present? ? header_data : new_header_data),
      "layout": (@resume_data.present? && @resume_data.layout.present? ? @resume_data.layout.attributes : Layout.new(:section_name => ["Experiences", "Education", "Strengths", "Achievements", "Languages", "Projects"], :section_data => [{name: "Experiences", page: 0}, {name: "Education", page: 0}, {name: "Strengths", page: 0}, {name: "Achievements", page: 0}, {name: "Languages", page: 0}, {name: "Projects", page: 0}]).attributes),
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
    params.require(:resume).permit(:section_names, achievements_attributes: [:title, :description, :id], awards_attributes: [:name, :id], certificates_attributes: [:name, :institutiion_name, :id], courses_attributes: [:title, :description, :id], strengths_attributes: [:title, :description, :id], educations_attributes: [:degree_name, :university_name, :id, :duration, :cgpa], experiences_attributes: [:id, :title, :company_name, :location, :duration, :description], languages_attributes: [:id, :name, :level], passions_attributes: [:id, :name],
      projects_attributes: [:id, :name, :location, :duration, :description], quotes_attributes: [:id, :name], skills_attributes: [:id, :name, :level], technologies_attributes: [:id, :name, :tec_names], volunteers_attributes: [:id, :title, :organization_name, :duration, :description], layout_attributes: [:id, :section_names => [], :section_data => []],
      header_attributes: [:id,:avatar,:name,:location,:job_title,:phone,:email,:website_link], summary_attributes: [:id, :title, :description], resume_style_attributes: [:id, :background_img, :font_family, :color])
  end

end

