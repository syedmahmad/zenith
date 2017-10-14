var VolunteerItem = React.createClass({

  getInitialState: function(){
    var volunteer = this.props.volunteer;
    return {volunteer: volunteer, title: volunteer.title, organization_name: volunteer.organization_name, duration: volunteer.duration, description: volunteer.description, location: volunteer.location};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitVolunteer: function(e){
    e.preventDefault();
    this.props.updateResume(
      {volunteer: {title: this.state.title, organization_name: this.state.organization_name, duration: this.state.duration, description: this.state.description}}
    );
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  render: function() {
    optionsArr = ["show_location", "show_period", "show_description"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.volunteer} section="volunteers" sectionId={this.state.volunteer.id} options={optionsArr}/>
    return (
      <div className="">
        <li className="section-item col-xs-12" data-volunteer-id={this.props.volunteer.id} data-section-id={this.props.volunteer.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.volunteer.id}></i>
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
                    name="title"
                    className="form-control hide-show-control"
                    placeholder="Title/Role"
                    value={this.state.title}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
             <h3 className="company">
                <div className="form-group">
                  <input
                    type="string"
                    name="organization_name"
                    className="form-control"
                    placeholder="Organization Name"
                    value={this.state.organization_name}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
             <div style={{display: 'inline-flex'}}> 
              {this.state.volunteer.show_period && <div className="column">
                  <i className="fa fa-calendar secondary-color" aria-hidden="true"></i>
                  <span>
                     <div className="form-group">
                      <input
                        type="string"
                        name="duration"
                        className="form-control"
                        placeholder="Date period"
                        value={this.state.duration}
                        onChange={ this.handleChange }
                      />
                     </div>
                  </span>
               </div>}
               {this.state.volunteer.show_location && <div className="column">
                   <i className="fa fa-map-marker secondary-color" aria-hidden="true"></i>
                   <span>
                      <div className="form-group">
                       <input
                         type="string"
                         name="location"
                         className="form-control"
                         placeholder="Location"
                         value={this.state.location}
                         onChange={ this.handleChange }
                       />
                      </div>
                   </span>
                </div>}
            </div>
             <h3>
               {this.state.volunteer.show_description && <div className="column">
                 <div className="form-group">
                  <textArea
                    type="string"
                    name="description"
                    className="form-control"
                    placeholder="Short summary of your work"
                    value={this.state.description}
                    onChange={ this.handleChange }
                  />
                 </div>
               </div>}
             </h3>
          </div>
        </li>
      </div>
    )
  }
});