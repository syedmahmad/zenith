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
    $(document).on('focusin', ".section-item", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitStrengths({[e.target.name]: e.target.value, id: $(this).data("strengthId")});
        // _this.props.achievement[e.target.name] = e.target.value;
      // }
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
    var id=1;
    if (this.state.strengths.length>0) {
      id = this.state.strengths[this.state.strengths.length-1].id + 1;
    }
    var strength = {id:id, title:'', description:''};
    this.state.strengths.push(strength);
    this.setState({strengths: this.state.strengths});
  },
  removeSubSection: function(e){
    e.preventDefault();
    var obj_to_remove = this.state.strengths.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({strengths: this.state.strengths.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var strengths = this.props.resume.strengths
    var data = []
    var key = "";
    var _this = this;
    strengths.forEach(function(strength) {
      key = "strength-" + strength.id;
      data.push(<StrengthItem strength={strength} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="strength">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="strengths"></i>
          </a>
       </div>
        <section className="achievement-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="strength_header"
                      className="form-control"
                      placeholder="STRENGTH"
                      value={this.state.strength_header}
                      onChange={ this.handleChange }
                    />
                 </div>
              </h3>
           </div>
           <div className="achievement-list">
              <ul>
                {data}
              </ul>
           </div>
        </section>
      </div>
    )
  }
});