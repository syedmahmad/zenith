var RearrangeSections = React.createClass({
  handleRearrange: function(prevUiItem) {
    this.props.handleRearrange(prevUiItem);
  },
  render: function() {
    pages = this.props.pages
    sectionData = this.props.sectionData
    layoutSections = this.props.sections

    var data = [];
    var data_1 = []
    var data_right = [];
    var data_left = []
    var key = "";
    var _this = this;

    for(i=0;i<pages;i++){
      data = [];
      data_right = [];
      data_left = [];
      selectedSections = [];
      $.grep(sectionData, function(item){
        if(item.page == i){
          selectedSections.push(item.name);
          if(item.column == 1){
            data_right.push(item.name);
          }else{
            data_left.push(item.name);
          }
        }
      });
      if(_this.props.layout_type == "double"){
        key = "double-page"+i;
        data.push(<DoubleLayoutRearrange page={i} data_right={data_right} data_left={data_left} layoutSections={layoutSections} selectedSections={selectedSections}  key={key}/>);
      }else{
        layoutSections.forEach(function(section) {
          if($.inArray(section, selectedSections) > -1){
            section = section.substr(0,1).toUpperCase()+section.substr(1);
            key = "rearrange" + section + "holder"+i;
            data.push(<div className="rearrange-section-item" data-toggle="tooltip" title={section} key={key} data-section-name={section}>{section}</div>);
          }
        });
      }
      key = "rearrange-page-"+i;
      if(_this.props.layout_type == "double"){
        data_1.push(<RearrangePageDoubleLayout key={key} page={i} handleRearrange={this.props.handleRearrange} page_index={i+1} page_data={data} />);
      }else{
        data_1.push(<RearrangePage key={key} page={i} handleRearrange={this.props.handleRearrange} page_index={i+1} page_data={data} />);
      }
    };
    return (
      <div className="reorder-page-container">
        <div className="reorder-page-holder">
          {data_1}
        </div>
      </div>
    )
  }
});