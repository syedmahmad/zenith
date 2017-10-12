var EducationItem = React.createClass({

  getInitialState: function(){
    var education = this.props.education_item;
    return {education: education ,degree_name: education.degree_name, university_name: education.university_name, duration: education.duration, cgpa: education.cgpa, location: education.location};
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
    optionsArr = ["show_location", "show_period", "show_gpa"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.education} section="education" sectionId={this.state.education.id} options={optionsArr}/>
    return (
      <div className="">
        <li className="section-item col-xs-12" data-education-id={this.props.education_item.id} data-section-id={this.props.education_item.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.education_item.id}></i>
             </a>
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
             </a>
          </div>
          {showHideOptions}
          <div className="">
             <h3 className="title-position">
                <div className="form-group">
                  <input
                    type="string"
                    name="degree_name"
                    className="form-control hide-show-control"
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
                    name="university_name"
                    className="form-control secondary-color"
                    placeholder="School or University"
                    value={this.state.university_name}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
             <div style={{display: 'inline-flex'}}> 
               {this.state.education.show_period && <div className="column">
                  <i className="fa fa-calendar secondary-color" aria-hidden="true"></i>
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
               </div>}
               {this.state.education.show_location && <div className="column">
                  <i className="fa fa-map-marker secondary-color" aria-hidden="true"></i>
                  <span>
                     <div className="form-group">
                      <input
                        type="string"
                        name="location"
                        className="form-control"
                        placeholder="location"
                        value={this.state.location || ''}
                        onChange={ this.handleChange }
                      />
                     </div>
                  </span>
               </div>}
             </div>
             { this.state.education.show_gpa && <div className="column" style={{display: 'inline-flex'}}>
                <input className="form-control" readOnly value="CGPA"/> 
                 <div className="form-group">
                  <input
                    type="string"
                    name="cgpa"
                    className="form-control"
                    placeholder="3.9/6.0"
                    value={this.state.cgpa || ''}
                    onChange={ this.handleChange }
                  />
                 </div>
             </div>}
          </div>

        </li>
      </div>
    )
  }
});