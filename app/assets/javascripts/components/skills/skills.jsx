var Skills = React.createClass({
  render: function() {
    var skills = this.props.resume["skills"]["items"]
    var data = []
    var key = "";
    var _this = this;
    skills.forEach(function(skill) {
      key = "skill-" + skill.id;
      data.push(<SkillItem skill={skill} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="skill" >
        {data}
      </div>
    )
  }
});