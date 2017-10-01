var ShowHideOptions = React.createClass({

  render: function() {
    options = this.props.options
    section = this.props.section
    data = []
    options.forEach(function(item) {
    	data.push(<OptionItem item={item}/>)
    });

    return (
     <div className="show_hide_section" data-section-name={section} handleShowHideChange={this.props.handleShowHideChange}>
     	{data}
     </div>
    )
  }
});