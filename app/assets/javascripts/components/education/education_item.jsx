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
    $(e.target).closest(".section-item").find(".show_hide_section").show();
  },

  handleDate: function(e) {
    e.preventDefault();
    $(e.target).closest(".section-item").find(".calendar-holder").show();
  },

  componentDidMount: function(){
    var _this = this;
    $(".calendar-holder").hide();
    datePicker1 = ".date-picker-edu-" + _this.state.education.id;
    datePicker2 = ".date-picker2-edu-" + _this.state.education.id;
    $(document).find(datePicker1).datepicker({
      onSelect: function (dateText, inst) {
         _this.updateStartDate(dateText, inst);
      }
    });
    $(document).find(datePicker2).datepicker({
      onSelect: function (dateText, inst) {
         _this.updateEndDate(dateText, inst);
      }
    });

    $(".calendar-holder").hover(function(){
       $(this).addClass("hovered");
    },function(){
      if (document.activeElement.className.indexOf("date-picker") != 0){
       $(this).removeClass("hovered");
       $(this).hide();
      }
    });
  },

  updateStartDate: function(dateText, inst){
    duration = "";
    startDate = dateText;
    endDate = this.state.duration.split("-")[1];
    duration = startDate.replace(/\s+/g, '');;

    if(endDate != "undefined" && typeof(endDate) != "undefined"){
      duration = duration + " - " + endDate;
    }

    params = {duration: duration, "id": $(inst.input).closest(".section-item").data("educationId")};
    this.props.updateResume(
      {resume: {educations_attributes: params}}
    );

    this.setState({"duration": duration});
  },
  updateEndDate: function(dateText, inst, ongoing=false){
    duration = "";
    var sectionId = $(inst.input).closest(".section-item").data("educationId");

    if(!sectionId){
      sectionId = $(inst).closest(".section-item").data("educationId");
    }

    startDate = this.state.duration.split("-")[0];
    endDate = dateText.replace(/\s+/g, '');
    duration = startDate.replace(/\s+/g, '');;
    if(endDate != "undefined" && typeof(endDate) != "undefined"){
      duration = duration + " - " + endDate;
    }

    params = {ongoing: ongoing, duration: duration, "id": sectionId};
    this.props.updateResume(
      {resume: {educations_attributes: params}}
    );

    this.setState({"duration": duration, "ongoing": ongoing});
  },

  handleOngoing: function(e){
    ongoing = $(e.target).prop("checked");
    val = "ongoing";
    sectionId = $(e.target).closest(".section-item").data("educationId");
    if(ongoing){
      $(".date-picker2-edu-"+sectionId).datepicker('disable');
    }else{
      $(".date-picker2-edu-"+sectionId).datepicker('enable');
      val = $(".date-picker2-edu-"+sectionId).val();
    }

    this.updateEndDate(val, $(e.target), ongoing);
  },

  handleDateChange: function(){

  },

  render: function() {
    checked = this.state.ongoing
    duration = this.state.duration;
    startDate = "";
    endDate = "";
    datePicker1 = "date-picker-edu-" + this.props.education_item.id;
    datePicker2 = "date-picker2-edu-" + this.props.education_item.id;

    calendarTarget = "calender-terget-"+ this.props.education_item.id;

    if(duration && duration.match("-")){
      startDate = duration.split("-")[0].replace(/\s+/g, '');
      endDate = duration.split("-")[1].replace(/\s+/g, '');
    }

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
             <div className="title-position">
                <div className="form-group mb-0">
                  <textArea
                    type="string"
                    name="degree_name"
                    className="form-control hide-show-control"
                    placeholder="Degree and Field of Study"
                    value={this.state.degree_name}
                    onChange={ this.handleChange }
                  />
                </div>
             </div>
             <div className="company">
                <div className="form-group mb-0">
                  <textArea
                    type="string"
                    name="university_name"
                    className="form-control secondary-color"
                    placeholder="School or University"
                    value={this.state.university_name || ''}
                    onChange={ this.handleChange }
                  />
                </div>
             </div>
             <div style={{display: 'inline-flex'}}> 
               {this.state.education.show_period && <div className="column">
                  <i className="fa fa-calendar secondary-color" onClick={ this.handleDate } aria-hidden="true"></i>
                  <span>
                     <div className="form-group mb-0">
                      <textArea
                        type="string"
                        name="duration"
                        className="form-control"
                        placeholder="Date period"
                        value={this.state.duration}
                        data-calender-target={calendarTarget}
                        onClick={ this.handleDate }
                        onChange= {this.handleDateChange}
                      />
                     </div>
                  </span>
                  <section className="calendar-holder" data-calender-target={calendarTarget}>
                    <p> From:<input className={datePicker1} name="calendar" value={startDate} onChange= {this.handleDateChange}/></p>
                    <div>
                      <span className="toggle-holder">
                      <p>Ongoing</p>
                        <label className="switch">
                          <input type="checkbox" onChange={this.handleOngoing} data-size="mini" data-toggle="toggle" className="option_item" type="checkbox" checked={checked}/>
                          <span className="slider round"></span>
                        </label>
                      </span>
                    </div>
                    <p> To:<input disabled={checked} className={datePicker2} name="calendar" value={endDate} onChange= {this.handleDateChange}/></p>
                  </section>
               </div>}
               {this.state.education.show_location && <div className="column">
                  <i className="fa fa-map-marker secondary-color" aria-hidden="true"></i>
                  <span>
                     <div className="form-group mb-0">
                      <textArea
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
                <textArea className="form-control" readOnly value="CGPA"/> 
                 <div className="form-group mb-0">
                  <textArea
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