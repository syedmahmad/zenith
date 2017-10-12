var ShowHideOptions = React.createClass({

  componentDidMount: function(){
    $(".show_hide_section").hover(function(){
       $(this).addClass("hovered");
    },function(){
       $(this).removeClass("hovered");
    });
  },

  render: function() {
    _this = this
    options = this.props.options
    section = this.props.section
    sectionId = this.props.sectionId
    model = this.props.model
    data = []
    options.forEach(function(item, index) {
    	data.push(<OptionItem item={item} key={index} model={model} section={section} sectionId={sectionId} handleShowHideChange={_this.props.handleShowHideChange}/>)
    });

    return (
     <div className="show_hide_section" style={{display: "none"}} data-section-name={section} data-section-id={sectionId}>
     	{data}
     </div>
    )
  }
});