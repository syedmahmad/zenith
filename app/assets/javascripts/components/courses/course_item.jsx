var CourseItem = React.createClass({

  getInitialState: function(){
    var course = this.props.course;
    return {title: course.title, description: course.description, course: course};
  },

  handleChange: function(e){
    e.preventDefault();
    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = $(e.target).closest(".section-item").data("sectionId");

    itemsObj = $.grep(resume["courses"], function (item) {
      if(item.id == subSectionId){
        item[e.target.name] = e.target.value;
      }
      return item;
    });
    resume["courses"] = itemsObj;
    this.props.resume = resume;
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
     <li className="section-item row mrl0" data-course-id={this.state.course.id} data-section-id={this.state.course.id}>
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
      <div className="input-holder">
         <div className="form-group mb-0">
            <textArea
              type="string"
              name="title"
              className="form-control hide-show-control secondary-color sub-header"
              placeholder="Course Title"
              value={this.state.title}
              onChange={ this.handleChange }
            />
         </div>
         { this.state.course.show_description &&<div className="form-group">
            <textArea
              type="string"
              name="description"
              className="form-control mb-0"
              placeholder="Course Description"
              value={this.state.description}
              onChange={ this.handleChange }
            />
         </div>}
      </div>
      { this.props.total > 1 &&
        <div className="sub-section-rearrange"><i className="fa fa-arrows"></i></div>
      }
     </li>
    )
  }
});