var ExperienceItem = React.createClass({

  getInitialState: function(){
    var experience = this.props.experience;
    return {experience: experience, title: experience.title, company_name: experience.company_name, location: experience.location, duration: experience.duration, description: experience.description, outcomes: experience.outcomes, ongoing: experience.ongoing};
  },

  handleChange: function(e){
    e.preventDefault();
    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = $(e.target).closest(".section-item").data("sectionId");

    itemsObj = $.grep(resume["experiences"], function (item) {
      if(item.id == subSectionId){
        item[e.target.name] = e.target.value;
      }
      return item;
    });
    resume["experiences"] = itemsObj;
    this.props.resume = resume;
    this.setState({[e.target.name]: e.target.value});
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
    this.props.updateStyle();
    // this.props.setupLayout();
  },
  componentDidMount: function(){
    var _this = this;
    $(".calendar-holder").hide();
    datePicker1 = ".date-picker1-" + _this.state.experience.id;
    datePicker2 = ".date-picker2-" + _this.state.experience.id;
    $(document).find(datePicker1).datepicker({
      dateFormat: 'mm / yy',
      maxDate: new Date,
      onSelect: function (dateText, inst) {
         _this.updateStartDate(dateText, inst);
      }
    });
    $(document).find(datePicker2).datepicker({
      dateFormat: 'mm / yy',
      onSelect: function (dateText, inst) {
         _this.updateEndDate(dateText, inst);
      }
    });
    this.adjustTextFields();
  },

  adjustTextFields: function(){
    $.each($(document).find(".experience_holder textarea"), function(index, el){
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

    params = {duration: duration, "id": $(inst.input).closest(".section-item").data("experienceId")};
    this.props.updateResume(
      {resume: {experiences_attributes: params}}
    );

    this.setState({"duration": duration});
  },
  updateEndDate: function(dateText, inst, ongoing=false){
    duration = "";
    var sectionId = $(inst.input).closest(".section-item").data("experienceId");

    if(!sectionId){
      sectionId = $(inst).closest(".section-item").data("experienceId");
    }

    startDate = this.state.duration.split("-")[0];
    endDate = dateText.replace(/\s+/g, '');
    duration = startDate.replace(/\s+/g, '');;
    
    datePicker2 = ".date-picker2-" + this.state.experience.id;
    if (new Date(parseInt(endDate.split("/")[1]), parseInt(endDate.split("/")[0])) < new Date(parseInt(duration.split("/")[1]), parseInt(duration.split("/")[0]))){
      $(document).find(datePicker2).addClass("invalid-field");
    } else {
      $(document).find(datePicker2).removeClass("invalid-field");
    }

    if(endDate != "undefined" && typeof(endDate) != "undefined"){
      duration = duration + " - " + endDate;
    }

    params = {ongoing: ongoing, duration: duration, "id": sectionId};
    this.props.updateResume(
      {resume: {experiences_attributes: params}}
    );

    this.setState({"duration": duration, "ongoing": ongoing});
  },

  handleOngoing: function(e){
    ongoing = $(e.target).prop("checked");
    val = "ongoing";
    sectionId = $(e.target).closest(".section-item").data("experienceId");
    if(ongoing){
      $(".date-picker2-"+sectionId).datepicker('disable');
    }else{
      $(".date-picker2-"+sectionId).datepicker('enable');
      val = $(".date-picker2-"+sectionId).val();
    }

    this.updateEndDate(val, $(e.target), ongoing);
  },

  handleDateChange: function(){

  },

  addOutcome: function(e){
    var outcomes = this.state.outcomes;
    var selector = $(e.target).closest(".section-item");
    outcomes.push("");
    // selector.find("textarea[name='outcomes']")

    this.setState({outcomes: outcomes});

    // var params = {outcomes: outcomes, "id": $(e.target).closest(".section-item").data("experienceId")}
    
    // this.props.updateResume(
    //   {resume: {experiences_attributes: params}}
    // );
  },
  removeOutcome: function(index){
    if (this.state.outcomes.length != 1) {
      var outcomes = this.state.outcomes;
      outcomes.splice(index, 1);
      this.setState({outcomes: outcomes});
      var params = {outcomes: outcomes, "id": this.state.experience.id}
      this.props.updateResume(
        {resume: {experiences_attributes: params}}
      );
    }
  },

  render: function() {
    var _this = this;
    checked = this.state.ongoing
    duration = this.state.duration;
    startDate = "";
    endDate = "";
    datePicker1 = "date-picker1-" + this.props.experience.id;
    datePicker2 = "date-picker2-" + this.props.experience.id;

    calendarTarget = "calender-terget-"+ this.props.experience.id;

    if(duration && duration.match("-")){
      startDate = duration.split("-")[0].replace(/\s+/g, '');
      endDate = duration.split("-")[1].replace(/\s+/g, '');
    }
    outcomeData = [];
    outcomes = this.state.outcomes;
    outcomes.forEach(function(outcome, index) {
      key = "outcome-" + index;
      outcomeData.push(<Outcomes setupLayout={_this.props.setupLayout} key={key} outcome={outcome} addNewOutcome={_this.addOutcome} removeOutcome={_this.removeOutcome} adjustTextFields={_this.adjustTextFields} index={index}/>);
    });

    optionsArr = ["show_location", "show_period", "show_outcomes", "show_description"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.experience} section="experiences" sectionId={this.state.experience.id} options={optionsArr}/>
    return (
      <li className="section-item col-xs-12" data-experience-id={this.state.experience.id} data-section-id={this.state.experience.id}>
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.experience.id}></i>
           </a>
           <a href="javaScript:void(0);" title="">
           <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
           </a>
        </div>
        {showHideOptions}
        <div className="experience_holder">
           <div className="title-position">
              <div className="form-group mb-0">
                <textArea
                  type="string"
                  name="title"
                  className="form-control hide-show-control sub-header"
                  placeholder="Title/Position"
                  value={this.state.title}
                  onChange={ this.handleChange }
                />
              </div>
           </div>
           <div className="company">
              <div className="form-group mb-0">
                <input
                  type="string"
                  name="company_name"
                  className="form-control secondary-color sub-color-area"
                  placeholder="Company"
                  value={this.state.company_name}
                  onChange={ this.handleChange }
                />
              </div>
           </div>
           <div style={{display: 'inline-flex'}}>
             {this.state.experience.show_period && <div className="column">
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
             { this.state.experience.show_location && <div className="column">
                <i className="fa fa-map-marker secondary-color" aria-hidden="true"></i>
                <span>
                   <div className="form-group mb-0">
                    <textArea
                      type="string"
                      name="location"
                      className="form-control line-height-26"
                      placeholder="Location"
                      value={this.state.location}
                      onChange={ this.handleChange }
                    />
                   </div>
                </span>
             </div>}
           </div>
           { this.state.experience.show_description && <div className="column">
              <span>
                 <div className="form-group mb-0">
                  <textArea
                    type="string"
                    name="description"
                    className="form-control"
                    placeholder="Company Description"
                    value={this.state.description}
                    onChange={ this.handleChange }
                  />
                 </div>
              </span>
           </div>}
          { this.state.experience.show_outcomes && outcomeData }
        </div>
        { this.props.total > 1 &&
          <div className="sub-section-rearrange"><i className="fa fa-arrows"></i></div>
        }
      </li>
    )
  }
});