var ProjectItem = React.createClass({

  getInitialState: function(){
    var project = this.props.project;
    return {project: project, name: project.name, location: project.location, duration: project.duration, description: project.description, link: project.link, ongoing: project.ongoing, outcomes: project.outcomes};
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
    $(e.target).closest(".section-item").find(".calendar-holder").show();
  },
  componentDidUpdate: function(){
    this.adjustTextFields();
  },
  componentDidMount: function(){
    var _this = this;
    $(".calendar-holder").hide();
    datePicker1 = ".date-picker-pro-" + _this.state.project.id;
    datePicker2 = ".date-picker2-pro-" + _this.state.project.id;
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
    $.each($(".project-holder textarea"), function(index, el){
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

    params = {duration: duration, "id": $(inst.input).closest(".section-item").data("projectId")};
    this.props.updateResume(
      {resume: {projects_attributes: params}}
    );

    this.setState({"duration": duration});
  },
  updateEndDate: function(dateText, inst, ongoing=false){
    duration = "";
    var sectionId = $(inst.input).closest(".section-item").data("projectId");

    if(!sectionId){
      sectionId = $(inst).closest(".section-item").data("projectId");
    }

    startDate = this.state.duration.split("-")[0];
    endDate = dateText.replace(/\s+/g, '');
    duration = startDate.replace(/\s+/g, '');;
    if(endDate != "undefined" && typeof(endDate) != "undefined"){
      duration = duration + " - " + endDate;
    }

    params = {ongoing: ongoing, duration: duration, "id": sectionId};
    this.props.updateResume(
      {resume: {projects_attributes: params}}
    );

    this.setState({"duration": duration, "ongoing": ongoing});
  },

  handleOngoing: function(e){
    ongoing = $(e.target).prop("checked");
    val = "ongoing";
    sectionId = $(e.target).closest(".section-item").data("projectId");
    if(ongoing){
      $(".date-picker2-pro-"+sectionId).datepicker('disable');
    }else{
      $(".date-picker2-pro-"+sectionId).datepicker('enable');
      val = $(".date-picker2-pro-"+sectionId).val();
    }

    this.updateEndDate(val, $(e.target), ongoing);
  },

  handleDateChange: function(){

  },

  adjustTextFields: function(){
    $.each($(document).find(".project-holder textarea"), function(index, el){
      $(el).height(el.scrollHeight+"px");
    });
  },

  addOutcome: function(e){
    var outcomes = this.state.outcomes;
    var selector = $(e.target).closest(".section-item");
    outcomes.push("");
    // selector.find("textarea[name='outcomes']")

    this.setState({outcomes: outcomes});
    e.target.blur();

    var params = {outcomes: outcomes, "id": $(e.target).closest(".section-item").data("projectId")}
    
    this.props.updateResume(
      {resume: {projects_attributes: params}}
    );
  },

  removeOutcome: function(index){
    var outcomes = this.state.outcomes;
    outcomes.splice(index, 1);
    this.setState({outcomes: outcomes});
    var params = {outcomes: outcomes, "id": this.state.project.id}
    this.props.updateResume(
      {resume: {projects_attributes: params}}
    );
  },

  render: function() {
    var _this = this;
    checked = this.state.ongoing
    duration = this.state.duration;
    startDate = "";
    endDate = "";
    datePicker1 = "date-picker-pro-" + this.props.project.id;
    datePicker2 = "date-picker2-pro-" + this.props.project.id;

    calendarTarget = "calender-terget-"+ this.props.project.id;

    if(duration && duration.match("-")){
      startDate = duration.split("-")[0].replace(/\s+/g, '');
      endDate = duration.split("-")[1].replace(/\s+/g, '');
    }

    outcomeData = [];
    outcomes = this.state.outcomes;
    outcomes.forEach(function(outcome, index) {
      key = "outcome-" + index;
      outcomeData.push(<Outcomes key={key} outcome={outcome} addNewOutcome={_this.addOutcome} removeOutcome={_this.removeOutcome} adjustTextFields={_this.adjustTextFields} index={index}/>);
    });

    optionsArr = ["show_location", "show_period", "show_link", "show_description", "show_outcomes"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.project} section="projects" sectionId={this.state.project.id} options={optionsArr}/>
    return (
      <li className="section-item col-xs-12" data-project-id={this.props.project.id} data-section-id={this.props.project.id}>
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.project.id}></i>
           </a>
           <a href="javaScript:void(0);" title="">
           <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
           </a>
        </div>
        {showHideOptions}
        <div className="project-holder">
           <div className="title-position">
              <div className="form-group mb-0">
                <textArea
                  id="sub-header"
                  type="string"
                  name="name"
                  className="form-control hide-show-control"
                  placeholder="Project/Activity name"
                  value={this.state.name}
                  onChange={ this.handleChange }
                />
              </div>
           </div>
           <div style={{display: 'inline-flex'}}> 
             {this.state.project.show_period && <div className="column">
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
              {this.state.project.show_location && <div className="column">
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
            {this.state.project.show_link && <div className="column">
               <i className="fa fa-link secondary-color" aria-hidden="true"></i>
               <span>
                  <div className="form-group mb-0">
                   <textArea
                     type="string"
                     name="link"
                     className="form-control line-height-26"
                     placeholder="link"
                     value={this.state.link || ''}
                     onChange={ this.handleChange }
                   />
                  </div>
               </span>
            </div>}
           {this.state.project.show_description && <div className="column">
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
           { this.state.project.show_outcomes && outcomeData }
        </div>
      </li>
    )
  }
});