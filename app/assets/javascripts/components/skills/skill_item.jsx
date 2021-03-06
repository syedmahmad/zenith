var SkillItem = React.createClass({

  getInitialState: function(){
    var skill = this.props.skill;
    return {skill: skill, name: skill.name, level: skill.level};
  },

   handleChange: function(e){
    e.preventDefault();
    var resume = this.props.resume;
    var itemsObj = null;
    var subSectionId = $(e.target).closest(".section-item").data("sectionId");

    itemsObj = $.grep(resume["skills"], function (item) {
      if(item.id == subSectionId){
        item[e.target.name] = e.target.value;
      }
      return item;
    });
    resume["skills"] = itemsObj;
    this.props.resume = resume;
    this.setState({[e.target.name]: e.target.value});
  },

  handleShowHide: function(e){
    e.preventDefault();
    $(e.target).closest(".section-item").find(".show_hide_section").show()
  },

  render: function() {
    var levelHash = {"0": "", "20": "Beginner", "40": "Intermediate", "60": "Advanced", "80": "Proficient", "100": "Native"};
    optionsArr = ["show_level"]
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.state.skill} section="skills" sectionId={this.state.skill.id} options={optionsArr}/>
    return (
       <li className="section-item row mrl0" data-skill-id={this.props.skill.id} data-section-id={this.props.skill.id}>
          <div id="edit_able" className="hide-section">  
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
             </a>
             <a href="javaScript:void(0);">
             <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.skill.id}></i>
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
                className="form-control hide-show-control sub-header"
                placeholder="Skill"
                value={this.state.name}
                onChange={ this.handleChange }
              />
           </div>
           <h6>
              { this.state.skill.show_level && <p>{levelHash[this.state.level]}</p>}
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
           </h6>
           { this.props.total > 1 &&
             <div className="sub-section-rearrange"><i className="fa fa-arrows"></i></div>
           }
       </li>
    )
  }
});