var Certificate = React.createClass({
  render: function() {
    var certificates = this.props.resume.certificates
    var data = []
    var key = "";
    var _this = this;
    certificates.forEach(function(certificate) {
      key = "certificate-" + certificate.id;
      data.push(<CertificateItem certificate={certificate} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="certificate" >
        {data}
      </div>
    )
  }
});