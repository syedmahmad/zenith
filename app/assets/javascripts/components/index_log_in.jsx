var IndexLogIn = React.createClass({
  getInitialState: function() {
    return {layoutSections: ["Achievements", "Courses"], resume_ids: this.props.resume_ids, resume: this.props.resume};
  },
  componentDidMount: function(){
    $(".left_col").remove();
    $(".top_nav").css({marginLeft: '0px'});
    $("footer").css({marginLeft: '0px'})
  },

  handleOnclick: function(){
    if(this.state.resume_ids.length > 2){
      alert("you have reached the max numbers of resumes.")
    }else{
      window.location = "/resumes/new"
    }
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
          <a href="javascript:void(0)" onClick={this.handleOnclick}>New Resume</a>
        </h2>
      </div>
    )
  }
});