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
    $(document).on('focusin', ".section-item", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitEducation({[e.target.name]: e.target.value, id: $(this).data("educationId")});
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
  submitEducation: function(params){
    this.props.updateResume(
      {resume: {educations_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.education.length>0) {
      id = this.state.education[this.state.education.length-1].id + 1;
    }
    var education = {id:id, degree_name:'', university_name:'', duration:'', cgpa:''};
    this.state.education.push(education);
    this.setState({education: this.state.education});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.education.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({education: this.state.education.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var education = this.state.education
    var data = []
    var key = "";
    var _this = this;
    education.forEach(function(education_item) {
      key = "education-" + education_item.id;
      data.push(<EducationItem education_item={education_item} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume} />);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Education">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="education"></i>
           </a>
        </div>
        <section className="education-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="education_header"
                      className="form-control"
                      placeholder="EDUCATION"
                      value={this.state.education_header}
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