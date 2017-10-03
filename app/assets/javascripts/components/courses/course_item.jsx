var CourseItem = React.createClass({

  getInitialState: function(){
    var course = this.props.course;
    return {title: course.title, description: course.description};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
      <div className="">
       <li className="section-item" data-course-id={this.props.course.id}>
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.course.id}></i>
           </a>
        </div>
        <h5>
           <div className="form-group">
              <input
                type="string"
                name="title"
                className="form-control secondary-color"
                placeholder="Course Title"
                value={this.state.title}
                onChange={ this.handleChange }
              />
           </div>
        </h5>
        <h6>
           <div className="form-group">
              <input
                type="string"
                name="description"
                className="form-control"
                placeholder="Course Description"
                value={this.state.description}
                onChange={ this.handleChange }
              />
           </div>
        </h6>
       </li>
      </div>
    )
  }
});