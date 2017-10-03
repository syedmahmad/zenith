var ExperienceItem = React.createClass({

  getInitialState: function(){
    var experience = this.props.experience;
    return {title: experience.title, company_name: experience.company_name, location: experience.location, duration: experience.duration, description: experience.description};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    return (
      <div className="">
        <div className="section-item col-xs-12" data-experience-id={this.props.experience.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.experience.id}></i>
             </a>
          </div>
          <div className="">
             <h3 className="title-position">
                <div className="form-group">
                  <input
                    type="string"
                    name="title"
                    className="form-control"
                    placeholder="Title/Position"
                    value={this.state.title}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
             <h3 className="company">
                <div className="form-group">
                  <input
                    type="string"
                    name="company_name"
                    className="form-control secondary-color"
                    placeholder="Company"
                    value={this.state.company_name}
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
                      placeholder="Date period"
                      value={this.state.duration}
                      onChange={ this.handleChange }
                    />
                   </div>
                </span>
             </div>
             <div className="column">
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
             </div>
             <div className="column">
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