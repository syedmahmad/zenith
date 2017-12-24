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
        
        var state_res = _this.state.technologies.find(item => item.id == $(this).data("technologyId"));
        if (state_res) {
          var props_res = _this.props.resume.technologies.find(item => item.id == $(this).data("technologyId"));
          if (props_res && props_res[e.target.name] != "") {
            //send update call...
            _this.submitTechnologies(e.target.name, e.target.value, $(this).data("technologyId"));
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
  submitTechnologies: function(attribute, value, id){
    params = {[attribute]: value, "id": id};
    this.props.updateResumeState("technologies", attribute, value, id);
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
    var data = [];
    var key = "";
    var _this = this;
    var page = _this.props.page;
    var technologies = _this.props.resume.technologies;
    technologies.forEach(function(technology) {
      if(page == technology.page){
        key = "technology-" + technology.id;
        data.push(<TechnologyItem resume={_this.props.resume} total={technologies.length} handleShowHideChange={_this.props.handleShowHideChange} technology={technology} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
      }
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Technologies">
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
              <ul className="row mrl0">
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});