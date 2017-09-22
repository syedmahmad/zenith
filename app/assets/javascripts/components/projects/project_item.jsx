var ProjectItem = React.createClass({

  getInitialState: function(){
    var project = this.props.project;
    return {name: project.name, location: project.location, duration: project.duration, description: project.description};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
      <div className="">
        <div className="section-item" data-project-id={this.props.project.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.project.id}></i>
             </a>
          </div>
          <div className="col-xs-6">
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
             <h3 className="company">
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
             </h3>
             <div className="column">
                <i className="fa fa-calendar" aria-hidden="true"></i>
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
             </div>
             <div className="column">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span>
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
                </span>
             </div>
          </div>
        </div>
      </div>
    )
  }
});