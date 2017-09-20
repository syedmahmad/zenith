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
    $(document).on('focusin', ".section-item", (function (e) {
      this.previousElementSibling.classList.remove('hide-section');
    }));
    $(document).on('focusout', ".section-item", (function (e) {
      this.previousElementSibling.classList.add('hide-section');
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitPassion({[e.target.name]: e.target.value, id: $(this).data("passionId")});
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
  submitPassion: function(params){
    this.props.updateResume(
      {resume: {passions_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.passions.length>0) {
      id = this.state.passions[this.state.passions.length-1].id + 1;
    }
    var passion = {id:id, name:''};
    this.state.passions.push(passion);
    this.setState({passions: this.state.passions});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.passions.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      var newState = this.state.passions.filter(item => item.id !== obj_to_remove.id);
      this.setState({passions: newState});    
    }
  },
  render: function() {
    var passions = this.state.passions
    var data = []
    var key = "";
    var _this = this;
    passions.forEach(function(passion) {
      key = "passion-" + passion.id;
      data.push(<PassionItem passion={passion} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume} />);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="passion">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="passions"></i>
          </a>
       </div>
        <section className="achievement-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="passion_header"
                      className="form-control"
                      placeholder="PASSIONS"
                      value={this.state.passion_header}
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