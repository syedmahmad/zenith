var Skills = React.createClass({
  getInitialState: function(){
    return {skill_header: "SKILLS", skills: this.props.resume.skills};
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

        var state_res = _this.state.skills.find(item => item.id == $(this).data("skillId"));
        if (state_res) {
          var props_res = _this.props.resume.skills.find(item => item.id == $(this).data("skillId"));
          if (props_res && props_res[e.target.name] != "") {
            //send update call...
            _this.submitSkills(e.target.name, e.target.value, $(this).data("skillId"));
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
  submitSkills: function(attribute, value, id){
    params = {[attribute]: value, "id": id};
    this.props.updateResumeState("skills", attribute, value, id);
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Skill"};
    //updating current state from parent
    this.props.createSubSection(formData, "skills");
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Skill"};
    //updating current state from parent
    this.props.removeSubSection(formData, "skills");
  },
  render: function() {
    var data = []
    var key = "";
    var _this = this;
    var page = _this.props.page;
    var skills = _this.props.resume.skills;
    skills.forEach(function(skill) {
      if(page == skill.page){
        key = "skill-" + skill.id;
        data.push(<SkillItem resume={_this.props.resume} total={skills.length} handleShowHideChange={_this.props.handleShowHideChange} skill={skill} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
      }
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Skills">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Skills"></i>
          </a>
       </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="skill_header"
                      className="form-control primary_font"
                      placeholder="SKILLS"
                      value={this.state.skill_header}
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