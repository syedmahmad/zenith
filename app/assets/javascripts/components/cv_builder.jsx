var CvBuilder = React.createClass({

  parentUpdateResume: function(formData, onSuccess, onError){
    debugger;
    $.ajax({
      url: ("/header/" + formData["header"]["id"]),
      dataType: 'json',
      type: 'PATCH',
      data: formData,


      success: function(projects) {

        this.setState({projects: projects, showNewForm: false});
        onSuccess();

      }.bind(this),

      error: function(response, status, err) {

        onError(response.responseJSON)
      }

    });

  },

  render: function() {
    var data = [];
    var MyComponent = null;
    var props = this.props;
    var key = "";
    var header = this.props.resume["header"];
    
    props.sections.forEach(function(section) {
      MyComponent = window[section];
      key = section + "holder";
      // ToDO sending all data in props.resume.. we can also do like props;resume. + MyComponent
      data.push(<MyComponent resume={props.resume} key={key} parentUpdateResume={this.parentUpdateResume}/>);
    });

    return (
      <div className="cv-builder-container">
        <div className="col-md-3"> 
          <SideBar handleRearrage={this.handleRearrage}/>
        </div>
        <div className="col-md-9">
          <div className="cv-builder col-md-12">
            <ResumeHeader header={header} parentUpdateResume={this.parentUpdateResume}/>
            {data}
          </div>
        </div>
        <RearrangeModal/>
        <AddSectionModal/>
      </div>
    )
  }
});