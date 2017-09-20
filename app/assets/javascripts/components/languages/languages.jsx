var Languages = React.createClass({
  getInitialState: function(){
    return {language_header: "LANGUAGES", languages: this.props.resume.languages};
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
      _this.submitLanguage({[e.target.name]: e.target.value, id: $(this).data("languageId")});
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
  submitLanguage: function(params){
    this.props.updateResume(
      {resume: {languages_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.languages.length>0) {
      id = this.state.languages[this.state.languages.length-1].id + 1;
    }
    var achievement = {id:id, name:'', level:''};
    this.state.languages.push(achievement);
    this.setState({languages: this.state.languages});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.languages.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({languages: this.state.languages.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var languages = this.state.languages
    var data = []
    var key = "";
    var _this = this;
    languages.forEach(function(language) {
      key = "language-" + language.id;
      data.push(<LanguageItem language={language} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume} />);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Language">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="languages"></i>
          </a>
       </div>
        <section className="achievement-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="language_header"
                      className="form-control"
                      placeholder="LANGUAGES"
                      value={this.state.language_header}
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