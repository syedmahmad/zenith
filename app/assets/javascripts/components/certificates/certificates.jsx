var Certificates = React.createClass({
  getInitialState: function(){
    return {certificate_header: "CERTIFICATES", certificates: this.props.resume.certificates};
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

        var state_res = _this.state.certificates.find(item => item.id == $(this).data("certificateId"));
        if (state_res) {
          var props_res = _this.props.resume.certificates.find(item => item.id == $(this).data("certificateId"));
          if (props_res && props_res[e.target.name] != "") {
            //send update call...
            _this.submitCertificate(e.target.name, e.target.value, $(this).data("certificateId"));
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
  submitCertificate: function(attribute, value, id){
    params = {[attribute]: value, "id": id};
    this.props.updateResumeState("certificates", attribute, value, id);
    // this.props.updateResume(
    //   {resume: {certificates_attributes: {"1": params}}}
    // );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Certificate"};
    //updating current state from parent
    this.props.createSubSection(formData, "certificates");
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Certificate"};
    //updating current state from parent
    this.props.removeSubSection(formData, "certificates");  
  },
  render: function() {
    var data = []
    var key = "";
    var _this = this;
    var page = _this.props.page;
    var certificates = _this.props.resume.certificates;
    certificates.forEach(function(certificate) {
      if(page == certificate.page){
        key = "certificate-" + certificate.id;
        data.push(<CertificateItem resume={_this.props.resume} total={certificates.length} handleShowHideChange={_this.props.handleShowHideChange} certificate={certificate} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
      }
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Certificates">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Certificates"></i>
          </a>
       </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="certificate_header"
                      className="form-control primary_font"
                      placeholder="CERTIFICATES"
                      value={this.state.certificate_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="section-items-list">
              <ul className="row m0">
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});