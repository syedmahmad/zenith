var EducationItem = React.createClass({

  getInitialState: function(){
    var education = this.props.education_item;
    return {degree_name: education.degree_name, university_name: education.university_name, duration: education.duration, cgpa: education.cgpa};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
      <div className="">
        <div className="section-item col-xs-12" data-education-id={this.props.education_item.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.education_item.id}></i>
             </a>
          </div>
          <div className="">
             <h3 className="title-position">
                <div className="form-group">
                  <input
                    type="string"
                    name="degree_name"
                    className="form-control"
                    placeholder="Degree and Field of Study"
                    value={this.state.degree_name}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
             <h3 className="company">
                <div className="form-group">
                  <input
                    type="string"
                    name="university_name secondary-color"
                    className="form-control"
                    placeholder="School or University"
                    value={this.state.university_name}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
             <div className="column">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span>
                   <div className="form-group">
                    <input
                      type="string"
                      name="duration"
                      className="form-control"
                      placeholder="Sep 2017"
                      value={this.state.duration}
                      onChange={ this.handleChange }
                    />
                   </div>
                </span>
             </div>
             <div className="column">
                <i>CGPA </i>
                <span>
                   <div className="form-group">
                    <input
                      type="string"
                      name="cgpa"
                      className="form-control"
                      placeholder="3.9/6.0"
                      value={this.state.cgpa}
                      onChange={ this.handleChange }
                    />
                   </div>
                </span>
             </div>
          </div>

        </div>
      </div>
    )
  }
});