var IndexLogIn = React.createClass({
  getInitialState: function() {
    return {layoutSections: this.props.resume.layout.section_names.slice(0,1), resume_ids: this.props.resume_ids, resume: this.props.resume};
  },
  componentDidMount: function(){
    $(".left_col").remove();
    $(".top_nav").css({marginLeft: '0px'});
    $("footer").css({marginLeft: '0px'})
  },
  cloneResume: function(e){
    resume = this.state.resume
  },

  handleOnclick: function(){
    if(this.state.resume_ids && (this.state.resume_ids.length > 2)){
      alert("you have reached the max numbers of resumes.");
    }else{
      $.ajax({
        url: "http://localhost:3000/resumes/new_resume",
        type: 'POST',
        success: function(projects) {
          window.location = projects.path_to_go;
        }.bind(this),
        error: function(response, status, err) {
          alert("Sorry! something went wrong. Please try again")
        }
      });
    }
  },

  render: function() {
    var data = [];
    var _this = this;
    var state = this.state;
    var header = state.resume["header"];
    var cloneLink = "/resumes/0/clone";
    if (this.state.resume.id != "") {
      cloneLink = "/resumes/"+this.state.resume.id+"/clone";
    } 
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
          <a data-method="post" href={cloneLink}>Clone</a>
        </h2>
      </div>
    )
  }
});