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
    $(document).on('focusin', ".section-item", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitCertificate({[e.target.name]: e.target.value, id: $(this).data("certificateId")});
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
  submitCertificate: function(params){
    this.props.updateResume(
      {resume: {certificates_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.certificates.length>0) {
      id = this.state.certificates[this.state.certificates.length-1].id + 1;
    }
    var certificate = {id:id, name:'', institutiion_name:''};
    this.state.certificates.push(certificate);
    this.setState({certificates: this.state.certificates});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.certificates.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({certificates: this.state.certificates.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var certificates = this.state.certificates
    var data = []
    var key = "";
    var _this = this;
    certificates.forEach(function(certificate) {
      key = "certificate-" + certificate.id;
      data.push(<CertificateItem certificate={certificate} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="certificate">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="certificates"></i>
          </a>
       </div>
        <section className="achievement-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="certificate_header"
                      className="form-control"
                      placeholder="CERTIFICATES"
                      value={this.state.certificate_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="achievement-list">
              <ul>
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});