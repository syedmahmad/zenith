var Experience = React.createClass({
  render: function() {
    var experiences = this.props.resume["experiences"]["items"]
    var data = []
    var key = "";
    var _this = this;
    experiences.forEach(function(experience) {
      key = "experience-" + experience.id;
      data.push(<ExperienceItem experience={experience} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="experiences" >
        {data}
      </div>
    )
  }
});