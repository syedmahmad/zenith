var ResumeHeader = React.createClass({

  getInitialState: function(){
    var header = this.props.header;
    return {file: [], imgSrc: header.img_url, name: header.name, phone: header.phone, title: header.title, email: header.email, location: header.location, website_link: header.website_link};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  _onChange: function(){
    // Assuming only image
    _this =  this;
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

     reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result]
        })
    
        params = {id: this.props.header.id, avatar: reader.result};
        
        this.props.updateResume({resume: {header_attributes: params}});
      }.bind(this);
  },

  componentDidMount: function(){
    // show setting and camera buttons
    $(document).on('focusin', ".personal-info", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    // hide setting and camera buttons
    $(document).on('focusout', ".personal-info", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
    }));
  },

  render: function() {
    return (
      <div>
        <div id="edit_able" className="">  
           <form>
             <input 
               ref="file" 
               type="file" 
               name="user[image]" 
               multiple="true"
               onChange={this._onChange}/>
            </form>
           <a className="" href="javaScript:void(0);" title="">
           <i aria-hidden="true" className="fa fa-camera"></i>
           </a>
           <a href="javaScript:void(0);" title="">
           <i aria-hidden="true" className="fa fa-cog"></i>
           </a>
        </div>
        <section className="personal-info">
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
                    <img src={this.state.imgSrc} className="img-responsive"/>
                 </div>
              </div>
           </div>
        </section>
      </div>
    )
  }
});