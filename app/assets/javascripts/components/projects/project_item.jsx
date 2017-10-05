var ProjectItem = React.createClass({

  getInitialState: function(){
    var project = this.props.project;
    return {project: project, name: project.name, location: project.location, duration: project.duration, description: project.description};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    optionsArr = ["show_location", "show_period", "show_outcomes", "show_link", "show_description"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.project} section="projects" sectionId={this.state.project.id} options={optionsArr}/>
    return (
      <div className="">
        <div className="section-item col-xs-12" data-project-id={this.props.project.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.project.id}></i>
             </a>
          </div>
          {showHideOptions}
          <div className="">
             <h3 className="title-position">
                <div className="form-group">
                  <input
                    type="string"
                    name="name"
                    className="form-control"
                    placeholder="Project/Activity name"
                    value={this.state.name}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
            {this.state.project.show_period && <div className="column">
              <i className="fa fa-calendar" aria-hidden="true"></i>
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
             {this.state.project.show_location && <div className="column">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
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
             {this.state.show_description && <div className="column">
               <div className="form-group">
                <input
                  type="string"
                  name="description"
                  className="form-control"
                  placeholder="Company Description"
                  value={this.state.description}
                  onChange={ this.handleChange }
                />
               </div>
             </div>}
          </div>
        </div>
      </div>
    )
  }
});