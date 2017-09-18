var EducationItem = React.createClass({

  getInitialState: function(){
    var education = this.props.education_item;
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
              // <div><input
          //   type="string"
          //   name="cgpa"
          //   className="name"
          //   placeholder="6.00/6.00"
          //   value={this.state.cgpa}
          //   onChange={ this.handleChange }
          // /></div>
    return (
      <div className="section-item">
        <div className="col-xs-6">
           <h3 className="title-position">
              <div className="form-group">
                 <textarea type="text" rows="1" className="form-control" id="" placeholder="Degree and Field of Study"></textarea>
              </div>
           </h3>
           <h3 className="company">
              <div className="form-group">
                 <textarea type="text" rows="1" className="form-control" id="" placeholder="School or University"></textarea>
              </div>
           </h3>
           <div className="column">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <span>
                 <div className="form-group">
                    <textarea type="text" rows="1" className="form-control" id="" placeholder="Sep 2017"></textarea>
                 </div>
              </span>
           </div>
        </div>
        <div className="col-xs-6">
           <div className="gpa-holder">
              <p>GPA</p>
              <span>
                 <div className="form-group">
                    <textarea type="text" rows="1" className="form-control" id="" placeholder="6.00 /"></textarea>
                 </div>
              </span>
              <span>
                 <div className="form-group">
                    <textarea type="text" rows="1" className="form-control" id="" placeholder="6.00"></textarea>
                 </div>
              </span>
           </div>
        </div>
      </div>
    )
  }
});