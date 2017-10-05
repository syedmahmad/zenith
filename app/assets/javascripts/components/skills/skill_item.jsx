var SkillItem = React.createClass({

  getInitialState: function(){
    var skill = this.props.skill;
    return {skill: skill, name: skill.name, level: skill.level};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
    optionsArr = ["show_level"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.skill} section="skills" sectionId={this.state.skill.id} options={optionsArr}/>
    return (
      <div className="">
         <li className="section-item" data-skill-id={this.props.skill.id}>
            <div id="edit_able" className="hide-section">  
               <a href="javaScript:void(0);">
               <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
               </a>
               <a href="javaScript:void(0);">
               <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.skill.id}></i>
               </a>
            </div>
            <h5>
               <div className="form-group">
                  <input
                    type="string"
                    name="name"
                    className="form-control"
                    placeholder="Skill"
                    value={this.state.name}
                    onChange={ this.handleChange }
                  />
               </div>
            </h5>
            { this.state.skill.show_level && <h6>
              <div className="form-group">
                <input
                  type="string"
                  name="level"
                  className="form-control"
                  placeholder="Introductory"
                  value={this.state.level}
                  onChange={ this.handleChange }
                />
              </div>
            </h6>}
         </li>
      </div>
    )
  }
});