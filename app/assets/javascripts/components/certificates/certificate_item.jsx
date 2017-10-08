var CertificateItem = React.createClass({

  getInitialState: function(){
    var certificate = this.props.certificate;
    return {name: certificate.name, institutiion_name: certificate.institutiion_name, certificate: certificate};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  render: function() {
    optionsArr = ["show_institutiion"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.certificate} section="certificates" sectionId={this.state.certificate.id} options={optionsArr}/>
    return (
      <div className="">
       <li className="section-item col-xs-12" data-certificate-id={this.state.certificate.id} data-section-id-id={this.state.certificate.id}>
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
          <h5>
             <div className="form-group">
                <input
                  type="string"
                  name="name"
                  className="form-control"
                  placeholder="Certificate Name"
                  value={this.state.name}
                  onChange={ this.handleChange }
                />
             </div>
          </h5>
          <h6>
            { this.state.certificate.show_institutiion && <div className="form-group">
              <input
                type="string"
                name="institutiion_name"
                className="form-control secondary-color"
                placeholder="Certificate Institution"
                value={this.state.institutiion_name}
                onChange={ this.handleChange }
              />
            </div>}
          </h6>
       </li>
      </div>
    )
  }
});