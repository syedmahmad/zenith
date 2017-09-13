var VolunteerItem = React.createClass({

  getInitialState: function(){
    var volunteer = this.props.volunteer;
    return {title: volunteer.title, organization_name: volunteer.organization_name, duration: volunteer.duration, description: volunteer.description};
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

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitVolunteer}>
          <div><input
            type="string"
            name="title"
            className="name"
            placeholder="Title/Role"
            value={this.state.title}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="organization_name"
            className="name"
            placeholder="Organization Name"
            value={this.state.organization_name}
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