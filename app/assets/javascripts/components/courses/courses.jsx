var Courses = React.createClass({
  getInitialState: function(){
    return {course_header: "COURSES", courses: this.props.resume.courses};
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
      _this.submitCourses({[e.target.name]: e.target.value, id: $(this).data("courseId")});
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
  submitCourses: function(params){
    this.props.updateResume(
      {resume: {courses_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.courses.length>0) {
      id = this.state.courses[this.state.courses.length-1].id + 1;
    }
    var course = {id:id, title:'', description:''};
    this.state.courses.push(course);
    this.setState({courses: this.state.courses});
  },
  removeSubSection: function(e){  
    debugger;
    e.preventDefault();
    var obj_to_remove = this.state.courses.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({courses: this.state.courses.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var courses = this.state.courses
    var data = []
    var key = "";
    var _this = this;
    courses.forEach(function(course) {
      key = "course-" + course.id;
      data.push(<CourseItem course={course} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Courses">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="courses"></i>
          </a>
       </div>
        <section className="achievement-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="course_header"
                      className="form-control"
                      placeholder="COURSES"
                      value={this.state.course_header}
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