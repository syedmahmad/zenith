var IndexLogIn = React.createClass({
  getInitialState: function() {
    return {layoutSections: ["Achievements", "Courses"], resume_ids: this.props.resume_ids, resume: this.props.resume};
  },

  render: function() {
    var data = [];
    var _this = this;
    var state = this.state;
    var header = state.resume["header"];
    state.layoutSections.forEach(function(section) {
      MyComponent = window[section];
      key = section + "holder";
      data.push(<MyComponent resume={state.resume} key={key} updateResume={_this.updateResume}/>);
    });

    return (
      <div className="cv-builder-container col-md-12">
        <div className="cv-builder col-md-3">
          <ResumeHeader header={header}/>
          {data}
        </div>
        <h2>
          <a href="/resumes/new">New Resume</a>
        </h2>
      </div>
    )
  }
});