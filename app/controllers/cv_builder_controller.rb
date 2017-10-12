class CvBuilderController < ApplicationController
  before_action :set_host, only: [:index, :new, :show]
  before_action :check_user_type, only: [:index]


  def index
    # flash[:success ] = "Success Flash Message: Welcome to GentellelaOnRails"
    if current_user
      @resumes = current_user.resumes
      @resume_ids = @resumes.pluck("id")
      @resume = @resumes.last
      @is_single_resume = @resumes.count > 1 ? true : false
      
      if @resume
        @resume_data = Resume.where(id: @resume.id).includes(:layout, :resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
        @resume_data = @resume_data.take
      end
      @latest_resume = get_user_resume
    end
  end

  def new_resume
    if current_user.present?
      resume = current_user.resumes.create
      @resume_data = Resume.where(id: resume.id).includes(:resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
      @resume_data = @resume_data.take
      if @resume_data
        render :json => {:path_to_go => "resumes/#{Hashids.new("salt", 16).encode(@resume_data.id)}"}, :status => 200
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
      resume = current_user.resumes.find_by_id(Hashids.new("salt", 16).decode(params[:id]).try(:first))
      if resume.present?
        @resume = resume.amoeba_dup
        @resume.skip_validation = true
        @resume.save
        redirect_to resume_path(Hashids.new("salt", 16).encode(@resume.id))
      else
        render file: "#{Rails.root}/public/404.html", layout: false, status: 404
      end
    else
      render file: "#{Rails.root}/public/422.html", layout: false, status: 422
    end
  end
  
  def show
    id = Hashids.new("salt", 16).decode(params[:id]).try(:first)
    @resume_data = Resume.where(id: id).includes(:resume_style, :header, :summary, :achievements, :awards, :certificates, :courses, :educations, :experiences, :passions, :projects, :quotes, :volunteers)
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
    if params["resume"]["layout_attributes"]
      section_data = params["resume"]["layout_attributes"]["section_data"]
      params["resume"]["layout_attributes"]["section_data"] = section_data.values if section_data
    end
    resume.update!(permitted_params)
    render json: resume
  end

  def destroy_resume
    current_user.resumes.find_by_id(params[:id]).destroy
    @is_single_resume = current_user.resumes.count > 1 ? true : false
    flash[:success ] = "Success deleted Resume"
    redirect_to root_path
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
      "resume_style": (@resume_data.present? ? @resume_data.resume_style.attributes : ResumeStyle.new(:background_img => "white.png", :available_background_images => ["white.png", "arches.png","checkered.png","handmade.png","paper.png","psychedelic.png","struckaxiom.png","vichy.png","weave.png","worn.png"], primary_font:"Exo2", secondary_font: "Roboto", font_size: "14px",:available_primary_fonts => ['Droid Sans','Exo2','Lato','Montserrat','Oswald','Roboto','Slabo 27px'],:available_secondary_fonts => ['Exo2','Lato','Open Sans','Raleway','Roboto','Roboto Condensed','Slabo 27px'],:available_font_sizes => ['10px', '11px', '12px', '14px', '16px'], primary_color:"black", secondary_color: "#00a7dd", :available_secondary_colors => ["black","#8616cc","#FF0F0F","#CF924A","#A861A6","#00a7dd","#FA6C00","#FB51A5","#5ac41d","#36006B"],
      :available_primary_colors => ["black","#012B7E","#36006B","#58320E","#8616cc","#FF0F0F","#FB51A5"]).attributes),
      "id": @resume_data.present? ? @resume_data.id : "",
      "header": (@resume_data.present? && @resume_data.header.present? ? header_data : new_header_data),
      "layout": (@resume_data.present? && @resume_data.layout.present? ? @resume_data.layout.get_json : Layout.new(:section_names => ["Experiences", "Education", "Strengths", "Achievements", "Languages", "Projects"], :section_data => [{name: "Experiences", page: 0, column: 0}, {name: "Achievements", page: 0, column: 1}, {name: "Education", page: 0, column: 0}, {name: "Languages", page: 0, column: 1}, {name: "Strengths", page: 0, column: 0}, {name: "Projects", page: 0, column: 1}], layout_type: "double")),
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
    params.require(:resume).permit(:section_names,
      achievements_attributes: [:title, :description, :id, :show_description, :show_icon, :item_index],
      awards_attributes: [:name, :description, :id, :show_description, :show_icon, :item_index],
      certificates_attributes: [:name, :institutiion_name, :id, :show_institutiion, :item_index],
      courses_attributes: [:title, :description, :id, :show_description, :item_index],
      strengths_attributes: [:title, :description, :id, :show_description, :show_icon, :item_index],
      educations_attributes: [:degree_name, :university_name, :id, :duration, :show_period, :cgpa, :show_gpa, :show_location, :location, :item_index],
      experiences_attributes: [:id, :title, :company_name, :location, :duration, :description, :show_location, :show_period, :link, :show_description, :show_link, :item_index],
      languages_attributes: [:id, :name, :level, :show_proficiency, :item_index],
      passions_attributes: [:id, :name, :description, :show_icon, :show_description, :item_index],
      projects_attributes: [:id, :name, :location, :duration, :description, :show_location, :show_period, :link, :show_description, :show_link, :item_index],
      quotes_attributes: [:id, :name, :author, :show_author, :item_index],
      skills_attributes: [:id, :name, :level, :show_level, :item_index],
      technologies_attributes: [:id, :name, :tec_names, :show_icon, :show_description, :item_index],
      volunteers_attributes: [:id, :title, :organization_name, :duration, :description, :show_location, :show_period, :location, :show_description, :item_index],
      layout_attributes: [:id, :underline, :layout_type, :section_names => [], :section_data => [:name, :page, :column]],
      header_attributes: [:id,:avatar,:name,:location,:job_title,:phone,:email,:website_link, :show_avatar,:show_name,:show_location,:show_job_title,:show_phone,:show_email,:show_website_link],
      summary_attributes: [:id, :title, :description],
      resume_style_attributes: [:id, :background_img, :font_family, :primary_color, :secondary_color, :primary_font, :secondary_font, :font_size])
  end

  private
    def set_host
      @host = ENV["CDN_HOST"]
    end

    def check_user_type
      # will move this method from the start CV button otherwise it will create always new cv
      unless current_user.present?
        email = "#{SecureRandom.urlsafe_base64(nil, false)}@guest.com"
        user = User.create(user_name: "guest", email: email, password: "zenithcv.com")
        user.resumes.create
        sign_in(user)
      end
    end
end

