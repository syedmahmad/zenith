var ResumeHeader = React.createClass({

  getInitialState: function(){
    var header = this.props.header;
    return {header: header, file: [], imgSrc: header.img_url, name: header.name, job_title: header.job_title, phone: header.phone, website_link: header.website_link, email: header.email, location: header.location};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  _onChange: function(e){
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
    var _this = this;
    var show_hide_section_clicked = false;
    
    $(document).on('focusin', ".personal-info", (function (e) {
      this.firstChild.classList.remove('hide-section');
    }));

    $(document).on('focusout', ".personal-info", (function (e) {
      e.preventDefault();
      if($('.show_hide_section').hasClass("hovered")){
        show_hide_section_clicked = true;
        $(".personal-info").attr('tabindex',-1).focus();
      }else{
        show_hide_section_clicked = false;
      }

      if (!show_hide_section_clicked) {
        $(this).find(".show_hide_section").hide()
        var __this = this;
        setTimeout(function(){ 
          __this.firstChild.classList.add('hide-section');
          if (e.target.value != _this.props.header[e.target.name]) {
            _this.submitHeader({[e.target.name]: e.target.value, "id": $(__this).data("headerId")});
          }

        }, 1000);
      }
    }));

  },

  submitHeader: function(params){
    this.props.updateResume(
      {resume: {header_attributes: params}}
    );
  },    

  handleClick: function(e) {
    $('#img_selector').show().focus().trigger('click');
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".personal-info").find(".show_hide_section").show()
  },

  render: function() {
    optionsArr = ["show_avatar", "show_email", "show_phone", "show_website_link", "show_location", "show_job_title"]
    showHideOptions = <ShowHideOptions model={this.state.header} section="header" sectionId={this.props.header.id} handleShowHideChange={this.props.handleShowHideChange} options={optionsArr}/>
    return (
      <div>
        <section className="personal-info" data-header-id={this.props.header.id}>
          <div id="edit_able" className="hide-section">  
             <form hidden>
               <input 
                 ref="file"
                 id="img_selector"
                 type="file" 
                 name="user[image]" 
                 multiple="true"
                 onChange={this._onChange}/>
              </form>
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-camera" onClick={this.handleClick}></i>
             </a>
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
             </a>
          </div>
          {showHideOptions}
           <div className="row">
              <div className="col-sm-8">
                 <div className="info-details">
                    { this.state.header.show_name && <div className="full-name">
                      <div className="form-group">
                        <input
                          type="string"
                          name="name"
                          className="form-control primary_font"
                          placeholder="Full Name "
                          value={this.state.name}
                          onChange={ this.handleChange}
                        />
                      </div>
                    </div>}
                    { this.state.header.show_job_title && 
                      <h3 className="job-title">
                         <div className="form-group">
                            <input
                              type="string"
                              name="job_title"
                              className="form-control secondary-color primary_font"
                              placeholder="Job Title"
                              value={this.state.job_title}
                              onChange={ this.handleChange}
                            />
                         </div>
                      </h3>}
                 </div>
                 <div className="row">
                    { this.state.header.show_phone && <div className="col-sm-6">
                       <div className="column">
                          <i className="fa fa-phone secondary-color" aria-hidden="true"></i>
                          <span>
                             <div className="form-group">
                                <input
                                    type="string"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Phone"
                                    value={this.state.phone}
                                    onChange={ this.handleChange}
                                  />
                             </div>
                          </span>
                       </div>
                    </div>}
                    { this.state.header.show_email && <div className="col-sm-6">
                       <div className="column">
                          <i className="fa fa-envelope secondary-color" aria-hidden="true"></i>
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
                    </div>}
                    { this.state.header.show_website_link && <div className="col-sm-6">
                       <div className="column">
                          <i className="fa fa-link secondary-color" aria-hidden="true"></i>
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
                    </div>}
                    { this.state.header.show_location && <div className="col-sm-6">
                       <div className="column">
                          <i className="fa fa-map-marker secondary-color" aria-hidden="true"></i>
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
                    </div>}
                 </div>
              </div>
              <div className="col-sm-4">
                 { this.state.header.show_avatar && <div className="profile-image">
                    <img src={this.state.imgSrc} className="img-responsive"/>
                 </div>}
              </div>
           </div>
        </section>
      </div>
    )
  }
});