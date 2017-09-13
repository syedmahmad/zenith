var Achievements = React.createClass({
  render: function() {
    var achievements = this.props.resume["achievements"]["items"]
    var data = []
    var key = "";
    var _this = this;
    achievements.forEach(function(achievement) {
      key = "achievement-" + achievement.id;
      data.push(<AchievementItem achievement={achievement} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Achievements" >
        {data}
      </div>
    )
  }
});