var Page = React.createClass({
  render: function() {
    var data = this.props.page_data
    return (
      <div className="col-xs-12">
        <div className="page-holder bg-color page">
          <div className="cv-builder full-layout">
            <ResumeHeader header={this.props.header} updateResume={this.props.updateResume}/>
            {data}
          </div>
        </div>
      </div>  
    )
  }
});