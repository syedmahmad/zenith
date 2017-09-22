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
    $(document).on('focusin', ".section-item", (function (e) {
      this.firstChild.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.firstChild.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitSkills({[e.target.name]: e.target.value, id: $(this).data("skillId")});
        // _this.props.achievement[e.target.name] = e.target.value;
      // }
    }));

   // show and hide buttons
    $(document).on('focusin', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.remove('hide-section');
    })); 
    $(document).on('focusout', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.add('hide-section');
    }));

  },
  submitSkills: function(params){
    this.props.updateResume(
      {resume: {skills_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.skills.length>0) {
      id = this.state.skills[this.state.skills.length-1].id + 1;
    }
    var course = {id:id, name:'', level:''};
    this.state.skills.push(course);
    this.setState({skills: this.state.skills});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.skills.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({skills: this.state.skills.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var skills = this.state.skills
    var data = []
    var key = "";
    var _this = this;
    skills.forEach(function(skill) {
      key = "skill-" + skill.id;
      data.push(<SkillItem skill={skill} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Skill">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="skills"></i>
          </a>
       </div>
        <section className="achievement-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="skill_header"
                      className="form-control"
                      placeholder="SKILLS"
                      value={this.state.skill_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="achievement-list">
              <ul>
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});