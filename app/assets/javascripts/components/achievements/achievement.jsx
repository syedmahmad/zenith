var Achievements = React.createClass({
  render: function() {
    var achievements = this.props.resume["achievements"]["items"]
    var data = []
    var key = "";
    achievements.forEach(function(achievement) {
      key = "achievement-" + achievement.id;
      data.push(<AchievementItem achievement={achievement} key={key}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="Achievements" >
        {data}
      </div>
    )
  }
});