var Page = React.createClass({
  render: function() {
    data = this.props.page_data

    return (
      <div className="col-xs-12">
        <div className="page-holder bg-color page" data-page-index={this.props.page_index} style={{backgroundImage: "url(/assets/"+this.props.resumeStyle.background_img+")"}}>
          <div className="cv-builder full-layout">
            {this.props.page_index == 1 && <ResumeHeader handleShowHideChange={this.props.handleShowHideChange} header={this.props.header} updateResume={this.props.updateResume}/>}
            {data}
          </div>
        </div>
      </div>  
    )
  }
});