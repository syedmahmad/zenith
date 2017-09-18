var courses = React.createClass({
  render: function() {
    var courses = this.props.resume.courses
    var data = []
    var key = "";
    var _this = this;
    courses.forEach(function(course) {
      key = "course-" + course.id;
      data.push(<CourseItem course={course} key={key}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Courses">
        {data}
      </div>
    )
  }
});