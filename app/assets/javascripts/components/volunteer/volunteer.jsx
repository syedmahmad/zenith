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
    var show_hide_section_clicked = false;
    $(document).on('focusin', ".section-item", (function (e) {
      this.firstChild.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      e.preventDefault();
      if($('.show_hide_section').hasClass("hovered")){
        show_hide_section_clicked = true;
        $(e.target).closest(".section-item").find(".hide-show-control").attr('tabindex',-1).focus();
      }else{
        show_hide_section_clicked = false;
      }
      
      if(!show_hide_section_clicked) {
        $(this).find(".show_hide_section").hide()
        this.firstChild.classList.add('hide-section');

        var state_res = _this.state.volunteers.find(item => item.id == $(this).data("volunteerId"));
        if (state_res) {
          var props_res = _this.props.resume.volunteers.find(item => item.id == $(this).data("volunteerId"));
          if (props_res && props_res[e.target.name] != e.target.value && e.target.name != "calendar") {
            //send update call...
            _this.submitVolunteers({[e.target.name]: e.target.value, "id": $(this).data("volunteerId")});
          }
        }
      }
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
    var formData = {sub_section_name:"Volunteer"};
    //updating current state from parent
    this.props.createSubSection(formData, "volunteers");
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Volunteer"};
    //updating current state from parent
    this.props.removeSubSection(formData, "volunteers");
  },

  render: function() {
    var volunteers = this.state.volunteers
    var data = []
    var key = "";
    var _this = this;
    volunteers.forEach(function(volunteer) {
      key = "volunteer-" + volunteer.id;
      data.push(<VolunteerItem handleShowHideChange={_this.props.handleShowHideChange} volunteer={volunteer} key={key}  removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Volunteers">
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Volunteers"></i>
           </a>
        </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="volunteer_header"
                      className="form-control primary_font"
                      placeholder="VOLUNTEER"
                      value={this.state.volunteer_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="section-items-list">
              <ul>
                {data}
              </ul>
           </div>
       </section>
     </div>
    )
  }
});