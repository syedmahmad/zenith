var CourseItem = React.createClass({

  getInitialState: function(){
    var course = this.props.course;
    return {title: course.title, description: course.description};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitCourse: function(e){
    e.preventDefault();
    this.props.updateResume(
      {course: {title: this.state.title, description: this.state.description}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitCourse}>
          <div><input
            type="string"
            name="title"
            className="name"
            placeholder="Course Title"
            value={this.state.title}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="description"
            className="name"
            placeholder="Course Description"
            value={this.state.description}
            onChange={ this.handleChange }
          /></div>
          
          <div className='row'>
            <div className='col-sm-4'>
              <input hidden type="submit" value="Save" className='btn btn-primary' />
            </div>
          </div>
        </form>
      </div>
    )
  }
});