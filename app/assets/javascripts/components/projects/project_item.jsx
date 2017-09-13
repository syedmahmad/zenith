var ProjectItem = React.createClass({

  getInitialState: function(){
    var project = this.props.project;
    return {name: project.name, location: project.location, duration: project.duration, description: project.description};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitproject: function(e){
    e.preventDefault();
    this.props.updateResume(
      {project: {name: this.state.name, location: this.state.location, duration: this.state.duration, description: this.state.description}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitProject}>
          <div><input
            type="string"
            name="name"
            className="name"
            placeholder="Project/Activity name"
            value={this.state.name}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="duration"
            className="name"
            placeholder="Date period"
            value={this.state.duration}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="location"
            className="name"
            placeholder="Location"
            value={this.state.location}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="description"
            className="name"
            placeholder="Short summary of your work"
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