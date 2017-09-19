var Achievements = React.createClass({
  handleRemoveSection: function(e){
    this.props.handleRemoveSection(e);
  },
  componentDidMount: function(){
    var _this = this;
    $(document).on('focusout', ".section-item", (function (e) {
      // if(_this.props.achievement[e.target.name] != e.target.value){
      _this.submitAchievment({[e.target.name]: e.target.value, id: $(this).data("achievementId")});
        // _this.props.achievement[e.target.name] = e.target.value;
      // }
    }));
  },
  submitAchievment: function(params){
    this.props.updateResume(
      {resume: {achievements_attributes: {"1": params}}}
    );
  },    
  render: function() {
    var achievements = this.props.resume.achievements
    var data = []
    var key = "";
    var _this = this;
    achievements.forEach(function(achievement) {
      key = "achievement-" + achievement.id;
      data.push(<AchievementItem achievement={achievement} key={key} updateResume={_this.props.updateResume} />);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Achievements">
        <section className="achievement-holder">
           <div id="edit_able" className="ember-view section-menu">  <a href="javaScript:void(0);" title="Add a new item">
              <i aria-hidden="true" className="fa fa-plus-circle"></i>
              </a>
              <a href="javaScript:void(0);" title="Remove section">
              <i aria-hidden="true" className="fa fa-trash" onClick={this.handleRemoveSection} data-section-name="achievements"></i>
              </a>
              <a className="move-section" href="javaScript:void(0);" title="Move section">
              <i aria-hidden="true" className="fa fa-arrows"></i>
              </a>
           </div>
           <div className="heading-area">
              <h3>
                 <div className="form-group">
                    <textarea type="text" rows="1" className="form-control" id="" placeholder="ACHIEVEMENTS"></textarea>
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