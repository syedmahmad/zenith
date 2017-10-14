var AchievementItem = React.createClass({
  getInitialState: function(){
    var achievement = this.props.achievement;
    return {title: achievement.title, description: achievement.description, achievement: achievement};
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
    showHideOptions = <ShowHideOptions handleShowHideChange={this.props.handleShowHideChange} model={this.props.achievement} section="achievements" sectionId={this.props.achievement.id} options={optionsArr}/>
    return (
      <div className="">
         <li className="section-item" data-achievement-id={this.props.achievement.id} data-section-id={this.props.achievement.id}>
            <div id="edit_able" className="hide-section">  
               <a href="javaScript:void(0);">
               <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.props.addSubSection}></i>
               </a>
               <a href="javaScript:void(0);">
               <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.props.removeSubSection} data-section-id={this.props.achievement.id}></i>
               </a>
               <a href="javaScript:void(0);" title="">
               <i aria-hidden="true" className="fa fa-cog" onMouseDown={this.handleShowHide}></i>
               </a>
            </div>
            {showHideOptions}
            { this.state.achievement.show_icon &&
              <div className="icon-holder pull-left"> 
               <i className="fa fa-bolt secondary-color" aria-hidden="true"></i>
              </div>
            }
            <h5>
              <div className="form-group">
                  <input
                    type="string"
                    name="title"
                    className="form-control hide-show-control"
                    placeholder="What are you most proud of?"
                    value={this.state.title}
                    onChange={ this.handleChange }
                  />
               </div>
            </h5>
            <h6>
               { this.state.achievement.show_description && <div className="form-group">
                  <textArea
                    type="string"
                    name="description"
                    className="form-control"
                    placeholder="A bit about your achievement"
                    value={this.state.description}
                    onChange={ this.handleChange }
                  />
               </div>}
            </h6>
         </li>
      </div>
    )
  }
});