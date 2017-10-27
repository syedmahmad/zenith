var VolunteerItem = React.createClass({

  getInitialState: function(){
    var volunteer = this.props.volunteer;
    return {volunteer: volunteer, title: volunteer.title, organization_name: volunteer.organization_name, duration: volunteer.duration, description: volunteer.description, location: volunteer.location, ongoing: volunteer.ongoing};
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

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  handleDate: function(e) {
    e.preventDefault();
    $(e.target).closest(".section-item").find(".calendar-holder").show();
  },

  componentDidUpdate: function(){
    this.adjustTextFields();
  },
  
  componentDidMount: function(){
    var _this = this;
    $(".calendar-holder").hide();
    datePicker1 = ".date-picker-vol-" + _this.state.volunteer.id;
    datePicker2 = ".date-picker2-vol-" + _this.state.volunteer.id;
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
    this.adjustTextFields();
  },

  adjustTextFields: function(){
    $.each($(".volunteer-holder textarea"), function(index, el){
      $(el).height(el.scrollHeight+"px");
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

    params = {duration: duration, "id": $(inst.input).closest(".section-item").data("volunteerId")};
    this.props.updateResume(
      {resume: {volunteers_attributes: params}}
    );

    this.setState({"duration": duration});
  },
  updateEndDate: function(dateText, inst, ongoing=false){
    duration = "";
    var sectionId = $(inst.input).closest(".section-item").data("volunteerId");

    if(!sectionId){
      sectionId = $(inst).closest(".section-item").data("volunteerId");
    }

    startDate = this.state.duration.split("-")[0];
    endDate = dateText.replace(/\s+/g, '');
    duration = startDate.replace(/\s+/g, '');;
    if(endDate != "undefined" && typeof(endDate) != "undefined"){
      duration = duration + " - " + endDate;
    }

    params = {ongoing: ongoing, duration: duration, "id": sectionId};
    this.props.updateResume(
      {resume: {volunteers_attributes: params}}
    );

    this.setState({"duration": duration, "ongoing": ongoing});
  },

  handleOngoing: function(e){
    ongoing = $(e.target).prop("checked");
    val = "ongoing";
    sectionId = $(e.target).closest(".section-item").data("volunteerId");
    if(ongoing){
      $(".date-picker2-vol-"+sectionId).datepicker('disable');
    }else{
      $(".date-picker2-vol-"+sectionId).datepicker('enable');
      val = $(".date-picker2-vol-"+sectionId).val();
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
    datePicker1 = "date-picker-vol-" + this.props.volunteer.id;
    datePicker2 = "date-picker2-vol-" + this.props.volunteer.id;

    calendarTarget = "calender-terget-"+ this.props.volunteer.id;

    if(duration && duration.match("-")){
      startDate = duration.split("-")[0].replace(/\s+/g, '');
      endDate = duration.split("-")[1].replace(/\s+/g, '');
    }
    optionsArr = ["show_location", "show_period", "show_description"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.volunteer} section="volunteers" sectionId={this.state.volunteer.id} options={optionsArr}/>
    return (
      <li className="section-item col-xs-12" data-volunteer-id={this.props.volunteer.id} data-section-id={this.props.volunteer.id}>
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.volunteer.id}></i>
           </a>
           <a href="javaScript:void(0);" title="">
           <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
           </a>
        </div>
        {showHideOptions}
        <div className="volunteer-holder">
           <div className="title-position">
              <div className="form-group mb-0">
                <textArea
                  type="string"
                  name="title"
                  className="form-control hide-show-control"
                  placeholder="Title/Role"
                  value={this.state.title}
                  onChange={ this.handleChange }
                />
              </div>
           </div>
           <div className="company">
              <div className="form-group mb-0">
                <textArea
                  type="string"
                  name="organization_name"
                  className="form-control"
                  placeholder="Organization Name"
                  value={this.state.organization_name}
                  onChange={ this.handleChange }
                />
              </div>
           </div>
           <div style={{display: 'inline-flex'}}> 
            {this.state.volunteer.show_period && <div className="column">
                <i className="fa fa-calendar secondary-color" onClick={ this.handleDate } aria-hidden="true"></i>
                <span>
                   <div className="form-group mb-0">
                    <textArea
                      type="string"
                      name="duration"
                      className="form-control line-height-26"
                      placeholder="Date period"
                      value={this.state.duration || ''}
                      data-calender-target={calendarTarget}
                      onClick={ this.handleDate }
                      onChange= {this.handleDateChange}
                    />
                   </div>
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
                </span>
             </div>}
             {this.state.volunteer.show_location && <div className="column">
                 <i className="fa fa-map-marker secondary-color" aria-hidden="true"></i>
                 <span>
                    <div className="form-group mb-0">
                     <textArea
                       type="string"
                       name="location"
                       className="form-control line-height-26"
                       placeholder="Location"
                       value={this.state.location || ''}
                       onChange={ this.handleChange }
                     />
                    </div>
                 </span>
              </div>}
          </div>
           {this.state.volunteer.show_description && <div className="column">
             <div className="form-group mb-0">
              <textArea
                type="string"
                name="description"
                className="form-control"
                placeholder="Short summary of your work"
                value={this.state.description}
                onChange={ this.handleChange }
              />
             </div>
           </div>}
        </div>
      </li>
    )
  }
});