var EducationItem = React.createClass({

  getInitialState: function(){
    var education = this.props.education_item;
    return {education: education ,degree_name: education.degree_name, university_name: education.university_name, duration: education.duration, cgpa: education.cgpa, location: education.location, ongoing: education.ongoing};
  },

  handleChange: function(e){
    e.preventDefault();
    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = $(e.target).closest(".section-item").data("sectionId");
    itemsObj = $.grep(resume["education"], function (item) {
      if(item.id == subSectionId){
        item[e.target.name] = e.target.value;
      }
      return item;
    });
    resume["education"] = itemsObj;
    this.props.resume = resume;
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show();
  },

  handleDate: function(e) {
    e.preventDefault();
    $(".calendar-holder").hide();
    $(e.target).closest(".section-item").find(".calendar-holder").show();
  },
  componentDidUpdate: function(){
    this.adjustTextFields();
    // this.props.setupLayout();
  },
  componentDidMount: function(){
    var _this = this;
    $(".calendar-holder").hide();
    datePicker1 = ".date-picker-edu-" + _this.state.education.id;
    datePicker2 = ".date-picker2-edu-" + _this.state.education.id;
    $(document).find(datePicker1).datepicker({
      // changeMonth: true,
      // changeYear: true,
      // showButtonPanel: true,
      // dateFormat: 'MM yy',
      // onClose: function(dateText, inst) { 
      //   $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
      // },
      dateFormat: 'mm / yy',
      maxDate: new Date,
      onSelect: function (dateText, inst) {
         _this.updateStartDate(dateText, inst);
      }
    });
    $(document).find(datePicker2).datepicker({
      dateFormat: 'mm / yy',
      maxDate: new Date,
      onSelect: function (dateText, inst) {
         _this.updateEndDate(dateText, inst);
      }
    });
    this.adjustTextFields();
  },

  adjustTextFields: function(){
    $.each($(".education-holder textarea"), function(index, el){
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


    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = $(inst.input).closest(".section-item").data("sectionId");
    itemsObj = $.grep(resume["education"], function (item) {
      if(item.id == subSectionId){
        item["duration"] = duration;
      }
      return item;
    });
    resume["education"] = itemsObj;
    this.props.resume = resume;


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
    duration = startDate.replace(/\s+/g, '');
    
    datePicker2 = ".date-picker2-edu-" + this.state.education.id;
    if (new Date(parseInt(endDate.split("/")[1]), parseInt(endDate.split("/")[0])) < new Date(parseInt(duration.split("/")[1]), parseInt(duration.split("/")[0]))){
      $(document).find(datePicker2).addClass("invalid-field");
    } else {
      $(document).find(datePicker2).removeClass("invalid-field");
    }

    if(endDate != "undefined" && typeof(endDate) != "undefined"){
      duration = duration + " - " + endDate;
    }


    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = sectionId
    itemsObj = $.grep(resume["education"], function (item) {
      if(item.id == subSectionId){
        item["duration"] = duration;
        item["ongoing"] = ongoing;
      }
      return item;
    });
    resume["education"] = itemsObj;
    this.props.resume = resume;

    
   
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
        <div className="education-holder">
          <div className="heading-section">
             <div className="title-position">
                <div className="form-group mb-0">
                  <textArea
                    type="string"
                    name="degree_name"
                    className="form-control hide-show-control sub-header"
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
                    className="form-control secondary-color sub-color-area"
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
                        className="form-control line-height-26"
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
                        className="form-control line-height-26"
                        placeholder="Location"
                        value={this.state.location || ''}
                        onChange={ this.handleChange }
                      />
                     </div>
                  </span>
               </div>}
             </div>
           </div>
           { this.state.education.show_gpa && <div className="column cgpa-section" style={{display: 'block'}}>
              <textArea className="form-control cgpa-input" readOnly value="CGPA"/> 
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
        { this.props.total > 1 &&
          <div className="sub-section-rearrange"><i className="fa fa-arrows"></i></div>
        }
      </li>
    )
  }
});