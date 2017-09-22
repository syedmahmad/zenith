var SkillItem = React.createClass({

  getInitialState: function(){
    var skill = this.props.skill;
    return {name: skill.name, level: skill.level};
  },

   handleChange: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function() {
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
            <div className="icon-holder pull-left">
               <i className="fa fa-bolt" aria-hidden="true"></i>
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
            <h6>
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
            </h6>
         </li>
      </div>
    )
  }
});