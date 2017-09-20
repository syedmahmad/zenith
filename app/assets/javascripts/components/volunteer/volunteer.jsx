var Volunteers = React.createClass({
  getInitialState: function(){
    return {volunteer_header: "VOLUNTEER", volunteers: this.props.resume.volunteers};
  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  handleRemoveSection: function(e){
    e.preventDefault();
    this.props.handleRemoveSection(e);
  },
  componentDidMount: function(){
    var _this = this;
    $(document).on('focusin', ".section-item", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitVolunteers({[e.target.name]: e.target.value, id: $(this).data("volunteerId")});
        // _this.props.achievement[e.target.name] = e.target.value;
      // }
    }));

   // show and hide buttons
    $(document).on('focusin', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.remove('hide-section');
    })); 
    $(document).on('focusout', ".heading-area", (function (e) {
      this.parentElement.previousElementSibling.classList.add('hide-section');
    }));

  },
  submitVolunteers: function(params){
    this.props.updateResume(
      {resume: {volunteers_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.volunteers.length>0) {
      id = this.state.volunteers[this.state.volunteers.length-1].id + 1;
    }
    var volunteer = {id:id, title:'', desctiption:'', duration:'', organization_name:''};
    this.state.volunteers.push(volunteer);
    this.setState({volunteers: this.state.volunteers});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.volunteers.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({volunteers: this.state.volunteers.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var volunteers = this.props.resume.volunteers
    var data = []
    var key = "";
    var _this = this;
    volunteers.forEach(function(volunteer) {
      key = "volunteer-" + volunteer.id;
      data.push(<VolunteerItem volunteer={volunteer} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Volunteers">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="volunteers"></i>
           </a>
        </div>
        <section className="volunteers-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="volunteer_header"
                      className="form-control"
                      placeholder="VOLUNTEER"
                      value={this.state.volunteer_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="row">
            {data}
           </div>
       </section>
     </div>
    )
  }
});