var CertificateItem = React.createClass({

  getInitialState: function(){
    var certificate = this.props.certificate;
    return {name: certificate.name, institutiion_name: certificate.institutiion_name, certificate: certificate, duration: certificate.duration};
  },

  componentDidMount: function(){
    var _this = this;
    $(".calendar-holder").hide();
    datePicker1 = ".date-picker1-cer-" + _this.state.certificate.id;
    datePicker2 = ".date-picker2-cer-" + _this.state.certificate.id;
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
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  updateStartDate: function(dateText, inst){
    duration = "";
    startDate = dateText;
    endDate = this.state.duration.split("-")[1];
    duration = startDate.replace(/\s+/g, '');;

    if(endDate != "undefined" && typeof(endDate) != "undefined"){
      duration = duration + " - " + endDate;
    }

    params = {duration: duration, "id": $(inst.input).closest(".section-item").data("certificateId")};
    this.props.updateResume(
      {resume: {certificates_attributes: params}}
    );

    this.setState({"duration": duration});
  },
  updateEndDate: function(dateText, inst, ongoing=false){
    duration = "";
    var sectionId = $(inst.input).closest(".section-item").data("certificateId");

    if(!sectionId){
      sectionId = $(inst).closest(".section-item").data("certificateId");
    }

    startDate = this.state.duration.split("-")[0];
    endDate = dateText.replace(/\s+/g, '');
    duration = startDate.replace(/\s+/g, '');;
    if(endDate != "undefined" && typeof(endDate) != "undefined"){
      duration = duration + " - " + endDate;
    }

    params = {ongoing: ongoing, duration: duration, "id": sectionId};
    this.props.updateResume(
      {resume: {certificates_attributes: params}}
    );

    this.setState({"duration": duration, "ongoing": ongoing});
  },
  handleOngoing: function(e){
    ongoing = $(e.target).prop("checked");
    val = "ongoing";
    sectionId = $(e.target).closest(".section-item").data("certificateId");
    if(ongoing){
      $(".date-picker2-cer-"+sectionId).datepicker('disable');
    }else{
      $(".date-picker2-cer-"+sectionId).datepicker('enable');
      val = $(".date-picker2-cer-"+sectionId).val();
    }

    this.updateEndDate(val, $(e.target), ongoing);
  },
  handleDate: function(e) {
    e.preventDefault();
    $(e.target).closest(".section-item").find(".calendar-holder").show();
  },
  handleDateChange: function(){

  },

  render: function() {
    checked = this.state.ongoing
    duration = this.state.duration;
    startDate = "";
    endDate = "";
    datePicker1 = "date-picker1-cer-" + this.props.certificate.id;
    datePicker2 = "date-picker2-cer-" + this.props.certificate.id;

    calendarTarget = "calender-terget-"+ this.props.certificate.id;

    if(duration && duration.match("-")){
      startDate = duration.split("-")[0].replace(/\s+/g, '');
      endDate = duration.split("-")[1].replace(/\s+/g, '');
    }

    optionsArr = ["show_institutiion"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.certificate} section="certificates" sectionId={this.state.certificate.id} options={optionsArr}/>
    return (
     <li className="section-item row mrl0 col-xs-12" data-certificate-id={this.state.certificate.id} data-section-id={this.state.certificate.id}>
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.certificate.id}></i>
           </a>
           <a href="javaScript:void(0);" title="">
           <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
           </a>
        </div>
        {showHideOptions}
        <div className="input-holder">
          <div className="form-group mb-0">
            <textArea
              type="string"
              name="name"
              className="form-control hide-show-control sub-header"
              placeholder="Certificate Name"
              value={this.state.name}
              onChange={ this.handleChange }
            />
          </div>
          { this.state.certificate.show_institutiion && <div className="form-group mb-0">
            <textArea
              type="string"
              name="institutiion_name"
              className="form-control secondary-color"
              placeholder="Certificate Institution"
              value={this.state.institutiion_name}
              onChange={ this.handleChange }
            />
          </div>}
        </div>
        {this.state.certificate.show_period && <div className="certificate-holder">
          <div className="column">
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
          </div>
        </div>}
        <div className="sub-section-rearrange"><i className="fa fa-arrows"></i></div>
     </li>
    )
  }
});