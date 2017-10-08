var CourseItem = React.createClass({

  getInitialState: function(){
    var course = this.props.course;
    return {title: course.title, description: course.description, course: course};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  render: function() {
    optionsArr = ["show_description"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.course} section="courses" sectionId={this.state.course.id} options={optionsArr}/>
    return (
      <div className="">
       <li className="section-item" data-course-id={this.state.course.id} data-section-id={this.state.course.id}>
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.course.id}></i>
           </a>
           <a href="javaScript:void(0);" title="">
           <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
           </a>
        </div>
        {showHideOptions}
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
           { this.state.course.show_description &&<div className="form-group">
              <input
                type="string"
                name="description"
                className="form-control"
                placeholder="Course Description"
                value={this.state.description}
                onChange={ this.handleChange }
              />
           </div>}
        </h6>
       </li>
      </div>
    )
  }
});