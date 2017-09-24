var DoubleLayoutRearrange = React.createClass({
  render: function() {
    _this = this
    data_left = []
    data_right = []
    right_col_data = _this.props.data_right
    left_col_data = _this.props.data_left

    sections = _this.props.layoutSections
    selectedSections = this.props.selectedSections

    right_col_data.forEach(function(section) {
      if($.inArray(section, selectedSections) > -1){
        section = section.substr(0,1).toUpperCase()+section.substr(1);
        key = "rearrange" + section + "holder";
        data_right.push(<div className="rearrange-section-item" data-toggle="tooltip" title={section} key={key} data-section-name={section}>{section}</div>);
      }
    });

    left_col_data.forEach(function(section) {
      if($.inArray(section, selectedSections) > -1){
        section = section.substr(0,1).toUpperCase()+section.substr(1);
        key = "rearrange" + section + "holder";
        data_left.push(<div className="rearrange-section-item" data-toggle="tooltip" title={section} key={key} data-section-name={section}>{section}</div>);
      }
    });

    return (
      <div>
        <div className="resume-col-right connectedSortable">
          {data_right}
        </div>
        <div className="resume-col-left connectedSortable">
          {data_left}
        </div>
      </div>
    )
  }
});