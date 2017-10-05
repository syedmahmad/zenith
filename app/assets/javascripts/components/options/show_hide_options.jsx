var ShowHideOptions = React.createClass({

  render: function() {
    _this = this
    options = this.props.options
    section = this.props.section
    sectionId = this.props.sectionId
    model = this.props.model
    data = []
    options.forEach(function(item) {
    	data.push(<OptionItem item={item} model={model} section={section} sectionId={sectionId} handleShowHideChange={_this.props.handleShowHideChange}/>)
    });

    return (
     <div className="show_hide_section" style={{display: "none"}} data-section-name={section} data-section-id={sectionId}>
     	{data}
     </div>
    )
  }
});