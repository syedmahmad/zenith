var CvBuilder = React.createClass({
  render: function() {
    var data = [];
    var MyComponent = null;
    var props = this.props;
    var key = "";
    var header = this.props.resume["header"];
    
    props.sections.forEach(function(section) {
      MyComponent = window[section];
      key = section + "holder";
      data.push(<MyComponent resume={props.resume} key={key}/>);
    });

    return (
      <div className="cv-builder-container">
        <div className="col-md-3"> 
          <SideBar handleRearrage={this.handleRearrage}/>
        </div>
        <div className="col-md-9">
          <div className="cv-builder col-md-12">
            <ResumeHeader header={header}/>
            {data}
          </div>
        </div>
        <RearrangeModal/>
        <AddSectionModal/>
      </div>
    )
  }
});