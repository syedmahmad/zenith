var EducationItem = React.createClass({

  getInitialState: function(){
    var education = this.props.education;
    return {degree_name: education.degree_name, university_name: education.university_name, duration: education.duration, cgpa: education.cgpa};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submiteducation: function(e){
    e.preventDefault();
    this.props.updateResume(
      {education: {degree_name: this.state.degree_name, university_name: this.state.university_name, duration: this.state.duration, cgpa: this.state.cgpa}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitEducation}>
          <div><input
            type="string"
            name="degree_name"
            className="name"
            placeholder="Degree and Field of Study"
            value={this.state.degree_name}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="university_name"
            className="name"
            placeholder="School or University"
            value={this.state.university_name}
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
            name="cgpa"
            className="name"
            placeholder="6.00/6.00"
            value={this.state.cgpa}
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