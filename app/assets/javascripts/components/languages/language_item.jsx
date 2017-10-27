var LanguageItem = React.createClass({

  getInitialState: function(){
    var language = this.props.language;
    return {language: language, name: language.name, level: language.level};
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  render: function() {
    var levelHash = {"0": "Beginner", "20": "Intermediate", "40": "Advanced", "60": "Proficient", "80": "Excellent", "100": "Native"};
    optionsArr = ["show_proficiency"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.language} section="languages" sectionId={this.state.language.id} options={optionsArr}/>
    return (
       <li className="section-item row mrl0" data-language-id={this.props.language.id} data-section-id={this.props.language.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.language.id}></i>
             </a>
             <a href="javaScript:void(0);" title="">
             <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
             </a>
          </div>
          {showHideOptions}
             <div className="form-group mb-0">
                <textArea
                  type="string"
                  name="name"
                  className="form-control hide-show-control"
                  placeholder="language name"
                  value={this.state.name}
                  onChange={ this.handleChange }
                />
             </div>
          { this.state.language.show_proficiency && <h6 className="mt-24">
             <p className="text-right">{levelHash[this.state.level]}</p>
             <div className="form-group">
                <input
                  type="range"
                  min="0" max="100" step="20"
                  name="level"
                  className=" height-5 form-control input-range"
                  placeholder="Beginner"
                  value={this.state.level}
                  onChange={ this.handleChange }
                />
             </div>
          </h6>}
       </li>
    )
  }
});