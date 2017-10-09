var Passions = React.createClass({
  getInitialState: function(){
    return {passion_header: "PASSIONS", passions: this.props.resume.passions};
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

        var state_res = _this.state.passions.find(item => item.id == $(this).data("passionId"));
        if (state_res) {
          var props_res = _this.props.resume.passions.find(item => item.id == $(this).data("passionId"));
          if (props_res && props_res[e.target.name] != e.target.value) {
            //send update call...
            _this.submitPassion({[e.target.name]: e.target.value, "id": $(this).data("passionId")});
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
  submitPassion: function(params){
    this.props.updateResume(
      {resume: {passions_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var formData = {sub_section_name:"Passion"};
    //updating current state from parent
    this.props.createSubSection(formData, "passions");
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var formData = {section_id: $(e.target).data("sectionId"), sub_section_name:"Passion"};
    //updating current state from parent
    this.props.removeSubSection(formData, "passions");  
  },
  render: function() {
    var passions = this.state.passions
    var data = []
    var key = "";
    var _this = this;
    passions.forEach(function(passion) {
      key = "passion-" + passion.id;
      data.push(<PassionItem handleShowHideChange={_this.props.handleShowHideChange} passion={passion} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume} />);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Passions">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="Passions"></i>
          </a>
       </div>
        <section className="section-items-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="passion_header"
                      className="form-control primary_font"
                      placeholder="PASSIONS"
                      value={this.state.passion_header}
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