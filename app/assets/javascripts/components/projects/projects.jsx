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
    $(document).on('focusin', ".section-item", (function (e) {
      this.firstChild.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.firstChild.classList.add('hide-section');

      var state_res = _this.state.projects.find(item => item.id == $(this).data("projectId"));
      if (state_res) {
        var props_res = _this.props.resume.projects.find(item => item.id == $(this).data("projectId"));
        if (props_res && props_res[e.target.name] != e.target.value) {
          //send update call...
          _this.submitProject({[e.target.name]: e.target.value, "id": $(this).data("projectId")});
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
  submitProject: function(params){
    this.props.updateResume(
      {resume: {projects_attributes: {"1": params}}}
    );
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
    var projects = this.state.projects
    var data = []
    var key = "";
    var _this = this;
    projects.forEach(function(project) {
      key = "project-" + project.id;
      data.push(<ProjectItem project={project} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Projects">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Projects"></i>
           </a>
        </div>
        <section className="education-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="project_header"
                      className="form-control"
                      placeholder="PROJECTS"
                      value={this.state.project_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="row">
            {data}
           </div>
       </section>
     </div>
    )
  }
});