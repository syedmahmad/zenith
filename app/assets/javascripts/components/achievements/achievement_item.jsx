var AchievementItem = React.createClass({
  render: function() {
    var achievement = this.props.achievement;
    return (
      <div className="section-item">
        <h2>{achievement.title}</h2>
        <p>{achievement.description}</p> 
      </div>
    )
  }
});