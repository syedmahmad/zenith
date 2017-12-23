var ResumeHeader = React.createClass({

  getInitialState: function(){
    var header = this.props.header;
    return {header: header, file: [], imageStyle: header.image_style, imgSrc: header.img_url, name: header.name, job_title: header.job_title, phone: header.phone, website_link: header.website_link, email: header.email, location: header.location};
  },

  handleChange: function(e){
    e.preventDefault();
    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = $(e.target).closest(".section-item").data("sectionId");

    itemsObj = $.grep(resume["header"], function (item) {
      if(item.id == subSectionId){
        item[e.target.name] = e.target.value;
      }
      return item;
    });
    resume["header"] = itemsObj;
    this.props.resume = resume;
    this.setState({[e.target.name]: e.target.value});
  },

  updateCroppedImage: function(result) {
    params = {id: this.props.header.id, avatar: result};
    this.setState({
        imgSrc: [result]
    });
    
    this.props.updateResume({resume: {header_attributes: params}});
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

        }, 2000);
      }
    }));

  },

  submitHeader: function(params){
    this.updateHeader(params);
  },    

  saveImage: function(url) {
    this.setState({
        imgSrc: [url]
    });
    params = {id: this.props.header.id, avatar: url};
    this.props.updateResume({resume: {header_attributes: params}});
    // $("#profileImageModal").modal('show');
  },

  handleDelete: function() {
    this.setState({
        imgSrc: "/images/default_avatar.png"
    })
    
    params = {id: this.props.header.id, avatar: "remove_image"};
    
    this.props.updateResume({resume: {header_attributes: params}});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".personal-info").find(".show_hide_section").show()
  },
  handleProfileImageClick: function(e){
    $("#profileImageModal").modal('show');
  },
  // handleImageStyleChange: function(e){
  //   style = $(e.target).data("style");
  //   params = {"image_style": style, "id": $(e.target).closest(".profile-buttons-holder").data("headerId")};
  //   this.updateHeader(params);
  //   this.setState({imageStyle: style});
  // },
  updateHeader: function(params){
    this.props.updateResume(
      {resume: {header_attributes: params}}
    );
  },

  render: function() {
    profileImageStyle = "img-responsive rounded";
    optionsArr = ["show_avatar", "show_email", "show_phone", "show_website_link", "show_location", "show_job_title"]
    showHideOptions = <ShowHideOptions model={this.state.header} section="header" sectionId={this.props.header.id} handleShowHideChange={this.props.handleShowHideChange} options={optionsArr}/>
    return (
      <div>
        <section className="personal-info" data-header-id={this.props.header.id}>
          <div id="edit_able" className="hide-section">
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-camera" onClick={this.handleProfileImageClick}></i>
             </a>
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
             </a>
          </div>
          {showHideOptions}
           <div className="row">
              <div className="col-sm-8">
                 <div className="info-details">
                    { this.state.header.show_name && <div className="full-name section-items-holder">
                      <div className="form-group">
                        <textArea
                          type="string"
                          name="name"
                          className="form-control height-20 primary_font"
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
                              className="form-control height-20 secondary-color primary_font"
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
                                    type="number"
                                    name="phone"
                                    className="form-control height-20"
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
                                  className="form-control height-20"
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
                                  className="form-control height-20"
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
                                  className="form-control height-20"
                                  placeholder="Location"
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
                    <img id="perfect-size" src={this.state.imgSrc} onClick={this.handleProfileImageClick} className={profileImageStyle}/>
                 </div>}
              </div>
           </div>
        </section>
        <ProfileImageModal updateCroppedImage={this.updateCroppedImage} headerId={this.state.header.id} profileImageStyle={profileImageStyle} imgSrc={this.state.imgSrc} handleDelete={this.handleDelete} saveImage={this.saveImage}/>
      </div>
    )
  }
});