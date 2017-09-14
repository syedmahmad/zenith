var CvBuilder = React.createClass({
  getInitialState: function() {
    return {layoutSections: ["Achievements", "Courses"], resume: this.props.resume};
  },
  updateResume: function(formData, onSuccess, onError){
    $.ajax({
      url: ("/header/" + formData["header"]["id"]),
      dataType: 'json',
      type: 'PATCH',
      data: formData,
      success: function(projects) {
        // this.setState({projects: projects, showNewForm: false});
        // onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON)
      }
    });
  },
  handleRearrage: function(){
    var arr = $('.rearrange-section-item').map(function() {
      return $(this).data('sectionName');
    }).get();

    this.setState({layoutSections: arr});
  },
  handleAddSection: function(e){
    var newSection = $(e.target).data("sectionName");
    this.state.layoutSections.push(newSection);
    this.setState({layoutSections: this.state.layoutSections});
  },

  render: function() {
    var data = [];
    var MyComponent = null;
    var state = this.state;
    var key = "";
    var header = this.state.resume["header"];
    var _this = this

    this.state.layoutSections.forEach(function(section) {
      MyComponent = window[section];
      key = section + "holder";
      data.push(<MyComponent resume={state.resume} key={key} updateResume={_this.updateResume}/>);
    });

    return (
      <div className="cv-builder-container">
        <div className="col-md-3"> 
          <SideBar handleRearrage={this.handleRearrage}/>
        </div>
        <div className="col-md-9">
          <div className="cv-builder col-md-12">
            <ResumeHeader header={header} updateResume={this.updateResume}/>
            {data}
          </div>
        </div>
        <RearrangeModal handleRearrage={this.handleRearrage} sections={this.state.layoutSections}/>
        <AddSectionModal handleAddSection={this.handleAddSection} sections={this.state.layoutSections}/>
      </div>
    )
  }
});