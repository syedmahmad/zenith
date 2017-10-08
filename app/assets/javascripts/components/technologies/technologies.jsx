var Technologies = React.createClass({
  getInitialState: function(){
    return {technology_header: "TECHNOLOGIES", technologies: this.props.resume.technologies};
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
      if(!($(e.relatedTarget).hasClass("option_item"))) {
        $(this).find(".show_hide_section").hide()
        this.firstChild.classList.add('hide-section');
        
        var state_res = _this.state.technologies.find(item => item.id == $(this).data("technologyId"));
        if (state_res) {
          var props_res = _this.props.resume.technologies.find(item => item.id == $(this).data("technologyId"));
          if (props_res && props_res[e.target.name] != e.target.value) {
            //send update call...
            _this.submitTechnologies({[e.target.name]: e.target.value, "id": $(this).data("technologyId")});
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
  submitTechnologies: function(params){
    this.props.updateResume(
      {resume: {technologies_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Technology"};
    //updating current state from parent
    this.props.createSubSection(formData, "technologies");
  },
  removeSubSection: function(e){
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Technology"};
    //updating current state from parent
    this.props.removeSubSection(formData, "technologies");
  },
  render: function() {
    var technologies = this.state.technologies;
    var data = [];
    var key = "";
    var _this = this;
    technologies.forEach(function(technology) {
      key = "technology-" + technology.id;
      data.push(<TechnologyItem handleShowHideChange={_this.props.handleShowHideChange} technology={technology} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Technologies">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Technologies"></i>
          </a>
       </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="technology_header"
                      className="form-control primary_font"
                      placeholder="TECHNOLOGIES"
                      value={this.state.technology_header}
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