var Education = React.createClass({
  getInitialState: function(){
    return {education_header: "EDUCATION", education: this.props.resume.education};
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
      
        $(this).find(".show_hide_section").hide();
        
        this.firstChild.classList.add('hide-section');

        var state_res = _this.state.education.find(item => item.id == $(this).data("educationId"));
        if (state_res) {
          var props_res = _this.props.resume.education.find(item => item.id == $(this).data("educationId"));
          if (props_res && props_res[e.target.name] != e.target.value && e.target.name != "calendar") {
            //send update call...
            _this.submitEducation({[e.target.name]: e.target.value, "id": $(this).data("educationId")});
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
  submitEducation: function(params){
    this.props.updateResume(
      {resume: {educations_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Education"};
    //updating current state from parent
    this.props.createSubSection(formData, "education");
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Education"};
    //updating current state from parent
    this.props.removeSubSection(formData, "education");  
  },
  render: function() {
    var education = this.state.education
    var data = []
    var key = "";
    var _this = this;
    education.forEach(function(education_item) {
      key = "education-" + education_item.id;
      data.push(<EducationItem total={_this.state.education.length} handleShowHideChange={_this.props.handleShowHideChange} education_item={education_item} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume} />);
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Education">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Education"></i>
           </a>
        </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="education_header"
                      className="form-control primary_font" 
                      placeholder="EDUCATION"
                      value={this.state.education_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="section-items-list">
              <ul className="row m0">
                {data}
              </ul>
           </div>
       </section>
     </div>
    )
  }
});