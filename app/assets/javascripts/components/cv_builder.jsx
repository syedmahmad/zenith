var CvBuilder = React.createClass({
  getInitialState: function() {
    return {layoutSections: ["Certificates", "Volunteers"], resume_ids: this.props.resume_ids, resume: this.props.resume};
  },
  removeArrayItem: function(arr, itemToRemove) {
    return arr.filter(item => item !== itemToRemove)
  },
  updateResume: function(formData){
    var _this = this;
    $.ajax({
      url: ("http://localhost:3000/resumes/"+this.props.resume.id),
      dataType: 'json',
      type: 'PATCH',
      data: formData,
      success: function(projects) {
        // this.setState({projects: projects, showNewForm: false});
        // onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        // onError(response.responseJSON)
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
  handleRemoveSection: function(e){
    var removeSection = $(e.target).data("sectionName");
    var positionInSections = this.state.layoutSections.indexOf(removeSection);
    this.state.layoutSections.splice(positionInSections, 1);
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
      section = section.substr(0,1).toUpperCase()+section.substr(1);
      MyComponent = window[section];
      key = section + "holder";
      data.push(<MyComponent handleRemoveSection={_this.handleRemoveSection} resume={state.resume} key={key} updateResume={_this.updateResume}/>);
    });

    return (
      <div className="cv-builder-container">
       
        <div className="right_col" role="main">
          <div className="clearfix"></div>
          <div className="row">
            <div className="col-xs-12">
              <div className="page-holder bg-color">
                <div className="cv-builder full-layout">
                  <ResumeHeader header={header} updateResume={this.updateResume}/>
                  {data}
                </div>
              </div>
            </div>  
          </div>
        </div>
        <RearrangeModal handleRearrage={this.handleRearrage} sections={this.state.layoutSections}/>
        <AddSectionModal handleAddSection={this.handleAddSection} sections={this.state.layoutSections}/>
      </div>
    )
  }
});