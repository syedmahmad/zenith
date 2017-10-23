var StrengthItem = React.createClass({

  getInitialState: function(){
    var strength = this.props.strength;
    return {strength: strength, title: strength.title, description: strength.description};
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
    optionsArr = ["show_icon", "show_description"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.strength} section="strengths" sectionId={this.state.strength.id} options={optionsArr}/>
    return (
     <div className="">
        <li className="section-item" data-strength-id={this.props.strength.id} data-section-id={this.props.strength.id}>
           <div id="edit_able" className="hide-section">  
              <a href="javaScript:void(0);">
              <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
              </a>
              <a href="javaScript:void(0);">
              <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.strength.id}></i>
              </a>
              <a href="javaScript:void(0);" title="">
              <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
              </a>
           </div>
           {showHideOptions}
           {this.state.strength.show_icon && <div className="icon-holder pull-left">
              <i className="fa fa-gavel secondary-color" aria-hidden="true"></i>
           </div>}
           <div className="input-holder">
              <div className="form-group mb-0">
                 <textArea
                   type="string"
                   name="title"
                   className="form-control hide-show-control"
                   placeholder="Your Unique Talent"
                   value={this.state.title}
                   onChange={ this.handleChange }
                 />
              </div>
            {this.state.strength.show_description &&
              <div className="form-group mb-0">
                 <textArea
                   type="string"
                   name="description"
                   className="form-control"
                   placeholder="As result of it / how did you acquire it"
                   value={this.state.description}
                   onChange={ this.handleChange }
                 />
              </div>}
          </div>
        </li>
     </div>
    )
  }
});