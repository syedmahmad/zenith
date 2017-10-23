var Awards = React.createClass({
  getInitialState: function(){
    return {award_header: "AWARDS", awards: this.props.resume.awards};
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
        var state_res = _this.state.awards.find(item => item.id == $(this).data("awardId"));
        if (state_res) {
          var props_res = _this.props.resume.awards.find(item => item.id == $(this).data("awardId"));
          if (props_res && props_res[e.target.name] != e.target.value) {
            //send update call...
            _this.submitAward({[e.target.name]: e.target.value, "id": $(this).data("awardId")});
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
  submitAward: function(params){
    this.props.updateResume(
      {resume: {awards_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Award"};
    //updating current state from parent
    this.props.createSubSection(formData, "awards");
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Award"};
    //updating current state from parent
    this.props.removeSubSection(formData, "awards");  
  },
  render: function() {
    var awards = this.state.awards
    var data = []
    var key = "";
    var _this = this;
    awards.forEach(function(award) {
      key = "award-" + award.id;
      data.push(<AwardItem handleShowHideChange={_this.props.handleShowHideChange} award={award} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Awards" >
        <div id="edit_able" className="hide-section">  
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
           </a>
           <a href="javaScript:void(0);">
           <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Awards"></i>
           </a>
        </div>
        <section className="section-items-holder">           
           <div className="heading-area" onFocus={this.showButtons} onBlur={this.hideButtons}>
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="award_header"
                      className="form-control primary_font"
                      placeholder="AWARDS"
                      value={this.state.award_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
            <div className="section-items-list">
              <ul>
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});