var Experiences = React.createClass({
  getInitialState: function(){
    return {experience_header: "EXPERIENCES", experiences: this.props.resume.experiences};
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
        
        var state_res = _this.state.experiences.find(item => item.id == $(this).data("experienceId"));
        if (state_res) {
          var props_res = _this.props.resume.experiences.find(item => item.id == $(this).data("experienceId"));
          if (props_res && props_res[e.target.name] != e.target.value && e.target.name != "calendar") {
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
            _this.submitExperience({[valName]: valObj, "id": $(this).data("experienceId")});
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
  submitExperience: function(params){
    this.props.updateResume(
      {resume: {experiences_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Experience"};
    //updating current state from parent
    this.props.createSubSection(formData, "experiences");
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Experience"};
    //updating current state from parent
    this.props.removeSubSection(formData, "experiences");  
  },
  render: function() {
    var experiences = this.state.experiences
    var data = []
    var key = "";
    var _this = this;
    var page = _this.props.page;
    experiences.forEach(function(experience) {
      if(page == experience.page){
        key = "experience-" + experience.id;
        data.push(<ExperienceItem updateStyle={_this.props.updateStyle} setupLayout={_this.props.setupLayout} total={_this.state.experiences.length} handleShowHideChange={_this.props.handleShowHideChange} experience={experience} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume} />);
      }
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Experiences">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Experiences"></i>
           </a>
        </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="experience_header"
                      className="form-control primary_font"
                      placeholder="EXPERIENCES"
                      value={this.state.experience_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="section-items-list row m0">
              <ul className="row m0">
                {data}
              </ul>
           </div>
       </section>
     </div>
    )
  }
});