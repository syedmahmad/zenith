var Achievements = React.createClass({
  getInitialState: function(){
    return {achievement_header: "ACHIEVEMENTS", achievements: this.props.resume.achievements};
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
      _this.submitAchievment({[e.target.name]: e.target.value, id: $(this).data("achievementId")});
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
  submitAchievment: function(params){
    this.props.updateResume(
      {resume: {achievements_attributes: {"1": params}}}
    );
  },    
  addSubSection: function(e){
    e.preventDefault();
    var id=1;
    if (this.state.achievements.length>0) {
      id = this.state.achievements[this.state.achievements.length-1].id + 1;
    }
    var achievement = {id:id, title:'', description:'', item_icon:''};
    this.state.achievements.push(achievement);
    this.setState({achievements: this.state.achievements});
  },
  removeSubSection: function(e){  
    e.preventDefault();
    var obj_to_remove = this.state.achievements.find(item => item.id === $(e.target).data("sectionId"));
    if (obj_to_remove) {
      this.setState({achievements: this.state.achievements.filter(item => item.id !== obj_to_remove.id)});    
    }
  },
  render: function() {
    var achievements = this.state.achievements
    var data = []
    var key = "";
    var _this = this;
    achievements.forEach(function(achievement) {
      key = "achievement-" + achievement.id;
      data.push(<AchievementItem achievement={achievement} key={key} removeSubSection={_this.removeSubSection} addSubSection={_this.addSubSection} updateResume={_this.props.updateResume} />);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Achievements">
       <div id="edit_able" className="hide-section">  
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-plus-circle" onMouseDown={this.addSubSection}></i>
          </a>
          <a href="javaScript:void(0);">
          <i aria-hidden="true" className="fa fa-trash" onMouseDown={this.handleRemoveSection} data-section-name="achievements"></i>
          </a>
       </div>
        <section className="achievement-holder">
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <input
                      type="string"
                      name="achievement_header"
                      className="form-control"
                      placeholder="ACHIEVEMENTS"
                      value={this.state.achievement_header}
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