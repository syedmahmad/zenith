var ExperienceItem = React.createClass({

  getInitialState: function(){
    var experience = this.props.experience;
    return {title: experience.title, company_name: experience.company_name, location: experience.location, duration: experience.duration, description: experience.description};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitExperience: function(e){
    e.preventDefault();
    this.props.updateResume(
      {experience: {title: this.state.title, company_name: this.state.company_name, location: this.state.location, duration: this.state.duration, description: this.state.description}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitExperience}>
          <div><input
            type="string"
            name="title"
            className="name"
            placeholder="Title/Position"
            value={this.state.title}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="company_name"
            className="name"
            placeholder="Company"
            value={this.state.company_name}
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
            placeholder="Company Description"
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