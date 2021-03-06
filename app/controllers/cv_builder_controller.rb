class CvBuilderController < ApplicationController
  before_action :check_user_type, only: [:index]
  before_action :set_host, only: [:index, :new, :show, :download]
  PDF_MARGINS = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  }.freeze

  def index
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

  # ToDO: will remove after download
  def store_cv
    # session["cv"] = params[:cv_data]
    # render json: true
    @levelHash = {0 => "Beginner", 20 => "Intermediate", 40 => "Advanced", 60 => "Proficient", 80 => "Excellent", 100 => "Native"}
    @resume = current_user.resumes.last
    @header = @resume.header
    @layout = @resume.layout
    @achievements = @resume.achievements
  end

  def download
    @levelHash = {0 => "Beginner", 20 => "Intermediate", 40 => "Advanced", 60 => "Proficient", 80 => "Excellent", 100 => "Native"}
    @resume = current_user.resumes.last
    @header = @resume.header
    @layout = @resume.layout
    @achievements = @resume.achievements
    # @html = render_to_string(:template => "cv_builder/show", :locale => {"resume": @resume, "host": @host},:formats=> [:html])
    # @html = session["cv"].html_safe

    @left_col_data = {}
    @right_col_data = {}
    @single_layout_data = {}

    (0..@resume.pages - 1).each do |i|
      @single_layout_data[i] = []
      @left_col_data[i] = []
      @right_col_data[i] = []
      page_left = []
      page_right = []
      single_layout = []
      @layout.section_data.each do |item|
        if item["page"].to_i == i
          single_layout << item["name"]
          if item["column"].to_i == 0
            page_left << item["name"]
          else
            page_right << item["name"]
          end
        end
      end

      @layout.section_names.each do |section|
        @single_layout_data[i] << section if single_layout.include?(section)
        if page_left.include?(section)
          @left_col_data[i] << section
        elsif page_right.include?(section)
          @right_col_data[i] << section
        end
      end
    end


    respond_to do |format|
      format.pdf do
        render pdf: "download",
          layout: 'pdf.html.erb',
          margin: PDF_MARGINS,
          disable_javascript: false,
          page_size: nil,
          page_height: '11.2in', 
          page_width: '7in',
          disable_smart_shrinking:  false,
          template:  'cv_builder/download.pdf.erb',
          disposition: 'attachment'
          # show_as_html: true,
      end
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
    section_name = params[:sub_section_name].constantize
    if params[:sub_section_name].eql?("Experience") || params[:sub_section_name].eql?("Project")
      obj = section_name.create(resume_id: params[:id], :outcomes => [""], item_index: 0, page: params[:page])
    else
      obj = section_name.create(resume_id: params[:id], item_index: 0, page: params[:page])
    end
    render json: obj
  end

  def delete_sub_record
    section_name = params[:sub_section_name].constantize
    obj = section_name.find_by_id(params[:section_id]).destroy
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
    
    if params[:resume][:header_attributes] && params[:resume][:header_attributes][:avatar].eql?("remove_image")
      params[:resume][:header_attributes][:avatar] = File.new("#{Rails.root}/public/images/default_avatar.png", "r")
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
      "pages": @resume_data.present? ? @resume_data.pages : 1,
      "header": (@resume_data.present? && @resume_data.header.present? ? header_data : new_header_data),
      "layout": (@resume_data.present? && @resume_data.layout.present? ? @resume_data.layout.get_json : Layout.new(:section_names => ["Experiences", "Education", "Strengths", "Achievements", "Languages", "Projects"], :section_data => [{name: "Experiences", page: 0, column: 0}, {name: "Achievements", page: 0, column: 1}, {name: "Education", page: 0, column: 0}, {name: "Languages", page: 0, column: 1}, {name: "Strengths", page: 0, column: 0}, {name: "Projects", page: 0, column: 1}], layout_type: "double")),
      "summary": (@resume_data.present? && @resume_data.summary.present? ? @resume_data.summary.attributes.slice("id", "title", "description") : Summary.new.attributes),
      "achievements": (@resume_data.present? && @resume_data.achievements.present? ? @resume_data.achievements.map {|rec| rec.attributes.slice("title", "description", "id", "show_description", "icon", "show_icon", "item_index", "page")} : [Achievement.new.attributes]),
      "awards": (@resume_data.present? && @resume_data.awards.present? ? @resume_data.awards.map {|rec| rec.attributes.slice("name", "description", "id", "show_description", "show_icon", "item_index", "page", "icon")} : [Award.new.attributes]),
      "certificates": (@resume_data.present? && @resume_data.certificates.present? ? @resume_data.certificates.map {|rec| rec.attributes.slice("name", "institutiion_name", "id", "show_institutiion", "item_index", "page", "duration")} : [Certificate.new.attributes]),
      "courses": (@resume_data.present? && @resume_data.courses.present? ? @resume_data.courses.map {|rec| rec.attributes.slice("title", "description", "id", "show_description", "item_index", "page")} : [Course.new.attributes]),
      "education": (@resume_data.present? && @resume_data.educations.present? ? @resume_data.educations.map {|rec| rec.attributes.slice("degree_name", "ongoing", "university_name", "id", "duration", "show_period", "cgpa", "show_gpa", "show_location", "location", "item_index", "page")} : [Education.new.attributes]),
      "experiences": (@resume_data.present? && @resume_data.experiences.present? ? @resume_data.experiences.map {|rec| rec.attributes.slice("id", "title", "ongoing", "company_name", "location", "duration", "description", "show_location", "show_period", "show_description", "show_outcomes", "item_index", "page", "outcomes")} : [Experience.new.attributes]),
      "passions": (@resume_data.present? && @resume_data.passions.present? ? @resume_data.passions.map {|rec| rec.attributes.slice("id", "name", "description", "show_icon", "show_description", "item_index", "page", "icon")} : [Passion.new.attributes]),
      "projects": (@resume_data.present? && @resume_data.projects.present? ? @resume_data.projects.map {|rec| rec.attributes.slice("id", "name", "ongoing", "location", "duration", "description", "show_location", "show_period", "link", "show_description", "show_link", "item_index", "page", "show_outcomes", "outcomes")} : [Project.new.attributes]),
      "quotes": (@resume_data.present? && @resume_data.quotes.present? ? @resume_data.quotes.map {|rec| rec.attributes.slice("id", "name", "author", "show_author", "item_index", "page")} : [Quote.new.attributes]),
      "volunteers": (@resume_data.present? && @resume_data.volunteers.present? ? @resume_data.volunteers.map {|rec| rec.attributes.slice("id", "title", "ongoing", "organization_name", "duration", "description", "show_location", "show_period", "location", "show_description", "item_index", "page")} : [Volunteer.new.attributes]),
      "strengths": (@resume_data.present? && @resume_data.strengths.present? ? @resume_data.strengths.map {|rec| rec.attributes.slice("title", "description", "id", "show_description", "show_icon", "item_index", "page", "icon")} : [Strength.new.attributes]),
      "languages": (@resume_data.present? && @resume_data.languages.present? ? @resume_data.languages.map {|rec| rec.attributes.slice("id", "name", "level", "show_proficiency", "item_index", "page")} : [Language.new.attributes]),
      "technologies": (@resume_data.present? && @resume_data.technologies.present? ? @resume_data.technologies.map {|rec| rec.attributes.slice("id", "name", "tec_names", "show_icon", "show_description", "item_index", "page")} : [Technology.new.attributes]),
      "skills": (@resume_data.present? && @resume_data.skills.present? ? @resume_data.skills.map {|rec| rec.attributes.slice("id", "name", "level", "show_level", "item_index", "page")} : [Skill.new.attributes])
    }
  end

  def permitted_params
    params.require(:resume).permit(:pages, :section_names,
      achievements_attributes: [:title, :description, :id, :show_description, :icon, :show_icon, :item_index, :page],
      awards_attributes: [:name, :description, :id, :show_description, :show_icon, :item_index, :page, :icon],
      certificates_attributes: [:name, :institutiion_name, :id, :show_institutiion, :item_index, :page, :duration],
      courses_attributes: [:title, :description, :id, :show_description, :item_index, :page],
      strengths_attributes: [:title, :description, :id, :show_description, :show_icon, :item_index, :page, :icon],
      educations_attributes: [:degree_name, :ongoing, :university_name, :id, :duration, :show_period, :cgpa, :show_gpa, :show_location, :location, :item_index, :page],
      experiences_attributes: [:id, :title, :ongoing, :company_name, :location, :duration, :description, :show_location, :show_period, :show_description, :show_outcomes, :item_index, :page, :outcomes => []],
      languages_attributes: [:id, :name, :level, :show_proficiency, :item_index, :page],
      passions_attributes: [:id, :name, :description, :show_icon, :show_description, :item_index, :page, :icon],
      projects_attributes: [:id, :name, :ongoing, :location, :duration, :description, :show_location, :show_period, :link, :show_description, :show_link, :item_index, :page, :show_outcomes, :outcomes => []],
      quotes_attributes: [:id, :name, :author, :show_author, :item_index, :page],
      skills_attributes: [:id, :name, :level, :show_level, :item_index, :page],
      technologies_attributes: [:id, :name, :tec_names, :show_icon, :show_description, :item_index, :page],
      volunteers_attributes: [:id, :title, :ongoing, :organization_name, :duration, :description, :show_location, :show_period, :location, :show_description, :item_index, :page],
      layout_attributes: [:id, :underline, :layout_type, :section_names => [], :section_data => [:name, :page, :column]],
      header_attributes: [:id,:avatar,:name,:location,:job_title,:phone,:email,:website_link, :image_style, :show_avatar,:show_name,:show_location,:show_job_title,:show_phone,:show_email,:show_website_link],
      summary_attributes: [:id, :title, :description],
      resume_style_attributes: [:id, :background_img, :font_family, :primary_color, :secondary_color, :primary_font, :secondary_font, :font_size, :available_background_images, :available_primary_colors, :available_secondary_colors, :available_primary_fonts, :available_secondary_fonts, :available_font_sizes])
  end

  private
    def set_host
      @host = ENV["CDN_HOST"]
    end

    def check_user_type
      # will move this method from the start CV button otherwise it will create always new cv
      unless current_user.present?
        email = "#{SecureRandom.urlsafe_base64(nil, false)}@guest.com"
        user = User.create(user_name: "guest", user_type: "guest", email: email, password: "zenithcv.com")
        user.resumes.create
        sign_in(user)
      end
    end
end


# achievements.attributes.slice("title", "description", "id", "show_description", "icon", "show_icon", "item_index", "page")
# awards.attributes.slice("name", "description", "id", "show_description", "show_icon", "item_index", "page", "icon")
# certificates.attributes.slice("name", "institutiion_name", "id", "show_institutiion", "item_index", "page", "duration")
# courses.attributes.slice("title", "description", "id", "show_description", "item_index", "page")
# strengths.attributes.slice("title", "description", "id", "show_description", "show_icon", "item_index", "page", "icon")
# educations.attributes.slice("degree_name", "ongoing", "university_name", "id", "duration", "show_period", "cgpa", "show_gpa", "show_location", "location", "item_index", "page")
# experiences.attributes.slice("id", "title", "ongoing", "company_name", "location", "duration", "description", "show_location", "show_period", "show_description", "show_outcomes", "item_index", "page", "outcomes")
# languages.attributes.slice("id", "name", "level", "show_proficiency", "item_index", "page")
# passions.attributes.slice("id", "name", "description", "show_icon", "show_description", "item_index", "page", "icon")
# projects.attributes.slice("id", "name", "ongoing", "location", "duration", "description", "show_location", "show_period", "link", "show_description", "show_link", "item_index", "page", "show_outcomes", "outcomes")
# quotes.attributes.slice("id", "name", "author", "show_author", "item_index", "page")
# skills.attributes.slice("id", "name", "level", "show_level", "item_index", "page")
# technologies.attributes.slice("id", "name", "tec_names", "show_icon", "show_description", "item_index", "page")
# volunteers.attributes.slice("id", "title", "ongoing", "organization_name", "duration", "description", "show_location", "show_period", "location", "show_description", "item_index", "page")
# layout.attributes.slice("id", "underline", "layout_type", "section_names", "section_data")
# header.attributes.slice("id","avatar","name","location","job_title","phone","email","website_link", "image_style", "show_avatar","show_name","show_location","show_job_title","show_phone","show_email","show_website_link")
# summary.attributes.slice("id", "title", "description")
# resume_style.attributes.slice("id", "background_img", "font_family", "primary_color", "secondary_color", "primary_font", "secondary_font", "font_size")