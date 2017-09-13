var CertificateItem = React.createClass({

  getInitialState: function(){
    var certificate = this.props.certificate;
    return {name: certificate.name, institutiion_name: certificate.institutiion_name};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitCertificate: function(e){
    e.preventDefault();
    this.props.updateResume(
      {certificate: {name: this.state.name, institutiion_name: this.state.institutiion_name}}
    );
  },

  render: function() {
    return (
      <div className="section-item">
        <form style={{marginTop: "30px"}} onSubmit={this.submitCertificate}>
          <div><input
            type="string"
            name="name"
            className="name"
            placeholder="Certificate Name"
            value={this.state.name}
            onChange={ this.handleChange }
          /></div>
          <div><input
            type="string"
            name="institutiion_name"
            className="name"
            placeholder="Certificate Institution"
            value={this.state.institutiion_name}
            onChange={ this.handleChange }
          /></div>
          
          <div className='row'>
            <div className='col-sm-4'>
              <input hidden type="submit" value="Save" className='btn btn-primary' />
            </div>
          </div>
        </form>
      </div>
    )
  }
});