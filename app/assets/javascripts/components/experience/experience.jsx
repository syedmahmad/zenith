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
    $(document).on('focusin', ".section-item", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitExperience({[e.target.name]: e.target.value, id: $(this).data("experienceId")});
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
  submitExperience: function(params){
    this.props.updateResume(
      {resume: {experiences_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.experiences.length>0) {
      id = this.state.experiences[this.state.experiences.length-1].id + 1;
    }
    var experience = {id:id, title:'' , company_name: '', location: '', description:'', duration:''};
    this.state.experiences.push(experience);
    this.setState({experiences: this.state.experiences});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.experiences.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({experiences: this.state.experiences.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var experiences = this.state.experiences
    var data = []
    var key = "";
    var _this = this;
    experiences.forEach(function(experience) {
      key = "experience-" + experience.id;
      data.push(<ExperienceItem experience={experience} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume} />);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="experiences">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="experience"></i>
           </a>
        </div>
        <section className="education-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="experience_header"
                      className="form-control"
                      placeholder="EXPERIENCES"
                      value={this.state.experience_header}
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