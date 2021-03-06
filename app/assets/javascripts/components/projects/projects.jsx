var Projects = React.createClass({
  getInitialState: function(){
    return {project_header: "PROJECTS", projects: this.props.resume.projects};
  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  handleRemoveSection: function(e){
    e.preventDefault();
    this.props.handleRemoveSection(e);
  },
  componentDidMount: function(){
    var _this = this;
    var show_hide_section_clicked = false;
    $(document).on('focusin', ".section-item", (function (e) {
      this.firstChild.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      e.preventDefault();
      if($('.show_hide_section').hasClass("hovered")){
        show_hide_section_clicked = true;
        $(e.target).closest(".section-item").find(".hide-show-control").attr('tabindex',-1).focus();
      }else{
        show_hide_section_clicked = false;
      }
      
      if(!show_hide_section_clicked) {

        $(this).find(".show_hide_section").hide()
        this.firstChild.classList.add('hide-section');

        var state_res = _this.state.projects.find(item => item.id == $(this).data("projectId"));
        if (state_res) {
          var props_res = _this.props.resume.projects.find(item => item.id == $(this).data("projectId"));
          if (props_res && props_res[e.target.name] != "" && e.target.name != "calendar") {
            //send update call...
            var valName = e.target.name;
            var valObj = e.target.value;
            var selector = $(e.target).closest(".section-item");
            if(valName == "outcomes"){
              valObj = [];
              $.each($(selector).find("textarea[name='outcomes']"), function(index, el){
                valObj.push($(el).val());
              });
            }
            _this.submitProject(valName, valObj,$(this).data("projectId"));
          }
        }
      }
    }));

   // show and hide buttons
    $(document).on('focusin', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.remove('hide-section');
    })); 
    $(document).on('focusout', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.add('hide-section');
    }));

  },
  submitProject: function(attribute, value, id){
    params = {[attribute]: value, "id": id};
    this.props.updateResumeState("projects", attribute, value, id);
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Project"};
    //updating current state from parent
    this.props.createSubSection(formData, "projects");
  },
  removeSubSection: function(e){
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Project"};
    //updating current state from parent
    this.props.removeSubSection(formData, "projects");
  },
  render: function() {
    var data = []
    var key = "";
    var _this = this;
    var page = _this.props.page;
    var projects = _this.props.resume.projects;
    projects.forEach(function(project) {
      if(page == project.page){
        key = "project-" + project.id;
        data.push(<ProjectItem resume={_this.props.resume} updateStyle={_this.props.updateStyle} setupLayout={_this.props.setupLayout} total={projects.length} handleShowHideChange={_this.props.handleShowHideChange} project={project} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
      }
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Projects">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Projects"></i>
           </a>
        </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="project_header"
                      className="form-control primary_font"
                      placeholder="PROJECTS"
                      value={this.state.project_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="section-items-list">
              <ul>
                {data}
              </ul>
           </div>
       </section>
     </div>
    )
  }
});