var CvBuilder = React.createClass({
  render: function() {
    var data = [];
    var MyComponent = null;
    var props = this.props;
    
    props.sections.forEach(function(section) {
      MyComponent = window[section];
      data.push(<MyComponent resume={props.resume}/>);
    });

    return (
      <div className="cv-builder col-md-12">
        <ResumeHeader/>
        {data}
      </div>
    )
  }
});