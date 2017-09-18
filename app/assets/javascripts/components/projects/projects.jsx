var projects = React.createClass({
  render: function() {
    var projects = this.props.resume.projects
    var data = []
    var key = "";
    var _this = this;
    projects.forEach(function(project) {
      key = "project-" + project.id;
      data.push(<ProjectItem project={project} key={key} updateResume={_this.props.updateResume}/>);
    });
    
    return (
     <div className="section-items col-md-12" data-section-name="projects" >
        {data}
      </div>
    )
  }
});