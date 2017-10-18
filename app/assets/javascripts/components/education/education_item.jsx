var EducationItem = React.createClass({

  getInitialState: function(){
    var education = this.props.education_item;
    return {education: education ,degree_name: education.degree_name, university_name: education.university_name, duration: education.duration, cgpa: education.cgpa, location: education.location, ongoing: education.ongoing};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  handleDate: function(e) {
    e.preventDefault();
    $(".calendar-holder").show();
    $('.date-picker1').focus();
    // $('.date-picker2').focus();
    
  },

  componentDidMount: function(){
    $(".calendar-holder").hide();
    $('.date-picker1').datepicker(
       {
           dateFormat: "mm/yy",
           changeMonth: true,
           changeYear: true,
           showButtonPanel: true,
           onClose: function(dateText, inst) {
               function isDonePressed(){
                   return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
               }
               if (isDonePressed()){
                   var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                   var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                   var dateObj = new Date(year, month, 1);
                   var month = dateObj.getUTCMonth() + 1; 
                   var year = dateObj.getUTCFullYear();
                   $(".calendar-input").val(month + "/" + year + " " + $(".calendar-input").val());
                   // $(this).datepicker('setDate', new Date(year, month, 1)).trigger('change');
                   
                   $('.date-picker1').focusout();//Added to remove focus from datepicker input box on selecting date
                  // $('.date-picker1').hide();
               }
           }
       });

    $('.date-picker2').datepicker(
       {
           dateFormat: "mm/yy",
           changeMonth: true,
           changeYear: true,
           showButtonPanel: true,
           onClose: function(dateText, inst) {
               function isDonePressed(){
                   return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
               }
               if (isDonePressed()){
                   var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                   var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                   var dateObj = new Date(year, month, 1);
                   var month = dateObj.getUTCMonth() + 1; 
                   var year = dateObj.getUTCFullYear();
                   $(".calendar-input").val($(".calendar-input").val() + " - " + month + "/" + year);
                   // $(this).datepicker('setDate', new Date(year, month, 1)).trigger('change');
                   
                   $('.date-picker2').focusout();//Added to remove focus from datepicker input box on selecting date
                  // $('.date-picker2').hide();
               }
           }
       });
  },

  handleOngoing: function(e){
    var val = $(e.target).prop("checked");
    this.setState({ongoing: val});
    if (val){
      $('.date-picker2').hide();
      var arr = $(".calendar-input").val().split("-");
      if (arr[1] || arr[0]){
        $(".calendar-input").val(arr[0] + " - ongoing");  
      }else{
        $(".calendar-input").val(" - ongoing");
      }
    }
    var params = {ongoing: val, duration: $(".calendar-input").val(), "id": $(e.target).closest(".section-item").data("educationId")};

    this.props.updateResume(
      {resume: {educations_attributes: {"1": params}}}
    );
  },

  render: function() {
    checked = this.state.ongoing
    optionsArr = ["show_location", "show_period", "show_gpa"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.education} section="education" sectionId={this.state.education.id} options={optionsArr}/>
    return (
      <div className="">
        <li className="section-item col-xs-12" data-education-id={this.props.education_item.id} data-section-id={this.props.education_item.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.education_item.id}></i>
             </a>
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
             </a>
          </div>
          {showHideOptions}
          <div className="">
             <h3 className="title-position">
                <div className="form-group">
                  <input
                    type="string"
                    name="degree_name"
                    className="form-control hide-show-control"
                    placeholder="Degree and Field of Study"
                    value={this.state.degree_name}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
             <h3 className="company">
                <div className="form-group">
                  <input
                    type="string"
                    name="university_name"
                    className="form-control secondary-color"
                    placeholder="School or University"
                    value={this.state.university_name}
                    onChange={ this.handleChange }
                  />
                </div>
             </h3>
             <div style={{display: 'inline-flex'}}> 
               {this.state.education.show_period && <div className="column">
                  <i className="fa fa-calendar secondary-color" aria-hidden="true"></i>
                  <span>
                     <div className="form-group">
                      <input
                        type="string"
                        name="duration"
                        className="form-control calendar-input"
                        placeholder="Sep 2017"
                        value={this.state.duration}
                        onClick={ this.handleDate }
                      />
                     </div>
                  </span>
                  <div className="calendar-holder">
                    <p> From:<input className="date-picker1" /></p>
                    <p>
                      <span className="toggle-holder">
                        <label className="switch">
                          <span>Ongoing</span>
                          <input type="checkbox" onChange={this.handleOngoing} data-size="mini" data-toggle="toggle" className="option_item" type="checkbox" checked={checked}/>
                          <span className="slider round"></span>
                        </label>
                      </span>
                    </p>
                    <p> To:<input className="date-picker2" /></p>
                  </div>
               </div>}
               {this.state.education.show_location && <div className="column">
                  <i className="fa fa-map-marker secondary-color" aria-hidden="true"></i>
                  <span>
                     <div className="form-group">
                      <input
                        type="string"
                        name="location"
                        className="form-control"
                        placeholder="location"
                        value={this.state.location || ''}
                        onChange={ this.handleChange }
                      />
                     </div>
                  </span>
               </div>}
             </div>
             { this.state.education.show_gpa && <div className="column" style={{display: 'inline-flex'}}>
                <input className="form-control" readOnly value="CGPA"/> 
                 <div className="form-group">
                  <input
                    type="string"
                    name="cgpa"
                    className="form-control"
                    placeholder="3.9/6.0"
                    value={this.state.cgpa || ''}
                    onChange={ this.handleChange }
                  />
                 </div>
             </div>}
          </div>

        </li>
      </div>
    )
  }
});