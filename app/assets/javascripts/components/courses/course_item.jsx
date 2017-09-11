var CourseItem = React.createClass({
  render: function() {
    var course = this.props.course;
    return (
      <div className="section-item">
        <h2>{course.title}</h2>
        <p>{course.description}</p> 
      </div>
    )
  }
});