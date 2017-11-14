var Strengths = React.createClass({
  getInitialState: function(){
    return {strength_header: "STRENGTH", strengths: this.props.resume.strengths};
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

        var state_res = _this.state.strengths.find(item => item.id == $(this).data("strengthId"));
        if (state_res) {
          var props_res = _this.props.resume.strengths.find(item => item.id == $(this).data("strengthId"));
          if (props_res && props_res[e.target.name] != e.target.value) {
            //send update call...
            _this.submitStrengths({[e.target.name]: e.target.value, "id": $(this).data("strengthId")});
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
  submitStrengths: function(params){
    this.props.updateResume(
      {resume: {strengths_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Strength"};
    //updating current state from parent
    this.props.createSubSection(formData, "strengths");
  },
  removeSubSection: function(e){
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Strength"};
    //updating current state from parent
    this.props.removeSubSection(formData, "strengths");
  },
  render: function() {
    var strengths = this.state.strengths
    var data = []
    var key = "";
    var _this = this;
    strengths.forEach(function(strength) {
      key = "strength-" + strength.id;
      data.push(<StrengthItem total={_this.state.strengths.length} handleShowHideChange={_this.props.handleShowHideChange} strength={strength} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12 p0" data-section-name="Strengths">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Strengths"></i>
          </a>
       </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="strength_header"
                      className="form-control primary_font"
                      placeholder="STRENGTH"
                      value={this.state.strength_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="section-items-list">
              <ul className="row mrl0">
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});