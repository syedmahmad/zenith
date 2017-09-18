var technologies = React.createClass({
  render: function() {
    var technologies = this.props.resume.technologies;
    var data = [];
    var key = "";
    var _this = this;
    technologies.forEach(function(technology) {
      key = "technology-" + technology.id;
      data.push(<TechnologyItem technology={technology} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="technology" >
        {data}
      </div>
    )
  }
});