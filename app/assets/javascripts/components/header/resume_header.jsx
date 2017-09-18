var ResumeHeader = React.createClass({

  getInitialState: function(){
    var header = this.props.header;
    return {name: header.name, phone: header.phone, title: header.title, email: header.email, location: header.location, website_link: header.website_link};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  submitHeaderData: function(e){
    e.preventDefault();
    this.props.updateResume(
      {header: {name: this.state.name, phone: header.phone, title: this.state.title, email: this.state.email, website_link: this.state.website_link, location: this.state.location}}
    );
  },

  render: function() {
    return (
      <section className="personal-info">
         <div id="edit_able" className="ember-view section-menu">  <a href="javaScript:void(0);" title="Add a new item">
            <i aria-hidden="true" className="fa fa-plus-circle"></i>
            </a>
            <a href="javaScript:void(0);" title="Remove section">
            <i aria-hidden="true" className="fa fa-trash"></i>
            </a>
            <a className="move-section" href="javaScript:void(0);" title="Move section">
            <i aria-hidden="true" className="fa fa-arrows"></i>
            </a>
         </div>
         <div className="row">
            <div className="col-sm-8">
               <div className="info-details">
                  <div className="full-name">
                     <div className="form-group">
                        <input
                            type="string"
                            name="name"
                            className="form-control"
                            placeholder="Full Name"
                            value={this.state.name}
                            onChange={ this.handleChange}
                          />
                     </div>
                  </div>
                  <h3 className="job-title">
                     <div className="form-group">
                        <input
                          type="string"
                          name="title"
                          className="form-control"
                          placeholder="Job Title"
                          value={this.state.title}
                          onChange={ this.handleChange}
                        />
                     </div>
                  </h3>
               </div>
               <div className="row">
                  <div className="col-sm-6">
                     <div className="column">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <span>
                           <div className="form-group">
                              <input
                                  type="string"
                                  name="phone"
                                  className="form-control"
                                  placeholder="Full Name"
                                  value={this.state.phone}
                                  onChange={ this.handleChange}
                                />
                           </div>
                        </span>
                     </div>
                  </div>
                  <div className="col-sm-6">
                     <div className="column">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <span>
                           <div className="form-group">
                              <input
                                type="string"
                                name="email"
                                className="form-control"
                                placeholder="guest_150523877422@example.com"
                                value={this.state.email}
                                onChange={ this.handleChange}
                              />
                           </div>
                        </span>
                     </div>
                  </div>
                  <div className="col-sm-6">
                     <div className="column">
                        <i className="fa fa-link" aria-hidden="true"></i>
                        <span>
                           <div className="form-group">
                              <input
                                type="string"
                                name="website_link"
                                className="form-control"
                                placeholder="Website/Link"
                                value={this.state.website_link}
                                onChange={ this.handleChange}
                              />
                           </div>
                        </span>
                     </div>
                  </div>
                  <div className="col-sm-6">
                     <div className="column">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <span>
                           <div className="form-group">
                              <input
                                type="string"
                                name="location"
                                className="form-control"
                                placeholder="location"
                                value={this.state.location}
                                onChange={ this.handleChange}
                              />
                           </div>
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-sm-4">
               <div className="profile-image">
                  <img src="/images/default_avatar.png" className="img-responsive"/>
               </div>
            </div>
         </div>
      </section>
    )
  }
});